import { Draggable } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import { Loader } from "./loader";
import axios from "axios";
import { usePortalPosition } from "@/Hooks/usePortalPosition";
import { createPortal } from "react-dom";
axios.defaults.withCredentials = true;

function Modal({ isOpen, onClose, modalRef, title, item,todoId,index,attachments,setAttachments }) {
  const [Loclink, setLocLink] = useState(item.link);
  const [loctitle, setLocTitle] = useState(item.title||title);
  const [modal, setmodal] = useState("open");
  const [shouldRender, setShouldRender] = useState(false);
  const position = usePortalPosition(modalRef, isOpen);
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
  }, [isOpen]);
  const saveOnClick = async () => {
    await axios.put("http://localhost:3000/user/todos/addAttachment", {
      type: "link",
      todoId: todoId,
      index: index,
      link: Loclink,
      title: loctitle
    })
    const tempAtt = { ...attachments };
    tempAtt.links.splice(index, 1, { link: Loclink, title: loctitle });
    setAttachments(tempAtt);
    onClose();
  }
const DeleteOnClick = async () => {
    await axios.delete(`http://localhost:3000/user/todos/addAttachment/link/${todoId}/${index}`);
    const tempAtt = { ...attachments };
    tempAtt.links.splice(index, 1);
    setAttachments(tempAtt);
    onClose();
  }
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

   if (!shouldRender) return null;
  return createPortal(
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        style={{
          visibility: isOpen ? "visible" : "hidden",
        }}
      />
      <div
        className="fixed z-50 bg-[#282e33] text-sm border-[#39424a] rounded-lg border-1 text-[#adb8c5] shadow-lg"
        style={{
          top: position.top,
          left: position.left,
          visibility: isOpen ? "visible" : "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {modal == "open" ? (
          <div className="w-[250px] py-3">
            <div
              onClick={() => setmodal("edit")}
              className="hover:bg-[#313940] cursor-pointer text-sm px-3 py-1.5"
            >
              Edit
            </div>
            <div className="hover:bg-[#313940] cursor-pointer text-sm px-3 py-1.5">
              Comment
            </div>
            <div onClick={DeleteOnClick} className="hover:bg-[#313940] cursor-pointer text-[#fd9891] text-sm px-3 py-1.5">
              Remove
            </div>
          </div>
        ) : modal=="edit"?
        <div className="py-3 w-[310px]">
          <div className="flex justify-center items-center">
            <div
              className="cursor-pointer hover:bg-[#3c464e] absolute left-3 rounded-md"
              onClick={onClose}
            >
              <svg
                width="24"
                height="24"
                role="presentation"
                focusable="false"
                className="p-1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="relative left-0 right-0 mx-auto font-semibold">
              Edit attachment
            </div>
            <div
              className="cursor-pointer hover:bg-[#3c464e] absolute right-3 rounded-md"
              onClick={onClose}
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
          <div className="mt-5 mx-3">
            <div className="cursor-default text-[14px] mt-2 mb-0.5 font-bold">
              Search or paste a link
            </div>
            <input
              value={Loclink}
              onChange={(e) => setLocLink(e.target.value)}
              placeholder="Find recent links or paste a new link"
              className="bg-[#22272b] w-full p-2 px-2 rounded border mb-2 border-[#738496] text-[#8c9bab] focus:outline-[#85b8ff] focus:outline-2 placeholder:text-[#8795a5] placeholder:font-light placeholder:text-[13px] focus:border-[#85b8ff] transition-all duration-50 font-medium"
            />
            <div className="cursor-default text-[14px] mt-2 mb-0.5 font-bold">
              Display text (optional)
            </div>
            <input
              value={loctitle}
              onChange={(e) => setLocTitle(e.target.value)}
              placeholder="Text to display"
              className="bg-[#22272b] w-full p-2 px-2 rounded border mb-1 border-[#738496] text-[#8c9bab] focus:outline-[#85b8ff] focus:outline-2 placeholder:text-[#8795a5] placeholder:font-light placeholder:text-[13px] focus:border-[#85b8ff] transition-all duration-50 font-medium"
            />
            <div className="text-[11px] font-light text-[#8795a5]">
              Give this link a title or description
            </div>
          </div>
          <div className="flex mx-3 gap-2 justify-end">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className=" text-sm font-semibold w-fit mt-3 px-4 cursor-pointer hover:bg-[#313940] py-1.5 rounded"
          >
            Cancel
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              saveOnClick();
            }}
            className="bg-blue-400 text-sm font-semibold w-fit mt-3 px-4 cursor-pointer hover:bg-[#85b8ff] py-1.5 rounded text-[#252327]"
          >
            Save
          </div>
          </div>
        </div>
      
      :null}
        
      </div>
    </>,
    document.body
  );
}

export default function LinkItem({ item, index, length,todoId,attachments,setAttachments }) {
  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const getDomainFromUrl = (url) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return (
        domain.split(".")[0].charAt(0).toUpperCase() +
        domain.split(".")[0].slice(1)
      );
    } catch {
      return url;
    }
  };

  const fetchWebsiteTitle = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        `http://localhost:3000/user/todos/get-metadata?url=${encodeURIComponent(
          item.link
        )}`
      );
      setTitle(res.data.title);
    } catch (error) {
      setTitle(getDomainFromUrl(item.link));
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (!item.title) {
      fetchWebsiteTitle();
    }
  }, []);
  return (
    <Draggable draggableId={item._id} key={item._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <a
            target="_blank"
            href={item.link}
            onClick={(e) => {
              e.focus();
            }}
            className="flex justify-between focus:outline-2 outline-white w-full p-2 cursor-pointer"
          >
            {loading ? (
              <Loader></Loader>
            ) : (
              <div className="flex items-center gap-2">
                <div>
                  <img
                    className="w-4 h-4"
                    src={`https://www.google.com/s2/favicons?domain=${item.link}&sz=64`}
                    alt=""
                  />
                </div>
                <div className="text-sm leading-none text-blue-500 underline">
                  {item.title ? item.title : title}
                </div>
              </div>
            )}
            <div
              ref={modalRef}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault()
                setModalOpen((i) => !i);
              }}
              className="p-1 hover:bg-gray-400/30 bg-gray-500/30 rounded"
            >
              <svg
                width="16"
                height="16"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              modalRef={modalRef}
              item={item}
              title={title}
              todoId={todoId}
              index={index}
              attachments={attachments}
              setAttachments={setAttachments}
            ></Modal>
          </a>
          {index < length - 1 && <hr className="border-[#333b43]" />}
        </div>
      )}
    </Draggable>
  );
}
