export function FeaturesDropdown() {
  const getRandomColor = () => {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 97%)`;
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = getRandomColor();
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#FFFFFF";
  };
  return (
    <div className="flex justify-between">
      <div className="flex flex-12 justify-end">
        <div className="pt-7 w-fit pb-15">
          <div className="font-medium mb-3">
            Explore the features that help your team succeed
          </div>
          <div>
            <hr className="w-[750px] text-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-4 grid-rows-2 mt-4 mb-5 mr-15">
            <a href="https://trello.com/inbox">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[114px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    viewBox="0 0 48 48"
                    className="size-5"
                    fill="currentColor"
                  >
                    <path d="M31 21L17 21L17 17L31 17V21Z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M10 10V38H38V10H10ZM34 14H14V24H18C18 27.3137 20.6863 30 24 30C27.3137 30 30 27.3137 30 24H34V14Z"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Inbox</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Capture every vital detail from emails, Slack, and more directly
                into your Trello Inbox.
              </div>
             </div></a>
             <a href="https://trello.com/planner"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[114px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="size-5"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                  >
                    <path d="M21 11H27V8H31V11H38V39H10V11H17V8H21V11ZM21 15V18H17V15H14V22H34V15H31V18H27V15H21Z"></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Planner</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Sync your calendar and allocate focused time slots to boost
                productivity.
              </div>
            </div></a>
             <a href="https://trello.com/butler-automation"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[114px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="size-5"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                  >
                    <path d="M11 28L27 6V20H37L21 42V28H11Z"></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Automation</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Automate tasks and workflows with Butler automation.
              </div>             
            </div></a>
             <a href="https://trello.com/power-ups"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[130px] flex flex-col p-[16px]"
            >
                <div className="flex gap-3 text-gray-600 pointer-events-none">
                  <div className="flex items-center justify-center">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 48 48"
                      className="size-5"
                      fill="currentColor"
                    >
                      <path d="M11 11H20.5V33H11V11Z"></path>
                      <path d="M23.5 33V11H33V33H23.5Z"></path>
                      <path d="M36 20V36H20V40H40V20H36Z"></path>
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Power-Ups</div>
                </div>
                <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                  Power up your teams by linking their favorite tools with
                  Trello plugins.
                </div>
              
            </div></a>
             <a href="https://trello.com/templates"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[130px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 48 48"
                    className="size-5"
                    fill="currentColor"
                  >
                    <path d="M21 18H27V10H31V18H35V26L29 31V33H19V31L13 26V18H17V10H21V18Z"></path>
                    <path d="M29 36H19V40H29V36Z"></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Templates</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Give your team a blueprint for success with easy-to-use
                templates from industry leaders and the Trello community.
              </div>
            </div></a>
             <a href="https://trello.com/integrations"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[130px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 48 48"
                    className="size-5"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M38 16.125L24 7.375L10 16.125V31.875L24 40.625L38 31.875V16.125ZM24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Integrations</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Find the apps your team is already using or discover new ways to
                get work done in Trello.
              </div>
            </div></a>
          </div>
        </div>
      </div>
      <div className="flex justify-start flex-8 pt-7 pl-8 bg-purple-50">
        <div>
          <div className="font-medium mb-3">Meet Trello</div>
          <div>
            <hr className="text-purple-800 w-[290px]" />
          </div>
          <div className="text-xs text-gray-500 font-medium w-[280px] leading-5 mt-4 mb-5">
            Trello makes it easy for your team to get work done. No matter the
            project, workflow, or type of team, Trello can help keep things
            organized. It’s simple – sign-up, create a board, and you’re off!
            Productivity awaits.
          </div>
          <a href="https://trello.com/tour">
          <button
            type="button"
            className="w-fit border border-purple-800 cursor-pointer hover:bg-purple-100 transition-all duration-300 p-3 bg-white rounded"
          >
            Check out Trello
          </button></a>
        </div>
      </div>
    </div>
  );
}
