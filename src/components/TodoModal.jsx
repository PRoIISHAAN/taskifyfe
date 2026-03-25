import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AnimatedCheckbox from "./animatedCheckBox";
import { DateModal } from "./DateModal";
import { ChevronDown } from "lucide-react";
import { AddLabelModal } from "./addLabelModal";
import LABEL_COLORS from "@/miscelnaeous/config";
import { AddChecklistModal } from "./AddChecklistModal";
import { AddChecklistItem } from "./addChecklistItem";
import { ChecklistItem } from "./checklistitem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { AddAttachmentModal } from "./addAttachmentModal";
import { TodoCardAttachment } from "./TodoCardAttachment";
import LinkItem from "./linkItemComponent";
import { createPortal } from "react-dom";
import TrelloStyleDescription from "./AddDescriptionComponent";

export default function Modal(props) {
  const { allChecklists, setAllChecklists, modalOpen, modalClose } = props;
  const debouncedTitle = useDebounce(props.modalTitle, 500);
  const [activechecklistmodal, setactivechecklistmodal] = useState("");
  const descriptionInputRef = useRef(null);
  const labelTriggerRef = useRef(null);
  const labelTriggerRef2 = useRef(null);
  const dateTriggerRef = useRef(null);
  const dateTriggerRef2 = useRef(null);
  const checklistTriggerRef = useRef(null);
  const [dateModal, setdateModal] = useState(false);
  const [dateModal2, setdateModal2] = useState(false);
  const [labelModal, setLabelModal] = useState(false);
  const [labelModal2, setLabelModal2] = useState(false);
  const [labelsArr, setLabelsArr] = useState(props.labels || []);
  const [addChecklist, setAddChecklist] = useState(false);
  const [addAttachment, setAddAttachment] = useState(false);
  const [addAttachment2, setAddAttachment2] = useState(false);
  const [activecheckitemmodal, setactivecheckitemmodal] = useState(false);
  const [attachments, setAttachments] = useState(props.attachments);
  const timeoutRef = useRef(null);
  const timeoutRef2 = useRef(null);
  const attachmentTriggerRef = useRef(null);
  const attachmentTriggerRef2 = useRef(null);

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
    const attachmentstemp = { ...attachments };
    attachmentstemp.trelloCards.forEach((item) => {
      Object.keys(props.fullTodos).forEach((itemall) => {
        if (item.todoId._id == itemall) {
          item.todoId = props.fullTodos[itemall];
        }
      });
    });
    setAttachments(attachmentstemp);
  }, []);

  function checklistTitleChange(title, index) {
    const tempArr = { ...allChecklists };
    tempArr[props.id].checklist[index].title = title;
    setAllChecklists(tempArr);
    clearTimeout(timeoutRef2.current);
    timeoutRef2.current = setTimeout(async () => {
      const res = await axios.put(
        `/user/todos/editChecklistTitle`,
        {
          title: title,
          checklistId: allChecklists[props.id].checklist[index]._id,
        }
      );
    }, 1000);
  }

  async function checkitemCheckbox(index, index2) {
    const tempArr = JSON.parse(JSON.stringify(allChecklists));
    const newCompleted =
      !allChecklists[props.id].checklist[index].items[index2].completed;
    tempArr[props.id].checklist[index].items[index2] = {
      ...allChecklists[props.id].checklist[index].items[index2],
      completed: newCompleted,
    };
    setAllChecklists(tempArr);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      const res = await axios.put(
        `/user/todos/EditChecklistItem`,
        {
          completed: newCompleted,
          checklistId: allChecklists[props.id].checklist[index]._id,
          checkItemId:
            allChecklists[props.id].checklist[index].items[index2]._id,
        }
      );
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (timeoutRef2.current) {
        clearTimeout(timeoutRef2.current);
      }
    };
  }, []);

  useEffect(() => {
    setLabelsArr(props.labels || []);
  }, [props.cardData]);

  function checklistDonePercent(checklistArr) {
    let i = 0;
    let j = 0;
    checklistArr.map((item) => {
      j++;
      if (item.completed == true) {
        i++;
      }
    });
    if (j == 0) {
      return "0%";
    }
    return `${Math.round((i / j) * 100)}%`;
  }

  async function checklistDelete(index, id) {
    await axios.delete(
      `/user/todos/DeleteChecklist/${id}`
    );
    const tempArr = { ...allChecklists };
    tempArr[props.id].checklist.splice(index, 1);
    setAllChecklists(tempArr);
  }

  function dateLocal(date) {
    const dateobj = new Date(date);
    return dateobj.toLocaleTimeString("en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".date-modal-container")) {
        setdateModal(false);
        setdateModal2(false);
        setLabelModal(false);
        setLabelModal2(false);
        setAddChecklist(false);
        setAddAttachment(false);
        setAddAttachment2(false);
      }
    };

    if (
      dateModal ||
      dateModal2 ||
      labelModal ||
      labelModal2 ||
      addChecklist ||
      addAttachment ||
      addAttachment2
    ) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    dateModal,
    dateModal2,
    labelModal,
    labelModal2,
    addChecklist,
    addAttachment,
    addAttachment2,
  ]);

  useEffect(() => {
    async function updateTitle() {
      if (debouncedTitle != null && debouncedTitle != props.title) {
        const res = await axios.post(
          `/user/todos/updatetitle`,
          {
            title: debouncedTitle,
            id: props.id,
            boardId: props.boardId,
          }
        );
      }
    }
    updateTitle();
  }, [debouncedTitle]);
  if (!modalOpen) return null;
  return createPortal(
    <div className="w-screen h-screen absolute top-0 left-0 overflow-clip">
      <div
        onClick={modalClose}
        style={{
          visibility: modalOpen ? "visible" : "hidden",
        }}
        className="w-screen h-screen absolute top-0 left-0 bg-black/20 z-1 backdrop-blur-sm flex items-center justify-center"
      ></div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          visibility: modalOpen ? "visible" : "hidden",
        }}
        className="bg-[#22272b] w-270 flex flex-col border-1 border-[#A6C5E229] text-gray-400 z-2 rounded-2xl left-0 right-0 top-0 bottom-0 mx-auto my-12 max-h-[90vh] absolute"
      >
        <nav className="flex items-center justify-between px-4 py-3 pl-4 border-b border-[#A6C5E229]">
          <div className="flex items-center justify-between gap-1 cursor-pointer bg-[#454f59] hover:bg-[#596773] px-1 py-0.5 rounded">
            <div className="text-sm font-medium">Today</div>
            <span>
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
            </span>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex mx-1">
              <div className="w-8 h-8 p-2 flex items-center justify-center rounded-full hover:bg-[#272c31] transition-all duration-100">
                <svg
                  fill="none"
                  viewBox="0 0 16 16"
                  role="presentation"
                  class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
                >
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="M13.5 3.096a.5.5 0 0 0-.686-.464L7.5 4.758v4.734l5.314 2.126a.5.5 0 0 0 .686-.464zm-6 8.012 4.757 1.903A2 2 0 0 0 15 11.154V3.096a2 2 0 0 0-2.743-1.857L6.606 3.5H3a2 2 0 0 0-2 2v3.25a2 2 0 0 0 2 2h.5V13a2 2 0 0 0 2 2h1.25a.75.75 0 0 0 .75-.75zM6 9.25H3a.5.5 0 0 1-.5-.5V5.5A.5.5 0 0 1 3 5h3zm0 1.5v2.75h-.5A.5.5 0 0 1 5 13v-2.25z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="border-r-1 h-5 my-auto ml-2 border-[#45494d]"></div>
            </div>
            <div className="flex mx-1">
              <div className="w-8 h-8 p-2 flex items-center justify-center rounded-full hover:bg-[#272c31] transition-all duration-100">
                <svg
                  fill="none"
                  viewBox="0 0 16 16"
                  role="presentation"
                  class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
                >
                  <path
                    fill="currentcolor"
                    d="M5.75 4a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5"
                  ></path>
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h.644l6.274-7.723.053-.058a.75.75 0 0 1 1.06 0L13.5 8.19V3a.5.5 0 0 0-.5-.5zm2.575 11H13a.5.5 0 0 0 .5-.5v-2.69l-2.943-2.943z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex mx-1">
              <div className="w-8 h-8 p-2 flex items-center justify-center rounded-full hover:bg-[#272c31] transition-all duration-100">
                <svg
                  fill="none"
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
            </div>
            <div onClick={modalClose} className="flex mx-1">
              <div className="w-8 h-8 p-1 flex items-center justify-center rounded-full hover:bg-[#272c31] transition-all duration-100">
                <svg
                  width="20"
                  height="20"
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
            </div>
          </div>
        </nav>
        <div className="flex min-h-0 flex-1">
          <div className="pl-5 pr-10 flex-1 overflow-y-auto border-r border-[#A6C5E229]">
            <div className="flex items-center justify-center mb-10 mt-6">
              <div className="flex items-center justify-center">
                <AnimatedCheckbox
                  setCompletedState={props.setCompletedState}
                  completedState={props.completedState}
                ></AnimatedCheckbox>
              </div>
              <div className="font-bold text-2xl ml-3 w-full">
                <input
                  className="w-full outline-[#85b8ff] p-1"
                  type="text"
                  name=""
                  value={props.modalTitle || ""}
                  onChange={(e) => {
                    props.setModalTitle(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2 ml-7 mb-10 text-sm font-semibold">
              <div className="flex gap-1 cursor-pointer rounded py-1 px-2 border-1 hover:bg-[#2c3238] transition-all duration-100 border-[#374048] items-center">
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
                      d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div>Add</div>
              </div>
              {labelsArr.length == 0 || labelModal ? (
                <div>
                  <div
                  ref={labelTriggerRef}
                    onClick={() => setLabelModal(e=>!e)}
                    className={`flex date-modal-container cursor-pointer gap-1 rounded py-1 px-2 border-1 ${
                      labelModal
                        ? "bg-[#b6c2cf] text-[#1d2125] hover:bg-[#9fadbc]"
                        : "hover:bg-[#2c3238]"
                    } transition-all duration-100 border-[#374048] items-center`}
                  >
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
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.1213 2.80762C12.3403 2.02657 11.0739 2.02657 10.2929 2.80762L3.92891 9.17158C1.19524 11.9052 1.19524 16.3374 3.92891 19.0711C6.66258 21.8047 11.0947 21.8047 13.8284 19.0711L20.1924 12.7071C20.9734 11.9261 20.9734 10.6597 20.1924 9.87869L13.1213 2.80762ZM18.7782 11.2929L11.7071 4.22183L5.34313 10.5858C3.39051 12.5384 3.39051 15.7042 5.34313 17.6569C7.29575 19.6095 10.4616 19.6095 12.4142 17.6569L18.7782 11.2929ZM10 14C10 14.5523 9.55228 15 9 15C8.44772 15 8 14.5523 8 14C8 13.4477 8.44772 13 9 13C9.55228 13 10 13.4477 10 14ZM12 14C12 15.6569 10.6569 17 9 17C7.34315 17 6 15.6569 6 14C6 12.3431 7.34315 11 9 11C10.6569 11 12 12.3431 12 14Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div>Labels</div>
                  </div>
                      <AddLabelModal
                        isOpen={labelModal}
                        onClose={() => setLabelModal(false)}
                        triggerRef={labelTriggerRef}
                        {...props}
                        labelsArr={labelsArr}
                        setLabelsArr={setLabelsArr}
                      ></AddLabelModal>
                </div>
              ) : null}
              {props.due == null ? (
                <div
                  className="date-modal-container"
                  ref={dateTriggerRef}
                  onClick={() => {
                    setdateModal((e) => !e);
                    setAddAttachment(false);
                    setAddChecklist(false);
                    setLabelModal(false);
                    setLabelModal2(false);
                  }}
                >
                  <div
                    className={`flex gap-1 cursor-pointer rounded py-1 px-2 border-1 ${
                      dateModal
                        ? "bg-[#b6c2cf] text-[#1d2125] hover:bg-[#9fadbc]"
                        : "hover:bg-[#2c3238]"
                    } transition-all duration-100 border-[#374048] items-center`}
                  >
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
                          d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
                          fill="currentColor"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div>Dates</div>
                  </div>
                    
                      <DateModal
                        {...props}
                        isOpen={dateModal}
                        onClose={() => setdateModal(false)}
                        triggerRef={dateTriggerRef}
                      ></DateModal>
                </div>
              ) : null}

              {props.due != null && props.location == null ? (
                <div
                  className={`flex gap-1 rounded py-1 px-2 border-1 ${
                    dateModal
                      ? "bg-[#b6c2cf] text-[#1d2125] hover:bg-[#9fadbc]"
                      : "hover:bg-[#2c3238]"
                  } transition-all duration-100 cursor-pointer border-[#374048] items-center`}
                >
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 21C14.2802 21 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 9.71981 21 12 21ZM12 12C13.6081 12 14.9118 10.6964 14.9118 9.08823C14.9118 7.48011 13.6081 6.17647 12 6.17647C10.3919 6.17647 9.08824 7.48011 9.08824 9.08823C9.08824 10.6964 10.3919 12 12 12Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div>Location</div>
                </div>
              ) : (
                ""
              )}
              <div>
                <div
                ref={checklistTriggerRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddChecklist((e) => !e);
                    setdateModal(false);
                    setAddAttachment(false);
                    setLabelModal(false);
                    setLabelModal2(false);
                  }}
                  className={`flex date-modal-container gap-1 rounded py-1 px-2 border-1 ${
                    addChecklist
                      ? "bg-[#b6c2cf] text-[#1d2125] hover:bg-[#9fadbc]"
                      : "hover:bg-[#2c3238]"
                  } transition-all duration-100 cursor-pointer border-[#374048] items-center`}
                >
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13V18H6V6L16 6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H6ZM8.73534 10.3223C8.36105 9.91618 7.72841 9.89038 7.3223 10.2647C6.91619 10.639 6.89039 11.2716 7.26467 11.6777L10.8768 15.597C11.4143 16.1231 12.2145 16.1231 12.7111 15.6264L13.0754 15.2683C13.3699 14.9785 13.6981 14.6556 14.0516 14.3075C15.0614 13.313 16.0713 12.3169 17.014 11.3848L17.0543 11.3449C18.7291 9.68869 20.0004 8.42365 20.712 7.70223C21.0998 7.30904 21.0954 6.67589 20.7022 6.28805C20.309 5.90022 19.6759 5.90457 19.2881 6.29777C18.5843 7.01131 17.3169 8.27244 15.648 9.92281L15.6077 9.96263C14.6662 10.8937 13.6572 11.8889 12.6483 12.8825L11.8329 13.6851L8.73534 10.3223Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div>Checklist</div>
                </div>
                    <AddChecklistModal
                      {...props}
                      isOpen={addChecklist}
                      onClose={() => setAddChecklist(false)}
                      triggerRef={checklistTriggerRef}
                    />
              </div>
              <div>
                <div
                  ref={attachmentTriggerRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddAttachment(!addAttachment);
                    setAddAttachment2(false);
                    setdateModal(false);
                    setAddChecklist(false);
                    setLabelModal(false);
                    setLabelModal2(false);
                  }}
                  className={`flex date-modal-container gap-1 rounded py-1 px-2 border-1 ${
                    addAttachment
                      ? "bg-[#b6c2cf] text-[#1d2125] hover:bg-[#9fadbc]"
                      : "hover:bg-[#2c3238]"
                  } transition-all duration-100 cursor-pointer border-[#374048] items-center`}
                >
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.6426 17.9647C10.1123 19.46 7.62736 19.4606 6.10092 17.9691C4.57505 16.478 4.57769 14.0467 6.10253 12.5566L13.2505 5.57184C14.1476 4.6952 15.5861 4.69251 16.4832 5.56921C17.3763 6.44184 17.3778 7.85135 16.4869 8.72199L9.78361 15.2722C9.53288 15.5172 9.12807 15.5163 8.86954 15.2636C8.61073 15.0107 8.60963 14.6158 8.86954 14.3618L15.0989 8.27463C15.4812 7.90109 15.4812 7.29546 15.0989 6.92192C14.7167 6.54838 14.0969 6.54838 13.7146 6.92192L7.48523 13.0091C6.45911 14.0118 6.46356 15.618 7.48523 16.6163C8.50674 17.6145 10.1511 17.6186 11.1679 16.6249L17.8712 10.0747C19.5274 8.45632 19.5244 5.83555 17.8676 4.2165C16.2047 2.59156 13.5266 2.59657 11.8662 4.21913L4.71822 11.2039C2.42951 13.4404 2.42555 17.083 4.71661 19.3218C7.00774 21.5606 10.7323 21.5597 13.0269 19.3174L19.7133 12.7837C20.0956 12.4101 20.0956 11.8045 19.7133 11.431C19.331 11.0574 18.7113 11.0574 18.329 11.431L11.6426 17.9647Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div>Attachment</div>
                </div>

                <AddAttachmentModal
                  isOpen={addAttachment}
                  onClose={() => setAddAttachment(false)}
                  triggerRef={attachmentTriggerRef}
                  attachments={attachments}
                  setAttachments={setAttachments}
                  {...props}
                />
              </div>
              <div className="flex gap-1 rounded py-1 px-2 border-1 hover:bg-[#2c3238] transition-all duration-100 cursor-pointer border-[#374048] items-center">
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 9.44777 7.61532 10.7518 8.59871 11.6649C5.31433 13.0065 3 16.233 3 20C3 20.5523 3.44772 21 4 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5.07089C5.55612 15.6077 8.47353 13 12 13ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17V14Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div>Members</div>
              </div>
            </div>
            {props.members.length != 0 && props.members.firstName != null && (
              <div className="mb-3 ml-7">
                <div className="text-xs mb-2">Members</div>
                <div className="flex">
                  {props.members.length != 0 &&
                    props.members.map((item) => (
                      <div className="hover:bg-gray-400/30 rounded-sm w-8 h-8">
                        <div className="rounded-full mx-1 my-1 text-white font-bold align-middle text-center bg-purple-500">
                          {item.firstName != null ? item.firstName[0] : null}
                        </div>
                      </div>
                    ))}
                  <div>
                    <div className="hover:bg-gray-400/30 flex items-center justify-center rounded-full bg-gray-500/30 w-8 h-8">
                      <svg
                        width="16"
                        height="16"
                        role="presentation"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {(labelsArr.length != 0 || labelModal2) && (
              <div className="ml-7 mb-3">
                <div className="text-xs mb-2">Labels</div>
                <div ref={labelTriggerRef2} className="flex flex-wrap w-[520px] gap-1">
                  {labelsArr.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setLabelModal2(true);
                      }}
                      style={{
                        "--label-bg": LABEL_COLORS[item.color]?.bg || "#6b7280",
                        "--label-text":
                          LABEL_COLORS[item.color]?.text || "#ffffff",
                        "--label-bg-hover": `${
                          LABEL_COLORS[item.color]?.hover || "#6b7280"
                        }`,
                      }}
                      className={`label date-modal-container text-medium rounded cursor-pointer p-1 px-2 text-sm font-semibold`}
                    >
                      {item.title}
                    </div>
                  ))}
                  <div
                    onClick={() => setLabelModal2(true)}
                    className="hover:bg-gray-500/30 flex items-center py-1.5 date-modal-container justify-center px-2 rounded bg-[#2c3238]"
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
                        d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
                    <AddLabelModal
                      {...props}
                      labelsArr={labelsArr}
                      setLabelsArr={setLabelsArr}
                      triggerRef={labelTriggerRef2}
                      isOpen={labelModal2}
                      onClose={() => setLabelModal2(false)}
                    ></AddLabelModal>
              </div>
            )}
            {props.due && (
              <div>
                <div className="ml-7 mb-3">
                  <div className="text-xs mb-2">Due date</div>
                  <div
                    ref={dateTriggerRef2}
                    onClick={(e) => {
                      setdateModal2(true);
                    }}
                    className="flex date-modal-container cursor-pointer gap-1.5 items-center justify-center w-fit px-2 py-1 rounded bg-[#2c3238] hover:bg-gray-500/30"
                  >
                    <div className="text-sm font-semibold">
                      {dateLocal(props.due)}
                    </div>
                    {props.isOverdue(props.due) && (
                      <div className="text-[#d64439] bg-[#5d1f1a] text-xs text-semibold">
                        OVERDUE
                      </div>
                    )}
                    {props.due != null && props.completedState && (
                      <div className="text-black font-medium px-[2px] rounded-xs bg-[#4bce97] text-[11px] text-semibold">
                        Complete
                      </div>
                    )}
                    <div>
                      <ChevronDown className="size-4.5"></ChevronDown>
                    </div>
                  </div>
                </div>
                    <DateModal
                      {...props}
                      isOpen={dateModal2}
                      onClose={() => setdateModal2(false)}
                      triggerRef={dateTriggerRef2}
                      todoId={props.id}
                    ></DateModal>
              </div>
            )}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H20C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9H4ZM3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14ZM4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H4Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-sm font-semibold">Description</div>
                </div>
              </div>
              <div className="text-xs mt-5 ml-7">
                {props.desc ? (
                  props.desc
                ) : (
                  <div>
                    <textarea
                      className="w-full h-[90px border border-[#b6c2cf] font-medium text-sm text-[#b6c2cf] p-2 rounded hover:bg-[#282e33]"
                      placeholder="Add a more detailed description..."
                      name="descriptionInput"
                      ref={descriptionInputRef}
                    ></textarea>
                  </div>
                )}
                <TrelloStyleDescription></TrelloStyleDescription>
              </div>
            </div>
            {props.location != null && (
              <div>
                <div className="flex gap-2">
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 21C14.2802 21 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 9.71981 21 12 21ZM12 12C13.6081 12 14.9118 10.6964 14.9118 9.08823C14.9118 7.48011 13.6081 6.17647 12 6.17647C10.3919 6.17647 9.08824 7.48011 9.08824 9.08823C9.08824 10.6964 10.3919 12 12 12Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-sm font-semibold"> Location </div>
                </div>
                <div>{props.location}</div>
              </div>
            )}
            {(attachments.links?.length > 0 ||
              attachments.trelloCards?.length > 0) && (
              <div className="w-[550px]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
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
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.6426 17.9647C10.1123 19.46 7.62736 19.4606 6.10092 17.9691C4.57505 16.478 4.57769 14.0467 6.10253 12.5566L13.2505 5.57184C14.1476 4.6952 15.5861 4.69251 16.4832 5.56921C17.3763 6.44184 17.3778 7.85135 16.4869 8.72199L9.78361 15.2722C9.53288 15.5172 9.12807 15.5163 8.86954 15.2636C8.61073 15.0107 8.60963 14.6158 8.86954 14.3618L15.0989 8.27463C15.4812 7.90109 15.4812 7.29546 15.0989 6.92192C14.7167 6.54838 14.0969 6.54838 13.7146 6.92192L7.48523 13.0091C6.45911 14.0118 6.46356 15.618 7.48523 16.6163C8.50674 17.6145 10.1511 17.6186 11.1679 16.6249L17.8712 10.0747C19.5274 8.45632 19.5244 5.83555 17.8676 4.2165C16.2047 2.59156 13.5266 2.59657 11.8662 4.21913L4.71822 11.2039C2.42951 13.4404 2.42555 17.083 4.71661 19.3218C7.00774 21.5606 10.7323 21.5597 13.0269 19.3174L19.7133 12.7837C20.0956 12.4101 20.0956 11.8045 19.7133 11.431C19.331 11.0574 18.7113 11.0574 18.329 11.431L11.6426 17.9647Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div className="text-sm font-semibold">Attachments</div>
                  </div>
                  <div>
                    <div>
                      <button
                        ref={attachmentTriggerRef2}
                        onClick={() => {
                          setAddAttachment(false);
                          setAddAttachment2(!addAttachment2);
                        }}
                        className={`py-1.5 date-modal-container px-3 rounded text-sm font-semibold cursor-pointer ${
                          addAttachment2
                            ? "bg-[#b6c2cf] text-[#1d2125] hover:bg-[#9fadbc]"
                            : "bg-[#2c3238] hover:bg-[#374048]"
                        }`}
                      >
                        Add
                      </button>
                    </div>
                    <AddAttachmentModal
                      isOpen={addAttachment2}
                      onClose={() => setAddAttachment2(false)}
                      triggerRef={attachmentTriggerRef2}
                      attachments={attachments}
                      setAttachments={setAttachments}
                      {...props}
                    />
                  </div>
                </div>
                {attachments.trelloCards.length > 0 && (
                  <div className="ml-7 mt-3">
                    <div className="text-[12px] font-semibold">
                      Trello Cards
                    </div>
                    <div className="flex flex-wrap justify-between">
                      {attachments.trelloCards.map((task, index) => {
                        return (
                          <div key={index}>
                            <TodoCardAttachment
                              fullTodos={props.fullTodos}
                              parentModalClose={modalClose}
                              allChecklists={allChecklists}
                              setAllChecklists={setAllChecklists}
                              allTodos={props.allTodos}
                              setRefetch={props.setRefetch}
                              refetch={props.refetch}
                              cardData={props.cardData}
                              index={index}
                              key={index}
                              id={task.todoId._id}
                              title={task.todoId.title}
                              desc={task.todoId.desc}
                              due={task.todoId.endDate}
                              timeAdded={task.todoId.timeAdded}
                              priority={task.todoId.priority}
                              members={task.todoId.members}
                              labels={task.todoId.labels}
                              attachments={task.todoId.attachments}
                              location={task.todoId.location}
                              checklist={task.todoId.checklist}
                              boardId={task.todoId.boardId}
                              completed={task.todoId.completed}
                              reminder={task.todoId.reminder}
                              startDate={task.todoId.startDate}
                              endDate={task.todoId.endDate}
                              attachments2={attachments}
                              setAttachments2={setAttachments}
                              todoId={props.id}
                            ></TodoCardAttachment>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {attachments.links.length > 0 && (
                  <DragDropContext
                    onDragEnd={async (result) => {
                      const { source, destination } = result;
                      if (!destination || source.index === destination.index) {
                        return;
                      }
                      const tempArr = { ...attachments };
                      const newLinks = [...tempArr.links];
                      const [draggedItem] = newLinks.splice(source.index, 1);
                      newLinks.splice(destination.index, 0, draggedItem);
                      tempArr.links = newLinks;
                      setAttachments(tempArr);
                      await axios.put(
                        "/user/todos/reorderAttachmentLink",
                        {
                          todoId: props.id,
                          index: source.index,
                          newIndex: destination.index,
                        }
                      );
                    }}
                  >
                    <Droppable droppableId={"1"}>
                      {(provided) => (
                        <div
                          className="ml-7 mt-5"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <div className="text-[12px] font-semibold">Links</div>
                          <div className="flex bg-[#202424] shadow-[0px_1px_1px_rgba(0,0,0,0.7)] mt-2 flex-col gap-0.5">
                            {attachments.links.map((item, index) => (
                              <LinkItem
                                attachments={attachments}
                                setAttachments={setAttachments}
                                item={item}
                                length={attachments.links.length}
                                todoId={props.id}
                                index={index}
                              ></LinkItem>
                            ))}
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </div>
            )}
            {allChecklists[props.id].checklist.length != 0 && (
              <div>
                {allChecklists[props.id].checklist.map((item, index) => (
                  <div key={index} className="my-8">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div>
                          <svg
                            width="21"
                            height="21"
                            role="presentation"
                            focusable="false"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13V18H6V6L16 6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H6ZM8.73534 10.3223C8.36105 9.91618 7.72841 9.89038 7.3223 10.2647C6.91619 10.639 6.89039 11.2716 7.26467 11.6777L10.8768 15.597C11.4143 16.1231 12.2145 16.1231 12.7111 15.6264L13.0754 15.2683C13.3699 14.9785 13.6981 14.6556 14.0516 14.3075C15.0614 13.313 16.0713 12.3169 17.014 11.3848L17.0543 11.3449C18.7291 9.68869 20.0004 8.42365 20.712 7.70223C21.0998 7.30904 21.0954 6.67589 20.7022 6.28805C20.309 5.90022 19.6759 5.90457 19.2881 6.29777C18.5843 7.01131 17.3169 8.27244 15.648 9.92281L15.6077 9.96263C14.6662 10.8937 13.6572 11.8889 12.6483 12.8825L11.8329 13.6851L8.73534 10.3223Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                        <div className="text-sm font-semibold">
                          <input
                            type="text"
                            value={item.title || ""}
                            onChange={(e) => {
                              checklistTitleChange(e.target.value, index);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            checklistDelete(index, item._id);
                          }}
                          className="py-1.5 px-3 rounded text-sm font-semibold bg-[#2c3238] cursor-pointer hover:bg-[#374048]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-[5px] my-2 mb-3">
                      <div className="text-[10px] mx-[4px]">
                        {checklistDonePercent(item.items)}
                      </div>
                      <div className="flex-1 h-[6px] rounded-full bg-[#2c3238]">
                        <div
                          style={{
                            width: `${checklistDonePercent(item.items)}`,
                          }}
                          className={`bg-[#9fadbc] transition-all duration-200 h-full rounded-full`}
                        ></div>
                      </div>
                    </div>
                    {item.items.length != 0 && (
                      <div className="mb-2">
                        {item.items.map((checkitem, index2) => (
                          <div
                            key={index2}
                            className="flex text-sm items-start gap-1 justify-start"
                          >
                            <label className="inline-flex items-center mt-2.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={checkitem.completed}
                                onChange={() => {
                                  checkitemCheckbox(index, index2);
                                }}
                                className="peer sr-only"
                              />
                              <div className="w-4.5 h-4.5 rounded-xs border border-[#738496] flex items-center justify-center peer-checked:bg-blue-500 transition-colors">
                                <svg
                                  className={`w-3 h-3 text-black transition-opacity duration-200 ${
                                    checkitem.completed
                                      ? "opacity-100"
                                      : "opacity-0"
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
                            <ChecklistItem
                              {...props}
                              activechecklistmodal={activechecklistmodal}
                              setactivechecklistmodal={setactivechecklistmodal}
                              checkItemId={checkitem._id}
                              checklistId={item._id}
                              index={index}
                              index2={index2}
                              completed={checkitem.completed}
                              title={checkitem.title}
                            ></ChecklistItem>
                          </div>
                        ))}
                      </div>
                    )}
                    <AddChecklistItem
                      {...props}
                      activecheckitemmodal={activecheckitemmodal}
                      setactivecheckitemmodal={setactivecheckitemmodal}
                      index={index}
                      checklistId={item._id}
                    ></AddChecklistItem>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-[#161a1d] rounded-br-2xl h-full w-110 px-5 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <div>
                  <svg
                    fill="none"
                    width={18}
                    height={18}
                    viewBox="0 0 16 16"
                    role="presentation"
                  >
                    <path
                      fill="currentcolor"
                      fill-rule="evenodd"
                      d="M0 3.125A2.625 2.625 0 0 1 2.625.5h10.75A2.625 2.625 0 0 1 16 3.125v8.25A2.625 2.625 0 0 1 13.375 14H4.449l-3.327 1.901A.75.75 0 0 1 0 15.25zM2.625 2C2.004 2 1.5 2.504 1.5 3.125v10.833L4.05 12.5h9.325c.621 0 1.125-.504 1.125-1.125v-8.25C14.5 2.504 13.996 2 13.375 2zM12 6.5H4V5h8zm-3 3H4V8h5z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm font-semibold">
                  Comments and activity
                </div>
              </div>
              <button className="text-sm font-semibold bg-[#21262b] hover:bg-[#2d353c] px-3 py-2 rounded">
                Show details
              </button>
            </div>
            <div>
              <input
                className="bg-[#21262b] text-sm w-full rounded-lg mt-2 py-2 px-2 hover:bg-[#2d353c] text-gray-400 font-medium"
                type="text"
                name="Comments"
                placeholder="Write a comment..."
                id=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
