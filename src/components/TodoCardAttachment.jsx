import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AnimatedCheckbox from "./animatedCheckBox";
import LABEL_COLORS from "@/miscelnaeous/config";

export function TodoCardAttachment(props) {
  const {allChecklists,setAllChecklists} = props;
  const hasInitialized = useRef(false);
  const lastSentValue = useRef(props.completed);
  const [initialMount, setInitialMount] = useState(true);

  const [modalTitle, setModalTitle] = useState(props.title);
  const [completedState, setCompletedState] = useState(
    props.completed || false
  );
  const debouncedCompleted = useDebounce(completedState, 500);

  useEffect(() => {
    hasInitialized.current = true;
    lastSentValue.current = props.completed;
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
          `http://localhost:3000/user/todos/updatecompleted`,
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
  }, [props.modalOpen]);

  useEffect(() => {
    async function sendRecentlyViewed() {
      const res = await axios.post(
        `http://localhost:3000/user/todos/recentlyviewed`,
        {
          type: "todo",
          todoId: props.id,
        }
      );
    }
    if (!props.modalOpen && !initialMount) {
      sendRecentlyViewed();
    }
  }, [props.modalOpen]);

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
    <div>
          <div
            onClick={(e) => {
              props.setModalProps({
                ...props,
                modalTitle:  modalTitle ,
                allChecklists:  allChecklists ,
                setAllChecklists:  setAllChecklists,
                setModalTitle:  setModalTitle ,
                completedState:  completedState ,
                setCompletedState:  setCompletedState ,
                setModalOpen:  props.setModalOpen ,
                isOverdue:  isOverdue ,
              });
              props.setModalOpen(true);
            }}
            className="text-[#b6c2cf] group bg-[#22272b] flex cursor-pointer hover:outline-2 m-1 outline-white flex-col justify-between items-center p-2 mt-3 rounded-xl"
          >
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
    </div>
  );
}
