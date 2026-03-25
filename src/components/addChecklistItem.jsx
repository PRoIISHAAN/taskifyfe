import axios from "axios";
axios.defaults.withCredentials = true;
import { useState,useEffect,useRef } from "react";
export function AddChecklistItem(props) {
  const [title, setTitle] = useState("");
  const [addItem, setAddItem] = useState(false);
  const [assignedto, setassignedto] = useState(null);
  const [due, setdue] = useState(null);
  const { allChecklists, setAllChecklists,index, checklistId, activecheckitemmodal,setactivecheckitemmodal } = props;
  const titleRef = useRef(null)
  async function add() {
    const res = await axios.post(`/user/todos/addChecklistItem`, {
      checklistId: checklistId,
      title: title,
      assignedto: assignedto,
      due: due,
    });
    const tempArr = {...allChecklists}
    tempArr[props.id].checklist[index].items.push({title: title, completed: false, type:"todo"})
    setAllChecklists(tempArr)
    setTitle("")
  }

   useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest('.checklist-add-item')) {
        return;
      }
      setAddItem(false);
    };
  
    if (addItem) {
      document.addEventListener("click", handleClickOutside);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [addItem]);

  const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    add()
  } else if (e.key === "Escape") {
    setAddItem(false);
  }
};

  useEffect(()=>{
    if (titleRef.current) {
    titleRef.current.focus();
  }
  },[addItem])
  

  return (
    <div className="ml-[29px]">
      {(!addItem||activecheckitemmodal!=checklistId) && (
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setactivecheckitemmodal(checklistId)
              setAddItem(true);
            }}
            className="py-1.5 px-3 rounded text-sm font-semibold bg-[#2c3238] cursor-pointer hover:bg-[#374048]"
          >
            Add an item
          </button>
        </div>
      )}

      {addItem &&activecheckitemmodal==checklistId && (
        <div className="checklist-add-item">
          <div className="w-full">
            <textarea
              rows={1}
              className="px-2 pt-1.5 pb-1.5 box-border w-full focus:bg-transparent resize-none overflow-hidden focus:border-[#85b8ff] focus:outline-1 outline-[#85b8ff] hover:bg-[#282e33] transition-all duration-100 text-[14px] font-light !text-[#b6c2cf] rounded border placeholder-[#7f8c9b] border-[#738496]"
              placeholder="Add an item"
              value={title}
              ref={titleRef}
              onKeyDown={handleKeyDown}
              onChange={(e)=>{setTitle(e.target.value)}}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <button  disabled={title.length == 0} onClick={add} className="bg-blue-400 text-[13px] active:bg-[#cce0ff] font-semibold px-3 cursor-pointer hover:bg-[#85b8ff] py-1.5 rounded-xs text-[#252327]">
                Add
              </button>
              <button
                onClick={() => {
                  setAddItem(false);
                }}
                className="text-[13px] font-semibold px-3 cursor-pointer hover:bg-[#374048] py-1.5 rounded-xs"
              >
                Cancel
              </button>
            </div>
            <div className="flex items-center justify-center gap-1 mt-1 text-[#9fadbc]">
              <button className="text-[14px] flex gap-1 items-center justify-center px-2.5 cursor-pointer hover:bg-[#374048] py-1.5 rounded-xs">
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
                <div>Assign</div>
              </button>
              <button className="text-[14px] flex gap-1 items-center justify-center px-2.5 cursor-pointer hover:bg-[#374048] py-1.5 rounded-xs">
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
                <div>Due date</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
