import { useState } from "react";
import { useParams } from "react-router-dom";
import Board from "../components/Board";
import { TrelloLogoAnimated } from "../Icons/TrelloAnimatedIcon";
import LoggedInNavBar from "@/components/LoggedInNavBar";

export default function BoardPage({}) {
  const { boardId } = useParams();
  const [inboxDef, setInboxDef] = useState(true);
  return (
    <div className="w-screen flex flex-col h-screen bg-gray-800 pb-5 px-3">
      <LoggedInNavBar></LoggedInNavBar>
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
          <Board boardId={boardId}></Board>
        </div>
      </div>
    </div>
  );
}
