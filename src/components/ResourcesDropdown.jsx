export function ResourcesDropdown() {
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
        <div className="pt-7 w-fit pb-5">
          <div className="font-medium mb-3">
            Explore the features that help your team succeed
          </div>
          <div>
            <hr className="w-[750px] text-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-4 grid-rows-2 mt-4 mb-5 mr-15">
           <a href="https://trello.com/guide"> <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[114px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                </div>
                <div className="text-sm font-medium">Trello guide</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Our easy to follow workflow guide will take you from project set-up to Trello expert in no time.
              </div>
            </div></a>
            <a href="https://trello.com/guide/remote-work"><div
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
                <div className="text-sm font-medium">Remote work guide</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                The complete guide to setting up your team for remote work success.
              </div>
            </div></a>
            <a href="https://trello.com/webinars"><div
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
                <div className="text-sm font-medium">Webinars</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
               Enjoy our free Trello webinars and become a productivity professional.
              </div>             
            </div></a>
            <a href="https://trello.com/customers"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[130px] flex flex-col p-[16px]"
            >
                <div className="flex gap-3 text-gray-600 pointer-events-none">
                  <div className="text-sm font-medium">Customer stories</div>
                </div>
                <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                  See how businesses have adopted Trello as a vital part of their workflow.
                </div>
              
            </div></a>
           <a href="https://developer.atlassian.com/cloud/trello/"> <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[130px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="text-sm font-medium">Developers</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                The sky's the limit in what you can deliver to Trello users in your Power-Up!
              </div>
            </div></a>
            <a href="https://support.atlassian.com/trello/"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[130px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="text-sm font-medium">Help resources</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Need help? Articles and FAQs to get you unstuck.
              </div>
            </div></a>
          </div>
        </div>
      </div>
      <div className="flex justify-start flex-8 pt-7 pl-8 bg-purple-50">
        <div>
          <div className="font-medium mb-3">Helping teams work better, together</div>
          <div>
            <hr className="text-purple-800 w-[290px]" />
          </div>
          <div className="text-xs text-gray-500 font-medium w-[280px] leading-5 mt-4 mb-5">
            Discover Trello use cases, productivity tips, best practices for team collaboration, and expert remote work advice.
          </div>
          <a href="https://www.atlassian.com/blog/trello">
          <button
            type="button"
            className="w-fit border border-purple-800 cursor-pointer hover:bg-purple-100 transition-all duration-300 p-3 bg-white rounded"
          >
            Check out the Trello blog 
          </button></a>
        </div>
      </div>
    </div>
  );
}
