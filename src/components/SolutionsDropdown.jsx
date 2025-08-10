export function SolutionsDropdown() {
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
        <div className="pt-7 w-fit pb-40">
          <div className="font-medium mb-3">
            Take a page out of these pre-built Trello playbooks designed for all
            teams
          </div>
          <div>
            <hr className="w-[750px] text-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-4 grid-rows-2 mt-4 mb-5 mr-15">
            <a href="https://trello.com/teams/marketing"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[114px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    aria-hidden="true"
                    className="size-5"
                    viewBox="0 0 63 65"
                  >
                    <path
                      d="M36.027 36.587h-6.415a8.456 8.456 0 0 0-8.457 8.456v7.874c0 6.441 5.223 11.664 11.664 11.664 6.442 0 11.664-5.223 11.664-11.664v-7.874a8.456 8.456 0 0 0-8.456-8.456Zm-6.415 5.25h6.415a3.208 3.208 0 0 1 3.208 3.207v7.873a6.415 6.415 0 0 1-12.83 0v-7.873a3.208 3.208 0 0 1 3.207-3.208ZM2.785 18.508a2.625 2.625 0 0 1 2.621 2.5l.003.124v19.246a2.624 2.624 0 0 1-5.246.123l-.003-.123V21.132a2.624 2.624 0 0 1 2.625-2.624Z"
                      opacity=".5"
                    ></path>
                    <path d="m2.784 39.212 55.592 16.192a3.5 3.5 0 0 0 4.478-3.36V4.084c0-2.46-2.472-4.153-4.766-3.262L2.784 22.299v16.913Z"></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Marketing teams</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Whether launching a new product, campaign, or creating content,
                Trello helps marketing teams succeed.
              </div>
            </div></a>
           <a href="https://trello.com/teams/product"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[114px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    className="size-5"
                    aria-hidden="true"
                    viewBox="0 0 65 65"
                  >
                    <path
                      d="M16.462 33.807h32.932v21.747H16.462V33.807Z"
                      opacity=".5"
                    ></path>
                    <path d="M8.384.875h20.815v13.98h7.457V.876H57.47a7.456 7.456 0 0 1 7.457 7.456V57.42a7.456 7.456 0 0 1-7.457 7.456H8.384a7.456 7.456 0 0 1-7.456-7.456V8.33A7.456 7.456 0 0 1 8.384.875Zm40.277 33.554H17.083v20.505h31.578V34.429Z"></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Product management</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Use Trello’s management boards and roadmap features to simplify
                complex projects and processes.
              </div>
            </div></a>
            <a href="https://trello.com/teams/engineering"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[114px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    className="size-5"
                    aria-hidden="true"
                    viewBox="0 0 65 65"
                  >
                    <path
                      d="M10.002 25.73h45.359v27.34H10.002z"
                      opacity=".5"
                    ></path>
                    <g fill-rule="evenodd">
                      <path d="M56.63.877H7.491h49.137Zm7.43 17.398h-64v39.146a7.456 7.456 0 0 0 7.457 7.456h49.087a7.456 7.456 0 0 0 7.457-7.456V18.275ZM27.514 31.211a2.796 2.796 0 0 0-3.954 0l-6.835 6.834-.099.105a2.796 2.796 0 0 0 .1 3.85l6.834 6.835.104.099a2.796 2.796 0 0 0 3.85-.1l.1-.104a2.796 2.796 0 0 0-.1-3.85l-4.858-4.857 4.858-4.858.1-.104a2.796 2.796 0 0 0-.1-3.85Zm13.67 0a2.796 2.796 0 0 0-4.053 3.85l.1.104 4.858 4.858-4.859 4.857a2.796 2.796 0 0 0-.1 3.85l.1.105a2.796 2.796 0 0 0 3.85.099l.104-.1L48.018 42a2.796 2.796 0 0 0 .1-3.85l-.1-.105-6.835-6.835Z"></path>
                      <path
                        d="M64.06 18.275h-64V8.333A7.456 7.456 0 0 1 7.518.877h49.087a7.456 7.456 0 0 1 7.457 7.456v9.942Zm-55.3-4.35a3.728 3.728 0 1 0 0-7.456 3.728 3.728 0 0 0 0 7.456Zm13.67-3.728a3.728 3.728 0 1 1-7.457 0 3.728 3.728 0 0 1 7.456 0Zm6.213 3.729a3.728 3.728 0 1 0 0-7.457 3.728 3.728 0 0 0 0 7.456Z"
                        opacity=".5"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="text-sm font-medium">Engineering teams</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Ship more code, faster, and give your developers the freedom to
                be more agile with Trello.
              </div>
            </div></a>
            <a href="https://trello.com/teams/design"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[130px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    className="size-5"
                    aria-hidden="true"
                    viewBox="0 0 64 65"
                  >
                    <path
                      d="M32.68 8.957 4.863 36.775l4.402 4.647L36.895 13.79c.105-.105.217-.2.334-.285L32.68 8.957ZM18.89 51.582l-5.798-6.12 27.737-27.738.099-.103c.067-.074.129-.151.186-.23l6.006 6.005c-.117.085-.228.18-.334.285L18.968 51.5l-.078.083Zm3.817 4.03 4.41 4.654L55.553 31.83l-4.548-4.548c-.057.079-.12.156-.186.23l-.099.104-27.818 27.818a2.824 2.824 0 0 1-.195.177Z"
                      opacity=".5"
                    ></path>
                    <path d="M32.68 8.957 55.554 31.83l6.191-6.19a7.418 7.418 0 0 0 0-10.492L49.362 2.766a7.418 7.418 0 0 0-10.49 0L32.68 8.957ZM4.862 36.775l-3.24 3.241A3.71 3.71 0 0 0 .535 42.64v18.245a3.71 3.71 0 0 0 3.71 3.71h17.008c.984 0 1.927-.391 2.623-1.087l3.24-3.24L4.863 36.774Z"></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Design teams</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Empower your design teams by using Trello to streamline creative
                requests and promote more fluid cross-team collaboration.
              </div>
            </div></a>
            <a href="https://trello.com/teams/startups"><div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[130px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    className="size-5"
                    aria-hidden="true"
                    viewBox="0 0 65 63"
                  >
                    <path
                      d="M13.354 3.761A3.728 3.728 0 0 1 17.084.033h6.835a3.728 3.728 0 0 1 3.728 3.728v6.835a3.728 3.728 0 0 1-3.728 3.729h-6.835a3.728 3.728 0 0 1-3.728-3.729V3.761ZM38.209 3.761A3.728 3.728 0 0 1 41.937.033h6.835A3.728 3.728 0 0 1 52.5 3.761v6.835a3.728 3.728 0 0 1-3.728 3.729h-6.835a3.728 3.728 0 0 1-3.728-3.729V3.761Z"
                      opacity=".5"
                    ></path>
                    <path d="M57.471 10.596a7.456 7.456 0 0 1 7.457 7.456v36.66a7.456 7.456 0 0 1-7.457 7.456H8.384a7.456 7.456 0 0 1-7.456-7.456v-36.66a7.456 7.456 0 0 1 7.456-7.456h49.087Z"></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Startups</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                From hitting revenue goals to managing workflows, small
                businesses thrive with Trello.
              </div>
            </div></a>
            <a href="https://trello.com/teams/remote-team-management">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-[248px] cursor-pointer transition-colors duration-300 h-[130px] flex flex-col p-[16px]"
            >
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    className="size-5"
                    aria-hidden="true"
                    viewBox="0 0 65 65"
                  >
                    <mask id="globe" width="64" height="63" x="0" y="0">
                      <rect
                        width="62.129"
                        height="62.129"
                        x="63.02"
                        y="62.691"
                        fill="#fff"
                        rx="31.064"
                        transform="rotate(-180 63.02 62.691)"
                      ></rect>
                    </mask>
                    <g mask="url(#globe)">
                      <path
                        fill-rule="evenodd"
                        d="M59.749 80.947c26.938 0 48.776-21.838 48.776-48.776 0-26.939-21.838-48.776-48.776-48.776a48.553 48.553 0 0 0-28.067 8.879 48.553 48.553 0 0 0-28.067-8.88c-26.938 0-48.776 21.838-48.776 48.777 0 26.938 21.838 48.776 48.776 48.776a48.553 48.553 0 0 0 28.067-8.879 48.553 48.553 0 0 0 28.067 8.88Zm0-92.648a43.667 43.667 0 0 0-24.023 7.156c6.846 5.992 12.002 13.868 14.657 22.819H67.38a2.452 2.452 0 0 1 .115 4.902l-.115.003H51.564c.213 1.139.385 2.291.517 3.456a6.253 6.253 0 0 0-2.142 4.718c0 1.951.891 3.694 2.289 4.843a48.841 48.841 0 0 1-.473 3.877h15.624a2.452 2.452 0 0 1 .115 4.902l-.115.003H50.693c-2.552 9.401-7.844 17.675-14.966 23.909a43.666 43.666 0 0 0 24.022 7.155c24.23 0 43.872-19.642 43.872-43.871 0-24.23-19.642-43.872-43.872-43.872Zm-56.134 0a43.666 43.666 0 0 1 24.023 7.156C20.792 1.447 15.637 9.323 12.981 18.274H-1.29l-.116.002a2.453 2.453 0 0 0 .115 4.903H11.8a49.045 49.045 0 0 0-.828 8.992c0 2.69.218 5.33.637 7.902H-1.29l-.115.003a2.453 2.453 0 0 0 .115 4.902h13.961c2.552 9.401 7.844 17.675 14.967 23.909a43.667 43.667 0 0 1-24.023 7.155c-24.23 0-43.871-19.642-43.871-43.871 0-24.23 19.642-43.872 43.871-43.872Zm29.346 76.484a44.18 44.18 0 0 1-1.279 1.108c-.433-.36-.859-.73-1.278-1.107.372.227.81.359 1.278.359.469 0 .907-.132 1.279-.36Zm12.627-19.805A43.877 43.877 0 0 1 33.661 64.14c.298-.406.474-.907.474-1.449V44.978h11.453Zm1.899-12.807c0 2.698-.244 5.339-.71 7.902H34.135V24.66a6.253 6.253 0 0 1-2.18-4.751c0-1.9.845-3.602 2.18-4.751V.654a43.887 43.887 0 0 1 11.105 17.62h-.966c.14.521.215 1.07.215 1.635a6.238 6.238 0 0 1-.92 3.27h2.996c.604 2.902.922 5.91.922 8.992ZM18.33 46.669a43.909 43.909 0 0 0 11.373 17.47 2.44 2.44 0 0 1-.47-1.333l-.003-.116V44.978H26.3a6.24 6.24 0 0 0 1.295-3.815c0-.371-.033-.736-.095-1.09h1.73V23.18H16.8a44.315 44.315 0 0 0-.596 14.373 6.266 6.266 0 0 0 2.125 9.116ZM29.23.654a43.887 43.887 0 0 0-11.106 17.62H29.23V.654Z"
                        opacity=".5"
                      ></path>
                    </g>
                    <path d="m29.23.68-.028.002a43.887 43.887 0 0 0-11.077 17.592H29.23V.679Zm-1.237 61.76c.41.052.822.096 1.237.132V44.978H26.3a6.257 6.257 0 0 1-4.972 2.453 6.24 6.24 0 0 1-2.998-.762 43.87 43.87 0 0 0 9.663 15.77ZM16.205 37.552a44.305 44.305 0 0 1-.327-5.381c0-3.082.318-6.09.923-8.992h12.43v16.894H27.5a6.27 6.27 0 0 0-11.296-2.521Zm17.93 25.063c.392-.027.782-.062 1.17-.103a43.835 43.835 0 0 0 10.284-17.534H34.135v17.637Zm25.877-17.637A31.175 31.175 0 0 1 43.285 60.56a48.573 48.573 0 0 0 7.409-15.58h9.318Zm3.008-13.352a31.09 31.09 0 0 1-1.163 8.447H51.755c.208-1.276.367-2.57.474-3.877a6.267 6.267 0 1 0-.147-9.561 48.712 48.712 0 0 0-.517-3.456h10.292a31.089 31.089 0 0 1 1.163 8.447ZM50.383 18.274h9.628A31.163 31.163 0 0 0 42.16 2.277a48.628 48.628 0 0 1 8.223 15.997ZM3.899 44.978a31.181 31.181 0 0 0 15.96 15.269 48.565 48.565 0 0 1-7.187-15.269H3.899Zm7.711-4.905H2.053a31.088 31.088 0 0 1-1.162-8.447c0-2.928.405-5.762 1.162-8.447h9.748a49.047 49.047 0 0 0-.828 8.992c0 2.69.218 5.33.637 7.902Zm9.384-37.522A31.17 31.17 0 0 0 3.899 18.274h9.083A48.622 48.622 0 0 1 20.994 2.55Zm25.784 37.522c.466-2.563.71-5.204.71-7.902 0-3.082-.318-6.09-.923-8.992H43.57a6.264 6.264 0 0 1-5.347 2.997 6.243 6.243 0 0 1-4.088-1.516v15.413h12.643Zm-8.555-26.432c-1.562 0-2.99.572-4.088 1.516V.654a43.887 43.887 0 0 1 11.106 17.62h-.966a6.27 6.27 0 0 0-6.052-4.633Z"></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Remote teams</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Keep your remote team connected and motivated, no matter where
                they’re located around the world.
              </div>
            </div></a>
          </div>
          <button 
            type="button"
            className=" cursor-pointer group flex items-center justify-between ml-3"
          > <a href="https://trello.com/teams">
            <div className=" group-hover:mr-2 transition-all mr-1 duration-300 font-medium text-md">
              See all Teams
            </div></a>
            <div>
              <svg
                width="24"
                height="24"
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-testid="arrow-right"
              >
                <rect
                  width="24"
                  height="24"
                  
                  fill="#fff"
                  fill-opacity="0.01"
                ></rect>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.793 5.79298C11.7001 5.88577 11.6263 5.99597 11.576 6.11729C11.5257 6.2386 11.4998 6.36865 11.4998 6.49998C11.4998 6.63131 11.5257 6.76136 11.576 6.88267C11.6263 7.00399 11.7001 7.11419 11.793 7.20698L15.586 11H6C5.73478 11 5.48043 11.1053 5.29289 11.2929C5.10536 11.4804 5 11.7348 5 12C5 12.2652 5.10536 12.5196 5.29289 12.7071C5.48043 12.8946 5.73478 13 6 13H15.586L11.793 16.793C11.7001 16.8858 11.6263 16.996 11.576 17.1173C11.5257 17.2386 11.4998 17.3686 11.4998 17.5C11.4998 17.6313 11.5257 17.7614 11.576 17.8827C11.6263 18.004 11.7001 18.1142 11.793 18.207C12.183 18.597 12.817 18.597 13.208 18.207L18.707 12.707C18.8881 12.5266 18.993 12.2835 19 12.028V11.971C18.9928 11.7158 18.888 11.4731 18.707 11.293L13.208 5.79298C13.1151 5.70001 13.0048 5.62625 12.8834 5.57592C12.762 5.5256 12.6319 5.49969 12.5005 5.49969C12.3691 5.49969 12.239 5.5256 12.1176 5.57592C11.9962 5.62625 11.8859 5.70001 11.793 5.79298Z"
                  fill="rgba(0, 101, 255, 1)"
                ></path>
              </svg>
            </div>
          </button>
          
        </div>
      </div>
      <div className="flex justify-start flex-8 pt-7 pl-8 bg-purple-50">
        <div>
          <div className="font-medium mb-3">Our product in action</div>
          <div>
            <hr className="text-purple-800 w-[290px] mb-10" />
          </div>
          <div className="my-8">
            <div className="mb-3 font-medium text-sm ">Use case: Task management</div>
            <div className="text-xs text-gray-500 font-medium w-[280px] leading-5">
              Track progress of tasks in one convenient place with a visual
              layout that adds ‘ta-da’ to your to-do’s.
            </div>
          </div>
          <div className="my-8">
            <div className="mb-3 font-medium text-sm">Use case: Resource hub</div>
            <div className="text-xs text-gray-500 font-medium w-[280px] leading-5">
              Save hours when you give teams a well-designed hub to find
              information easily and quickly.
            </div>
          </div>
          <div className="my-8">
            <div className="mb-3 font-medium text-sm">Use case: Project management</div>
            <div className="text-xs text-gray-500 font-medium w-[280px] leading-5">
              Keep projects organized, deadlines on track, and teammates aligned
              with Trello.
            </div>
          </div>
          <button
            type="button"
            className=" cursor-pointer group flex items-center justify-between"
          > <a href="https://trello.com/use-cases">
            <div className=" group-hover:mr-2 transition-all mr-1 duration-300 font-medium text-md">
              See all use cases
            </div></a>
            <div>
              <svg
                width="24"
                height="24"
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-testid="arrow-right"
              >
                <rect
                  width="24"
                  height="24"
                  
                  fill="#fff"
                  fill-opacity="0.01"
                ></rect>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.793 5.79298C11.7001 5.88577 11.6263 5.99597 11.576 6.11729C11.5257 6.2386 11.4998 6.36865 11.4998 6.49998C11.4998 6.63131 11.5257 6.76136 11.576 6.88267C11.6263 7.00399 11.7001 7.11419 11.793 7.20698L15.586 11H6C5.73478 11 5.48043 11.1053 5.29289 11.2929C5.10536 11.4804 5 11.7348 5 12C5 12.2652 5.10536 12.5196 5.29289 12.7071C5.48043 12.8946 5.73478 13 6 13H15.586L11.793 16.793C11.7001 16.8858 11.6263 16.996 11.576 17.1173C11.5257 17.2386 11.4998 17.3686 11.4998 17.5C11.4998 17.6313 11.5257 17.7614 11.576 17.8827C11.6263 18.004 11.7001 18.1142 11.793 18.207C12.183 18.597 12.817 18.597 13.208 18.207L18.707 12.707C18.8881 12.5266 18.993 12.2835 19 12.028V11.971C18.9928 11.7158 18.888 11.4731 18.707 11.293L13.208 5.79298C13.1151 5.70001 13.0048 5.62625 12.8834 5.57592C12.762 5.5256 12.6319 5.49969 12.5005 5.49969C12.3691 5.49969 12.239 5.5256 12.1176 5.57592C11.9962 5.62625 11.8859 5.70001 11.793 5.79298Z"
                  fill="rgba(0, 101, 255, 1)"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
