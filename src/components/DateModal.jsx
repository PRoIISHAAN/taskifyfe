import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loader } from "./loader";
import { createPortal } from "react-dom";
import { usePortalPosition } from "@/hooks/usePortalPosition";

axios.defaults.withCredentials = true;
const reminder = {
  None: "None",
  0: "At time of due date",
  "5M": "5 Minutes before",
  "10M": "10 Minutes before",
  "15M": "15 Minutes before",
  "1H": "1 Hour before",
  "2H": "2 Hours before",
  "1D": "1 Day before",
  "2D": "2 Days before",
};

export function DateModal(props) {
  const { isOpen, onClose, triggerRef } = props;
  const position = usePortalPosition(triggerRef, isOpen);
  const [shouldRender, setShouldRender] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [dueTime, setDueTime] = useState("00:00");
  const [reminerValue, setReminerValue] = useState("None");
  const [open, setOpen] = useState(false);
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
  }, [isOpen]);
  const [Today, setToday] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [selectedDate, setSelectedDate] = useState(
    props.startDate
      ? new Date(props.startDate)
      : props.endDate
      ? new Date(props.endDate)
      : new Date(Today.getFullYear(), Today.getMonth(), Today.getDate())
  );
  const [startDateCheck, setStartDateCheck] = useState(
    props.startDate &&
      new Date(props.startDate).toDateString() != Today.toDateString()
      ? true
      : false
  );
  const [endDateCheck, setEndDateCheck] = useState(
    props.endDate ? true : false
  );
  const [endDate, setEndDate] = useState(
    props.endDate
      ? new Date(props.endDate)
      : new Date(Today.getFullYear(), Today.getMonth(), Today.getDate())
  );
  const [startDate, setStartDate] = useState(
    props.startDate ? new Date(props.startDate) : endDate
  );
  const [active, setActive] = useState(
    props.startDate ? "start" : props.endDate ? "end" : ""
  );
  const [loadingsave, setLoadingsave] = useState(false);
  const [loadingremove, setLoadingremove] = useState(false);

  useEffect(() => {
    setReminerValue(props.reminder ? props.reminder : "None");
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  async function save() {
    setLoadingsave(true);
    const [hours, Minutes] = dueTime.split(":").map(Number);
    setEndDate(
      new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        hours,
        Minutes,
        0,
        0
      )
    );
    await axios.post("http://localhost:3000/user/todos/adddate", {
      todoId: props.id,
      startDateCheck: startDateCheck,
      endDateCheck: endDateCheck,
      startDate: startDate,
      endDate: endDate,
      reminder: reminerValue,
    });
    props.setRefetch((e) => !e);
    onClose();
  }

  async function remove() {
    setLoadingremove(true);
    await axios.delete(`http://localhost:3000/user/todos/adddate/${props.id}`);
    props.setRefetch((e) => !e);
    onClose();
  }

  useEffect(() => {
    if (active === "start") {
      setStartDate(selectedDate);
    } else if (active === "end") {
      if (!startDateCheck) {
        setEndDate(selectedDate);
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
    }
  }, [selectedDate]);

  function RangeFun(date) {
    if (startDateCheck && endDateCheck) {
      if (date >= startDate && date <= endDate) {
        return true;
      } else {
        return false;
      }
    }
  }

  function genCalendarDays() {
    const calldays = [];
    const prevMonth = new Date(year, month, 0);
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      calldays.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonth.getDate() - i),
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      calldays.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }
    const remainingDays = 42 - calldays.length;
    for (let i = 1; i <= remainingDays; i++) {
      calldays.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }
    return calldays;
  }
  if (!shouldRender) return null;
  return createPortal(
    <div
      style={{
        top: position.top,
        left: position.left,
        visibility: isOpen ? "visible" : "hidden",
      }}
      onClick={(e) => e.stopPropagation()}
      className="fixed z-50 date-modal-container px-3 py-3 w-[310px] bg-[#282e33] text-sm border-[#39424a] rounded-lg border-1 text-[#adb8c5]"
    >
      <div className="flex justify-between items-center">
        <div className="relative left-0 right-0 mx-auto font-semibold">
          Dates
        </div>
        <div
          className="cursor-pointer hover:bg-[#3c464e] rounded-md"
          onClick={(e) => {
            e.stopPropagation();
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      {/* callendar div */}
      <div>
        <div className="flex justify-center my-5 items-center">
          <ChevronsLeft
            onClick={() => {
              setYear((e) => e - 1);
            }}
            className="h-4.5 w-4.5 cursor-pointer"
          />
          <div className=" ml-2 mr-2.5">
            <ChevronLeft
              onClick={() => {
                if (month == 0) {
                  setMonth(11);
                  setYear(year - 1);
                } else {
                  setMonth((e) => e - 1);
                }
              }}
              className="h-4.5 w-4.5 cursor-pointer"
            />
          </div>
          <div className="w-36 flex justify-center items-center">
            {months[month]} {year}
          </div>
          <div className=" ml-2 mr-2.5">
            <ChevronRight
              onClick={() => {
                if (month == 11) {
                  setMonth(0);
                  setYear(year + 1);
                } else {
                  setMonth((e) => e + 1);
                }
              }}
              className="h-4.5 w-4.5 cursor-pointer"
            />
          </div>

          <ChevronsRight
            onClick={() => {
              setYear((e) => e + 1);
            }}
            className="h-4.5 w-4.5 cursor-pointer"
          />
        </div>
        <div className="grid text-xs grid-cols-7 items-center justify-center mb-4">
          {days.map((item, index) => (
            <div
              className="justify-self-center font-semibold self-center"
              key={index}
            >
              {item}
            </div>
          ))}
          {genCalendarDays().map((item, index) => (
            <div
              onClick={() => {
                if (item.isCurrentMonth && item.date >= Today) {
                  if (active === "start" && item.date > endDate) {
                    setSelectedDate(endDate);
                  } else {
                    setSelectedDate(item.date);
                  }
                }
              }}
              className={`justify-self-center text-sm self-center flex items-center justify-center rounded ${
                item.date.toDateString() == Today.toDateString()
                  ? "font-bold border-b-2 text-[#5caaff] border-[#5caaff] rounded-b-none"
                  : null
              } w-10 h-9 py-1 px-1 ${
                (item.date.toDateString() == selectedDate.toDateString() &&
                  item.isCurrentMonth) ||
                RangeFun(item.date)
                  ? "bg-[#1c2b41] cursor-pointer text-[#579dff] hover:bg-[#09326c]"
                  : item.isCurrentMonth &&
                    item.date.toDateString() != selectedDate.toDateString()
                  ? "cursor-pointer hover:bg-[#313940]"
                  : "text-[#818f9e]"
              }`}
              key={index}
            >
              {item.day}
            </div>
          ))}
        </div>
        <div
          className="my-4"
          onClick={() => {
            setActive("start");
          }}
        >
          <div className="font-semibold text-xs mb-1">Start date</div>
          <div className="flex gap-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={startDateCheck}
                onChange={() => setStartDateCheck(!startDateCheck)}
                className="peer sr-only"
              />
              <div className="w-4.5 h-4.5 rounded-xs border border-[#738496] flex items-center justify-center peer-checked:bg-blue-500 transition-colors">
                <svg
                  className={`w-3 h-3 text-black transition-opacity duration-200 ${
                    startDateCheck ? "opacity-100" : "opacity-0"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </label>
            <input
              disabled={!startDateCheck}
              value={
                startDateCheck
                  ? startDate.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })
                  : ""
              }
              placeholder="MM/DD/YYYY"
              className={`disabled:outline-0 outline-1 text-[13px] bg-[#22272b] disabled:bg-[#2d343a] p-1.5 w-[100px] ${
                active == "start"
                  ? "outline-2 outline-[#85b8ff]"
                  : "outline-[#738496]"
              } `}
              type="text"
            />
          </div>
        </div>
        <div
          className="my-4"
          onClick={() => {
            setActive("end");
          }}
        >
          <div className="text-xs font-semibold mb-1">Due date</div>
          <div className="flex text-[13px] gap-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={endDateCheck}
                onChange={() => setEndDateCheck(!endDateCheck)}
                className="peer sr-only"
              />
              <div className="w-4.5 h-4.5 rounded-xs border border-[#738496] flex items-center justify-center peer-checked:bg-blue-500 transition-colors">
                <svg
                  className={`w-3 h-3 text-black transition-opacity duration-200 ${
                    endDateCheck ? "opacity-100" : "opacity-0"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </label>
            <input
              disabled={!endDateCheck}
              value={
                endDateCheck
                  ? endDate.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })
                  : ""
              }
              className={`disabled:outline-0 outline-1 bg-[#22272b] disabled:bg-[#2d343a] p-1.5 w-[100px] ${
                active == "end"
                  ? "outline-2 outline-[#85b8ff]"
                  : "outline-[#738496]"
              } `}
              placeholder="MM/DD/YYYY"
              type="text"
              name=""
              id=""
            />
            <input
              disabled={!endDateCheck}
              type={"time"}
              step="60"
              placeholder="12:00 AM"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              data-slot="input"
              className="disabled:outline-0 outline-1 disabled:text-[#6d767f] bg-[#22272b] disabled:bg-[#2d343a] focus:outline-2 focus:outline-[#85b8ff] p-1.5 w-[110px] outline-[#738496] appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>
        <div className="mt-7">
          <div className="text-xs font-semibold">Set due date reminder</div>
          <div
            onClick={() => {
              setOpen((e) => !e);
            }}
            className={`w-full p-2 relative cursor-pointer my-1 border-[#738496] border outline-[#85b8ff] hover:bg-[#282e33] transition-all duration-200 rounded ${
              open ? "outline-2 bg-[#282e33]" : ""
            } bg-[#22272b]`}
          >
            <div className="flex justify-between items-center w-full">
              <div>{reminder[reminerValue]}</div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="presentation"
                >
                  <path
                    fill="currentcolor"
                    fill-rule="evenodd"
                    d="M8.292 10.293a1.01 1.01 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0"
                  ></path>
                </svg>
              </div>
            </div>
            {open && (
              <div
                className="absolute border h-[295px] overflow-y-scroll scrollbar 
                 scrollbar-thumb-rounded-full scrollbar-w-2 scrollbar-thumb-[#9f9f9f] scrollbar-hover:scrollbar-thumb-[#d1d1d1] scrollbar-track-[#2c2c2c] mt-3.5 border-[#39424a] rounded-sm py-1.5 bg-[#282e33] flex flex-col left-0 right-0"
              >
                <div
                  className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                    reminerValue == "None"
                      ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                      : "border-[#282e33] hover:bg-[#313940]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                    setReminerValue("None");
                  }}
                >
                  None
                </div>
                <div
                  className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                    reminerValue == "0"
                      ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                      : "border-[#282e33] hover:bg-[#313940]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReminerValue("0");
                    setOpen(false);
                  }}
                >
                  At time of due date
                </div>
                <div
                  className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                    reminerValue == "5M"
                      ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                      : "border-[#282e33] hover:bg-[#313940]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReminerValue("5M");
                    setOpen(false);
                  }}
                >
                  5 Minutes before
                </div>
                <div
                  className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                    reminerValue == "10M"
                      ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                      : "border-[#282e33] hover:bg-[#313940]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReminerValue("10M");
                    setOpen(false);
                  }}
                >
                  10 Minutes before
                </div>
                <div
                  className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                    reminerValue == "15M"
                      ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                      : "border-[#282e33] hover:bg-[#313940]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReminerValue("15M");
                    setOpen(false);
                  }}
                >
                  15 Minutes before
                </div>
                <div
                  className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                    reminerValue == "1H"
                      ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                      : "border-[#282e33] hover:bg-[#313940]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReminerValue("1H");
                    setOpen(false);
                  }}
                >
                  1 Hour before
                </div>
                <div
                  className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                    reminerValue == "2H"
                      ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                      : "border-[#282e33] hover:bg-[#313940]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReminerValue("2H");
                    setOpen(false);
                  }}
                >
                  2 Hours before
                </div>
                <div
                  className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                    reminerValue == "1D"
                      ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                      : "border-[#282e33] hover:bg-[#313940]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReminerValue("1D");
                    setOpen(false);
                  }}
                >
                  1 Day before
                </div>
                <div
                  className={`p-2 py-1.5 border-l-[2px] border-[#282e33] hover:border-[#579dff] cursor-pointer ${
                    reminerValue == "2D"
                      ? "border-[#579dff] bg-[#1c2b41] text-[#4a84d6] hover:bg-[#09326c]"
                      : "border-[#282e33] hover:bg-[#313940]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReminerValue("2D");
                    setOpen(false);
                  }}
                >
                  2 Days before
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="text-[13px] my-2">
          Reminders will be sent to all members and watchers of this card.
        </div>
        <div className="w-full">
          <button
            className="w-full font-semibold bg-[#579dff] hover:bg-[#85b8ff] transition-all duration-100 rounded py-1.5 text-[13px] my-1 text-[#1e242a]"
            type="button"
            onClick={save}
          >
            {loadingsave ? <Loader></Loader> : "Save"}
          </button>
          <button
            className="w-full text-sm font-semibold bg-[#313940] hover:bg-[#3c464e] transition-all text-[13px] duration-100 rounded py-1.5 my-1"
            type="button"
            onClick={remove}
          >
            {loadingremove ? <Loader></Loader> : "Remove"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
