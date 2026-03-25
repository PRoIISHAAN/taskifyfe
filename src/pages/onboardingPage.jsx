import { useEffect, useState } from "react";
import OnboardingPage2 from "./OnboardingPage2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true

export default function OnboardingPage() {
  const [loggedIn,setloggedIn] = useState(false)
  const [selected, setselected] = useState(null);
  const [page, setPage] = useState(0);
  const Navigate = useNavigate()
  const ImgSrc = [
    "https://trello.com/assets/3d32ed48b1f80bc04458.png",
    "https://trello.com/assets/a3546d949d9747ffd14b.png",
    "https://trello.com/assets/43521f3f3ebf2812bfec.png",
    "https://trello.com/assets/3232ff80fd630d774166.png",
  ];
  useEffect(()=>{
    console.log("onboarding")
    async function verify(){
      const res = await axios.get(`/user/getverifystatus`)
      if( res.data.userId){
        console.log(res.data.userId)
        setloggedIn(true)
      }
      else{
        console.log("redirecting")
        Navigate("/login")
      }
    }
    verify()
  },[])
  return (
    loggedIn &&
    <div>
      {page == 0 ? (
        <div className="bg-black h-[100vh] w-full overflow-hidden">
          <div className="bg-blue-400 w-full">
            <img
              className="py-5 mx-10"
              alt="Trello"
              src="https://trello.com/assets/c8b7bafdbc02d4015366.svg"
              data-testid="new-user-onboarding-header-moonshot-logo"
            />
          </div>
          <div className="flex h-full w-full">
            <div className="bg-slate-600/34 h-full w-[45vw] px-97 pb-40 flex flex-col items-center justify-center">
              <div className="text-slate-300 font-semibold text-4xl w-full leading-12">
                What brings you here today?
              </div>
              <div className="text-gray-300 flex flex-col gap-2 w-full mt-5">
                <div
                  onClick={() => {
                    setselected(1);
                  }}
                  className={`${
                    selected == 1
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600/80"
                  } cursor-pointer hover:bg-gray-700/50 transition-all duration-100 flex items-center gap-6 text-[12px] font-medium pl-5 border-2  py-6 rounded-lg`}
                >
                  <div className="text-purple-400">
                    <svg
                      width="18"
                      height="18"
                      role="presentation"
                      focusable="false"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7 5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5H7ZM7 6C5.89543 6 5 6.89543 5 8H19C19 6.89543 18.1046 6 17 6H7ZM5 11H19V19H5L5 11ZM3 11C3 9.89543 3.89543 9 5 9H19C20.1046 9 21 9.89543 21 11V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V11ZM15 15H9V14C9 13.4477 8.55228 13 8 13C7.44772 13 7 13.4477 7 14V15V16C7 16.5523 7.44772 17 8 17H16C16.5523 17 17 16.5523 17 16V15V14C17 13.4477 16.5523 13 16 13C15.4477 13 15 13.4477 15 14V15Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div>Organize ideas and work</div>
                </div>
                <div
                  onClick={() => {
                    setselected(2);
                  }}
                  className={`${
                    selected == 2
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600/80"
                  } cursor-pointer hover:bg-gray-700/50 transition-all duration-100 flex items-center gap-6 text-[12px] font-medium pl-5 border-2  py-6 rounded-lg`}
                >
                  <div className="text-green-400">
                    <svg
                      width="18"
                      height="18"
                      role="presentation"
                      focusable="false"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div>Track personal tasks and to-dos</div>
                </div>
                <div
                  onClick={() => {
                    setselected(3);
                  }}
                  className={`${
                    selected == 3
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600/80"
                  } cursor-pointer hover:bg-gray-700/50 transition-all duration-100 flex items-center gap-6 text-[12px] font-medium pl-5 border-2  py-6 rounded-lg`}
                >
                  <div className="text-blue-400">
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 16 16"
                      role="presentation"
                      class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
                    >
                      <path
                        fill="currentcolor"
                        fill-rule="evenodd"
                        d="M4 2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M1 4a3 3 0 1 1 6 0 3 3 0 0 1-6 0m11-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9 4a3 3 0 1 1 6 0 3 3 0 0 1-6 0M3.75 9.5a2.25 2.25 0 0 0-2.25 2.25V13a.5.5 0 0 0 .5.5h4V15H2a2 2 0 0 1-2-2v-1.25A3.75 3.75 0 0 1 3.75 8h1.149a3.75 3.75 0 0 1 3.524 2.469l.564 1.55A2.25 2.25 0 0 0 11.1 13.5H14a.5.5 0 0 0 .5-.5v-1.25a2.25 2.25 0 0 0-2.25-2.25H12c-.775 0-1.258.06-1.531.112-.137.026-.22.05-.26.062l-.027.01.007-.003.01-.004.005-.003.003-.002h.002c.001-.001.001-.001-.334-.672l-.335-.671h.001l.002-.002.004-.001.008-.004.018-.008a1 1 0 0 1 .174-.066q.156-.053.44-.11C10.572 8.065 11.15 8 12 8h.25A3.75 3.75 0 0 1 16 11.75V13a2 2 0 0 1-2 2h-2.899a3.75 3.75 0 0 1-3.524-2.469l-.564-1.55A2.25 2.25 0 0 0 4.9 9.5z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>Manage team projects</div>
                </div>
                <div
                  onClick={() => {
                    setselected(4);
                  }}
                  className={`${
                    selected === 4
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600/80"
                  } cursor-pointer hover:bg-gray-700/50 transition-all duration-100 flex items-center gap-6 text-[12px] font-medium pl-5 border-2  py-6 rounded-lg`}
                >
                  <div className="text-yellow-400">
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 16 16"
                      role="presentation"
                      class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi"
                    >
                      <path
                        fill="currentcolor"
                        fill-rule="evenodd"
                        d="M1 1h1.5v7.94l3.22-3.22a.75.75 0 0 1 1.06 0L8.5 7.44l3.94-3.94H10V2h4.25a.75.75 0 0 1 .75.75V7h-1.5V4.56L9.03 9.03a.75.75 0 0 1-1.06 0L6.25 7.31 2.5 11.06V13a.5.5 0 0 0 .5.5h12V15H3a2 2 0 0 1-2-2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>Create and automate your team's workflows</div>
                </div>
              </div>
              <div className="flex gap-2 w-full mt-7">
                <button
                  onClick={() => {
                    setPage(1);
                  }}
                  disabled={selected == null}
                  className="text-black transition-all duration-100 font-medium text-sm bg-blue-500 p-2 px-3 rounded cursor-pointer hover:bg-blue-400 disabled:bg-gray-600/40 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {selected == 3 || selected == 4 ? "Try Jira" : "Continue"}
                </button>
                <button
                  onClick={() => {
                    setPage(1);
                  }}
                  className="text-slate-300 text-sm transition-all duration-100 font-medium hover:bg-gray-500/50 p-1 px-3 rounded"
                >
                  Skip
                </button>
              </div>
            </div>
            <div className="bg-violet-300/20 w-[55vw] pb-50 flex flex-col h-full items-center justify-center">
              <div className="mt-5">
                {selected != null ? (
                  <div className="bg-green-800/40 w-fit h-fit text-green-200 px-[3px] text-xs font-medium relative m-auto bottom-5">
                    {selected == 1 || selected == 2
                      ? "RECOMMENDED"
                      : "TRY IT FREE"}
                  </div>
                ) : null}
                {selected == 3 || selected == 4 ? (
                  <svg
                    className="mb-3"
                    fill="none"
                    height="32"
                    viewBox="0 0 77 32"
                    focusable="false"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#357DE8"
                      d="M7.967 21.323H5.748C2.401 21.323 0 19.273 0 16.271h11.933c.618 0 1.018.44 1.018 1.062V29.34c-2.983 0-4.984-2.416-4.984-5.784zm5.894-5.967h-2.22c-3.346 0-5.747-2.013-5.747-5.015h11.932c.618 0 1.055.402 1.055 1.025v12.007c-2.983 0-5.02-2.416-5.02-5.784zm5.93-5.93h-2.22c-3.347 0-5.748-2.05-5.748-5.052h11.933c.618 0 1.019.439 1.019 1.025v12.007c-2.983 0-4.984-2.416-4.984-5.784z"
                    ></path>
                    <path
                      fill="#E2E3E4"
                      d="M65.023 17.874c0 3.68 1.472 5.52 4.202 5.52 2.36 0 4.477-1.503 4.477-4.907V17.26c0-3.404-1.932-4.906-4.17-4.906-2.975 0-4.509 1.962-4.509 5.52m8.679 7.666v-2.76c-.981 2.024-2.821 3.067-5.183 3.067-4.078 0-6.133-3.465-6.133-7.973 0-4.324 2.147-7.974 6.44-7.974 2.239 0 3.956 1.012 4.876 3.006v-2.699h2.637V25.54zM55.91 16.493v9.047h-2.577V10.207h2.576v2.698c.89-1.809 2.423-3.097 5.428-2.913v2.576c-3.373-.337-5.428.675-5.428 3.925M46.224 6.159c0-1.165.767-1.84 1.84-1.84s1.84.675 1.84 1.84-.767 1.84-1.84 1.84-1.84-.675-1.84-1.84m.49 19.381V10.207h2.638V25.54zm-6.427-5.95V5.393h2.76v14.015c0 3.71-1.626 6.256-5.428 6.256-1.442 0-2.546-.246-3.312-.522v-2.668c.828.338 1.84.522 2.852.522 2.33 0 3.128-1.41 3.128-3.404"
                    ></path>
                  </svg>
                ) : (
                  <img
                    src="https://trello.com/assets/299e471b52881bbc6f92.svg"
                    alt="Trello"
                  />
                )}
              </div>
              <div className=" mt-3">
                <img
                  className=" w-300"
                  src={
                    selected == null
                      ? `https://trello.com/assets/3d32ed48b1f80bc04458.png`
                      : ImgSrc[selected - 1]
                  }
                  alt="Trello Inbox and board displaying a mix of work and personal to-dos alongside documents."
                />
              </div>
              {selected == 3 ? (
                <div className="w-full">
                  <div className="text-center text-sm mb-0.5 text-gray-400 font-semibold">
                    We recommend Jira for project management.
                  </div>
                  <div className="text-center text-sm text-gray-400">
                    You’ll get features like views, dependency mapping,
                    reporting, intake forms, and more.
                  </div>
                </div>
              ) : null}
              {selected == 4 ? (
                <div className="w-full">
                  <div className="text-center text-sm mb-0.5 text-gray-400 font-semibold">
                    We recommend Jira for team workflows.
                  </div>
                  <div className="text-center text-sm text-gray-400">
                    Get a customizable structure, plus approvals, forms, and
                    more to keep projects moving.
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {page >= 1 ? (
        <OnboardingPage2 page={page} setPage={setPage}></OnboardingPage2>
      ) : null}
    </div>
  );
}
