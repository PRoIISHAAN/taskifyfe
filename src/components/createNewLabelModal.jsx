/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import LABEL_COLORS from "@/miscelnaeous/config";
import axios from "axios";

export function AddNewLabel(props) {
  const [title, setTitle] = useState("New label");
  const [color, setColor] = useState("bold Blue");
  const hoverCss = (item) => css`
    &:hover {
      background-color: ${LABEL_COLORS[item]?.hover || "#21262b"};
    }
    background-color: ${LABEL_COLORS[item]?.bg || "#21262b"};
  `;

  async function saveChanges() {
    await axios.post("http://localhost:3000/user/todos/addlabel", {
      title: title,
      color: color,
    });
    props.setAddLabel(false);
    props.getlabels();
    props.setRefetch((e) => !e);
  }

  return (
    <div className="py-3">
      <div className="flex justify-between items-center px-3 w-full">
        <div
          className="cursor-pointer hover:bg-[#3c464e] absolute left-3 rounded-md"
          onClick={() => props.setAddLabel(false)}
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
        <div className="font-semibold flex justify-center w-full">
          Create label
        </div>
        <div
          className="cursor-pointer hover:bg-[#3c464e] absolute right-3 rounded-md"
          onClick={() => props.setLabelModal(false)}
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
      <div className="bg-[#181c1c] w-[100%] h-[100px] my-3 flex items-center justify-center">
        <div
          style={{
            backgroundColor: LABEL_COLORS[color]?.bg || "#21262b",
            color:
              LABEL_COLORS[color]?.text && LABEL_COLORS[color]?.bg
                ? LABEL_COLORS[color]?.text
                : "#adb8c4",
          }}
          className="w-[80%] font-bold pl-3 py-1.5 rounded"
        >
          {title}
        </div>
      </div>
      <div className="px-3">
        <div className="text-xs my-1 mb-2">Title</div>
        <div>
          <input
            className="bg-[#22272b] w-full p-2 px-3 rounded border mb-2 border-[#738496] text-[#cacaca] focus:outline-[#85b8ff] focus:outline-2 focus:border-[#85b8ff] transition-all duration-50 font-light"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <div className="text-xs my-1 mb-2">Select a color</div>
          <div className="grid grid-cols-5 gap-2">
            {Object.keys(LABEL_COLORS).map((item, index) => (
              <div
                key={index}
                onClick={() => setColor(item)}
                css={hoverCss(item)}
                className={`w-[49px] group h-8 rounded cursor-pointer flex items-center justify-center transition-all duration-100 outline-[#539bfa] ${
                  color == item
                    ? "outline-2 outline-offset-2 rounded-[1px]"
                    : ""
                }`}
              >
                <div className="absolute opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-50 translate-y-5 group-hover:translate-y-8 px-1 text-nowrap text-xs rounded bg-[#9fadbc] font-light text-[#1d2125]">
                  {item}{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            setColor(null);
          }}
          disabled={color == null}
          className="w-full disabled:cursor-not-allowed disabled:bg-[#2d343a] disabled:text-[#54616d] flex gap-2 items-center justify-center rounded bg-[#313940] font-semibold py-1.5 my-4 mb-3 text-sm text-[13px] cursor-pointer hover:bg-[#3c464e]"
        >
          <div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
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
          <div>Remove color</div>
        </button>
        <hr className="border-[#3c464e]" />
        <div className="w-full flex items-center justify-center rounded mt-3 mb-1 text-sm text-[13px]">
          <button
            onClick={saveChanges}
            className="bg-blue-400 text-sm w-full font-medium px-3 cursor-pointer hover:bg-[#85b8ff] py-1.5 rounded text-[#252327]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
