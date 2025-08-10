import { NavBar } from "../components/NavBarHome";
import PlayIcon from "../Icons/playicon";
import EmailIcon from "../Icons/emailicon";
import HomepageCarousal2 from "../components/homepagecarousal2";
import { ImageCarousal } from "../components/ImageCarousal";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export function Homepage() {
  const navigate = useNavigate()
  const emailRef1 = useRef(null)
  const emailRef2 = useRef(null)
  useEffect(()=>{
    window.addEventListener("keypress", function(e){
      if(e.key==="Enter"){
        if(emailRef1.current.value){
        navigate(`/signup/${emailRef1.current.value}`)}
        else if(emailRef2.current.value){
           navigate(`/signup/${emailRef2.current.value}`)
        }
      }
    })
    return () => window.removeEventListener("keypress",function(e){
      if(e.key==="Enter" &&(emailRef1.current.value||emailRef2.current.value)){
        if(emailRef1.current.value){
        navigate(`/signup/${emailRef1.current.value}`)}
        else if(emailRef2.current.value){
           navigate(`/signup/${emailRef2.current.value}`)
        }
      }
    })
  },[])
  return (
    <div>
        <NavBar></NavBar>
      <div>
        <div className="flex bg-gray-100 justify-center items-center">
          <div className="flex flex-col w-[550px] justify-center mx-10">
            <h1 className="text-5xl font-[600] leading-15 mb-3">
              Capture, organize, and tackle your to-dos from anywhere.
            </h1>
            <p className="text-xl mb-8">
              Escape the clutter and chaos—unleash your productivity with
              Trello.
            </p>
            <div className="mb-6">
              <input
                className="bg-white border-gray-300 py-2.5 mr-4 border pl-3 pr-15 rounded-sm"
                type="text"
                placeholder="Email"
                ref={emailRef1}
              />
              <button onClick={()=>{navigate(`/signup/${emailRef1.current.value}`)}} className="bg-blue-600 text-white px-4 py-3 cursor-pointer rounded-md w-fit">
                Sign up - it's free!
              </button>
            </div>
            <div className="mb-12">
              By entering my email, I acknowledge the{" "}
              <a className="text-blue-600 underline" href="https://www.atlassian.com/legal/privacy-policy">
                Atlassian Privacy Policy
              </a>
            </div>
            <div className="flex  items-center text-blue-600">
              <div className="underline">Watch video</div>{" "}
              <div className="size-6 ml-2 fill-blue-600">
                <PlayIcon></PlayIcon>
              </div>
            </div>
          </div>
          <div className="h-fit mt-30 size-155">
            <video
              src="https://videos.ctfassets.net/rz1oowkt5gyp/4AJBdHGUKUIDo7Po3f2kWJ/3923727607407f50f70ccf34ab3e9d90/updatedhero-mobile-final.mp4"
              muted
              autoPlay
              playsInline
            />
          </div>
        </div>
        <div className="flex flex-col justify-center w-[1200px] item m-auto mt-5 mb-20">
          <div className="text-lg font-medium">TRELLO 101</div>
          <div>
            <div className="text-4xl font-[600] leading-15 mb-3">
              Your productivity powerhouse
            </div>
            <div className="text-lg leading-8 mb-8 w-[590px]">
              Stay organized and efficient with Inbox, Boards, and Planner.
              Every to-do, idea, or responsibility—no matter how small—finds its
              place, keeping you at the top of your game.
            </div>
            <div>
              <ImageCarousal></ImageCarousal>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 flex flex-col justify-center items-center pt-12 pb-80">
          <div className="flex flex-col items-center justify-center">
            <div className="text-white text-3xl font-extrabold mb-5">
              From message to action
            </div>
            <div className="text-white text-xl font-medium text-center w-[750px]">
              Quickly turn communication from your favorite apps into to-dos,
              keeping all your discussions and tasks organized in one place.
            </div>
          </div>
          <div className="flex bg-white items-center justify-center py-8 rounded-lg pr-4 mt-15 drop-shadow-xl">
            <div className="mx-8 mr-10">
              <img
                className="w-139"
                src="https://images.ctfassets.net/rz1oowkt5gyp/2QvggeQ9nzUdaDnhJCSUwA/3ef97067e1aa3d0a5e6a04b5780fd751/email-todos.png?w=1110&fm=webp"
              />
            </div>
            <div className="mx-10">
              <div className="flex items-center mb-8">
                <div className="text-purple-500 mr-2">
                  <EmailIcon></EmailIcon>
                </div>
                <div className="font-medium">EMAIL MAGIC</div>
              </div>
              <div className="text-xl w-[400px]">
                Easily turn your emails into to-dos! Just forward them to your
                Trello Inbox, and they'll be transformed by Atlassian
                Intelligence (AI) into organized to-dos with all the links you
                need.
              </div>
            </div>
          </div>
          <div className="flex bg-white items-center justify-center py-8 rounded-lg pr-4 drop-shadow-xl absolute translate-y-130">
            <div className="mx-8 ml-14">
              <div className="flex items-center mb-8">
                <div className="text-blue-500 mr-2">
                  <svg
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="0 0 32 32"
                    width="30"
                    height="30"
                  >
                    <path d="M6.66 6.667h18.68A2.66 2.66 0 0 1 28 9.325v16.016A2.659 2.659 0 0 1 25.34 28H6.66A2.66 2.66 0 0 1 4 25.341V9.325a2.659 2.659 0 0 1 2.66-2.658ZM6.667 12v12A1.333 1.333 0 0 0 8 25.333h16A1.333 1.333 0 0 0 25.333 24V12H6.667ZM8 5.333a1.333 1.333 0 0 1 2.667 0v1.334H8V5.333Zm13.333 0a1.333 1.333 0 0 1 2.667 0v1.334h-2.667V5.333Zm-12 12v-2.668H12v2.668H9.333Zm10.667 0v-2.668h2.667v2.668H20Zm-5.333 0v-2.668h2.668v2.668h-2.668Zm-5.334 5.334V20H12v2.667H9.333Zm5.334 0V20h2.668v2.667h-2.668Zm5.333 0V20h2.667v2.667H20Z"></path>
                  </svg>
                </div>
                <div className="font-medium">MESSAGE APP SORCERY</div>
              </div>
              <div className="text-xl w-[400px]">
                Need to follow up on a message from Slack or Microsoft Teams?
                Send it directly to your Trello board! Your favorite app
                interface lets you save messages that appear in your Trello
                Inbox with AI-generated summaries and links.
              </div>
            </div>
            <div className="mx-8 mr-8">
              <img
                className="w-139"
                src="https://images.ctfassets.net/rz1oowkt5gyp/3r1BvsfEsj4THe6YwpBOVy/2b1befa1e5e3522a2b0daae0dd3f3de0/slackteams-to-inbox.png?w=1110&fm=webp"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-[1200px] item m-auto mt-45 mb-20">
          <div className="text-lg font-medium">WORK SMARTER</div>
          <div>
            <div className="text-4xl font-[600] leading-15 mb-3">
              Do more with Trello
            </div>
            <div className="text-xl leading-8 mb-8 w-[590px]">
              Customize the way you organize with easy integrations, automation,
              and mirroring of your to-dos across multiple locations.
            </div>
            <div className="flex mt-5">
              <div className="bg-gray-50 rounded-lg mx-5 pt-6 pb-5 px-6">
                <img
                  src="//images.ctfassets.net/rz1oowkt5gyp/gMfkjoA3yWYG3kat3qjpW/1935c0e535bc27c820c13c1a1e02b4ed/Integration.svg"
                  alt=""
                  width="96"
                  height="97"
                  loading="lazy"
                  class="Picture__Image-sc-1wdxyb4-0 eYmxm"
                ></img>
                <div className="text-xl font-medium mt-5 mb-2">
                  Integrations
                </div>
                <div className="w-[310px] mb-4">
                  Connect the apps you are already using into your Trello
                  workflow or add a Power-Up to fine-tune your specific needs.
                </div>
                <div>
                  <button className="bg-white mt-4 cursor-pointer rounded-md px-4 py-3 border-blue-600 border">
                    Browse Integrations
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg mx-5 pt-6 pb-5 px-6">
                <img
                  src="//images.ctfassets.net/rz1oowkt5gyp/7wxRW93hvb7858bMsK4LSs/336a6acc2c9a7a515a37bd895b98d4f6/Autodev.svg"
                  alt=""
                  width="96"
                  height="97"
                  loading="lazy"
                  class="Picture__Image-sc-1wdxyb4-0 eYmxm"
                />
                <div className="text-xl font-medium mt-5 mb-2">
                  Butler Automation
                </div>
                <div className="w-[310px] mb-4">
                  No-code automation is built into every Trello board. Focus on
                  the work that matters most and let the robots do the rest.
                </div>
                <div>
                  <button className="bg-white mt-4 cursor-pointer rounded-md px-4 py-3 border-blue-600 border">
                    Get to know Automation
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg mx-5 pt-6 pb-5 px-6">
                <img
                  src="//images.ctfassets.net/rz1oowkt5gyp/2QHMr8zhoP0jlvvXC8k2am/0f2a100621210cc76e0298bd07bbc0ca/Project_management.svg"
                  alt=""
                  width="96"
                  height="97"
                  loading="lazy"
                  class="Picture__Image-sc-1wdxyb4-0 eYmxm"
                ></img>
                <div className="text-xl font-medium mt-5 mb-2">
                  Card mirroring
                </div>
                <div className="w-[300px] mb-4">
                  View all your to-dos from multiple boards in one place. Mirror
                  a card to keep track of work wherever you need it!
                </div>
                <div>
                  <button className="bg-white mt-4 cursor-pointer rounded-md px-4 py-3 border-blue-600 border">
                    Compare plans
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pb-20">
          <div>
            <HomepageCarousal2></HomepageCarousal2>
          </div>
          <div className="text-xl mt-14">
            Join a community of millions of users globally who are using Trello
            to get more done.
          </div>
          <div>
            <img
              className="mt-7 size-[95%]"
              src="//images.ctfassets.net/rz1oowkt5gyp/19rAABnbk8KNNuh3zJzsmr/210fb8ee51dea14595462f844b7c9beb/logos-horizontal-visa-coinbase-john-deere-zoom-grand-hyatt-fender.svg"
              alt="Company logos: Visa, Coinbase, John Deere, Zoom, Grand Hyatt and Fender"
              width="960"
              height="80"
              loading="lazy"
            ></img>
          </div>
        </div>
        <div className="bg-gray-100 flex flex-col justify-center items-center pt-20 pb-20">
          <div className="text-4xl font-semibold">
            Get started with Trello today
          </div>
          <div>
            <div className="mb-6 mt-8">
              <input
                className="bg-white border-gray-300 py-3 mr-6 border pl-3 pr-40 rounded-sm"
                type="text"
                placeholder="Email"
                ref={emailRef2}

              />
              <button onClick={()=>{navigate(`/signup/${emailRef2.current.value}`)}} className="bg-blue-600 cursor-pointer text-white px-5 py-3 rounded-md w-fit">
                Sign up - it's free!
              </button>
            </div>
          </div>
          <div>
            By entering my email, I acknowledge the{" "}
            <a className="text-blue-600 underline" href="https://www.atlassian.com/legal/privacy-policy">
              Atlassian Privacy Policy
            </a>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
