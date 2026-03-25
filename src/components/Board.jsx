import { useEffect, useRef, useState } from "react";
import { TaskBoard } from "../components/TaskBoard";
import { BoardMenu } from "./boardMenu";
import ShareModal from "./shareModal";
import axios from "axios";

export default function Board({ boardId }) {
  const [viewSelectbutton, setViewSelectButton] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [shareLinkPrivilege, setShareLinkPrivilege] = useState("Member");
  const [userInfo, setUserInfo] = useState(null);
  const [boardMembers, setBoardMembers] = useState({
    admin: [],
    member: [],
    observer: [],
  });
  const menuTirggerRef = useRef(null);

useEffect(()=>{
  async function getUserInfo(){
    const res = await axios.get("/user/getuserinfo", { withCredentials: true });
    setUserInfo(res.data);
  }
  getUserInfo();
}, []);

  useEffect(() => {

    async function fetchBoardShareLink(){
      try {
        const res = await axios.get(`/user/fetchinvitelink/${boardId}`, {withCredentials:true});
        if(res.data?.inviteLink){
          setShareLink(res.data?.inviteLink.link);
          setShareLinkPrivilege(res.data?.inviteLink.privilege);
        } else {
          setShareLink("");
        }

      } catch (error) {
        console.error("Failed to fetch board share link:", error);
      }

    }

    async function fetchBoardUsers() {
      try {
        const res = await axios.get(
          `/user/boardUsers/${boardId}`,
          { withCredentials: true },
        );

        const admin = Array.isArray(res.data?.admins) ? res.data.admins : [];
        const member = Array.isArray(res.data?.members) ? res.data.members : [];
        const observer = Array.isArray(res.data?.observers)
          ? res.data.observers
          : [];

          setBoardMembers({
            admin,
            member,
            observer,
          });
      } catch (error) {
        console.error("Failed to fetch board users:", error);
          setBoardMembers({
            admin: [],
            member: [],
            observer: [],
          });
      }
    }

    fetchBoardUsers();
    fetchBoardShareLink();
  }, [shareModalOpen]);

  return (
    <div className="h-full w-full rounded-2xl bg-gradient-to-br from-violet-500/40 to-pink-400/40 flex flex-col border-1 border-gray-700">
      <div className="bg-black/40 rounded-t-2xl pl-6 pr-4 py-3.5 text-gray-100 w-full flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <div className="font-bold">My Trello board</div>
          <div
            onClick={() => {
              setViewSelectButton((e) => !e);
            }}
            className={`px-1.5 ${
              viewSelectbutton
                ? "bg-gray-200 hover:bg-white text-black"
                : "hover:bg-gray-400/40"
            }  py-1.5 rounded transition-all duration-100 cursor-pointer`}
          >
            <button className="flex gap-1.5 items-center justify-center cursor-pointer">
              <div>
                <svg
                  width="20"
                  height="20"
                  role="presentation"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div>
                <svg
                  width="16"
                  height="16"
                  role="presentation"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div className="text-gray-300 flex items-center gap-2 justify-center">
          <div onClick={()=>{setShareModalOpen(true)}} className="flex text-sm items-center justify-center flex-1 gap-2 hover:bg-white bg-gray-200 text-black rounded-sm cursor-pointer px-3 py-1.5">
            <div>
              <svg
                fill="none"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                role="presentation"
                class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
              >
                <path
                  fill="currentcolor"
                  fill-rule="evenodd"
                  d="M5 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M1 4a4 4 0 1 1 8 0 4 4 0 0 1-8 0m11.25 4.75V11h1.5V8.75H16v-1.5h-2.25V5h-1.5v2.25H10v1.5zm-8.5 1.75a2.25 2.25 0 0 0-2.25 2.25V15H0v-2.25A3.75 3.75 0 0 1 3.75 9h2.5A3.75 3.75 0 0 1 10 12.75V15H8.5v-2.25a2.25 2.25 0 0 0-2.25-2.25z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>Share</div>
          </div>
          {shareModalOpen && <ShareModal shareLinkPrivilege={shareLinkPrivilege} setShareLinkPrivilege={setShareLinkPrivilege} shareLink={shareLink} setShareLink={setShareLink} userInfo={userInfo} boardMembers={boardMembers} setBoardMembers={setBoardMembers} boardId={boardId} shareModalOpen={shareModalOpen}
        modalClose={() => setShareModalOpen(false)}></ShareModal>}
          <div
            ref={menuTirggerRef}
            onClick={() => {
              setOpenMenu((e) => !e);
            }}
            className={`p-2 rounded ${openMenu ? "bg-gray-200 text-black hover:bg-gray-300" : "hover:bg-gray-300/30"}  transition-all duration-100 cursor-pointer`}
          >
            <svg
              fill="none"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              role="presentation"
              class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
            >
              <path
                fill="currentcolor"
                fill-rule="evenodd"
                d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          {openMenu && (
            <BoardMenu
              setShareModalOpen={setShareModalOpen}
              triggerRef={menuTirggerRef}
              isOpen={openMenu}
              onClose={() => setOpenMenu(false)}
            ></BoardMenu>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-0 h-full">
        <TaskBoard boardId={boardId}></TaskBoard>
      </div>
    </div>
  );
}
