import { usePortalPosition } from "@/Hooks/usePortalPosition";
import axios from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
axios.defaults.withCredentials = true;

export function AddChecklistModal(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Checklist");
  const [copyFrom, setCopyFrom] = useState("(none)");
  const { isOpen, onClose, triggerRef } = props;
  const position = usePortalPosition(triggerRef, isOpen);
  const [shouldRender, setShouldRender] = useState(false);

  async function addChecklist() {
    await axios.post("http://localhost:3000/user/todos/createchecklist", {
      title: title,
      copyFrom: copyFrom,
      todoId: props.id,
    });
  }
  useEffect(() => {
    setTitle("Checklist")
  })

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
  }, [isOpen]);
  if (!shouldRender) return null;
  return createPortal(
    <div
      style={{
        top: position.top,
        left: position.left,
        visibility: isOpen ? "visible" : "hidden",
      }}
      onClick={(e) => e.stopPropagation()}
      className="w-[310px] date-modal-container fixed z-50 bg-[#282e33] text-sm border-[#39424a] rounded-lg border-1 text-[#adb8c5]"
    >
      <div className="px-3 py-3">
        <div className="flex justify-between items-center">
          <div className="relative left-0 right-0 mx-auto font-semibold">
            Add checklist
          </div>
          <div
            className="cursor-pointer hover:bg-[#3c464e] absolute right-3 rounded-md"
            onClick={() => props.setAddChecklist(false)}
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <div className="mt-5">
          <div className="text-[13px]">Title</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#22272b] w-full p-2 px-3 rounded border my-2 border-[#738496] text-[#8c9bab] focus:outline-[#85b8ff] focus:outline-2 focus:border-[#85b8ff] transition-all duration-50 font-medium"
          />
        </div>
        <div className="mt-1">
          <div className="text-[13px] font-extrabold">Copy items from...</div>
          <div
            onClick={() => {
              setOpen((e) => !e);
            }}
            className={`w-full p-2 relative cursor-pointer my-1 border-[#738496] border outline-[#85b8ff] hover:bg-[#282e33] transition-all duration-200 rounded ${
              open ? "outline-2 bg-[#282e33]" : ""
            } bg-[#22272b]`}
          >
            <div className="flex justify-between items-center w-full">
              <div>{copyFrom}</div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="presentation"
                >
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="M8.292 10.293a1.01 1.01 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0"
                  ></path>
                </svg>
              </div>
            </div>
            {open && (
              <div
                className="absolute border max-h-[295px] overflow-y-scroll scrollbar 
                 scrollbar-thumb-rounded-full scrollbar-w-2 scrollbar-thumb-[#9f9f9f] scrollbar-hover:scrollbar-thumb-[#d1d1d1] scrollbar-track-[#2c2c2c] mt-3.5 border-[#39424a] rounded-sm py-1.5 bg-[#282e33] flex flex-col left-0 right-0"
              >
                <div
                  className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                    copyFrom == "(none)"
                      ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                      : "border-[#282e33] hover:bg-[#313940]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                    setCopyFrom("(none)");
                  }}
                >
                  None
                </div>
                {Object.keys(props.allChecklists).map(
                  (key) =>
                    props.allChecklists[key].checklist.length != 0 && (
                      <div>
                        <div>{props.allChecklists[key].title}</div>
                        <div>
                          {props.allChecklists[key].checklist.map((item) => (
                            <div
                              className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                                copyFrom == item._id
                                  ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                                  : "border-[#282e33] hover:bg-[#313940]"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                                setCopyFrom(item._id);
                                setTitle(item.title);
                              }}
                              key={item._id}
                            >
                              {item.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            addChecklist();
            props.setAddChecklist(false);
          }}
          className="bg-blue-400 text-sm font-semibold w-fit mt-3 px-6 cursor-pointer hover:bg-[#85b8ff] py-1.5 rounded text-[#252327]"
        >
          Add
        </div>
      </div>
    </div>,
    document.body
  );
}
