import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { ColumnComp } from "./ColumnComp";
import axios from "axios";
axios.defaults.withCredentials = true;

export function TaskBoard({ boardId }) {
  const [addList, setAddList] = useState(false);
  const [cardData, setcardData] = useState();
  const [columns, setColumns] = useState();
  const [userBoards, setUserBoards] = useState({
    boards: [],
    boardIds: [],
    boardsById: {},
  });
  const [showTitle, setShowTitle] = useState(false);
  const [column_order, setcolumn_order] = useState([]);
  const newlisttitleRef = useRef(null);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    async function getdata() {
      const res = await axios.get("http://localhost:3000/user/todos", {
        params: boardId ? { boardId } : {},
      });
      const data = res.data;
      const column_orderfetch = data.column_order?.[0]?.column_order || [];
      const todofetch = {};
      const columnsfetch = {};
      (data.todos || [])
        .filter((item) => !item?.archived)
        .map((item) => {
        const id = item._id;
        todofetch[id] = item;
      });
      (data.column || [])
        .filter((item) => !item?.archived)
        .map((item) => {
        const id = item._id;
        columnsfetch[id] = item;
      });

      const normalizedOrder = (Array.isArray(column_orderfetch)
        ? column_orderfetch
        : []
      ).filter((id) => Boolean(columnsfetch[id]));

      setColumns(columnsfetch);
      setcardData(todofetch);
      setcolumn_order(normalizedOrder);
      console.log(cardData);
    }
    const loadBoards = async () => {
      const res = await axios.get("http://localhost:3000/user/boards");
      setUserBoards(
        res.data || {
          boards: [],
          boardIds: [],
          boardsById: {},
        }
      );
    };
    loadBoards();
    getdata();
  }, [refetch]);

  async function createColumn(e) {
    e?.stopPropagation();

    const title = newlisttitleRef.current?.value?.trim();
    if (!title || !boardId) {
      return;
    }

    const res = await axios.post(
      "http://localhost:3000/user/todos/createcolumn",
      {
        title,
        boardId,
      },
    );

    const newColumn = res.data?.column;
    if (!newColumn?._id) {
      return;
    }

    setcolumn_order((prev) => [...prev, newColumn._id]);
    setColumns((prev) => ({ ...prev, [newColumn._id]: newColumn }));
    setAddList(false);
  }
  function ondragend(result) {
    const { draggableId, source, destination } = result;
    if (
      !destination ||
      (source.droppableId == destination.droppableId &&
        source.index == destination.index)
    ) {
      return;
    } else if (
      source.droppableId == destination.droppableId &&
      source.index != destination.index
    ) {
      setColumns((item) => {
        const sourceColumn = item[source.droppableId];
        const newTaskIds = Array.from(sourceColumn.tasks);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        postcolumnstateintra(source.droppableId, newTaskIds);
        const newState = {
          ...item,
          [source.droppableId]: {
            ...sourceColumn,
            tasks: newTaskIds,
          },
        };

        return newState;
      });
    } else if (source.droppableId != destination.droppableId) {
      setColumns((item) => {
        const sourceColumn = item[source.droppableId];
        const destinationColumn = item[destination.droppableId];
        const newTaskIdsSource = Array.from(sourceColumn.tasks);
        const newTaskIdsDestination = Array.from(destinationColumn.tasks);
        newTaskIdsSource.splice(source.index, 1);
        newTaskIdsDestination.splice(destination.index, 0, draggableId);
        postcolumnstateinter(
          source.droppableId,
          destination.droppableId,
          newTaskIdsSource,
          newTaskIdsDestination,
        );
        const newState = {
          ...item,
          [source.droppableId]: {
            ...sourceColumn,
            tasks: newTaskIdsSource,
          },
          [destination.droppableId]: {
            ...destinationColumn,
            tasks: newTaskIdsDestination,
          },
        };

        return newState;
      });
    }
  }

  async function postcolumnstateintra(id, task) {
    const res = await axios.post(
      "http://localhost:3000/user/todos/reordertask",
      { taskarr1: task, columnId1: id },
    );
  }
  async function postcolumnstateinter(id1, id2, task1, task2) {
    const res = await axios.post(
      "http://localhost:3000/user/todos/reordertask",
      { taskarr1: task1, taskarr2: task2, columnId1: id1, columnId2: id2 },
    );
  }

  function onCardAdded(columnId, todo, updatedTasks) {
    if (!todo?._id) {
      return;
    }

    const normalizedTodo = {
      ...todo,
      labels: Array.isArray(todo.labels) ? todo.labels : [],
      members: Array.isArray(todo.members) ? todo.members : [],
      checklist: Array.isArray(todo.checklist) ? todo.checklist : [],
      attachments: {
        trelloCards: Array.isArray(todo.attachments?.trelloCards)
          ? todo.attachments.trelloCards
          : [],
        links: Array.isArray(todo.attachments?.links)
          ? todo.attachments.links
          : [],
      },
    };

    const normalizedTasksFromServer = Array.isArray(updatedTasks)
      ? updatedTasks
          .map((taskId) => (typeof taskId === "string" ? taskId : taskId?._id))
          .filter(Boolean)
      : null;

    setcardData((prev) => ({
      ...prev,
      [todo._id]: normalizedTodo,
    }));

    setColumns((prev) => {
      const currentColumn = prev?.[columnId];
      if (!currentColumn) {
        return prev;
      }

      const nextTasks = normalizedTasksFromServer
        ? normalizedTasksFromServer
        : [...currentColumn.tasks, todo._id];

      return {
        ...prev,
        [columnId]: {
          ...currentColumn,
          tasks: nextTasks,
        },
      };
    });
  }

  async function onDuplicateColumn(sourceColumnId, title) {
    const trimmedTitle = title?.trim();
    if (!trimmedTitle) {
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/user/todos/duplicatelist",
        {
          sourceColumnId,
          title: trimmedTitle,
        },
      );

      const duplicatedColumn = res.data?.column;
      const duplicatedTodos = Array.isArray(res.data?.todos)
        ? res.data.todos
        : [];
      const nextOrderFromServer = Array.isArray(res.data?.column_order)
        ? res.data.column_order
            .map((id) => (typeof id === "string" ? id : id?._id))
            .filter(Boolean)
        : null;

      if (!duplicatedColumn?._id) {
        return;
      }

      const duplicatedTaskIds = duplicatedTodos
        .map((todo) => (typeof todo?._id === "string" ? todo._id : null))
        .filter(Boolean);

      setcardData((prev) => {
        const next = { ...prev };

        duplicatedTodos.forEach((todo) => {
          if (!todo?._id) {
            return;
          }

          next[todo._id] = {
            ...todo,
            labels: Array.isArray(todo.labels) ? todo.labels : [],
            members: Array.isArray(todo.members) ? todo.members : [],
            checklist: Array.isArray(todo.checklist) ? todo.checklist : [],
            attachments: {
              trelloCards: Array.isArray(todo.attachments?.trelloCards)
                ? todo.attachments.trelloCards
                : [],
              links: Array.isArray(todo.attachments?.links)
                ? todo.attachments.links
                : [],
            },
          };
        });

        return next;
      });

      setColumns((prev) => ({
        ...prev,
        [duplicatedColumn._id]: {
          ...duplicatedColumn,
          tasks: duplicatedTaskIds,
        },
      }));

      if (nextOrderFromServer && nextOrderFromServer.length > 0) {
        setcolumn_order(nextOrderFromServer);
      } else {
        setcolumn_order((prev) => {
          const next = Array.isArray(prev) ? [...prev] : [];
          const sourceIndex = next.indexOf(sourceColumnId);
          if (sourceIndex === -1) {
            next.push(duplicatedColumn._id);
          } else {
            next.splice(sourceIndex + 1, 0, duplicatedColumn._id);
          }
          return next;
        });
      }
    } catch (error) {
      console.error("Failed to duplicate column:", error);
      throw error;
    }
  }

  async function onMoveColumn(sourceColumnId, { targetBoardId, targetPosition }) {
    const normalizedColumnId = String(sourceColumnId || "").trim();
    const normalizedBoardId = String(targetBoardId || "").trim();
    const normalizedPosition = Number(targetPosition);

    if (
      !normalizedColumnId ||
      !normalizedBoardId ||
      !Number.isFinite(normalizedPosition)
    ) {
      return;
    }

    try {
      const res = await axios.put("http://localhost:3000/user/todos/movelist", {
        columnId: normalizedColumnId,
        targetBoardId: normalizedBoardId,
        targetPosition: normalizedPosition,
      });

      const nextOrderFromServer = Array.isArray(res.data?.sourceColumnOrder)
        ? res.data.sourceColumnOrder
            .map((id) => String(id || ""))
            .filter(Boolean)
        : null;

      setColumns((prev) => {
        const current = prev?.[normalizedColumnId];
        if (!current) {
          return prev;
        }

        return {
          ...prev,
          [normalizedColumnId]: {
            ...current,
            boardId: normalizedBoardId,
          },
        };
      });

      if (nextOrderFromServer) {
        setcolumn_order(nextOrderFromServer);
      }
    } catch (error) {
      console.error("Failed to move column:", error);
      throw error;
    }
  }

  async function onMoveAllCards({ sourceColumnId, targetColumnId }) {
    const sourceId = String(sourceColumnId || "").trim();
    const targetId = String(targetColumnId || "").trim();

    if (!sourceId || !targetId || sourceId === targetId) {
      return;
    }

    const sourceTasks = Array.isArray(columns?.[sourceId]?.tasks)
      ? columns[sourceId].tasks
      : [];
    const targetTasks = Array.isArray(columns?.[targetId]?.tasks)
      ? columns[targetId].tasks
      : [];

    const nextTargetTasks = [...targetTasks, ...sourceTasks];

    try {
      await axios.put("http://localhost:3000/user/todos/moveallcards", {
        sourceColumnId: sourceId,
        targetColumnId: targetId,
      });

      setColumns((prev) => {
        const sourceColumn = prev?.[sourceId];
        const targetColumn = prev?.[targetId];
        if (!sourceColumn || !targetColumn) {
          return prev;
        }

        return {
          ...prev,
          [sourceId]: {
            ...sourceColumn,
            tasks: [],
          },
          [targetId]: {
            ...targetColumn,
            tasks: nextTargetTasks,
          },
        };
      });

      setcardData((prev) => {
        const next = { ...prev };
        sourceTasks.forEach((todoId) => {
          if (!next[todoId]) {
            return;
          }
          next[todoId] = {
            ...next[todoId],
            columnId: targetId,
          };
        });
        return next;
      });
    } catch (error) {
      console.error("Failed to move all cards:", error);
      throw error;
    }
  }

  async function onToggleColumnWatch(columnId, nextWatch) {
    const normalizedColumnId = String(columnId || "").trim();
    if (!normalizedColumnId) {
      return;
    }

    try {
      const res = await axios.put("http://localhost:3000/user/todos/togglecolumnwatch", {
        columnId: normalizedColumnId,
      });

      const watchFromServer = Boolean(res.data?.watch);
      setColumns((prev) => {
        const current = prev?.[normalizedColumnId];
        if (!current) {
          return prev;
        }

        return {
          ...prev,
          [normalizedColumnId]: {
            ...current,
            watch: watchFromServer,
          },
        };
      });
    } catch (error) {
      console.error("Failed to toggle watch:", error);
      throw error;
    }
  }

  async function onArchiveList(columnId) {
    const normalizedColumnId = String(columnId || "").trim();
    if (!normalizedColumnId) {
      return;
    }

    try {
      await axios.put("http://localhost:3000/user/todos/archivelist", {
        columnId: normalizedColumnId,
      });

      setColumns((prev) => {
        const next = { ...prev };
        delete next[normalizedColumnId];
        return next;
      });

      setcolumn_order((prev) =>
        (Array.isArray(prev) ? prev : []).filter(
          (id) => String(id) !== normalizedColumnId,
        ),
      );

      setcardData((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((todoId) => {
          if (String(next[todoId]?.columnId) === normalizedColumnId) {
            delete next[todoId];
          }
        });
        return next;
      });
    } catch (error) {
      console.error("Failed to archive list:", error);
      throw error;
    }
  }

  async function onArchiveAllCardsInList(columnId) {
    const normalizedColumnId = String(columnId || "").trim();
    if (!normalizedColumnId) {
      return;
    }

    try {
      await axios.put("http://localhost:3000/user/todos/archiveallcardsinlist", {
        columnId: normalizedColumnId,
      });

      setColumns((prev) => {
        const currentColumn = prev?.[normalizedColumnId];
        if (!currentColumn) {
          return prev;
        }

        return {
          ...prev,
          [normalizedColumnId]: {
            ...currentColumn,
            tasks: [],
          },
        };
      });

      setcardData((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((todoId) => {
          if (String(next[todoId]?.columnId) === normalizedColumnId) {
            delete next[todoId];
          }
        });
        return next;
      });
    } catch (error) {
      console.error("Failed to archive all cards in list:", error);
      throw error;
    }
  }

  return (
    <div className="h-full">
      <div
        onClick={() => {
          setAddList(false);
        }}
        className="h-full overflow-x-auto overflow-y-hidden p-3 py-5 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300"
      >
        {!columns || !cardData || !column_order ? null : (
          <DragDropContext onDragEnd={ondragend}>
            <div className="flex h-full justify-start min-w-fit">
              {column_order.map((column_id) => {
                const coll = columns[column_id];
                if (!coll || coll.archived) {
                  return null;
                }
                const task = coll.tasks
                  .map((id) => cardData[id])
                  .filter((todo) => Boolean(todo) && !todo.archived);
                return (
                  <div key={coll._id} className="mr-5 h-full">
                    <ColumnComp
                    column_order={column_order}
                    userBoards={userBoards}
                    columnsById={columns}
                      showTitle={showTitle}
                      setShowTitle={setShowTitle}
                      onDuplicateColumn={onDuplicateColumn}
                      onMoveColumn={onMoveColumn}
                      onMoveAllCards={onMoveAllCards}
                      onToggleColumnWatch={onToggleColumnWatch}
                      onArchiveList={onArchiveList}
                      onArchiveAllCardsInList={onArchiveAllCardsInList}
                      onCardAdded={onCardAdded}
                      setRefetch={setRefetch}
                      cardData={cardData}
                      id={coll.id}
                      coll={coll}
                      task={task}
                      alltask={cardData}
                    ></ColumnComp>
                  </div>
                );
              })}
              {addList ? (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-68 h-fit bg-black p-2 rounded-xl"
                >
                  <div>
                    <input
                      className="text-gray-300 bg-gray-600/40 w-full rounded text-[13px] font-semibold py-1.5 hover:bg-gray-600/50 transition-all duration-100 mb-2 outline px-2.5 outline-gray-500"
                      autoFocus={true}
                      ref={newlisttitleRef}
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter list name..."
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={createColumn}
                      className="bg-blue-400 text-sm font-medium px-3 py-1.5 rounded"
                    >
                      Add list
                    </button>
                    <div
                      onClick={() => {
                        setAddList(false);
                      }}
                      className="text-gray-400 text-[14px] cursor-pointer hover:bg-gray-400/20 py-1.5 rounded px-1.5 transition-all duration-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddList(true);
                  }}
                  className="w-68 h-fit cursor-pointer flex gap-2 px-2.5 py-3 items-center text-white bg-gray-200/30 hover:bg-gray-300/30 transition-all duration-100 rounded-xl text-[13px] font-semibold"
                >
                  <div>
                    <svg
                      className="size-4.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                  <div>Add another list</div>
                </div>
              )}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
