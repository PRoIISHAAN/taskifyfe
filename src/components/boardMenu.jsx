import { usePortalPosition } from "@/Hooks/usePortalPosition";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

export function BoardMenu(props) {
  const { triggerRef, isOpen, onClose, setShareModalOpen } = props;
  const modalRef = useRef(null);
  const position = usePortalPosition(triggerRef, isOpen);
  const [workspaceVisibility, setWorkspaceVisibility] = useState("Workspace");
  const [whichMenu, setWhichMenu] = useState("Menu");
  const [watch, setWatch] = useState(false);
  const [collapseAllLists, setCollapseAllLists] = useState(false);
  const [starBoard, setStarBoard] = useState(false);
  return createPortal(
    <div
      ref={modalRef}
      style={{ top: position.top, left: position.left - 314 }}
      className="w-[338px] flex pb-3 flex-col fixed z-50 bg-[#282e33] text-[14px] rounded-lg border border-[#39424a]"
    >
      <div className="px-3 py-1.5 text-[#adb8c5]">
        <div className="flex justify-between items-center">
          {whichMenu !== "Menu" ? (
            <div className="cursor-pointer hover:bg-[#3c464e] absolute left-3 rounded-md">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="p-1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.29289 11.2929L14.364 4.22185C14.7545 3.83132 15.3876 3.83132 15.7782 4.22185C16.1687 4.61237 16.1687 5.24554 15.7782 5.63606L9.41421 12L15.7782 18.364C16.1687 18.7545 16.1687 19.3877 15.7782 19.7782C15.3877 20.1687 14.7545 20.1687 14.364 19.7782L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          ) : null}
          <div className="relative left-0 right-0 mx-auto font-semibold">
            {whichMenu}
          </div>
          <div className="cursor-pointer hover:bg-[#3c464e] absolute right-3 rounded-md">
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
        <div className="text-gray-300 flex items-center gap-2 justify-between">
          <div onClick={()=>{setShareModalOpen(true);onClose()}} className="flex text-[15px] items-center justify-start flex-1 gap-3 hover:bg-[#3c464e] rounded-md cursor-pointer px-4 py-2 mt-3">
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
          <div className="align-middle text-center w-8 h-full">
            <div className="rounded-full m-1 text-white font-bold align-middle text-center bg-purple-500">
              I
            </div>
          </div>
        </div>
        <hr className="my-2 border-gray-700" />
        <div className="flex flex-col gap-1 text-[15px]">
            <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
          <div>
            <svg
              width={16}
              height={16}
              fill="none"
              viewBox="0 0 16 16"
              role="presentation"
              class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
            >
              <path
                fill="currentcolor"
                fill-rule="evenodd"
                d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.25.25H6.5v-1.5H8a.75.75 0 0 1 .75.75v5h-1.5z"
                clip-rule="evenodd"
              ></path>
              <path
                fill="currentcolor"
                d="M9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
              ></path>
            </svg>
          </div>
          <div>
            <div className="text-[15px]">About this board</div>
            <div className="text-xs text-[#adb8c5]">
              Add a description to your board
            </div>
          </div>
        </div>
        <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
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
                d="M9 4.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0M11 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7M3 5.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0M4 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M2.625 9A2.625 2.625 0 0 0 0 11.625V13h1.5v-1.375c0-.621.504-1.125 1.125-1.125H5V9zM6 12.5A3.5 3.5 0 0 1 9.5 9h3a3.5 3.5 0 0 1 3.5 3.5V14h-1.5v-1.5a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2V14H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <div>Visibility: {workspaceVisibility}</div>
          </div>
        </div>
        <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
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
                d="M12 2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2.5 1a2.5 2.5 0 1 1 .73 1.765L6.212 7.567a2.5 2.5 0 0 1 0 .866l4.016 2.302a2.5 2.5 0 1 1-.692 1.332L5.521 9.766a2.5 2.5 0 1 1 0-3.53l4.016-2.302A2.5 2.5 0 0 1 9.5 3.5M3.75 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2M12 11.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <div>Print, export, and share</div>
          </div>
        </div>
        <div onClick={()=>{setStarBoard(e=>!e)}} className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
          <div>
            {starBoard?(<svg fill="none" width={16} color="#fbc828" height={16} viewBox="0 0 16 16" role="presentation" class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"><path fill="currentcolor" fill-rule="evenodd" d="M8 0a.75.75 0 0 1 .7.48l1.705 4.434 4.403.338a.75.75 0 0 1 .422 1.324l-3.38 2.818 1.25 4.662a.75.75 0 0 1-1.148.813L8 12.159l-3.95 2.71a.75.75 0 0 1-1.15-.813l1.251-4.662L.77 6.576a.75.75 0 0 1 .422-1.324l4.403-.338L7.3.48A.75.75 0 0 1 8 0m0 2.84L6.655 6.335l-3.506.27 2.7 2.25-.973 3.627L8 10.341l3.124 2.142-.973-3.627 2.7-2.25-3.506-.27z" clip-rule="evenodd"></path><path fill="currentcolor" d="M6.655 6.336 8 2.84l1.345 3.497 3.506.27-2.7 2.25.973 3.627L8 10.341l-3.124 2.142.973-3.627-2.7-2.25z"></path></svg>):(<svg
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
                d="M8 0a.75.75 0 0 1 .7.48l1.705 4.434 4.403.338a.75.75 0 0 1 .422 1.324l-3.38 2.818 1.25 4.662a.75.75 0 0 1-1.148.813L8 12.159l-3.95 2.71a.75.75 0 0 1-1.15-.813l1.251-4.662L.77 6.576a.75.75 0 0 1 .422-1.324l4.403-.338L7.3.48A.75.75 0 0 1 8 0m0 2.84L6.655 6.335l-3.506.27 2.7 2.25-.973 3.627L8 10.341l3.124 2.142-.973-3.627 2.7-2.25-3.506-.27z"
                clip-rule="evenodd"
              ></path>
            </svg>)}
          </div>
          <div>
            <div>{starBoard ? "Unstar" : "Star"}</div>
          </div>
        </div>
        </div>
        <hr className="my-2 border-gray-700" />
        <div className="flex flex-col gap-1 text-[15px]">
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
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
                  d="M6.058.462A.75.75 0 0 1 6.75 0h2.5a.75.75 0 0 1 .692.462l1.026 2.462 2.578-.374a.75.75 0 0 1 .757.367l1.25 2.166a.75.75 0 0 1-.049.824L13.937 8l1.567 2.093c.18.24.2.565.05.825l-1.25 2.165a.75.75 0 0 1-.758.367l-2.578-.374-1.026 2.463A.75.75 0 0 1 9.25 16h-2.5a.75.75 0 0 1-.692-.461l-1.026-2.463-2.578.374a.75.75 0 0 1-.757-.367l-1.25-2.165a.75.75 0 0 1 .049-.825L2.063 8 .496 5.907a.75.75 0 0 1-.05-.824l1.25-2.166a.75.75 0 0 1 .758-.367l2.578.374zM7.25 1.5l-.871 2.09c-.242.58-.845.923-1.467.833l-2.17-.315-.749 1.296L3.32 7.176c.366.488.366 1.16 0 1.648l-1.327 1.772.749 1.296 2.17-.315a1.375 1.375 0 0 1 1.467.832L7.25 14.5h1.5l.871-2.09c.242-.58.845-.923 1.467-.833l2.17.315.749-1.296-1.327-1.772a1.375 1.375 0 0 1 0-1.648l1.327-1.772-.749-1.296-2.17.315A1.375 1.375 0 0 1 9.62 3.59L8.75 1.5zm.75 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div>Settings</div>
            </div>
          </div>
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
            <div></div>
            <div>
              <div>Change background</div>
            </div>
          </div>
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
            <div>
              <svg
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                role="presentation"
                class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
              >
                <path
                  fill="currentcolor"
                  fill-rule="evenodd"
                  d="M6 3.5H0V2h6zM0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div>Custom Fields</div>
            </div>
          </div>
        </div>
        <hr className="my-2 border-gray-700" />
        <div className="flex flex-col gap-1 text-[15px]">
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
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
                  d="M11 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
                ></path>
                <path
                  fill="currentcolor"
                  fill-rule="evenodd"
                  d="M9.286 1a3.25 3.25 0 0 0-2.299.952L1.604 7.336a2 2 0 0 0 0 2.828l4.232 4.232a2 2 0 0 0 2.828 0l5.384-5.383A3.25 3.25 0 0 0 15 6.714V3a2 2 0 0 0-2-2zM8.048 3.013A1.75 1.75 0 0 1 9.286 2.5H13a.5.5 0 0 1 .5.5v3.714c0 .465-.184.91-.513 1.238l-5.383 5.384a.5.5 0 0 1-.708 0L2.664 9.104a.5.5 0 0 1 0-.708z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div>Labels</div>
            </div>
          </div>
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
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
                  d="M8 1.5a6.5 6.5 0 0 0-1.998 12.687L6 14c0-1.102.223-2.153.627-3.11a8 8 0 0 1 7.56-4.888A6.5 6.5 0 0 0 8 1.5m5.413 6.026a6.5 6.5 0 0 0-5.404 3.947 6.5 6.5 0 0 0-.483 1.94zM0 8a8 8 0 0 1 15.899-1.277.75.75 0 0 1-.21.65l-8.317 8.315a.75.75 0 0 1-.649.21A8 8 0 0 1 0 8"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div>Stickers</div>
            </div>
          </div>
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
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
                  d="M12.25 2.25V0h1.5v2.25H16v1.5h-2.25V6h-1.5V3.75H10v-1.5zM3 2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8.5H15V13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h4.5v1.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div>Make template</div>
            </div>
          </div>
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
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
                  d="M1.5 8A6.5 6.5 0 1 0 8 1.5a6.36 6.36 0 0 0-4.651 2.005l1.298.26a.75.75 0 0 1-.09 1.483l-3.25.25A.75.75 0 0 1 .5 4.75V1.5l.013-.137a.75.75 0 0 1 1.456-.079l.34 1.138A7.86 7.86 0 0 1 8 0a8 8 0 1 1-8 8zm7.25-4.25v4.389l2.219 1.775-.938 1.172-2.5-2A.75.75 0 0 1 7.25 8.5V3.75z"
                ></path>
              </svg>
            </div>
            <div>
              <div>Activity</div>
            </div>
          </div>
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
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
                  d="M1 1h14v5h-1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1zm2.5 5v7a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V6zm10-1.5h-11v-2h11zm-3 4.5h-5V7.5h5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div>Archived items</div>
            </div>
          </div>
        </div>
        <hr className="my-2 border-gray-700" />
        <div className="flex flex-col gap-1 text-[15px]">
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
            <div>
              {watch ? (
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
                    d="M5.75 8a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0"
                  ></path>
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="M8 2C4.433 2 1.319 4.232.167 7.38c-.146.4-.146.84 0 1.24C1.32 11.768 4.433 14 8 14c3.566 0 6.681-2.232 7.833-5.38.146-.4.146-.84 0-1.24C14.68 4.232 11.566 2 8 2m0 2.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 16 16"
                  width={16}
                  height={16}
                  role="presentation"
                  class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
                >
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="M8 3.5c-2.943 0-5.49 1.845-6.424 4.396a.3.3 0 0 0 0 .208C2.509 10.655 5.057 12.5 8 12.5s5.49-1.845 6.424-4.396a.3.3 0 0 0 0-.208C13.491 5.345 10.943 3.5 8 3.5M.167 7.38C1.32 4.232 4.433 2 8 2c3.566 0 6.681 2.232 7.833 5.38.146.4.146.84 0 1.24C14.68 11.768 11.566 14 8 14 4.433 14 1.319 11.768.167 8.62a1.8 1.8 0 0 1 0-1.24M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
            <div>
              <div>Watch</div>
            </div>
          </div>
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
            <div>
              {collapseAllLists ? (
                <svg
                  fill="none"
                  viewBox="0 0 16 16"
                  width={16}
                  height={16}
                  role="presentation"
                  class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
                >
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="m.22 7.47 3.5-3.5 1.06 1.06-2.22 2.22H7v1.5H2.56l2.22 2.22-1.06 1.06-3.5-3.5a.75.75 0 0 1 0-1.06m13.22-.22-2.22-2.22 1.06-1.06 3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5-1.06-1.06 2.22-2.22H9v-1.5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 16 16"
                  width={16}
                  height={16}
                  role="presentation"
                  class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
                >
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="M6.25 8.75H0v-1.5h6.25zm3.5-1.5H16v1.5H9.75z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="M5.19 8 2.22 5.03l1.06-1.06 3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5-1.06-1.06zm4.03-.53 3.5-3.5 1.06 1.06L10.81 8l2.97 2.97-1.06 1.06-3.5-3.5a.75.75 0 0 1 0-1.06"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
            <div>
              <div>Collapse all lists</div>
            </div>
          </div>
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
            <div>
              <svg
                fill="none"
                viewBox="0 0 16 16"
                width={16}
                height={16}
                role="presentation"
                class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
              >
                <path
                  fill="currentcolor"
                  fill-rule="evenodd"
                  d="M1 3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM16 6v6.75A3.25 3.25 0 0 1 12.75 16H6v-1.5h6.75a1.75 1.75 0 0 0 1.75-1.75V6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div>Copy board</div>
            </div>
          </div>
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
            <div>
              <svg
                fill="none"
                viewBox="0 0 16 16"
                width={16}
                height={16}
                role="presentation"
                class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
              >
                <path
                  fill="currentcolor"
                  fill-rule="evenodd"
                  d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v.529L8 8.128l6.5-3.6V4a.5.5 0 0 0-.5-.5zm12.5 2.743L8.363 9.641a.75.75 0 0 1-.726 0L1.5 6.243V12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div>Email-to-board</div>
            </div>
          </div>
          <div className="flex px-3 py-1.5 text-gray-300 items-center hover:bg-[#3c464e] rounded-md cursor-pointer justify-start gap-3">
            <div>
              <svg
                fill="none"
                viewBox="0 0 16 16"
                width={16}
                height={16}
                role="presentation"
                class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
              >
                <path
                  fill="currentcolor"
                  fill-rule="evenodd"
                  d="M15 8.75H1v-1.5h14z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div>Close board</div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
