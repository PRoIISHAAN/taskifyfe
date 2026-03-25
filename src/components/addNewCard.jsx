import { useEffect, useRef, useState } from "react";
import axios from "axios";

export function AddNew(props) {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (adding) {
      inputRef.current?.focus();
    }
  }, [adding]);

  useEffect(() => {
    if (!props.openComposerSignal) {
      return;
    }

    setAdding(true);

    requestAnimationFrame(() => {
      inputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [props.openComposerSignal]);

  async function addCard() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || saving) {
      return;
    }

    try {
      setSaving(true);
      const res = await axios.post("/user/todos", {
        title: trimmedTitle,
        desc: "",
        priority: "",
        columnId: props.columnId,
        boardId: props.boardId,
      });

      const payload = res.data || {};
      const updatedColumn = payload.updatedColumn || payload;
      const updatedTasks = Array.isArray(updatedColumn?.tasks)
        ? updatedColumn.tasks
        : null;

      const lastTask = updatedTasks?.[updatedTasks.length - 1];
      const derivedTodoId =
        payload.todo?._id ||
        (typeof lastTask === "string" ? lastTask : lastTask?._id);

      const createdTodo = payload.todo ||
        (derivedTodoId
          ? {
              _id: derivedTodoId,
              title: trimmedTitle,
              desc: "",
              priority: "",
              boardId: props.boardId,
              columnId: props.columnId,
              completed: false,
              timeAdded: new Date().toISOString(),
              members: [],
              labels: [],
              checklist: [],
              attachments: { trelloCards: [], links: [] },
            }
          : null);

      if (createdTodo) {
        props.onCardAdded?.(props.columnId, createdTodo, updatedTasks);
      }

      setTitle("");
      setAdding(false);
    } catch (error) {
      console.error("Failed to add card", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {adding ? (
        <div className="flex flex-col gap-2">
          <div>
            <input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCard();
                }
              }}
              className="bg-gray-300/20 w-full focus:ring-2 focus:outline-none ring-blue-400 text-[15px] text-gray-300 p-1.5 rounded-md pb-6"
              type="text"
              name="add card input"
              id=""
              placeholder="Enter a title or paste a link"
            />
          </div>
          <div className="flex gap-1">
            <button
              disabled={saving}
              onClick={addCard}
              className="bg-blue-400 hover:cursor-pointer hover:bg-blue-300 text-sm font-medium px-3 py-1.5 rounded disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Add card
            </button>
            <div
              onClick={() => {
                setAdding(false);
                setTitle("");
              }}
              className="p-2 text-gray-400 transition-all duration-100  cursor-pointer hover:bg-gray-400/30 flex items-center justify-center rounded-sm"
            >
              <svg
                fill="currentcolor"
                width="18"
                height="18"
                viewBox="0 0 16 16"
                role="presentation"
                class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
              >
                <path
                  fill="currentcolor"
                  fillRule="evenodd"
                  d="m9.06 8 4.97-4.97-1.06-1.06L8 6.94 3.03 1.97 1.97 3.03 6.94 8l-4.97 4.97 1.06 1.06L8 9.06l4.97 4.97 1.06-1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex text-gray-400 gap-1"
        >
          <div onClick={() => setAdding(true)} className="flex  gap-2 hover:bg-gray-400/30  px-2 py-1.5 rounded-lg items-center justify-start w-full max-w-sm cursor-pointer transition-all duration-100">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={16}
                height={16}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div className="font-medium text-sm">Add a card</div>
          </div>
          <div className="p-2 transition-all duration-100  cursor-pointer hover:bg-gray-400/30 flex items-center justify-center rounded-lg">
            <svg
              width="16"
              height="16"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6V5C3 3.89543 3.89543 3 5 3H6C6.55228 3 7 3.44772 7 4C7 4.55228 6.55228 5 6 5H5V6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 8C6 6.89543 6.89543 6 8 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20H8C6.89543 20 6 19.1046 6 18V8ZM8 8H19V14H8V8ZM18 18C17.4477 18 17 17.5523 17 17C17 16.4477 17.4477 16 18 16C18.5523 16 19 16.4477 19 17C19 17.5523 18.5523 18 18 18ZM8 17C8 17.5523 8.44772 18 9 18H12C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16H9C8.44772 16 8 16.4477 8 17Z"
                fill="currentColor"
              ></path>
              <path
                d="M4 14C3.44772 14 3 14.4477 3 15V16C3 17.1046 3.89543 18 5 18V15C5 14.4477 4.55228 14 4 14Z"
                fill="currentColor"
              ></path>
              <path
                d="M3 9C3 8.44772 3.44772 8 4 8C4.55228 8 5 8.44772 5 9V12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12V9Z"
                fill="currentColor"
              ></path>
              <path
                d="M8 4C8 3.44772 8.44772 3 9 3H13C13.5523 3 14 3.44772 14 4C14 4.55228 13.5523 5 13 5H9C8.44772 5 8 4.55228 8 4Z"
                fill="currentColor"
              ></path>
              <path
                d="M16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5H19C19 3.89543 18.1046 3 17 3H16Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
