import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { CollumnComp } from "./CollumnComp";
import axios from "axios";
axios.defaults.withCredentials = true;

export function TaskBoard() {
  const [addList, setAddList] = useState(false);
  const [cardData, setcardData] = useState();
  const [collumns, setCollumns] = useState();
  const [collumn_order, setcollumn_order] = useState([]);
  const newlisttitleRef = useRef(null);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    async function getdata() {
      const res = await axios.get("http://localhost:3000/user/todos");
      const data = res.data;
      const collumn_orderfetch = data.collumn_order[0].collumn_order;
      const todofetch = {};
      const collumnsfetch = {};
      data.todos.map((item) => {
        const id = item._id;
        todofetch[id] = item;
      });
      data.collumn.map((item) => {
        const id = item._id;
        collumnsfetch[id] = item;
      });
      setCollumns(collumnsfetch);
      setcardData(todofetch);
      setcollumn_order(collumn_orderfetch);
    }
    getdata();
  }, [refetch]);
  function createCollumn() {
    const res = axios.post("http://localhost:3000/user/todos/createcollumn", {
      title: newlisttitleRef.current.value,
      boardId: "Test",
    });
    setcollumn_order([...collumn_order, res.data.collumn._id]);
    setCollumns({ ...collumns, [res.data.collumn._id]: res.data.collumn });
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
      setCollumns((item) => {
        const sourceCollumn = item[source.droppableId];
        const newTaskIds = Array.from(sourceCollumn.tasks);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        postcollumnstateintra(source.droppableId, newTaskIds);
        const newState = {
          ...item,
          [source.droppableId]: {
            ...sourceCollumn,
            tasks: newTaskIds,
          },
        };

        return newState;
      });
    } else if (source.droppableId != destination.droppableId) {
      setCollumns((item) => {
        const sourceCollumn = item[source.droppableId];
        const destinationCollumn = item[destination.droppableId];
        const newTaskIdsSource = Array.from(sourceCollumn.tasks);
        const newTaskIdsDestination = Array.from(destinationCollumn.tasks);
        newTaskIdsSource.splice(source.index, 1);
        newTaskIdsDestination.splice(destination.index, 0, draggableId);
        postcollumnstateinter(
          source.droppableId,
          destination.droppableId,
          newTaskIdsSource,
          newTaskIdsDestination
        );
        const newState = {
          ...item,
          [source.droppableId]: {
            ...sourceCollumn,
            tasks: newTaskIdsSource,
          },
          [destination.droppableId]: {
            ...destinationCollumn,
            tasks: newTaskIdsDestination,
          },
        };

        return newState;
      });
    }
  }

  async function postcollumnstateintra(id, task) {
    const res = await axios.post(
      "http://localhost:3000/user/todos/reordertask",
      { taskarr1: task, collumnId1: id }
    );
  }
  async function postcollumnstateinter(id1, id2, task1, task2) {
    const res = await axios.post(
      "http://localhost:3000/user/todos/reordertask",
      { taskarr1: task1, taskarr2: task2, collumnId1: id1, collumnId2: id2 }
    );
  }

  return (
    <div
      onClick={() => {
        if (addList == true) {
          setAddList(false);
        }
      }}
      className="h-full w-full overflow-x-auto overflow-y-hidden p-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300"
    >
      {!collumns || !cardData || !collumn_order ? null : (
        <DragDropContext onDragEnd={ondragend}>
          <div className="flex justify-start min-w-fit mt-5">
            {collumn_order.map((collumn_id) => {
              const coll = collumns[collumn_id];
              const task = coll.tasks.map((id) => cardData[id]);
              return (
                <div key={coll._id} className="mr-5 w-68">
                  <CollumnComp
                  setRefetch={setRefetch}
                  cardData={cardData}
                    id={coll.id}                    
                    coll={coll}
                    task={task}
                  ></CollumnComp>
                </div>
              );
            })}
            {addList ? (
              <div className="w-68 h-fit bg-black p-2 rounded-xl">
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
                    onClick={createCollumn}
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
                onClick={() => {
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
  );
}
