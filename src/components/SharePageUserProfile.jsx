import { useEffect, useRef, useState } from "react";
import Avatar from "./avatar";
import { createPortal } from "react-dom";
import { usePortalPosition } from "@/Hooks/usePortalPosition";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function SharePageUserProfile(props) {
  const {
    FirstName,
    numberOfAdmins,
    LastName,
    username,
    avatarURL,
    initials,
    avatarColor,
  } = props;
  const [privilege, setPrivilege] = useState(props.privilege);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const leaveModalRef = useRef(null);
  const [openLeaveBoardModal, setOpenLeaveBoardModal] = useState(false);
  const position = usePortalPosition(triggerRef, open);
  const position2 = usePortalPosition(triggerRef, openLeaveBoardModal);
  const [loader, setLoader] = useState(false);
  const [LeaveLoader, setLeaveLoader] = useState(false);
  axios.defaults.withCredentials = true;

  const handleLeaveBoard = async ()=>{
    setLeaveLoader(true);
    try {
      await axios.post("http://localhost:3000/user/leaveboard", {
        boardId: props.boardId,
        targetUserId: props.userId,
      });      
    } catch (error) {
      console.error("Failed to leave board:", error);
    }
    setLeaveLoader(false);
  }
  const handlePrivilegeChange = async (nextPrivilege) => {
    if (nextPrivilege === privilege || loader) {
      setOpen(false);
      return;
    }

    const previousPrivilege = privilege;
    setPrivilege(nextPrivilege);
    setOpen(false);
    setLoader(true);

    try {
      await axios.post("http://localhost:3000/user/updateuserboardprivilege", {
        boardId: props.boardId,
        newPrivilege: nextPrivilege,
        targetUserId: props.userId,
      });
    } catch (error) {
      setPrivilege(previousPrivilege);
      console.error("Failed to update privilege:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      const target = event.target;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (!openLeaveBoardModal) return;

    const handleLeaveModalClickOutside = (event) => {
      const target = event.target;
      if (leaveModalRef.current?.contains(target)) {
        return;
      }
      setOpenLeaveBoardModal(false);
    };

    document.addEventListener("mousedown", handleLeaveModalClickOutside);
    document.addEventListener("touchstart", handleLeaveModalClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleLeaveModalClickOutside);
      document.removeEventListener("touchstart", handleLeaveModalClickOutside);
    };
  }, [openLeaveBoardModal]);

  useEffect(() => {
    if (!openLeaveBoardModal) return;

    const handleLeaveModalEscape = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        setOpenLeaveBoardModal(false);
      }
    };

    document.addEventListener("keydown", handleLeaveModalEscape, true);

    return () => {
      document.removeEventListener("keydown", handleLeaveModalEscape, true);
    };
  }, [openLeaveBoardModal]);

  const isRoleLocked = privilege === "Member" || privilege === "Observer";

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape, true);

    return () => {
      document.removeEventListener("keydown", handleEscape, true);
    };
  }, [open]);

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center justify-center gap-2">
        <div>
          <Avatar
            size="8"
            initials={initials}
            avatarColor={avatarColor}
            avatarURL={avatarURL}
          ></Avatar>
        </div>
        <div>
          <div className="text-sm">{FirstName + " " + LastName}</div>
          <div className="flex items-center text-xs gap-1">
            <div>{username}</div>
            <div className="leading-none font-extrabold">·</div>
            <div>Workspace admin</div>
          </div>
        </div>
      </div>
      <div>
        <div
          ref={triggerRef}
          onClick={() => setOpen(!open)}
          className={`flex ${open ? "bg-blue-900/70 text-blue-400 hover:bg-blue-700/30 border-blue-400" : "hover:bg-gray-500/20 border-gray-600"} cursor-pointer transition-all duration-100 items-center text-sm justify-between gap-2 px-3 py-1.5 rounded border`}
        >
          <div>{privilege}</div>
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
        {open &&
          createPortal(
            <div
              ref={menuRef}
              style={{
                left: position.right,
                top: position.top,
                transform: "translateX(-100%)",
              }}
              className="bg-[#2b2c2f] text-gray-400 absolute z-50 rounded shadow-md shadow-black/70 max-h-58 overflow-clip"
            >
              <div className="py-3 my-1 flex flex-col max-h-56 bg-[#2b2c2f] w-full overflow-y-auto">
                <button
                  disabled={isRoleLocked}
                  type="button"
                  onClick={() => handlePrivilegeChange("Admin")}
                  className={`relative text-left px-4 py-2.5 text-[15px] ${
                    isRoleLocked
                      ? "cursor-not-allowed opacity-60"
                      : privilege === "Admin"
                        ? `bg-blue-700/30 text-blue-400  before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-blue-500`
                        : "hover:bg-gray-400/10"
                  }`}
                >
                  <div>Admin </div>
                </button>
                <button
                  type="button"
                  disabled={isRoleLocked}
                  onClick={() => handlePrivilegeChange("Member")}
                  className={`relative text-left px-4 py-2.5 text-[15px] ${
                    isRoleLocked
                      ? "cursor-not-allowed opacity-60"
                      : privilege === "Member"
                        ? `bg-blue-700/30 text-blue-400  before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-blue-500`
                        : "hover:bg-gray-400/10"
                  }`}
                >
                  <div>Member</div>
                </button>
                <button
                  disabled={isRoleLocked}
                  type="button"
                  onClick={() => handlePrivilegeChange("Observer")}
                  className={`relative text-left px-4 py-2.5 text-[15px] ${
                    isRoleLocked
                      ? "cursor-not-allowed opacity-60"
                      : privilege === "Observer"
                        ? `bg-blue-700/30 text-blue-400  before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-blue-500`
                        : "hover:bg-gray-400/10"
                  }`}
                >
                  <div>
                    Observer
                    <span className="relative ml-2 inline-flex items-center justify-center rounded font-semibold">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded"
                        style={{
                          backgroundImage:
                            "linear-gradient(79.47deg, #8a4fff 25.62%, #0077ff 99.57%)",
                          padding: "1px",
                          WebkitMask:
                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        }}
                      />
                      <span
                        className="relative inline-block px-[4px] py-[2px] text-[11px] font-bold"
                        style={{
                          backgroundImage:
                            "linear-gradient(79.47deg, #8a4fff 25.62%, #0077ff 99.57%)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        PREMIUM
                      </span>
                    </span>
                  </div>
                </button>
                {(isRoleLocked || numberOfAdmins > 1) && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpenLeaveBoardModal(true);
                      setOpen(false);
                    }}
                    className={`relative cursor-pointer text-left px-4 py-2.5 text-[15px] hover:bg-gray-400/10`}
                  >
                    <div>Leave board</div>
                  </button>
                )}
              </div>
            </div>,
            document.body,
          )}
          {openLeaveBoardModal &&
                createPortal(
                  <div
                    ref={leaveModalRef}
                    style={{ top: position2.top, left: position2.left }}
                    className="w-[310px] flex flex-col fixed z-50 bg-[#282e33] text-[14px] rounded-lg border border-[#39424a] text-[#adb8c5]"
                  >
                    <div className=" p-3">
                      <div className="flex justify-between items-center">
                        <div className="relative left-0 right-0 mx-auto font-semibold">
                          Leave board
                        </div>
                        <div
                          className="cursor-pointer hover:bg-[#3c464e] absolute right-3 rounded-md"
                          onClick={() => {
                            setOpenLeaveBoardModal(false);
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="p-1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="mt-3">You will be removed from all cards on this board.</div>
                    <div>
                      <button
                      onClick={handleLeaveBoard}
                        className="text-black mt-2 cursor-pointer hover:bg-red-300 transition-all duration-100 bg-red-400 font-semibold rounded text-center w-full py-1.5"
                        type="button"
                      >
                        Leave
                      </button>
                    </div>
                    </div>
                  </div>,
                  document.body,
                )}
      </div>
    </div>
  );
}
