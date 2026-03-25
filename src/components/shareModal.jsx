import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SharePageUserProfile from "./SharePageUserProfile";
import { usePortalPosition } from "@/Hooks/usePortalPosition";
import Avatar from "./avatar";
import { set } from "date-fns";
import { z } from "zod";

export default function ShareModal(props) {
  const emailSchema = z.email();
  const [sharePrivilege, setSharePrivilege] = useState("Member");
  const [loader, setLoader] = useState(false);
  const [linkPrivilegeModalOpen, setLinkPrivilegeModalOpen] = useState(false);
  const linkPrivilegeTriggerRef = useRef(null);
  const linkPrivilegeModalRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const searchSharePrivilegeTriggerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsModalOpen, setSearchResultsModalOpen] = useState(false);
  const searchResultsPosition = usePortalPosition(
    searchInputRef,
    searchResultsModalOpen,
  );
  const HandleShareButton = async () => {
    let res = null;
    if (selectedUserId.trim() !== "") {
      res = await axios.post(
        `/user/addusertoboard`,
        {
          boardId: boardId,
          privilege: sharePrivilege,
          targetUserId: selectedUserId
        },
        { withCredentials: true },
      );
    } else if (searchQuery.trim()) {
      const emailToValidate = searchQuery.trim();
      const parsedEmail = emailSchema.safeParse(emailToValidate);

      if (!parsedEmail.success) {
        return;
      }

      res = await axios.post(
        `/user/addusertoboard`,
        {
          boardId: boardId,
          privilege: sharePrivilege,
          email: emailToValidate,
        },
        { withCredentials: true },
      );
    }

    if (res?.data?.added) {
      setBoardMembers((prev) => {
        const roleKey = sharePrivilege.toLowerCase();
        const updated = {
          ...prev,
          [roleKey]: [...(prev[roleKey] || []), res.data.user],
        };
        return updated;
      });
    }
  };

  const [searchSharePrivilegeModalOpen, setSearchSharePrivilegeModalOpen] =
    useState(false);
  const position = usePortalPosition(
    linkPrivilegeTriggerRef,
    linkPrivilegeModalOpen,
  );
  const position2 = usePortalPosition(
    searchSharePrivilegeTriggerRef,
    searchSharePrivilegeModalOpen,
  );
  const [selecthorizontalbar, setSelectHorizontalBar] =
    useState("Board members");
  const {
    userInfo,
    shareLink,
    setShareLink,
    shareLinkPrivilege,
    setShareLinkPrivilege,
    boardMembers,
    setBoardMembers,
    boardId,
    shareModalOpen,
    modalClose,
  } = props;
  const totalBoardUsers =
    boardMembers.admin.length +
    boardMembers.member.length +
    boardMembers.observer.length;

  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setSearchResults([]);
      setSearchResultsModalOpen(false);
      return;
    }
    async function fetchSearchResults() {
      try {
        const res = await axios.get(
          `/user/searchusers?query=${debouncedSearchQuery}&boardId=${boardId}`,
          { withCredentials: true },
        );
        setSearchResults(res.data.users || []);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      }
    }
    fetchSearchResults();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (!searchResultsModalOpen) return;

    const handleSearchResultsOutsideClick = (event) => {
      const target = event.target;
      if (
        searchInputRef.current?.contains(target) ||
        searchResultsRef.current?.contains(target)
      ) {
        return;
      }
      setSearchResultsModalOpen(false);
    };

    document.addEventListener("mousedown", handleSearchResultsOutsideClick);
    document.addEventListener("touchstart", handleSearchResultsOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleSearchResultsOutsideClick,
      );
      document.removeEventListener(
        "touchstart",
        handleSearchResultsOutsideClick,
      );
    };
  }, [searchResultsModalOpen]);

  useEffect(() => {
    if (!searchResultsModalOpen) return;

    const handleSearchResultsEscape = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        setSearchResultsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleSearchResultsEscape, true);

    return () => {
      document.removeEventListener("keydown", handleSearchResultsEscape, true);
    };
  }, [searchResultsModalOpen]);

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      modalClose();
    }
  };

  async function handleSharePrivilegeChange(newPrivilege) {
    const res = await axios.post(
      `/user/updateinvitelinkprivilege`,
      { boardId: boardId, privilege: newPrivilege },
      { withCredentials: true },
    );
    if ((res.data.change = true)) {
      setShareLinkPrivilege(newPrivilege);
    }
  }
  async function createInviteLink() {
    setLoader(true);
    const res = await axios.post(
      `/user/generateinvitelink`,
      { boardId: boardId },
      { withCredentials: true },
    );
    if (res.data?.inviteLink) {
      setShareLink(res.data.inviteLink.link);
      setShareLinkPrivilege(res.data.inviteLink.privilege);
      setLoader(false);
    }
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
  };

  async function deleteInviteLink() {
    setLoader(true);
    const res = await axios.delete(
      `/user/deleteinvitelink`,
      {
        withCredentials: true,
        data: { boardId: boardId },
      },
    );
    if (res.data?.deleted) {
      setShareLink("");
      setShareLinkPrivilege("Member");
    }
    setLoader(false);
  }
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modalClose]);

  useEffect(() => {
    if (!linkPrivilegeModalOpen) return;

    const handleLinkPrivilegeOutsideClick = (event) => {
      const target = event.target;
      if (
        linkPrivilegeModalRef.current?.contains(target) ||
        linkPrivilegeTriggerRef.current?.contains(target)
      ) {
        return;
      }
      setLinkPrivilegeModalOpen(false);
    };

    document.addEventListener("mousedown", handleLinkPrivilegeOutsideClick);
    document.addEventListener("touchstart", handleLinkPrivilegeOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleLinkPrivilegeOutsideClick,
      );
      document.removeEventListener(
        "touchstart",
        handleLinkPrivilegeOutsideClick,
      );
    };
  }, [linkPrivilegeModalOpen]);

  useEffect(() => {
    if (!linkPrivilegeModalOpen) return;

    const handleLinkPrivilegeEscape = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        setLinkPrivilegeModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleLinkPrivilegeEscape, true);

    return () => {
      document.removeEventListener("keydown", handleLinkPrivilegeEscape, true);
    };
  }, [linkPrivilegeModalOpen]);

  return createPortal(
    <div className="w-screen h-screen absolute top-0 left-0 overflow-clip">
      <div
        onClick={modalClose}
        className="w-screen h-screen absolute top-0 left-0 bg-black/20 z-1 backdrop-blur-sm flex items-center justify-center"
      ></div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-[#22272b] w-[584px] px-6 py-5 flex flex-col text-gray-400 z-2 rounded-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden absolute top-12 left-1/2 -translate-x-1/2"
      >
        <nav className="flex text-[20px] items-center justify-between w-full">
          <div>Share board</div>
          <div onClick={modalClose} className="hover:text-gray-600">
            <svg
              width="24"
              height="24"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </nav>
        <div className="flex gap-2 my-5">
          <div className="flex-1 relative">
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => {
                setSelectedUserId("");
                setSearchResultsModalOpen(true);
                setSearchQuery(e.target.value);
              }}
              className="w-full h-full border text-sm px-3 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-400 border-gray-500 rounded bg-black/20 cursor-pointer hover:bg-black/10"
              type="text"
              placeholder="Email address or name"
            />
            {searchResultsModalOpen &&
              createPortal(
                <div
                  ref={searchResultsRef}
                  style={{
                    left: searchResultsPosition.left,
                    top: searchResultsPosition.top,
                    width: searchInputRef.current?.offsetWidth,
                  }}
                  className="absolute z-50 border border-black/10 rounded bg-[#242528] shadow-md shadow-black/70 max-h-64 overflow-y-auto"
                >
                  {searchResults.length > 0 ? (
                    <>
                      {searchResults.map((result) => (
                        <button
                          key={result._id}
                          type="button"
                          className="w-full text-left my-1 px-4 py-2.5 hover:bg-gray-400/10 cursor-pointer text-gray-300 border-gray-700 last:border-b-0"
                          onClick={() => {
                            setSearchQuery(result.email || result.name);
                            setSelectedUserId(result._id);
                            setSearchResultsModalOpen(false);
                          }}
                        >
                          <div className="flex items-center justify-start gap-2">
                            <div>
                              <Avatar
                                size="8"
                                initials={result.initials}
                                avatarColor={result.avatarColor}
                                avatarURL={result.avatarURL}
                              ></Avatar>
                            </div>
                            <div className="text-sm">
                              {result.FirstName && result.LastName
                                ? result.FirstName + " " + result.LastName
                                : result.email}
                            </div>
                          </div>
                        </button>
                      ))}
                    </>
                  ) : null}
                </div>,
                document.body,
              )}
          </div>
          <div
            ref={searchSharePrivilegeTriggerRef}
            onClick={() => {
              setSearchSharePrivilegeModalOpen((e) => !e);
            }}
            className="flex hover:bg-gray-500/20 cursor-pointer items-center text-sm justify-between gap-2 px-3 py-2.5 rounded border border-gray-600"
          >
            <div>{sharePrivilege}</div>
            <div>
              <svg
                fill="none"
                width={12}
                height={12}
                viewBox="0 0 16 16"
                role="presentation"
                class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbutpp _4t3iutpp"
              >
                <path
                  fill="currentcolor"
                  d="m14.53 6.03-6 6a.75.75 0 0 1-1.004.052l-.056-.052-6-6 1.06-1.06L8 10.44l5.47-5.47z"
                ></path>
              </svg>
            </div>
          </div>
          {searchSharePrivilegeModalOpen &&
            createPortal(
              <div
                ref={linkPrivilegeModalRef}
                style={{
                  left: position2.right,
                  top: position2.top,
                  transform: "translateX(-100%)",
                }}
                className="bg-[#2b2c2f] text-gray-400 absolute z-50 rounded shadow-md shadow-black/70 max-h-58 min-w-[120px] overflow-clip"
              >
                <div className="py-3 my-1 flex flex-col max-w-[288px] max-h-56 bg-[#2b2c2f] overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setSharePrivilege("Member");
                      setSearchSharePrivilegeModalOpen(false);
                    }}
                    className={`relative text-left px-4 py-2.5 text-[15px] ${
                      sharePrivilege === "Member"
                        ? `bg-blue-700/30 text-blue-400  before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-blue-500`
                        : "hover:bg-gray-400/10"
                    }`}
                  >
                    <div>Member</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSharePrivilege("Observer");
                      setSearchSharePrivilegeModalOpen(false);
                    }}
                    className={`relative text-left px-4 py-2.5 text-[15px] ${
                      sharePrivilege === "Observer"
                        ? `bg-blue-700/30 text-blue-400  before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-blue-500`
                        : "hover:bg-gray-400/10"
                    }`}
                  >
                    <div>Observer</div>
                  </button>
                </div>
              </div>,
              document.body,
            )}
          <div>
            <button onClick={HandleShareButton} className="bg-blue-400 hover:cursor-pointer text-black hover:bg-blue-300 text-sm font-medium px-3 h-full rounded disabled:opacity-60 disabled:cursor-not-allowed">
              Share
            </button>
          </div>
        </div>
        <div className="flex gap-2 items-center p-1 justify-between">
          {shareLink == "" ? (
            <div className="flex items-center justify-start gap-2">
              <div className="bg-gray-500/20 rounded p-2">
                <svg
                  fill="none"
                  width={18}
                  height={18}
                  viewBox="0 0 16 16"
                  role="presentation"
                  class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
                >
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="M8.22 2.22a3.932 3.932 0 1 1 5.56 5.56l-2.25 2.25-1.06-1.06 2.25-2.25a2.432 2.432 0 0 0-3.44-3.44L7.03 5.53 5.97 4.47zm3.06 3.56-5.5 5.5-1.06-1.06 5.5-5.5zM2.22 8.22l2.25-2.25 1.06 1.06-2.25 2.25a2.432 2.432 0 0 0 3.44 3.44l2.25-2.25 1.06 1.06-2.25 2.25a3.932 3.932 0 1 1-5.56-5.56"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-300">
                  Share this board with a link
                </div>
                <div
                  onClick={createInviteLink}
                  className="cursor-pointer underline text-xs text-blue-500"
                >
                  Create link
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-start gap-2">
              <div className="bg-gray-500/20 rounded p-2">
                <svg
                  fill="none"
                  width={18}
                  height={18}
                  viewBox="0 0 16 16"
                  role="presentation"
                  class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
                >
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="M8.22 2.22a3.932 3.932 0 1 1 5.56 5.56l-2.25 2.25-1.06-1.06 2.25-2.25a2.432 2.432 0 0 0-3.44-3.44L7.03 5.53 5.97 4.47zm3.06 3.56-5.5 5.5-1.06-1.06 5.5-5.5zM2.22 8.22l2.25-2.25 1.06 1.06-2.25 2.25a2.432 2.432 0 0 0 3.44 3.44l2.25-2.25 1.06 1.06-2.25 2.25a3.932 3.932 0 1 1-5.56-5.56"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-300">
                  Anyone with the link can join as a member
                </div>
                <div className="flex items-center gap-1">
                  <div
                    onClick={handleCopy}
                    className="underline cursor-pointer text-xs text-blue-500"
                  >
                    Copy link
                  </div>
                  <div className="leading-none">·</div>
                  <div
                    onClick={deleteInviteLink}
                    className="underline text-xs cursor-pointer text-blue-500"
                  >
                    Delete link
                  </div>
                </div>
              </div>
            </div>
          )}
          {shareLink != "" && (
            <div>
              <div
                ref={linkPrivilegeTriggerRef}
                onClick={() => {
                  setLinkPrivilegeModalOpen((e) => !e);
                }}
                className={`flex ${linkPrivilegeModalOpen ? "bg-blue-900/70 text-blue-400 hover:bg-blue-700/30 border-blue-400" : "hover:bg-gray-500/20 border-gray-600"} cursor-pointer transition-all duration-100 items-center text-sm justify-between gap-2 px-3 py-1.5 rounded border`}
              >
                <div>Change permissions</div>
                <div>
                  <svg
                    fill="none"
                    width={12}
                    height={12}
                    viewBox="0 0 16 16"
                    role="presentation"
                    class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbutpp _4t3iutpp"
                  >
                    <path
                      fill="currentcolor"
                      d="m14.53 6.03-6 6a.75.75 0 0 1-1.004.052l-.056-.052-6-6 1.06-1.06L8 10.44l5.47-5.47z"
                    ></path>
                  </svg>
                </div>
              </div>
              {linkPrivilegeModalOpen &&
                createPortal(
                  <div
                    ref={linkPrivilegeModalRef}
                    style={{
                      left: position.right,
                      top: position.top,
                      transform: "translateX(-100%)",
                    }}
                    className="bg-[#2b2c2f] text-gray-400 absolute z-50 rounded shadow-md shadow-black/70 max-h-58 overflow-clip"
                  >
                    <div className="py-3 my-1 flex flex-col max-w-[288px] max-h-56 bg-[#2b2c2f] overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => handleSharePrivilegeChange("Member")}
                        className={`relative text-left px-4 py-2.5 text-[15px] ${
                          shareLinkPrivilege === "Member"
                            ? `bg-blue-700/30 text-blue-400  before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-blue-500`
                            : "hover:bg-gray-400/10"
                        }`}
                      >
                        <div>Can join as member </div>
                        <div className="text-xs text-gray-400">
                          Board members can view and edit cards, lists, and some
                          board settings.
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSharePrivilegeChange("Observer")}
                        className={`relative text-left px-4 py-2.5 text-[15px] ${
                          shareLinkPrivilege === "Observer"
                            ? `bg-blue-700/30 text-blue-400  before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-blue-500`
                            : "hover:bg-gray-400/10"
                        }`}
                      >
                        <div>Can join as observer</div>
                        <div className="text-xs text-gray-400">
                          Board observers can view and comment.
                        </div>
                      </button>
                    </div>
                  </div>,
                  document.body,
                )}
            </div>
          )}
        </div>
        <div className="text-sm flex items-center mt-5 gap-5">
          <div
            onClick={() => {
              setSelectHorizontalBar("Board members");
            }}
            className={`${selecthorizontalbar === "Board members" ? "text-blue-400 after:bg-blue-400 after:scale-y-100" : "after:bg-transparent hover:after:bg-gray-700 after:scale-y-50"} relative pb-1 flex items-center gap-1 px-0.5 cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:origin-bottom`}
          >
            Board members{" "}
            <div className="text-center min-w-[28px] px-1 text-xs rounded bg-white text-black">
              {totalBoardUsers}
            </div>
          </div>
          <div
            onClick={() => {
              setSelectHorizontalBar("Join requests");
            }}
            className={`${selecthorizontalbar === "Join requests" ? "text-blue-400 after:bg-blue-400 after:scale-y-100" : "after:bg-transparent hover:after:bg-gray-700 after:scale-y-50"} relative pb-1 px-0.5 cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:origin-bottom`}
          >
            Join requests
          </div>
        </div>
        <hr className="border-gray-700" />
        <div>
          {boardMembers.admin.map((admin) => (
            <SharePageUserProfile
              avatarURL={admin.avatarURL}
              boardId={boardId}
              numberOfAdmins={boardMembers.admin.length}
              userId={admin._id}
              initials={admin.initials}
              avatarColor={admin.avatarColor}
              FirstName={admin.FirstName}
              LastName={admin.LastName}
              username={admin.username}
              privilege="Admin"
            ></SharePageUserProfile>
          ))}
          {boardMembers.member.map((member) => (
            <SharePageUserProfile
              avatarURL={member.avatarURL}
              boardId={boardId}
              userId={member._id}
              initials={member.initials}
              avatarColor={member.avatarColor}
              FirstName={member.FirstName}
              LastName={member.LastName}
              username={member.username}
              privilege="Member"
            ></SharePageUserProfile>
          ))}
          {boardMembers.observer.map((observer) => (
            <SharePageUserProfile
              avatarURL={observer.avatarURL}
              boardId={boardId}
              userId={observer._id}
              initials={observer.initials}
              avatarColor={observer.avatarColor}
              FirstName={observer.FirstName}
              LastName={observer.LastName}
              username={observer.username}
              privilege="Observer"
            ></SharePageUserProfile>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
