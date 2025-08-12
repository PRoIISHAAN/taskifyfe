import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

export function AddAttachmentModal(props) {
  const [title, setTitle] = useState("Checklist");
  const [link, setLink] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  async function recentlyViewedOnclick(item) {
    console.log(item);
    await axios.post("http://localhost:3000/user/todos/addAttachment", {
      type: "trelloCards",
      todoIdAtt: item.todoId._id,
      todoId: props.id,
    });
    props.setAttachments([
      ...props.attachments,
      {
        _id: `temp-${Date.now()}`,
        type: "todo",
        todoId: item.todoId,
      },
    ]);
    props.setAddAttachment(false);
  }

  useEffect(() => {
    async function getRecentlyViewed() {
      const res = await axios.get(
        `http://localhost:3000/user/todos/recentlyviewed`
      );
      setRecentlyViewed(res.data.recentlyViewed);
    }
    getRecentlyViewed();
  }, []);

  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffDays > 7) {
      return `Viewed (${date.toLocaleDateString()})`;
    } else if (diffDays >= 1) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHrs >= 1) {
      return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
    } else if (diffMin >= 1) {
      return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  }

  return (
    <div className="w-[310px] bg-[#282e33] text-sm border-[#39424a] rounded-lg border-1 text-[#adb8c5]">
      <div className="py-3">
        <div className="flex  justify-center items-center">
          <div
            className="cursor-pointer hover:bg-[#3c464e] absolute left-3 rounded-md"
            onClick={() => {
              props.setAddAttachment(false);
            }}
          >
            <svg
              width="24"
              height="24"
              role="presentation"
              focusable="false"
              className="p-1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="currentColor"
              ></path>
              <path
                d="M11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11Z"
                fill="currentColor"
              ></path>
              <path
                d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="relative left-0 right-0 mx-auto font-semibold">
            Attach
          </div>
          <div
            className="cursor-pointer hover:bg-[#3c464e] absolute right-3 rounded-md"
            onClick={() => props.setAddAttachment(false)}
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
        <div className="mt-5 mx-3">
          <div className="text-[13px]">Attach a file from your computer</div>
          <div className="text-[11px] my-3 font-light">
            You can also drag and drop files to upload them.
          </div>
          <button className="w-full bg-[#313940] rounded py-1.5 transition-all duration-150 hover:bg-[#3C464E]">
            Choose a file
          </button>
          <hr className="border-[#3C464E] mt-4" />
          <div className="cursor-default text-[14px] mt-2 mb-0.5 font-bold">
            Search or paste a link
          </div>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Find recent links or paste a new link"
            className="bg-[#22272b] w-full p-2 px-2 rounded border mb-2 border-[#738496] text-[#8c9bab] focus:outline-[#85b8ff] focus:outline-2 placeholder:text-[#8795a5] placeholder:font-light placeholder:text-[13px] focus:border-[#85b8ff] transition-all duration-50 font-medium"
          />
          <div className="cursor-default text-[14px] mt-2 mb-0.5 font-bold">
            Display text (optional)
          </div>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Text to display"
            className="bg-[#22272b] w-full p-2 px-2 rounded border mb-1 border-[#738496] text-[#8c9bab] focus:outline-[#85b8ff] focus:outline-2 placeholder:text-[#8795a5] placeholder:font-light placeholder:text-[13px] focus:border-[#85b8ff] transition-all duration-50 font-medium"
          />
          <div className="text-[11px] font-light text-[#8795a5]">
            Give this link a title or description
          </div>
        </div>
        <div className="mt-3">
          {link.length == 0 && (
            <div>
              <div className="text-[11px] font-bold mx-3">Recently viewed</div>
              {recentlyViewed.map((item, index) => (
                <div
                  onClick={() => recentlyViewedOnclick(item)}
                  className="flex items-center cursor-pointer active:bg-[#1c2b41] gap-2 justify-center py-3 px-3 hover:bg-[#313940]"
                  key={index}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5ZM19 7H5V13H19V7ZM17 16C17 16.5523 17.4477 17 18 17C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16ZM6 17C5.44772 17 5 16.5523 5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6Z"
                        fill="#579DFF"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-normal text-[13px]">
                      {item.todoId?.title}
                    </div>
                    <div className="flex items-center">
                      <div className="text-[11px] font-light text-[#9fadbc]">
                        {item.todoId.boardId?.title || "Board Title"}
                      </div>
                      <div className="flex items-center">
                        <span className="text-[10px] text-[#3c464e] align-middle leading-none">
                          &nbsp; • &nbsp;
                        </span>
                      </div>
                      <div className="text-[11px] font-light text-[#9fadbc]">
                        {formatTimeAgo(item.timeAdded)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {link.length > 0 && (
            <div>
              <div className="text-[11px] font-bold mx-3">Results</div>
              {recentlyViewed.map((item, index) => (
                <div
                  onClick={() => recentlyViewedOnclick(item)}
                  className="flex items-center cursor-pointer active:bg-[#1c2b41] gap-2 justify-center py-3 px-3 hover:bg-[#313940]"
                  key={index}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5ZM19 7H5V13H19V7ZM17 16C17 16.5523 17.4477 17 18 17C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16ZM6 17C5.44772 17 5 16.5523 5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6Z"
                        fill="#579DFF"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-normal text-[13px]">
                      {item.todoId?.title}
                    </div>
                    <div className="flex items-center">
                      <div className="text-[11px] font-light text-[#9fadbc]">
                        {item.boardId?.title || "Board Title"}
                      </div>
                      <div className="flex items-center">
                        <span className="text-[10px] text-[#3c464e] align-middle leading-none">
                          &nbsp; • &nbsp;
                        </span>
                      </div>
                      <div className="text-[11px] font-light text-[#9fadbc]">
                        {formatTimeAgo(item.timeAdded)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            props.setAddAttachment(false);
          }}
          className="bg-blue-400 mx-3 text-sm font-semibold w-fit mt-3 px-6 cursor-pointer hover:bg-[#85b8ff] py-1.5 rounded text-[#252327]"
        >
          Add
        </div>
      </div>
    </div>
  );
}
