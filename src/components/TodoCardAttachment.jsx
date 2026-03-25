import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useEffect, useRef, useState } from "react";
import AnimatedCheckbox from "./animatedCheckBox";
import LABEL_COLORS from "@/miscelnaeous/config";
import { usePortalPosition } from "@/Hooks/usePortalPosition";
import { createPortal } from "react-dom";
import Modal from "./TodoModal";
import AttachmentModal from "./AttachmentModal";

function DelModal({
  isOpen,
  onClose,
  modalRef,
  todoId,
  index,
  attachments,
  setAttachments,
  fullTodos,
}) {
  const position = usePortalPosition(modalRef, isOpen);
  const [shouldRender, setShouldRender] = useState(false);
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
  const DeleteOnClick = async () => {
    await axios.delete(
      `/user/todos/addAttachment/trelloCards/${todoId}/${index}`
    );
    const tempAtt = { ...attachments };
    tempAtt.trelloCards.splice(index, 1);
    setAttachments(tempAtt);
    onClose();
  };

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
        <div className="w-[250px] py-3">
          <div
            onClick={DeleteOnClick}
            className="hover:bg-[#313940] cursor-pointer text-[#fd9891] text-sm px-3 py-1.5"
          >
            Delete
          </div>
          {!attachments.trelloCards.some((item) => {
            return fullTodos[item.todoId._id].attachments.trelloCards.some(
              (item2) => {
                return item2.todoId._id === todoId;
              }
            );
          }) && (
            <div className="hover:bg-[#313940] cursor-pointer text-sm px-3 py-1.5">
              Link
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}

export function TodoCardAttachment(props) {
  const {
    allChecklists,
    setAllChecklists,
    attachments2,
    setAttachments2,
    index,
    todoId,
    fullTodos,
    parentModalClose,
  } = props;
  const hasInitialized = useRef(false);
  const lastSentValue = useRef(props.completed);
  const [initialMount, setInitialMount] = useState(true);
  const [delmodalOpen, setDelModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [modalTitle, setModalTitle] = useState(props.title);
  const [completedState, setCompletedState] = useState(
    props.completed || false
  );
  const debouncedCompleted = useDebounce(completedState, 500);

  useEffect(() => {
    hasInitialized.current = true;
    lastSentValue.current = props.completed;
    console.log(
      attachments2.trelloCards.some((item) => {
        return fullTodos[item.todoId._id].attachments.trelloCards.some(
          (item2) => {
            return item2.todoId._id === todoId;
          }
        );
      })
    );
  }, []);

  useEffect(() => {
    async function updateCompleted() {
      if (
        hasInitialized.current &&
        debouncedCompleted !== lastSentValue.current &&
        debouncedCompleted !== null &&
        debouncedCompleted !== undefined
      ) {
        const res = await axios.post(
          `/user/todos/updatecompleted`,
          {
            completed: debouncedCompleted,
            id: props.id,
            boardId: props.boardId,
          }
        );
        console.log("Completed updated:", res.data);
        lastSentValue.current = debouncedCompleted;
      }
    }
    updateCompleted();
  }, [debouncedCompleted]);

  function timeAgo(dateString) {
    const date = new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return date;
  }

  useEffect(() => {
    setInitialMount(false);
  }, [modalOpen]);

  useEffect(() => {
    async function sendRecentlyViewed() {
      const res = await axios.post(
        `/user/todos/recentlyviewed`,
        {
          type: "todo",
          todoId: props.id,
        }
      );
    }
    if (!modalOpen && !initialMount) {
      sendRecentlyViewed();
    }
  }, [modalOpen]);

  function checklistDoneNumber(checklistArr) {
    let i = 0;
    let j = 0;
    checklistArr.map((Obj) => {
      j = j + Obj.items.length;
      Obj.items.map((item) => {
        if (item.completed == true) {
          i++;
        }
      });
    });
    return `${i}/${j}`;
  }
  function isOverdue(dueDateString) {
    if (!dueDateString) return false;
    const dueDate = new Date(dueDateString);
    const today = new Date();
    return dueDate.toDateString() < today.toDateString();
  }
  return (
    <div className="">
      <div
        onClick={() => {
          // parentModalClose()
          setModalOpen(true);
        }}
        className="text-[#b6c2cf] group w-64 bg-[#22272b] shadow-[0px_1px_1px_rgba(0,0,0,0.7)] flex cursor-pointer outline-white flex-col justify-between items-center p-2 mt-3 rounded"
      >
        <div className="flex gap-1 mb-1 group/boardTitle hover:bg-[#38414a] items-center justify-center self-start p-0.5 pr-1 rounded-sm bg-[#2c333a]">
          <div className="bg-gradient-to-br from-violet-500/70 to-pink-400/70 w-[24px] h-[24px] rounded-sm"></div>
          <div>
            <div className="text-[10px] font-semibold pb-[1px] leading-none">
              My Trello board
            </div>
            <div className="text-[10px] leading-none">Later</div>
          </div>
          <svg
            width="16"
            height="16"
            className="hidden group-hover/boardTitle:inline self-start"
            role="presentation"
            focusable="false"
            viewBox="6 1 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.745 8.6082C10.742 8.0352 11.204 7.5722 11.776 7.5722H11.78L15.941 7.5912C16.515 7.5942 16.983 8.0622 16.986 8.6362L17.005 12.7972C17.006 13.3712 16.543 13.8352 15.969 13.8322C15.394 13.8302 14.926 13.3622 14.924 12.7882L14.9163 11.0759L8.19297 17.7992C7.80197 18.1892 7.16797 18.1892 6.77797 17.7992C6.38797 17.4092 6.38797 16.7752 6.77797 16.3842L13.5013 9.66089L11.789 9.6532C11.215 9.6512 10.747 9.1832 10.745 8.6082Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        {props.labels.length > 0 ? (
          <div className="gap-1 w-full mb-1 flex flex-wrap">
            {props.labels.map((item) => (
              <span
                style={{ backgroundColor: LABEL_COLORS[item.color]?.bg }}
                className={`w-[40px] h-[7px] rounded-full`}
                key={item._id}
              ></span>
            ))}
          </div>
        ) : null}
        <div className="self-start flex items-center gap-1 group text-sm">
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${
              completedState == true ? `opacity-100` : `opacity-0`
            } group-hover:opacity-100 transition-all duration-300 items-center cursor-pointer`}
          >
            <AnimatedCheckbox
              setCompletedState={setCompletedState}
              completedState={completedState}
            ></AnimatedCheckbox>
          </div>
          <div
            className={`group-hover:translate-x-0 transition-all duration-300 ${
              completedState == true ? `translate-x-0` : `-translate-x-5`
            } `}
          >
            {modalTitle}
          </div>
        </div>
        {props.due != null ||
        props.desc != null ||
        props.attachments.trelloCards.length != 0 ||
        props.attachments.links.length != 0 ||
        allChecklists[props.id].checklist.length > 0 ||
        checklistDoneNumber(allChecklists[props.id].checklist) != "0/0" ||
        props.location != null ||
        props.members.length != 0 ? (
          <div className="flex flex-wrap mt-1 w-full items-center justify-start gap-2">
            {props.due != null && (
              <div
                className={`flex rounded gap-1 p-1 ${
                  completedState == true
                    ? "bg-[#4bce97]"
                    : isOverdue(props.due)
                    ? "bg-[#5d1f1a]"
                    : null
                } items-center`}
              >
                <div
                  className={`${
                    completedState == true
                      ? "text-black"
                      : isOverdue(props.due)
                      ? "text-[#d64439]"
                      : null
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" />
                    <path
                      d="M12 6v6l4 2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className={`text-[12px] ${
                    completedState == true ? "text-black" : null
                  }`}
                >
                  {props.due ? timeAgo(props.due) : null}
                </div>
              </div>
            )}
            {props.desc && (
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H20C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9H4ZM3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14ZM4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            )}
            {props.attachments.links?.length > 0 && (
              <div className="flex items-center gap-1">
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
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.6426 17.9647C10.1123 19.46 7.62736 19.4606 6.10092 17.9691C4.57505 16.478 4.57769 14.0467 6.10253 12.5566L13.2505 5.57184C14.1476 4.6952 15.5861 4.69251 16.4832 5.56921C17.3763 6.44184 17.3778 7.85135 16.4869 8.72199L9.78361 15.2722C9.53288 15.5172 9.12807 15.5163 8.86954 15.2636C8.61073 15.0107 8.60963 14.6158 8.86954 14.3618L15.0989 8.27463C15.4812 7.90109 15.4812 7.29546 15.0989 6.92192C14.7167 6.54838 14.0969 6.54838 13.7146 6.92192L7.48523 13.0091C6.45911 14.0118 6.46356 15.618 7.48523 16.6163C8.50674 17.6145 10.1511 17.6186 11.1679 16.6249L17.8712 10.0747C19.5274 8.45632 19.5244 5.83555 17.8676 4.2165C16.2047 2.59156 13.5266 2.59657 11.8662 4.21913L4.71822 11.2039C2.42951 13.4404 2.42555 17.083 4.71661 19.3218C7.00774 21.5606 10.7323 21.5597 13.0269 19.3174L19.7133 12.7837C20.0956 12.4101 20.0956 11.8045 19.7133 11.431C19.331 11.0574 18.7113 11.0574 18.329 11.431L11.6426 17.9647Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="text-[12px] align-bottom font-light">
                  {props.attachments?.links?.length}
                </div>
              </div>
            )}
            {props.attachments?.trelloCards?.length > 0 && (
              <div className="flex items-center gap-1">
                <div>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z"
                    ></path>
                  </svg>
                </div>
                <div className="text-[12px] align-bottom font-light">
                  {props.attachments?.trelloCards?.length}
                </div>
              </div>
            )}
            {allChecklists[props.id]?.checklist?.length != 0 &&
              checklistDoneNumber(allChecklists[props.id].checklist) !=
                "0/0" && (
                <div className="flex gap-1">
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13V18H6V6L16 6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H6ZM8.73534 10.3223C8.36105 9.91618 7.72841 9.89038 7.3223 10.2647C6.91619 10.639 6.89039 11.2716 7.26467 11.6777L10.8768 15.597C11.4143 16.1231 12.2145 16.1231 12.7111 15.6264L13.0754 15.2683C13.3699 14.9785 13.6981 14.6556 14.0516 14.3075C15.0614 13.313 16.0713 12.3169 17.014 11.3848L17.0543 11.3449C18.7291 9.68869 20.0004 8.42365 20.712 7.70223C21.0998 7.30904 21.0954 6.67589 20.7022 6.28805C20.309 5.90022 19.6759 5.90457 19.2881 6.29777C18.5843 7.01131 17.3169 8.27244 15.648 9.92281L15.6077 9.96263C14.6662 10.8937 13.6572 11.8889 12.6483 12.8825L11.8329 13.6851L8.73534 10.3223Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-[12px] align-bottom font-light">
                    {checklistDoneNumber(allChecklists[props.id].checklist)}
                  </div>
                </div>
              )}
            {props.location && (
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 21C14.2802 21 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 9.71981 21 12 21ZM12 12C13.6081 12 14.9118 10.6964 14.9118 9.08823C14.9118 7.48011 13.6081 6.17647 12 6.17647C10.3919 6.17647 9.08824 7.48011 9.08824 9.08823C9.08824 10.6964 10.3919 12 12 12Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            )}
            {props.members.length != 0 &&
              props.members.map((item) => {
                if (item.firstName != null) {
                  return (
                    <div
                      key={item._id}
                      className="hover:bg-gray-400/30 rounded-sm w-8 h-8"
                    >
                      <div className="rounded-full mx-1 my-1 text-white font-bold align-middle text-center bg-purple-500">
                        {item.firstName[0]}
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        ) : null}
      </div>
      <div className="flex items-center mt-3 gap-2">
        <div
          onClick={() => setDelModalOpen((i) => !i)}
          ref={modalRef}
          className="hover:bg-gray-500/30 flex items-center py-1.5 justify-center px-2 rounded bg-[#2c3238]"
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
        {attachments2.trelloCards.some((item) => {
          return fullTodos[item.todoId._id].attachments.trelloCards.some(
            (item2) => {
              return item2.todoId._id === todoId;
            }
          );
        }) && (
          <div className="items-center justify-between flex gap-1">
            <div>
              <svg
                width="16"
                height="16"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="24"
                  height="24"
                  fill="transparent"
                  fill-opacity="0.01"
                ></rect>
                <path
                  d="M12.6539 8.76404C12.4917 8.91817 12.2757 9.00284 12.052 8.99998C11.8282 8.99713 11.6145 8.90698 11.4562 8.74875C11.298 8.59053 11.2078 8.37675 11.205 8.153C11.2021 7.92926 11.2868 7.71325 11.4409 7.55104L12.6549 6.33704C13.0001 5.99183 13.4099 5.71799 13.8609 5.53116C14.3119 5.34433 14.7953 5.24817 15.2834 5.24817C15.7716 5.24817 16.255 5.34433 16.706 5.53116C17.157 5.71799 17.5668 5.99183 17.9119 6.33704C18.2577 6.68195 18.5321 7.09168 18.7193 7.54276C18.9065 7.99385 19.003 8.47743 19.0031 8.96583C19.0031 9.45423 18.9069 9.93785 18.7199 10.389C18.5328 10.8402 18.2586 11.25 17.9129 11.595L16.6989 12.809L15.8949 13.613C15.5498 13.9591 15.1398 14.2338 14.6885 14.4214C14.2371 14.6089 13.7532 14.7057 13.2645 14.7062C12.7757 14.7066 12.2916 14.6108 11.8399 14.4241C11.3882 14.2374 10.9777 13.9635 10.6319 13.618C10.471 13.4571 10.3805 13.2387 10.3805 13.011C10.3805 12.7834 10.471 12.565 10.6319 12.404C10.7929 12.2431 11.0113 12.1526 11.2389 12.1526C11.4666 12.1526 11.685 12.2431 11.8459 12.404C12.6269 13.186 13.8959 13.184 14.6819 12.399L15.4859 11.596L16.6999 10.382C16.8862 10.1963 17.034 9.97569 17.1348 9.73275C17.2356 9.48981 17.2874 9.22935 17.2873 8.96633C17.2873 8.70331 17.2352 8.44289 17.1343 8.20002C17.0333 7.95715 16.8853 7.7366 16.6989 7.55104C16.5132 7.36508 16.2926 7.21757 16.0498 7.11692C15.807 7.01627 15.5468 6.96446 15.2839 6.96446C15.0211 6.96446 14.7609 7.01627 14.5181 7.11692C14.2753 7.21757 14.0547 7.36508 13.8689 7.55104L12.6539 8.76404ZM11.8459 15.236C12.0082 15.0819 12.2242 14.9972 12.4479 15.0001C12.6717 15.0029 12.8854 15.0931 13.0437 15.2513C13.2019 15.4095 13.292 15.6233 13.2949 15.8471C13.2977 16.0708 13.2131 16.2868 13.0589 16.449L11.8449 17.663C11.4998 18.0082 11.09 18.2821 10.639 18.4689C10.188 18.6557 9.70461 18.7519 9.21644 18.7519C8.72827 18.7519 8.24489 18.6557 7.79389 18.4689C7.34288 18.2821 6.9331 18.0082 6.58794 17.663C6.24216 17.3181 5.9678 16.9084 5.78057 16.4573C5.59334 16.0062 5.49692 15.5226 5.49683 15.0342C5.49673 14.5458 5.59297 14.0622 5.78003 13.6111C5.96708 13.1599 6.24129 12.7501 6.58694 12.405L7.80094 11.191L8.60494 10.387C8.95008 10.041 9.36005 9.76628 9.8114 9.57872C10.2627 9.39116 10.7466 9.29438 11.2354 9.29391C11.7242 9.29345 12.2082 9.38931 12.66 9.57601C13.1117 9.76272 13.5221 10.0366 13.8679 10.382C14.0289 10.543 14.1194 10.7614 14.1194 10.989C14.1194 11.2167 14.0289 11.4351 13.8679 11.596C13.707 11.757 13.4886 11.8475 13.2609 11.8475C13.0333 11.8475 12.8149 11.757 12.6539 11.596C12.4674 11.4101 12.2461 11.2627 12.0026 11.1624C11.7591 11.062 11.4983 11.0106 11.2349 11.011C10.9715 11.0115 10.7109 11.0638 10.4677 11.1651C10.2246 11.2663 10.0038 11.4145 9.81794 11.601L9.01394 12.404L7.79994 13.618C7.61366 13.8037 7.46589 14.0244 7.36508 14.2673C7.26428 14.5103 7.21244 14.7707 7.21253 15.0337C7.21263 15.2968 7.26465 15.5572 7.36563 15.8001C7.4666 16.0429 7.61453 16.2635 7.80094 16.449C7.98669 16.635 8.20726 16.7825 8.45006 16.8832C8.69286 16.9838 8.95311 17.0356 9.21594 17.0356C9.47877 17.0356 9.73903 16.9838 9.98182 16.8832C10.2246 16.7825 10.4452 16.635 10.6309 16.449L11.8459 15.236Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="text-[14px]">Linked</div>
          </div>
        )}
        <DelModal
          isOpen={delmodalOpen}
          onClose={() => setDelModalOpen(false)}
          modalRef={modalRef}
          fullTodos={fullTodos}
          todoId={todoId}
          index={index}
          attachments={attachments2}
          setAttachments={setAttachments2}
        ></DelModal>
      </div>
      <AttachmentModal
        {...props}
        modalTitle={modalTitle}
        allChecklists={allChecklists}
        setAllChecklists={setAllChecklists}
        setModalTitle={setModalTitle}
        completedState={completedState}
        setCompletedState={setCompletedState}
        modalOpen={modalOpen}
        modalClose={() => {setModalOpen(false);parentModalClose()}}
        isOverdue={isOverdue}
      ></AttachmentModal>
    </div>
  );
}
