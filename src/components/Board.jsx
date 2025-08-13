import { useState } from "react";
import { TaskBoard } from "../components/TaskBoard";

export default function Board({}) {
  const [button, setButton] = useState(false);
  return (
    <div className="h-full w-full rounded-2xl bg-gradient-to-br from-violet-500/40 to-pink-400/40 flex flex-col border-1 border-gray-700">
      <div className="bg-black/40 rounded-t-2xl pl-6 pt-3.5 pb-3.5 text-gray-100 w-full flex items-center gap-3 flex-shrink-0">
        <div className="font-bold">My Trello board</div>
        <div
          onClick={() => {
            setButton((e) => !e);
          }}
          className={`px-1.5 ${
            button
              ? "bg-gray-200 hover:bg-white text-black"
              : "hover:bg-gray-400/40"
          }  py-1.5 rounded transition-all duration-100 cursor-pointer`}
        >
          <button className="flex gap-1.5 items-center justify-center cursor-pointer">
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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
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
                  d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0 h-full">
        <TaskBoard></TaskBoard>
      </div>
    </div>
  );
}
