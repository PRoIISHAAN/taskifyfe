import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePortalPosition } from "@/hooks/usePortalPosition";

const COLORS = [
  { name: "Green", value: "#226f4f" },
  { name: "Yellow", value: "#7f5f02" },
  { name: "Orange", value: "#7f5f02" },
  { name: "Red", value: "#af2e24" },
  { name: "Purple", value: "#8040a5" },
  { name: "Blue", value: "#1458bd" },
  { name: "Teal", value: "#216b84" },
  { name: "Lime", value: "#4d6b1f" },
  { name: "Pink", value: "#953d73" },
  { name: "Default", value: "#101204" },
];

export function ListActionsModal(props) {
  const {
    onClose,
    triggerRef,
    columnOrder,
    isOpen,
    columnId,
    currentBoardId,
    columnColor,
    onColorChange,
    onAddCard,
    collTitle,
    onCopyList,
    onMoveList,
    onMoveAllCards,
    isWatching,
    onToggleWatch,
    onArchiveList,
    onArchiveAllCardsInList,
    userBoards,
    columnsById,
  } = props;
  const modalRef = useRef(null);
  const boardSearchRef = useRef(null);
  const isMountedRef = useRef(true);
  const copyAttemptIdRef = useRef(0);
  const [whichMenu, setWhichMenu] = useState("List actions");
  const [copyTitle, setCopyTitle] = useState(collTitle || "");
  const [searchResultsBoxOpen, setSearchResultsBoxOpen] = useState(false);
  const [positionSelectBoxOpen, setPositionSelectBoxOpen] = useState(false);
  const getInitialColumnPositionValue = () => {
    const order = Array.isArray(columnOrder) ? columnOrder : [];
    const index = order.findIndex(
      (id) => String(id || "") === String(columnId || ""),
    );

    return index + 1;
  };
  const [columnPositionValue, setColumnPositionValue] = useState(
    getInitialColumnPositionValue,
  );
  const [finalColumnPositionValue, setFinalColumnPositionValue] =
    useState(columnPositionValue);
  const columnPositionRef = useRef(null);
  const [searchPositionValue, setSearchPositionValue] = useState("");
  const [copying, setCopying] = useState(false);
  const [moving, setMoving] = useState(false);
  const [movingAllCardsTargetId, setMovingAllCardsTargetId] = useState("");
  const [selectedBoardId, setSelectedBoardId] = useState(currentBoardId);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAutomationPicker, setShowAutomationPicker] = useState(false);
  const [moveListBoardTitle, setMoveListBoardTitle] = useState(
    userBoards.boardsById[currentBoardId]?.title || "",
  );
  const [searchTitle, setSearchTitle] = useState("");
  const position = usePortalPosition(triggerRef, isOpen);
  const boardsList = Array.isArray(userBoards?.boards) ? userBoards.boards : [];
  const filteredBoards = boardsList
    .filter((board) => {
      const boardTitle = (board?.title || "").toLowerCase();
      const query = searchTitle.trim().toLowerCase();
      if (!query) {
        return true;
      }
      return boardTitle.includes(query);
    })
    .map((board) => ({
      boardId: String(board?._id || ""),
      title: board?.title || "Untitled board",
    }));

  const filteredPositions = (Array.isArray(columnOrder) ? columnOrder : [])
    .map((columnId, index) => ({
      columnId: String(columnId || ""),
      columnNumber: index + 1,
    }))
    .filter((position) => {
      const query = searchPositionValue.trim().toLowerCase();
      if (!query) {
        return true;
      }
      return position.columnNumber.toString().toLowerCase().includes(query);
    });

  const currentBoardColumns = (Array.isArray(columnOrder) ? columnOrder : [])
    .map((id) => columnsById?.[id])
    .filter(
      (column) =>
        column && String(column.boardId || "") === String(currentBoardId || ""),
    );

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const cancelCopyRetry = () => {
    copyAttemptIdRef.current += 1;
    setCopying(false);
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event) => {
      const clickedInsideModal = modalRef.current?.contains(event.target);
      const clickedTrigger = triggerRef?.current?.contains(event.target);

      if (!clickedInsideModal && !clickedTrigger) {
        cancelCopyRetry();
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  useEffect(() => {
    if (!searchResultsBoxOpen) {
      return;
    }

    const handleOutsideDropdownClick = (event) => {
      const clickedInsideSearch = boardSearchRef.current?.contains(
        event.target,
      );
      if (!clickedInsideSearch) {
        setSearchResultsBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideDropdownClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideDropdownClick);
    };
  }, [searchResultsBoxOpen]);

  useEffect(() => {
    if (!positionSelectBoxOpen) {
      return;
    }

    const handleOutsidePositionClick = (event) => {
      const clickedInsidePosition = columnPositionRef.current?.contains(
        event.target,
      );
      if (!clickedInsidePosition) {
        setPositionSelectBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsidePositionClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsidePositionClick);
    };
  }, [positionSelectBoxOpen]);

  return createPortal(
    <div
      ref={modalRef}
      style={{ top: position.top, left: position.left }}
      className="w-[310px] flex pb-3 flex-col fixed z-50 bg-[#282e33] text-[14px] rounded-lg border border-[#39424a] text-[#adb8c5]"
    >
      <div className="p-3">
        <div className="flex justify-between items-center">
          {whichMenu !== "List actions" ? (
            <div
              className="cursor-pointer hover:bg-[#3c464e] absolute left-3 rounded-md"
              onClick={() => {
                cancelCopyRetry();
                setWhichMenu("List actions");
              }}
            >
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
          <div
            className="cursor-pointer hover:bg-[#3c464e] absolute right-3 rounded-md"
            onClick={() => {
              cancelCopyRetry();
              onClose();
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
      </div>
      {whichMenu === "List actions" ? (
        <div>
          <div className="text-gray-300 flex flex-col">
            <button
              onClick={() => {
                onAddCard?.();
                onClose?.();
              }}
              className="p-1.5 px-3 text-start hover:bg-gray-400/10"
            >
              Add card
            </button>
            <button
              onClick={() => {
                setWhichMenu("Copy list");
              }}
              className="p-1.5 px-3 text-start hover:bg-gray-400/10"
            >
              Copy list
            </button>
            <button
              onClick={() => {
                setWhichMenu("Move list");
              }}
              className="p-1.5 px-3 text-start hover:bg-gray-400/10"
            >
              Move list
            </button>
            <button
              onClick={() => {
                setWhichMenu("Move all cards in list");
              }}
              className="p-1.5 px-3 text-start hover:bg-gray-400/10"
            >
              Move all cards in list
            </button>
            <button
              onClick={async () => {
                try {
                  await onToggleWatch?.();
                } catch (error) {
                  console.error("Failed to toggle watch:", error);
                }
              }}
              className="p-1.5 px-3 pr-4 flex items-center justify-between text-start hover:bg-gray-400/10"
            >
              Watch
              <svg
                fill="none"
                width={18}
                height={18}
                viewBox="0 0 16 16"
                role="presentation"
                class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
              >
                <path
                  fill="currentcolor"
                  d="m13.959 3.97-7.25 9a.75.75 0 0 1-1.163.007l-3.5-4.25 1.158-.954 2.914 3.539 6.673-8.283z"
                ></path>
              </svg>
            </button>
          </div>
          <hr className="mx-3 my-2 border-gray-700" />
          <div className="px-3">
            <div
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="hover:text-gray-300 font-semibold cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center text-xs justify-between w-full">
                <span className="flex items-center gap-2">
                  Change list color
                  <span className="relative inline-flex items-center justify-center rounded font-semibold">
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
                </span>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className={`transition-transform mr-2 ${showColorPicker ? "rotate-180" : ""}`}
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-200 ease-out ${
                showColorPicker
                  ? "max-h-56 opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="mt-2 grid grid-cols-5 gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => {
                      onColorChange(color.value);
                    }}
                    className="relative w-full h-8 rounded overflow-hidden group cursor-pointer"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {columnColor === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  onColorChange("#101204");
                }}
                className="w-full mt-2 p-1.5 hover:bg-gray-400/20 bg-gray-400/10  rounded text-center font-semibold text-[14px] text-gray-300 flex items-center justify-center gap-2"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Remove color
              </button>
            </div>
          </div>
          <hr className="mx-3 my-2 border-gray-700" />
          {/* <div>
            <div
              onClick={() => setShowAutomationPicker(!showAutomationPicker)}
              className="hover:text-gray-300 font-semibold text-xs px-3 cursor-pointer rounded flex items-center justify-between"
            >
              <div className="flex items-center justify-between w-full">
                <span className="">Automation</span>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className={`transition-transform mr-2 ${showAutomationPicker ? "rotate-180" : ""}`}
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all text-gray-300 duration-200 ease-out ${
                showAutomationPicker
                  ? "max-h-56 opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <button className="p-1.5 px-3 text-start w-full hover:bg-gray-400/10">
                When a card is added to the list...
              </button>
              <button className="p-1.5 px-3 text-start w-full hover:bg-gray-400/10">
                Every day, sort the list by...
              </button>
              <button className="p-1.5 px-3 text-start w-full hover:bg-gray-400/10">
                Every Monday, sort the list by...
              </button>
              <button className="p-1.5 px-3 text-start w-full hover:bg-gray-400/10">
                Create a rule
              </button>
            </div>
          </div>
          <hr className="mx-3 my-2 border-gray-700" /> */}
          <div className="text-gray-300 flex flex-col">
            <button
              onClick={async () => {
                try {
                  await onArchiveList?.();
                  onClose?.();
                } catch (error) {
                  console.error("Failed to archive list:", error);
                }
              }}
              className="p-1.5 px-3 text-start hover:bg-gray-400/10"
            >
              Archive this list
            </button>
            <button
              onClick={async () => {
                try {
                  await onArchiveAllCardsInList?.();
                  onClose?.();
                } catch (error) {
                  console.error(
                    "Failed to archive all cards in this list:",
                    error,
                  );
                }
              }}
              className="p-1.5 px-3 text-start hover:bg-gray-400/10"
            >
              Archive all cards in this list
            </button>
          </div>
        </div>
      ) : whichMenu === "Copy list" ? (
        <div className="flex flex-col gap-1 items-start px-3">
          <div className="pointer-events-none font-semibold text-xs">Name</div>
          <textarea
            className="bg-black/40 rounded outline-gray-400 outline-1 px-2 py-1 w-full"
            value={copyTitle}
            onChange={(e) => setCopyTitle(e.target.value)}
          ></textarea>
          <button
            disabled={copying || !copyTitle.trim()}
            onClick={async () => {
              const nextTitle = copyTitle.trim();
              if (!nextTitle || copying) {
                return;
              }

              setCopying(true);
              const attemptId = copyAttemptIdRef.current + 1;
              copyAttemptIdRef.current = attemptId;

              while (
                isMountedRef.current &&
                isOpen &&
                whichMenu === "Copy list" &&
                copyAttemptIdRef.current === attemptId
              ) {
                try {
                  await onCopyList?.(nextTitle);
                  if (
                    !isMountedRef.current ||
                    !isOpen ||
                    whichMenu !== "Copy list" ||
                    copyAttemptIdRef.current !== attemptId
                  ) {
                    return;
                  }

                  setCopying(false);
                  onClose?.();
                  return;
                } catch (error) {
                  await wait(1000);
                }
              }
            }}
            className="bg-blue-400 hover:cursor-pointer mt-2 hover:bg-blue-300 text-sm text-black font-medium px-3 py-1.5 rounded disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {copying ? "Creating..." : "Create list"}
          </button>
        </div>
      ) : whichMenu === "Move list" ? (
        <div className="flex flex-col gap-2 text-gray-300 items-start px-3">
          <div className="pointer-events-none  text-sm">Board</div>
          <div ref={boardSearchRef} className="w-full relative">
            <input
              onClick={() => {
                setSearchResultsBoxOpen((e) => !e);
              }}
              onChange={(e) => {
                setMoveListBoardTitle(e.target.value);
                setSearchTitle(e.target.value);
              }}
              className=" outline-1 p-2.5 focus:outline-2 focus:outline-blue-400 outline-gray-500 rounded bg-black/20 w-full cursor-pointer hover:bg-black/10"
              value={moveListBoardTitle}
              type="text"
              name=""
              id=""
              placeholder="Search boards by title"
            />
            {searchResultsBoxOpen && (
              <div className="bg-[#2b2c2f] z-50 mt-2 absolute rounded shadow-md shadow-black/70 max-h-58 overflow-clip w-full">
                <div className="py-3 my-1 max-h-56 bg-[#2b2c2f] w-full overflow-y-auto">
                  {filteredBoards.length !== 0 && (
                    <div className="text-xs mb-1 px-2 font-semibold">
                      Trello Workspace
                    </div>
                  )}
                  {filteredBoards.length === 0 ? (
                    <div className="p-2 flex items-center justify-center text-sm font-semibold text-gray-400">
                      No Options
                    </div>
                  ) : (
                    filteredBoards.map((board) => {
                      const boardId = board.boardId;
                      const isCurrentBoard =
                        String(currentBoardId || "") === boardId;
                      const isSelected = selectedBoardId === boardId;

                      return (
                        <button
                          key={boardId}
                          type="button"
                          onClick={() => {
                            setSelectedBoardId(boardId);
                            setSearchTitle("");
                            setMoveListBoardTitle(board.title || "");
                            setSearchResultsBoxOpen(false);
                          }}
                          className={`w-full relative text-left cursor-pointer px-2 py-1.5 text-sm hover:before:content-[''] hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-[2px] hover:before:bg-blue-500 ${
                            isSelected
                              ? "bg-blue-700/30 text-blue-400 hover:bg-blue-600/30 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-blue-500"
                              : "hover:bg-gray-400/10"
                          }`}
                        >
                          <div>{board.title || "Untitled board"}</div>
                          {isCurrentBoard ? <div>(current)</div> : null}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="pointer-events-none text-gray-300 text-sm">
            Position
          </div>
          <div ref={columnPositionRef} className="w-full relative">
            <input
              onClick={() => {
                setPositionSelectBoxOpen((e) => !e);
              }}
              onChange={(e) => {
                setColumnPositionValue(e.target.value);
                setSearchPositionValue(e.target.value);
              }}
              className=" outline-1 p-2.5 cursor-pointer focus:outline-2 focus:outline-blue-400 outline-gray-500 rounded bg-black/20 w-full hover:bg-black/10"
              value={columnPositionValue}
              type="text"
              name=""
              id=""
              placeholder="Search column position"
            />
            {positionSelectBoxOpen && (
              <div className="bg-[#2b2c2f] z-50 mt-2 absolute rounded shadow-md shadow-black/70 max-h-58 overflow-clip w-full">
                <div className="py-3 my-1 max-h-56 bg-[#2b2c2f] w-full overflow-y-auto">
                  {filteredPositions.length === 0 ? (
                    <div className="p-2 flex items-center justify-center text-sm font-semibold text-gray-400">
                      No Options
                    </div>
                  ) : (
                    filteredPositions.map((position) => {
                      const isSelected =
                        String(finalColumnPositionValue) ===
                        String(position.columnNumber);

                      return (
                        <button
                          key={position.columnNumber}
                          type="button"
                          onClick={() => {
                            setColumnPositionValue(
                              String(position.columnNumber),
                            );
                            setFinalColumnPositionValue(
                              String(position.columnNumber),
                            );
                            setSearchPositionValue("");
                            setPositionSelectBoxOpen(false);
                          }}
                          className={`w-full relative text-left cursor-pointer px-2 py-1.5 text-sm hover:before:content-[''] hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-[2px] hover:before:bg-blue-500 ${
                            isSelected
                              ? "bg-blue-700/30 text-blue-400 hover:bg-blue-600/30 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-blue-500"
                              : "hover:bg-gray-400/10"
                          }`}
                        >
                          <div>{position.columnNumber}</div>
                          {getInitialColumnPositionValue() ===
                          position.columnNumber ? (
                            <div className="text-xs">(current)</div>
                          ) : null}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            disabled={moving}
            onClick={async () => {
              if (moving) {
                return;
              }

              const targetBoardId = String(selectedBoardId || "").trim();
              const rawPosition =
                String(finalColumnPositionValue || "").trim() ||
                String(columnPositionValue || "").trim();
              const targetPosition = Number(rawPosition);

              if (!targetBoardId || !Number.isFinite(targetPosition)) {
                return;
              }

              try {
                setMoving(true);
                await onMoveList?.({
                  targetBoardId,
                  targetPosition,
                });
                onClose?.();
              } catch (error) {
                console.error("Failed to move list:", error);
              } finally {
                setMoving(false);
              }
            }}
            className="bg-blue-400 hover:cursor-pointer hover:bg-blue-300 text-sm text-black font-medium px-6 py-1.5 rounded disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {moving ? "Moving..." : "Move"}
          </button>
        </div>
      ) : whichMenu === "Move all cards in list" ? (
        <div className="flex flex-col">
          {currentBoardColumns.length === 0 ? (
            <div className="text-sm text-gray-400">No columns available</div>
          ) : (
            currentBoardColumns.map((column) => (
              <button
                key={String(column._id)}
                type="button"
                disabled={
                  String(column._id) === String(columnId) ||
                  movingAllCardsTargetId === String(column._id)
                }
                onClick={async () => {
                  const targetColumnId = String(column._id || "");
                  if (!targetColumnId || targetColumnId === String(columnId)) {
                    return;
                  }

                  try {
                    setMovingAllCardsTargetId(targetColumnId);
                    await onMoveAllCards?.({
                      sourceColumnId: String(columnId || ""),
                      targetColumnId,
                    });
                    onClose?.();
                  } catch (error) {
                    console.error("Failed to move all cards:", error);
                  } finally {
                    setMovingAllCardsTargetId("");
                  }
                }}
                className="w-full text-[15px] disabled:cursor-not-allowed disabled:text-gray-500 text-left px-3 py-2 enabled:hover:bg-gray-400/10 disabled:hover:bg-transparent text-gray-300"
              >
                {movingAllCardsTargetId === String(column._id)
                  ? "Moving..."
                  : `${column.title || "Untitled column"}${
                      String(column._id) === String(columnId)
                        ? " (current)"
                        : ""
                    }`}
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}
