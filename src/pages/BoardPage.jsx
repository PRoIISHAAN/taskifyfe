import { useState } from "react";
import Board from "../components/Board";
import { TrelloLogoAnimated } from "../Icons/TrelloAnimatedIcon";

export default function BoardPage({}) {
  const [inboxDef, setInboxDef] = useState(true);
  const [button, setButton] = useState(false);
  return (
    <div className="w-screen flex flex-col h-screen bg-gray-800 pb-5 px-3">
      <nav className="flex items-center justify-between h-fit w-full pt-2 ">
        <div className="flex items-center justify-center gap-3">
          <div className="text-gray-400">
            <svg
              fill="none"
              viewBox="-4 -4 24 24"
              role="presentation"
              className="w-6"
            >
              <path
                fill="currentcolor"
                fillRule="evenodd"
                d="M1 3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM9 3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM1 11a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5zm6 .5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="pt-1">
            <TrelloLogoAnimated
              width={70}
              height={24}
              showText={true}
            ></TrelloLogoAnimated>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div>
            <input
              className="border-gray-400 border-1 py-1.5 rounded w-200 pl-3 text-sm text-gray-100 font-extralight"
              type="text"
              name="search"
              id="search"
              placeholder="Search"
            />
          </div>
          <div>
            <button className="bg-blue-400 text-sm font-medium px-3 py-1.5 rounded">
              Create
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="hover:from-violet-400/80 hover:to-blue-500/80 text-black bg-gradient-to-r from-violet-400 to-blue-500 px-3 py-1.5 rounded text-sm font-medium flex gap-2 items-center justify-center">
            <span className="w-3">
              <svg
                fill="none"
                viewBox="0 0 16 16"
                role="presentation"
              >
                <path
                  fill="currentcolor"
                  fillRule="evenodd"
                  d="M1.5 3v1.5H3V3h1.5V1.5H3V0H1.5v1.5H0V3zM8 1c.31 0 .587.19.699.478l1.63 4.193 4.193 1.63a.75.75 0 0 1 0 1.398l-4.193 1.63-1.63 4.193a.75.75 0 0 1-1.398 0l-1.63-4.193L1.478 8.7a.75.75 0 0 1 0-1.398l4.193-1.63L7.3 1.478A.75.75 0 0 1 8 1m0 2.82L6.949 6.521a.75.75 0 0 1-.427.427L3.819 8l2.703 1.051a.75.75 0 0 1 .427.427L8 12.181l1.051-2.703a.75.75 0 0 1 .427-.427L12.181 8 9.478 6.949a.75.75 0 0 1-.427-.427zm5 10.68V16h1.5v-1.5H16V13h-1.5v-1.5H13V13h-1.5v1.5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <span>14 days left</span>
          </div>
          <div className="w-8 h-8 rounded-sm hover:bg-gray-400/30 text-gray-400">
            <svg
              fill="none"
              viewBox="0 0 16 16"
              role="presentation"
              className="m-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.5 3.096a.5.5 0 0 0-.686-.464L7.5 4.758v4.734l5.314 2.126a.5.5 0 0 0 .686-.464zm-6 8.012 4.757 1.903A2 2 0 0 0 15 11.154V3.096a2 2 0 0 0-2.743-1.857L6.606 3.5H3a2 2 0 0 0-2 2v3.25a2 2 0 0 0 2 2h.5V13a2 2 0 0 0 2 2h1.25a.75.75 0 0 0 .75-.75zM6 9.25H3a.5.5 0 0 1-.5-.5V5.5A.5.5 0 0 1 3 5h3zm0 1.5v2.75h-.5A.5.5 0 0 1 5 13v-2.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            onClick={() => {
              setButton((e) => !e);
            }}
            className={` text-gray-400 w-8 rounded-sm ${
              button ? "bg-blue-500 hover:bg-blue-400" : "hover:bg-gray-400/30"
            }`}
          >
            <svg
              fill="none"
              viewBox="-4 -4 24 24"
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
              className="p-1"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 5a5 5 0 0 1 10 0v3.535l1.788 2.861a1.375 1.375 0 0 1-1.166 2.104h-2.459a3.251 3.251 0 0 1-6.326 0h-2.46a1.375 1.375 0 0 1-1.165-2.104L3 8.535zm3.418 8.5a1.75 1.75 0 0 0 3.164 0zM8 1.5A3.5 3.5 0 0 0 4.5 5v3.636c0 .215-.06.426-.175.608L2.603 12h10.794l-1.723-2.756a1.15 1.15 0 0 1-.174-.608V5A3.5 3.5 0 0 0 8 1.5"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="hover:bg-gray-400/30 rounded-sm text-gray-400 w-8 h-8">
            <svg
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="m-1.5"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 12C2 6.47667 6.47667 2 12 2C17.5233 2 22 6.47667 22 12C22 17.5233 17.5233 22 12 22C6.47667 22 2 17.5233 2 12ZM4 12C4 16.4188 7.58124 20 12 20C16.4188 20 20 16.4188 20 12C20 7.58124 16.4188 4 12 4C7.58124 4 4 7.58124 4 12ZM8 10C7.99999 7.48383 10.3214 5.51108 12.9389 6.10713C14.3829 6.43513 15.5569 7.60513 15.8899 9.04813C16.3809 11.1771 15.1719 13.0911 13.3589 13.7471C13.1549 13.8201 13.0099 14.0021 13.0099 14.2191V14.0001C13.0099 14.5521 12.5629 15.0001 12.0099 15.0001C11.4579 15.0001 11.0099 14.5521 11.0099 14.0001V12.9871C11.0179 12.4411 11.4599 12.0001 11.9999 12.0001C13.1029 12.0001 13.9999 11.1021 13.9999 10.0001C13.9999 8.89713 13.1029 8.00013 11.9999 8.00013C10.8959 8.00013 9.99935 8.92313 10.0004 10.0271C9.98522 10.5666 9.54291 11 9 11C8.47773 11 8.04856 10.599 8.00385 10.0882C8.00385 10.0882 8 10.0297 8 10ZM12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17C13 17.552 12.552 18 12 18Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="hover:bg-gray-400/30 rounded-sm w-8 h-8">
            <div className="rounded-full mx-1 my-1 text-white font-bold align-middle text-center bg-purple-500">
              I
            </div>
          </div>
        </div>
      </nav>
      <div className="flex-1 flex gap-3 px-1 pt-3 min-h-0">
        <div className="h-full bg-gradient-to-br rounded-2xl from-blue-400/20 to-blue-900 flex flex-col w-68 border-1 border-gray-700 flex-shrink-0">
          <div className="bg-black/40 rounded-t-2xl pl-4 pt-4 pb-4 text-gray-100 w-full flex items-center gap-2">
            <div className="w-4">
              <svg
                fill="none"
                viewBox="0 0 16 16"
                role="presentation"
              >
                <path
                  fill="currentcolor"
                  fillRule="evenodd"
                  d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v5h3a.75.75 0 0 1 .75.75 1.75 1.75 0 1 0 3.5 0A.75.75 0 0 1 10.5 8h3V3a.5.5 0 0 0-.5-.5zm10.5 7h-2.337a3.251 3.251 0 0 1-6.326 0H2.5V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5zM12 6H4V4.5h8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="font-bold">Inbox</div>
          </div>

          <div className="h-full">
            {inboxDef ? (
              <div className="flex flex-col items-center w-full h-full px-3">
                <div className="my-5">
                  <img
                    src="https://trello.com/assets/6070c9c7eb4f62ab0595.svg"
                    alt=""
                  />
                </div>
                <div className="mt-1 mb-5 text-gray-400 text-xl text-center leading-6 font-semibold">
                  Capture everything, wherever you are
                </div>
                <div className="flex w-full mb-3 py-2 pl-2 pr-10 rounded-lg bg-gray-800/70">
                  <div className="mr-3">
                    <img
                      className="w-16"
                      src="https://trello.com/assets/cea70922c96967ed6505.svg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-gray-400 text-start text-[13px]">
                      Forward any email to inbox@app.trello.com to add a card.
                    </div>
                    <div>
                      <button className="underline text-[13px] text-start text-blue-500">
                        Learn how email to inbox works
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full mb-3 py-2 pl-2 pr-10 rounded-lg bg-gray-800/70">
                  <div className="mr-3">
                    <img
                      className="w-16"
                      src="	https://trello.com/assets/f6a68cd2775a3b3228f4.svg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-gray-400 text-start text-[13px]">
                      Connect Slack to save messages as cards in your Inbox.
                    </div>
                    <div>
                      <button className="underline text-[13px] text-start text-blue-500">
                        Connect your Slack account
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full mb-3 py-2 pl-2 pr-10 rounded-lg bg-gray-800/70">
                  <div className="mr-3">
                    <img
                      className="w-16"
                      src="	https://trello.com/assets/388652623506bcd19569.svg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-gray-400 text-start text-[13px]">
                      Connect Teams to save messages as cards in your Inbox.
                    </div>
                    <div>
                      <button className="underline text-[13px] text-start text-blue-500">
                        Connect your Teams account
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full mb-3 py-2 pl-2 pr-10 rounded-lg bg-gray-800/70">
                  <div className="mr-3">
                    <img
                      className="w-16"
                      src="	https://trello.com/assets/2b5600732417ad5b388d.svg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-gray-400 text-start text-[13px]">
                      Get the Trello mobile app and capture on-the-go.
                    </div>
                    <div>
                      <button className="underline text-[13px] text-start text-blue-500">
                        Get the Trello app
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center gap-2 mt-5">
                  <div>
                    <img
                      className="w-5 h-5"
                      src="	https://trello.com/assets/d77e553b7259e7417efd.svg"
                      alt=""
                    />
                  </div>
                  <div className="text-xs text-gray-400">
                    Inbox is only visible to you
                  </div>
                </div>
                <div className="flex-1 w-full h-full flex items-end pb-5 justify-center">
                  <button className="bg-blue-400 text-sm font-medium px-3 py-1.5 rounded">
                    Add a card
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="h-full w-full min-w-0">
          <Board></Board>
        </div>
      </div>
    </div>
  );
}
