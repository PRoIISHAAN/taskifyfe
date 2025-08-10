import axios from "axios";
axios.defaults.withCredentials = true;

export function ChecklistItemEditModal(props) {
  return (
    <div  className="py-3 drop-shadow-xl w-[300px] bg-[#282e33] text-sm border-[#39424a] rounded-lg border-1 text-[#adb8c5]">
      <div className="flex justify-between mb-3 text-[13px] items-center">
        <div className="relative left-0 right-0 mx-auto font-semibold">
          Item actions
        </div>
        <div className="cursor-pointer absolute right-3 hover:bg-[#3c464e] rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            props.setEdit(false);
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-full flex cursor-pointer justify-start text-[13px] hover:bg-[#313940] p-3 py-1.5 ">
        Convert to card
      </div>
      <div onClick={(e)=>{e.stopPropagation()
        props.Delete()}} className="w-full cursor-pointer flex justify-start text-[13px] p-3 hover:bg-[#313940] py-1.5">
        Delete
      </div>

    </div>
  );
}
