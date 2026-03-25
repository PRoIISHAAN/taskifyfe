import { useEffect, useRef, useState } from "react";
import { AddNew } from "./addNewCard";
import { TodoCard } from "./todocard";
import { Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";
import { ListActionsModal } from "./listActions";

export function ColumnComp(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [listItem, setListItem] = useState(false);
  const [openAddComposerSignal, setOpenAddComposerSignal] = useState(0);
  const listActionsTriggerRef = useRef(null);
  const [collTitle, setCollTitle] = useState(props.coll.title);
  const [columnColor, setColumnColor] = useState(props.coll.color || null);
  const [isWatching, setIsWatching] = useState(Boolean(props.coll.watch));
  const debouncedTitle = useDebounce(collTitle, 1000);

  useEffect(() => {
    setCollTitle(props.coll.title);
  }, [props.coll.title]);

  useEffect(() => {
    setColumnColor(props.coll.color || null);
  }, [props.coll.color]);

  useEffect(() => {
    async function updateColumnTitle() {
      const trimmedTitle = debouncedTitle?.trim();
      if (!trimmedTitle || trimmedTitle === props.coll.title) {
        return;
      }

      try {
        await axios.put("/user/todos/updatecolumn", {
          columnId: props.coll._id,
          title: trimmedTitle,
        });
      } catch (error) {
        console.error("Failed to update column title:", error);
      }
    }

    updateColumnTitle();
  }, [debouncedTitle, props.coll._id, props.coll.title]);

  useEffect(() => {
    setCollTitle(props.coll.title);
  }, [props.coll.title]);

  const cardCount = Array.isArray(props.task) ? props.task.length : 0;

  const handleColorChange = async (color) => {
    setColumnColor(color);
    try {
      await axios.put("/user/todos/updatecolumncolor", {
        columnId: props.coll._id,
        color: color,
      });
    } catch (error) {
      console.error("Failed to update column color:", error);
    }
  };

  const handleOpenAddCardComposer = () => {
    setOpenAddComposerSignal((prev) => prev + 1);
  };

  const handleCopyList = async (nextTitle) => {
    await props.onDuplicateColumn?.(props.coll._id, nextTitle);
  };

  const handleMoveList = async ({ targetBoardId, targetPosition }) => {
    await props.onMoveColumn?.(props.coll._id, {
      targetBoardId,
      targetPosition,
    });
  };

  const handleMoveAllCards = async ({ sourceColumnId, targetColumnId }) => {
    await props.onMoveAllCards?.({ sourceColumnId, targetColumnId });
  };

  const handleToggleWatch = async () => {
    const nextWatch = !isWatching;
    setIsWatching(nextWatch);
    try {
      await props.onToggleColumnWatch?.(props.coll._id, nextWatch);
    } catch (error) {
      setIsWatching(!nextWatch);
      throw error;
    }
  };

  const handleArchiveList = async () => {
    await props.onArchiveList?.(props.coll._id);
  };

  const handleArchiveAllCardsInList = async () => {
    await props.onArchiveAllCardsInList?.(props.coll._id);
  };

  return (
    <div
      className={`${
        isCollapsed ? "rounded-lg" : "w-68 px-1 p-2 rounded-xl"
      } flex flex-col max-h-full transition-all duration-200`}
      style={{
        backgroundColor: columnColor || "rgb(0, 0, 0)",
      }}
    >
      <div
        className={`font-semibold text-sm items-center justify-between text-gray-400 ${
          isCollapsed ? "flex flex-col" : "flex"
        }`}
      >
        {isCollapsed ? (
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            className="hover:bg-gray-400/30 flex flex-col items-center justify-center gap-2 transition-all duration-100 p-3 text-gray-400 rounded-lg"
            aria-label="Expand column"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
              role="presentation"
            >
              <path
                fill="currentcolor"
                fillRule="evenodd"
                d="M6.25 8.75H0v-1.5h6.25zm3.5-1.5H16v1.5H9.75z"
                clipRule="evenodd"
              ></path>
              <path
                fill="currentcolor"
                fillRule="evenodd"
                d="M5.19 8 2.22 5.03l1.06-1.06 3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5-1.06-1.06zm4.03-.53 3.5-3.5 1.06 1.06L10.81 8l2.97 2.97-1.06 1.06-3.5-3.5a.75.75 0 0 1 0-1.06"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="[writing-mode:vertical-lr] mt-1 text-gray-200 text-sm">
              {collTitle}
            </div>
            <div className="text-sm">{cardCount}</div>
          </button>
        ) : (
          <>
            <div className="pl-2">
              <input
                type="text"
                name=""
                value={collTitle}
                onChange={(e) => setCollTitle(e.target.value)}
              />
            </div>
            {isWatching && (
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
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="hover:bg-gray-400/30 transition-all duration-100 rounded-lg p-1.5"
                aria-label="Collapse column"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                  role="presentation"
                >
                  <path
                    fill="currentcolor"
                    fillRule="evenodd"
                    d="M6.25 8.75H0v-1.5h6.25zm3.5-1.5H16v1.5H9.75z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="currentcolor"
                    fillRule="evenodd"
                    d="M5.19 8 2.22 5.03l1.06-1.06 3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5-1.06-1.06zm4.03-.53 3.5-3.5 1.06 1.06L10.81 8l2.97 2.97-1.06 1.06-3.5-3.5a.75.75 0 0 1 0-1.06"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div>
                <div
                  ref={listActionsTriggerRef}
                  onClick={() => {
                    setListItem((e) => !e);
                  }}
                  className={` ${listItem ? "bg-gray-100 hover:bg-gray-200 text-black" : "hover:bg-gray-400/30"}  transition-all duration-100 rounded-lg p-1.5`}
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
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                {listItem && (
                  <ListActionsModal
                    columnOrder={props.column_order}
                    userBoards={props.userBoards}
                    columnsById={props.columnsById}
                    isOpen={listItem}
                    triggerRef={listActionsTriggerRef}
                    onClose={() => setListItem(false)}
                    columnId={props.coll._id}
                    currentBoardId={props.coll.boardId}
                    columnColor={columnColor}
                    onColorChange={handleColorChange}
                    collTitle={collTitle}
                    setCollTitle={setCollTitle}
                    onAddCard={handleOpenAddCardComposer}
                    onCopyList={handleCopyList}
                    onMoveList={handleMoveList}
                    onMoveAllCards={handleMoveAllCards}
                    isWatching={isWatching}
                    onToggleWatch={handleToggleWatch}
                    onArchiveList={handleArchiveList}
                    onArchiveAllCardsInList={handleArchiveAllCardsInList}
                  ></ListActionsModal>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {!isCollapsed && (
        <>
          <Droppable droppableId={props.coll._id}>
            {(provided) => (
              <div
                className="min-h-2 overflow-y-auto scroll scroll-auto scroll-thin flex-1"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.task.map((task, index) => (
                  <TodoCard
                    showTitle={props.showTitle}
                    setShowTitle={props.setShowTitle}
                    allTodos={props.task}
                    fullTodos={props.alltask}
                    setRefetch={props.setRefetch}
                    refetch={props.refetch}
                    cardData={props.cardData}
                    index={index}
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    desc={task.desc}
                    due={task.endDate}
                    timeAdded={task.timeAdded}
                    priority={task.priority}
                    members={task.members || []}
                    labels={task.labels || []}
                    attachments={
                      task.attachments || { trelloCards: [], links: [] }
                    }
                    location={task.location}
                    checklist={task.checklist || []}
                    boardId={task.boardId}
                    completed={task.completed}
                    reminder={task.reminder}
                    startDate={task.startDate}
                    endDate={task.endDate}
                  ></TodoCard>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="mt-2 mx-1 mb-0.5">
            <AddNew
              columnId={props.coll._id}
              boardId={props.coll.boardId}
              onCardAdded={props.onCardAdded}
              openComposerSignal={openAddComposerSignal}
            ></AddNew>
          </div>
        </>
      )}
    </div>
  );
}
