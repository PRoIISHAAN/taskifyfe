import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { EditLabel } from "./editLabel";
import LABEL_COLORS from "@/miscelnaeous/config";
import { AddNewLabel } from "./createNewLabelModal";
import { createPortal } from "react-dom";
import { usePortalPosition } from "@/hooks/usePortalPosition";
axios.defaults.withCredentials = true;

export function AddLabelModal(props) {
  const { isOpen, onClose, triggerRef } = props;
  const [labels, setLabels] = useState([""]);
  const position = usePortalPosition(triggerRef, isOpen);
  const [editLabel, setEditLabel] = useState(false);
  const [addLabel, setAddLabel] = useState(false);
  const isInitialMount = useRef(true);
  const [shouldRender, setShouldRender] = useState(false);
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

  async function getlabels() {
    const res = await axios.get(`http://localhost:3000/user/todos/getlabels`);
    setLabels(res.data.userLabels);
  }

  function checklabel(item) {
    console.log(props.labelsArr.some((element) => element._id === item._id));
    return props.labelsArr.some((element) => element._id === item._id);
  }
  useEffect(() => {
    getlabels();
  }, []);
  async function setlabels() {
    const res = await axios.put(
      `http://localhost:3000/user/todos/modifylabelslist`,
      {
        labels: props.labelsArr,
        todoId: props.id,
      }
    );
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setlabels();
  }, [props.labelsArr]);
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
      {!editLabel && !addLabel && (
        <div className="p-3">
          <div className="flex justify-between items-center">
            <div className="relative left-0 right-0 mx-auto font-semibold">
              Labels
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <div>
            <input
              className="bg-[#22272b] w-full p-2 px-3 rounded border my-2 border-[#738496] text-[#8c9bab] focus:outline-[#85b8ff] focus:outline-2 focus:border-[#85b8ff] transition-all duration-50 font-light"
              placeholder="Search labels..."
              type="text"
              name=""
              id=""
            />
          </div>
          <div>
            <div className="text-xs my-1 mb-2">Labels</div>
            <div>
              {labels.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-1 my-1 items-center h-full justify-between"
                >
                  <div className="mr-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklabel(item)}
                        onChange={() => {
                          if (checklabel(item)) {
                            props.setLabelsArr(
                              props.labelsArr.filter(
                                (element) => element._id !== item._id
                              )
                            );
                          } else {
                            props.setLabelsArr([...props.labelsArr, item]);
                          }
                        }}
                        className="peer sr-only"
                      />
                      <div className="w-4.5 h-4.5 rounded-xs border border-[#738496] flex items-center justify-center peer-checked:bg-blue-500 transition-colors">
                        <svg
                          className={`w-3 h-3 text-black transition-opacity duration-200 ${
                            checklabel(item) ? "opacity-100" : "opacity-0"
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </label>
                  </div>
                  <div
                    style={{
                      "--label-bg": LABEL_COLORS[item.color]?.bg || "#6b7280",
                      "--label-text":
                        LABEL_COLORS[item.color]?.text || "#ffffff",
                      "--label-bg-hover": `${
                        LABEL_COLORS[item.color]?.hover || "#6b7280"
                      }`,
                    }}
                    className="label flex-1 font-bold pl-3 py-1.5 rounded"
                  >
                    {item.title}
                  </div>
                  <div
                    onClick={() => {
                      setEditLabel(item);
                    }}
                    className="h-full p-2 flex items-center justify-center rounded hover:bg-[#3c464e]"
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
                        d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={() => setAddLabel(true)}
              className="w-full flex items-center justify-center rounded bg-[#313940] font-semibold py-1.5 my-4 mb-3 text-sm text-[13px] cursor-pointer hover:bg-[#3c464e]"
            >
              Create a new label
            </div>
            <hr className="border-[#3c464e]" />
            <div className="w-full flex items-center justify-center rounded bg-[#313940] font-semibold py-1.5 mt-3 mb-1 text-sm text-[13px] cursor-pointer hover:bg-[#3c464e]">
              Enable colorblind friendly mode
            </div>
          </div>
        </div>
      )}

      {editLabel && !addLabel && (
        <EditLabel
          {...props}
          getlabels={getlabels}
          editLabel={editLabel}
          setEditLabel={setEditLabel}
        />
      )}
      {addLabel && !editLabel && (
        <AddNewLabel
          {...props}
          getlabels={getlabels}
          addLabel={addLabel}
          setAddLabel={setAddLabel}
        ></AddNewLabel>
      )}
    </div>,
    document.body
  );
}
