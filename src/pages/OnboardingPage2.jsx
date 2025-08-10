import { useEffect, useState } from "react";
import { Draggable, DragDropContext, Droppable } from "@hello-pangea/dnd";
import { usePageAnimation } from "../hooks/usePageAnimate";
import ConfettiExplosion from 'react-confetti-explosion';
import { useDraggableInPortal } from "../hooks/useDraggableInportal";
import { usePrevious } from "@uidotdev/usehooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OTPModal from "../components/otpModal";
axios.defaults.withCredentials = true


export default function OnboardingPage2({ page, setPage }) {
  const Navigate = useNavigate()
  const [email,setemail]=useState("")
  const[modal,setModal]=useState(false)
  const renderDraggable = useDraggableInPortal();
  const shouldAnimate2 = usePageAnimation(3, page, 0);
  const shouldAnimateBoard = usePageAnimation(3, page, 1100);
  const shouldAnimate = usePageAnimation(2, page, 0);
  const shouldAnimateImage1 = usePageAnimation(2, page, 1000);
  const shouldAnimateImage2 = usePageAnimation(2, page, 2000);
  const shouldAnimateImage3 = usePageAnimation(2, page, 3000);
  const shouldAnimateOpacity1 = usePageAnimation(2, page, 1800);
  const shouldAnimateOpacity2 = usePageAnimation(2, page, 2800);
  const shouldAnimateOpacity3 = usePageAnimation(2, page, 3800);
  const shouldAnimateButton = usePageAnimation(2, page, 4000);
  const [checked, setChecked] = useState(false);
  const [loading,setloading]=useState(false)
 

  const [state, setstate] = useState(1);
  const [cardArr, setCardArr] = useState([]);
  const [dropcardArr, setdropCardArr] = useState([]);
  const [input, setinput] = useState("");
  const previous = usePrevious(page);

  useEffect(()=>{
    async function Login() {
      res = await axios.post(`http://localhost:3000/user/login`, {
        email: email,
      });
    }
    if(modal){
      Login()
    }
  },[modal])

  function ondragend(result) {
    if (!result.destination) return;
    else if (result.destination.droppableId == "today") {
      const temparr = [...cardArr];
      temparr.splice(0, 1);
      setCardArr(temparr);
      setdropCardArr(["Start using Trello"]);
    }
    return;
  }
  async function emailVerifyStatus(){
    const res = await axios.get(`http://localhost:3000/user/getverifystatus`)
    setemail(res.data.email)
    return res.data.verified
  }
  return (
    <div className="w-screen h-screen bg-gradient-to-t from-blue-700 to-blue-900 flex flex-col">
      {modal && <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-black/20 backdrop-blur-lg"><OTPModal email={email} ></OTPModal></div>}
      <div className="flex justify-between items-center px-7 py-7 bg-black/3">
        <div className="flex gap-7 justify-between items-center">
          <div>
            <img
              src="https://trello.com/assets/562260d6c740ba5a0d40.svg"
              alt=""
            />
          </div>
          <div
            onClick={() => {
              setPage(previous);
              setstate(1)
              setCardArr([])
              setdropCardArr([])
              setinput("")
              setloading(false)
            }}
            className="text-gray-400 font-medium text-[14px] cursor-pointer"
          >
            Back
          </div>
        </div>
        <div className="flex mr-30 gap-3">
          <div className="w-20 rounded-full h-2 bg-gray-900">
            <div
              className={`bg-blue-400 h-2 rounded-full transition-all duration-200 ${
                page >= 1 ? `w-20` : "w-0"
              }`}
            ></div>
          </div>
          <div className="w-20 rounded-full h-2 bg-gray-900">
            <div
              className={`bg-blue-400 h-2 rounded-full transition-all duration-200 ${
                page >= 2 ? `w-20` : "w-0"
              }`}
            ></div>
          </div>
          <div className="w-20 rounded-full h-2 bg-gray-900">
            <div
              className={`bg-blue-400 h-2 rounded-full transition-all duration-200 ${
                page >= 3 ? `w-20` : "w-0"
              }`}
            ></div>
          </div>
          <div className="w-20 rounded-full h-2 bg-gray-900">
            <div
              className={`bg-blue-400 h-2 rounded-full transition-all duration-200 ${
                page >= 4 ? `w-20` : "w-0"
              }`}
            ></div>
          </div>
        </div>
        <div className="text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      {page == 1 ? (
        <div className="flex flex-col items-center w-full flex-1 mt-14">
          <div className="flex flex-col items-center w-full h-50">
            {state == 1 ? (
              <div>
                <div className="text-center text-4xl text-gray-400 mt-4">
                  <span>Welcome to Trello! Meet your</span>{" "}
                  <span className="font-bold"> Inbox</span>
                </div>
                <div className="text-gray-400 mt-5">
                  This is a space for adding to-dos, which can be created
                  manually or imported from apps as cards.
                </div>
              </div>
            ) : null}
            {state == 2 ? (
              <div className="text-center text-4xl text-gray-400">
                <span>Let’s start by adding your first to-do as a</span>{" "}
                <span className="font-bold"> card </span>
                <span>to your </span>
                <span className="font-bold">Inbox</span>
              </div>
            ) : null}
            {state < 5 && state > 2 ? (
              <div>
                <div className="text-center text-4xl text-gray-400 mt-4">
                  <span>Great! Now, it’s your turn</span>{" "}
                  <span className="font-bold"> Inbox</span>
                </div>
                <div className="text-gray-400 mt-5">
                  <span>Let’s get started by adding a few to-dos as</span>
                  <span className="font-bold"> cards</span>{" "}
                  <span>to your </span>
                  <span className="font-bold">Inbox</span>
                </div>
              </div>
            ) : null}
            {state >= 5 && state < 8 ? (
              <div>
                <div className="text-center text-4xl text-gray-400 mt-4">
                  <span>Nice! Your to-dos have been added as</span>{" "}
                  <span className="font-bold"> cards </span>
                  <span>to your </span>
                  <span className="font-bold">Inbox</span>
                </div>
              </div>
            ) : null}

            {state < 2 ? (
              <button
                onClick={() => {
                  setstate((e) => e + 1);
                }}
                className={`transition-all mt-7 duration-100 font-medium text-sm ${
                  state >= 2 && state < 5
                    ? "bg-gray-500/20 hover:bg-gray-300/15 text-gray-400 mt-10"
                    : "bg-blue-500 hover:bg-blue-400 text-gray-800 mt-7 "
                }  p-2 px-3 rounded cursor-pointer`}
              >
                Continue
              </button>
            ) : state == 2?
             <button
                onClick={() => {
                  setPage((e) => e + 1);
                  setCardArr(["Start using Trello"]);
                }}
                className={`transition-all mt-7 duration-100 font-medium text-sm ${
                  state >= 2 && state < 5
                    ? "bg-gray-500/20 hover:bg-gray-300/15 text-gray-400 mt-10"
                    : "bg-blue-500 hover:bg-blue-400 text-gray-800 mt-7 "
                }  p-2 px-3 rounded cursor-pointer`}
              >
                Continue
              </button>
            
             :state == 3 || state == 4 ? (
              <button
                onClick={() => {
                  setPage((e) => e + 1);
                }}
                className={`transition-all mt-7 duration-100 font-medium text-sm ${
                  state >= 2 && state < 5
                    ? "bg-gray-500/20 hover:bg-gray-300/15 text-gray-400 mt-10"
                    : "bg-blue-500 hover:bg-blue-400 text-gray-800 mt-7 "
                }  p-2 px-3 rounded cursor-pointer`}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => {
                  setPage((e) => e + 1);
                  setstate(0);
                }}
                className={`transition-all mt-7 duration-100 font-medium text-sm ${"bg-blue-500 hover:bg-blue-400 text-gray-800 mt-7 "}  p-2 px-3 rounded cursor-pointer`}
              >
                setstate0
              </button>
            )}
          </div>
          <div
            className={` flex-1 transition-all duration-1000 ${
              page == 1 ? `` : `translate-x-176`
            }`}
          >
            <div className="bg-gray-800/75 h-full w-85 rounded-t-xl">
              <div className="bg-gray-800 rounded-t-2xl pl-7 pt-4 pb-4 text-gray-400 w-full flex items-center gap-3">
                <div className="w-4">
                  <svg
                    fill="none"
                    viewBox="0 0 16 16"
                    role="presentation"
                    class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
                  >
                    <path
                      fill="currentcolor"
                      fill-rule="evenodd"
                      d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v5h3a.75.75 0 0 1 .75.75 1.75 1.75 0 1 0 3.5 0A.75.75 0 0 1 10.5 8h3V3a.5.5 0 0 0-.5-.5zm10.5 7h-2.337a3.251 3.251 0 0 1-6.326 0H2.5V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5zM12 6H4V4.5h8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="font-bold">Inbox</div>
              </div>
              {state >= 2 ? (
                <div className="w-full p-5">
                  <div className="bg-gray-800 rounded-lg shadow-[0px_1px_1px_rgba(0,0,0,0.7)] h-30">
                    {state < 7 ? (
                      <div className="flex flex-col w-full justify-between h-full py-3 px-4">
                        <div className="text-gray-400 text-sm">
                          {state >= 3 ? (
                            <input
                              onChange={(e) => {
                                setinput(e.target.value);
                              }}
                              value={input}
                              placeholder="Add a to-do IE: Book flights"
                              type="text"
                            />
                          ) : (
                            "Start using Trello"
                          )}
                        </div>
                        <div className="w-full flex justify-end">
                          <button
                            onClick={() => {
                              if (state == 2 || input.length != 0) {
                                setCardArr([
                                  ...cardArr,
                                  state >= 3
                                    ? input
                                    : state == 2
                                    ? "Start using Trello"
                                    : null,
                                ]);
                                setstate((e) => e + 1);
                                setinput("");
                              }
                            }}
                            className={` ${
                              state > 4
                                ? `bg-gray-500/20 hover:bg-gray-300/15 text-gray-400 mt-10`
                                : `bg-blue-500 hover:bg-blue-400 text-gray-900`
                            } text-[12px]  font-medium p-1 px-2 rounded cursor-pointer`}
                          >
                            Add Card
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {cardArr.map((item, index) => (
                    <div
                      className="bg-gray-800 rounded-lg hover:ring-2 hover:ring-white text-gray-400 text-sm px-4 py-2 mt-3 shadow-[0px_1px_1px_rgba(0,0,0,0.7)] "
                      key={index}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : page == 2 ? (
        <div className="flex flex-col flex-1">
          <div className="flex-1 flex flex-col items-center w-full">
            <div className="flex flex-col  items-center w-full h-50">
              <div>
                <div className="text-center text-4xl text-gray-400 mt-4">
                  <span>You can also add</span>{" "}
                  <span className="font-bold"> cards </span>
                  <span>to your</span>
                  <span className="font-bold"> Inbox </span>
                  <span>with apps</span>
                </div>
                <div className="text-gray-400 text-[16px] text-center mt-5">
                  Capture everything, anywhere from email, Trello's mobile app,
                  Slack, and Microsoft Teams
                </div>
              </div>
              <button
                onClick={() => {
                  setPage((e) => e + 1);
                  setstate(0);
                }}
                className={`transition-all mt-7 duration-100 font-semibold text-sm ${
                  shouldAnimateButton
                    ? "bg-blue-500 hover:bg-blue-400 text-gray-800 mt-7"
                    : "bg-gray-500/20 hover:bg-gray-300/15 text-gray-400"
                }  p-2 px-3 rounded cursor-pointer`}
              >
                Continue
              </button>
            </div>
            <div className="flex flex-1 w-full items-start justify-center overflow-clip">
              <div
                className={`transition-all h-full bg-gray-800/75 duration-1000 w-85 rounded-t-xl ${
                  shouldAnimate ? `translate-x-0` : " translate-x-[16vw]"
                }`}
              >
                <div className="bg-gray-800 rounded-t-2xl pl-7 pt-4 pb-4 text-gray-400 w-full flex items-center gap-3">
                  <div className="w-4">
                    <svg fill="none" viewBox="0 0 16 16">
                      <path
                        fill="currentcolor"
                        fill-rule="evenodd"
                        d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v5h3a.75.75 0 0 1 .75.75 1.75 1.75 0 1 0 3.5 0A.75.75 0 0 1 10.5 8h3V3a.5.5 0 0 0-.5-.5zm10.5 7h-2.337a3.251 3.251 0 0 1-6.326 0H2.5V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5zM12 6H4V4.5h8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="font-bold">Inbox</div>
                </div>
                <div className="w-full p-5">
                  <div className="bg-gray-800 rounded-lg shadow-[0px_1px_1px_rgba(0,0,0,0.7)] h-30"></div>
                  {cardArr.map((item, index) => (
                    <div
                      className="bg-gray-800 rounded-lg hover:ring-2 hover:ring-white text-gray-400 text-sm px-4 py-2 mt-3 shadow-[0px_1px_1px_rgba(0,0,0,0.7)] "
                      key={index}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-col w-[168px] mx-8 ">
                <img
                  className={`my-30 transition-all duration-300 ${
                    shouldAnimateOpacity1 ? "opacity-100" : "opacity-0"
                  }`}
                  src="	https://trello.com/assets/3a2f864b2101fa63a3b9.png"
                  alt=""
                />
                <img
                  className={`my-30 transition-all duration-300 ${
                    shouldAnimateOpacity2 ? "opacity-100" : "opacity-0"
                  }`}
                  src="	https://trello.com/assets/90dce3f04bb85d717f9e.png"
                  alt=""
                />
                <img
                  className={`my-30 transition-all duration-300 ${
                    shouldAnimateOpacity3 ? "opacity-100" : "opacity-0"
                  }`}
                  src="	https://trello.com/assets/b10647601be7b3716d74.png"
                  alt=""
                />
              </div>
              <div className="flex-col w-[424px] mt-10 h-full">
                <img
                  className={`my-5 transition-all duration-1000 ${
                    shouldAnimateImage1 ? `translate-y-0` : "translate-y-250"
                  }`}
                  src="https://trello.com/assets/e0788e3fba302f3b967e.png"
                  alt=""
                />
                <img
                  className={`my-5 transition-all duration-1000 ${
                    shouldAnimateImage2 ? `Translate-y-0` : "translate-y-250"
                  }`}
                  src=" https://trello.com/assets/1487054a265b1a75339d.png"
                  alt=""
                />
                <img
                  className={`my-5 transition-all duration-1000 ${
                    shouldAnimateImage3 ? `Translate-y-0` : "translate-y-250"
                  }`}
                  src=" https://trello.com/assets/db4c27d7c6b8fddc8dea.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : page == 3||page==4||page==5 ? (
        <div className="flex flex-col items-center w-full flex-1 overflow-hidden">
          <div className="flex flex-col  items-center w-full h-50">
            {state == 0 ? (
              <div>
                <div className="text-center text-4xl text-gray-400 mt-4">
                  <span>Now, here's your first</span>{" "}
                  <span className="font-bold"> Board </span>
                  <span>, where you'll organize your to-dos</span>
                </div>
                <div className="text-gray-400 text-[16px] text-center mt-5">
                  Let's start you off with three{" "}
                  <span className="font-bold">lists</span>: “Today”, “This
                  week”, “Later”.
                </div>
              </div>
            ) : state == 2 || state == 3||state==1 ? (
              <div>
                <div className="text-center text-4xl text-gray-400 mt-4">
                  <span>Let's start getting organized</span>
                </div>
              </div>
            ) : state == 4 ? (
              <div>
                <div className="text-center text-4xl text-gray-400 mt-4">
                  <span>You finished your first to-do, mark it complete!</span>
                </div>
              </div>
            ):state==5?<div>
                <div className="text-center text-4xl text-gray-400 mt-4">
                  <span>You did it!</span>
                </div>
              </div>:null}

            {state == 0 ? (
              <button
                onClick={() => {
                  setstate((e) => e + 1);
                }}
                className={`transition-all mt-7 duration-100 font-semibold text-sm ${
                  state == 0
                    ? "bg-blue-500 hover:bg-blue-400 text-gray-800 mt-7"
                    : "bg-gray-500/20 hover:bg-gray-300/15 text-gray-400"
                }  p-2 px-3 rounded cursor-pointer`}
              >
                Continue
              </button>
            ) : state == 1 ? (
              <button
                onClick={() => {
                  setstate(4);
                  setPage(4)
                  const temparr = [...cardArr];
                  temparr.splice(0, 1);
                  setCardArr(temparr);
                  setdropCardArr(["Start using Trello"]);
                }}
                className={`transition-all mt-7 duration-100 font-semibold text-sm ${
                  state == 2
                    ? "bg-blue-500 hover:bg-blue-400 text-gray-800 mt-7"
                    : "bg-gray-500/20 hover:bg-gray-300/15 text-gray-400"
                }  p-2 px-3 rounded cursor-pointer`}
              >
                Continue
              </button>
            ) :state==5? <button
            disabled={page==5}
               onClick={async () => {setloading(true)//verify email check
                  const verify = await emailVerifyStatus()
                  if(verify){
                    Navigate("/boards/starter")
                  }
                  else{
                    setModal(true)
                    setloading(false)
                  }
                }}
                className={`disabled:cursor-not-allowed mt-7 font-semibold text-sm ${"bg-blue-500 hover:bg-blue-400 text-gray-800 mt-7"} py-1  px-3 rounded cursor-pointer`}
              >
                 {loading ? (
              <div className="flex items-center justify-center mx-6">
                <svg
                  className="animate-spin h-5 w-5 my-0.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="p-2 py-1">
              Continue</div>
            )}
               
              </button>: state==4? <button
                onClick={async () => {setloading(true)//verify email check
                  const verify = await emailVerifyStatus()
                  if(verify){
                    Navigate("/boards/starter")
                  }
                  else{
                    setModal(true)
                    setloading(false)
                  }
                }}
                className={`transition-all mt-7 disabled:cursor-not-allowed duration-100 font-semibold text-sm ${
                   "bg-gray-500/20 hover:bg-gray-300/15 text-gray-400"
                }  py-1 px-3 rounded cursor-pointer`}
              >
                {loading ? (
              <div className="flex items-center justify-center mx-4">
                <svg
                  className="animate-spin h-5 w-5 my-0.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="p-2 py-1">
              Continue</div>
            )}
              </button>: (
             null
            )}
          </div>
          <DragDropContext onDragEnd={ondragend}>
            <div
              className={`flex flex-1 gap-5 w-full pl-5 items-start transition-all duration-1000 ${
                shouldAnimate2||page==4 ? "translate-x-0" : "translate-x-[26vw]"
              }`}
            >
              {state == 0 ? (
                <div className={`bg-gray-800/75 h-full w-85 rounded-t-xl`}>
                  <div className="bg-gray-800 rounded-t-xl pl-7 pt-4 pb-4 text-gray-400 w-full flex items-center gap-3">
                    <div className="w-4">
                      <svg fill="none" viewBox="0 0 16 16">
                        <path
                          fill="currentcolor"
                          fill-rule="evenodd"
                          d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v5h3a.75.75 0 0 1 .75.75 1.75 1.75 0 1 0 3.5 0A.75.75 0 0 1 10.5 8h3V3a.5.5 0 0 0-.5-.5zm10.5 7h-2.337a3.251 3.251 0 0 1-6.326 0H2.5V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5zM12 6H4V4.5h8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="font-bold">Inbox</div>
                  </div>
                  <div className="w-full px-5 space-y-3">
                    <div className="bg-gray-800 rounded-lg shadow-[0px_1px_1px_rgba(0,0,0,0.7)] mt-4 h-30"></div>
                    {cardArr.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 rounded-lg hover:ring-2 hover:ring-white text-gray-400 text-sm px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.7)] "
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`bg-gray-800/75 h-full w-85 rounded-t-xl`}>
                  <div className="bg-gray-800 rounded-t-xl pl-7 pt-4 pb-4 text-gray-400 w-full flex items-center gap-3">
                    <div className="w-4">
                      <svg fill="none" viewBox="0 0 16 16">
                        <path
                          fill="currentcolor"
                          fill-rule="evenodd"
                          d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v5h3a.75.75 0 0 1 .75.75 1.75 1.75 0 1 0 3.5 0A.75.75 0 0 1 10.5 8h3V3a.5.5 0 0 0-.5-.5zm10.5 7h-2.337a3.251 3.251 0 0 1-6.326 0H2.5V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5zM12 6H4V4.5h8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="font-bold">Inbox</div>
                  </div>

                  <Droppable droppableId={"inbox"}>
                    {(provided) => (
                      <div
                        className="w-full px-5 space-y-3"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="bg-gray-800 rounded-lg shadow-[0px_1px_1px_rgba(0,0,0,0.7)] mt-4 h-30"></div>
                        {cardArr.map((item, index) => (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {renderDraggable((provided) => (
                              <div
                                style={{
                                  ...provided.draggableProps.style,
                                }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-gray-800 rounded-lg hover:ring-2 hover:ring-white text-gray-400 text-sm px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.7)] "
                              >
                                {item}
                              </div>
                            ))}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )}
              <div
                className={`h-full transition-all flex-1 duration-1000 ${
                  shouldAnimateBoard||page==4 ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className=" bg-gradient-to-br rounded-t-xl from-violet-400 w-full h-full to-pink-400">
                  <div className="bg-gradient-to-r rounded-t-xl from-violet-400 to-pink-400 font-semibold py-4 text-gray-800 w-full items-center justify-between flex px-5 pr-10">
                    <div>My Trello Board</div>
                    <div className="flex gap-1">
                      <div className="w-6 h-6 rounded-full bg-gray-300/15"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-300/15"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-300/15"></div>
                    </div>
                  </div>
                  <div className="flex gap-3 pl-3 mt-3">
                    <Droppable droppableId={"today"}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="w-85 bg-gray-800/90 rounded-lg"
                        >
                          <div className="flex items-center justify-between text-gray-400">
                            <div className=" text-sm px-5 py-4 font-semibold">
                              Today
                            </div>
                            <div>
                              <svg
                                width="16"
                                className="mx-5"
                                height="16"
                                role="presentation"
                                focusable="false"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          {dropcardArr.map((item, index) => (
                            <div
                              className={`bg-gray-800 rounded-lg flex gap-2 items-center hover:ring-2 ring-white text-gray-400 text-sm px-4 py-2 m-3 shadow-[0px_1px_1px_rgba(0,0,0,0.7)] ${
                                state == 4 ? "ring-2" : ""
                              } `}
                              key={index}
                            >
                              {state >= 4 ? (
                                <label className="flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => {
                                      setChecked(e.target.checked);
                                      setstate(e=>e+1)
                                      e.target.disabled = true;
                                    }}
                                    className="sr-only"
                                  />
                                  <div
                                    className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center
                                      ${
                                        checked
                                          ? "bg-green-500 border-green-500"
                                          : "border-gray-400"
                                      }`}
                                  >
                                    {checked && (
                                      <svg
                                        className="w-3 h-3 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    )}
                                    {checked && (
                                      <div className="absolute">
                                        <ConfettiExplosion
                                          force={0.6}
                                          particleSize={5}
                                          duration={1500}
                                          particleCount={600}
                                          width={1000}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </label>
                              ) : null}
                              <div>{item}</div>
                            </div>
                          ))}
                          {provided.placeholder}
                          <div className="flex items-center mx-5 justify-between pb-4">
                            <div>
                              <svg
                                width="16"
                                className="text-gray-400"
                                height="16"
                                role="presentation"
                                focusable="false"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </div>
                            <div className="w-55 mr-5 h-3 rounded-full bg-gray-700"></div>
                            <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                          </div>
                        </div>
                      )}
                    </Droppable>
                    <div className="w-85 h-fit bg-gray-800/90 rounded-lg">
                      <div className="flex items-center justify-between text-gray-400">
                        <div className=" text-sm px-5 py-4 font-semibold">
                          This week
                        </div>
                        <div>
                          <svg
                            width="16"
                            className="mx-5"
                            height="16"
                            role="presentation"
                            focusable="false"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center mx-5 justify-between pb-4">
                        <div>
                          <svg
                            width="16"
                            className="text-gray-400"
                            height="16"
                            role="presentation"
                            focusable="false"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                        <div className="w-55 mr-5 h-3 rounded-full bg-gray-700"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                      </div>
                    </div>
                    <div className="w-85 h-fit bg-gray-800/90 rounded-lg">
                      <div className="flex items-center justify-between text-gray-400">
                        <div className=" text-sm px-5 py-4 font-semibold">
                          Later
                        </div>
                        <div>
                          <svg
                            width="16"
                            className="mx-5"
                            height="16"
                            role="presentation"
                            focusable="false"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center mx-5 justify-between pb-4">
                        <div>
                          <svg
                            width="16"
                            className="text-gray-400"
                            height="16"
                            role="presentation"
                            focusable="false"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                        <div className="w-55 mr-5 h-3 rounded-full bg-gray-700"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DragDropContext>
        </div>
      ) : null}
    </div>
  );
}
