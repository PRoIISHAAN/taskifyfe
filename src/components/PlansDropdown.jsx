export function PlansDropdown() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-12 justify-end">
        <div className="pt-7 w-fit pb-5 flex flex-col justify-center">
          <div className="font-medium mb-3">
            Explore the features that help your team succeed
          </div>
          <div>
            <hr className="w-[750px] text-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 mr-15">
            <a href="https://trello.com/standard">
            <div className="w-[248px] cursor-pointer hover:bg-cyan-50 transition-colors duration-300 h-[114px] flex flex-col p-[16px]">
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    className="size-5 text-cyan-300"
                    aria-hidden="true"
                    viewBox="0 0 46 65"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M39.49 38c8.493-8.493 8.493-22.263 0-30.757-8.908-8.907-23.35-8.907-32.257 0-.244.244-.482.494-.715.75-8.08 8.887-7.424 22.642 1.463 30.722l3.995 3.632v7.384h22.77v-7.384l3.995-3.632c.255-.232.505-.47.749-.714ZM25.483 10.01a2.577 2.577 0 0 0-2.577-2.576c-8.38 0-15.173 6.793-15.173 15.173v.573l.003.12a2.577 2.577 0 0 0 5.15-.12v-.573l.002-.188c.1-5.447 4.547-9.832 10.018-9.832a2.577 2.577 0 0 0 2.577-2.577Z"
                    ></path>
                    <path
                      d="M11.976 54.884v1.995a7.683 7.683 0 0 0 7.682 7.683h7.405a7.683 7.683 0 0 0 7.682-7.683v-1.995h-22.77Z"
                      opacity=".5"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Standard</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                For teams that need to manage more work and scale collaboration.
              </div>
            </div></a>
           <a href="https://trello.com/premium"> <div className="w-[248px] cursor-pointer transition-colors hover:bg-pink-50 duration-300 h-[114px] flex flex-col p-[16px]">
              <div className="flex gap-3 text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    className="size-5 text-pink-300"
                    aria-hidden="true"
                    viewBox="0 0 65 63"
                  >
                    <path d="m26.998 4.473-6.401 12.992-14.313 2.083a6.435 6.435 0 0 0-3.685 1.881l-.14.149a6.458 6.458 0 0 0 .257 8.971l10.357 10.113-2.445 14.28a6.46 6.46 0 0 0 .647 4.092l.092.17a6.433 6.433 0 0 0 8.602 2.537L32.771 55l12.802 6.742a6.429 6.429 0 0 0 4.084.648l.187-.035a6.45 6.45 0 0 0 5.07-7.412l-2.445-14.28L62.826 30.55a6.453 6.453 0 0 0 1.878-3.69l.024-.186c.401-3.454-2.013-6.621-5.47-7.125l-14.313-2.083-6.4-12.992a6.433 6.433 0 0 0-11.547 0Z"></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Premium</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-4 pointer-events-none">
                Best for teams up to 100 that need to track multiple projects
                and visualize work in a variety of ways.
              </div>
            </div></a>
            <a href="https://trello.com/enterprise">
            <div className="w-[248px] cursor-pointer transition-colors hover:bg-blue-50 pt-[11px] duration-300 h-[114px] flex flex-col p-[16px]">
              <div className="flex gap-3 items-center text-gray-600 pointer-events-none">
                <div className="flex items-center justify-center">
                  <svg
                    fill="currentColor"
                    className="size-7 text-blue-300"
                    aria-hidden="true"
                    viewBox="0 0 65 42"
                  >
                    <path
                      d="M38.993 15.129a2.863 2.863 0 0 1 2.229 2.787 2.866 2.866 0 0 1-2.873 2.858 2.866 2.866 0 0 1-2.873-2.858c0-1.359.952-2.496 2.229-2.787h-10.61a2.865 2.865 0 0 1 2.636 2.849 2.866 2.866 0 0 1-2.873 2.859 2.866 2.866 0 0 1-2.873-2.859c0-1.5 1.16-2.73 2.636-2.85H10.243c-2.539 0-4.9 2.049-4.9 4.575V39.45H60.19V19.703c0-2.526-2.058-4.574-4.596-4.574H38.993Z"
                      opacity=".5"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M16.707 37.138V4.765c0-2.526 2.058-4.574 4.597-4.574h22.599c2.538 0 4.596 2.048 4.596 4.574v32.373h14.173a1.932 1.932 0 0 1 0 3.864H2.535a1.932 1.932 0 1 1 0-3.864h14.172Zm12.258 0v-5.974c0-1.949 1.588-3.53 3.546-3.53a3.538 3.538 0 0 1 3.547 3.53v5.974h-7.093Zm.766-19.16a2.866 2.866 0 0 0-2.873-2.858 2.866 2.866 0 0 0-2.873 2.859 2.866 2.866 0 0 0 2.873 2.858 2.866 2.866 0 0 0 2.873-2.858Zm8.618-2.92a2.866 2.866 0 0 1 2.873 2.858 2.866 2.866 0 0 1-2.873 2.859 2.866 2.866 0 0 1-2.873-2.859 2.866 2.866 0 0 1 2.873-2.859Zm-8.618-6.29a2.866 2.866 0 0 0-2.873-2.858 2.866 2.866 0 0 0-2.873 2.859 2.866 2.866 0 0 0 2.873 2.858A2.866 2.866 0 0 0 29.73 8.77Zm8.618-2.858a2.866 2.866 0 0 1 2.873 2.859 2.866 2.866 0 0 1-2.873 2.858 2.866 2.866 0 0 1-2.873-2.858A2.866 2.866 0 0 1 38.35 5.91Z"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">Enterprise</div>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-3 pointer-events-none">
                Everything your enterprise teams and admins need to manage
                projects.
              </div>
            </div></a>
          </div>
          <div className="bg-yellow-50 flex pt-8.5 justify-between w-[712px] h-[120px] p-[24px] ml-5 my-8 mb-15">
            <div>
              <div className="flex items-center mb-2 gap-2">
                <div>
                  <svg
                    fill="currentColor"
                    className="size-5 text-yellow-500"
                    aria-hidden="true"
                    viewBox="0 0 44 65"
                  >
                    <path d="M26.866 1.129c1.15-1.562 3.624-.556 3.357 1.365l-5.216 37.56H1.91c-1.533 0-2.414-1.743-1.506-2.977L26.866 1.129Z"></path>
                    <path d="M41.456 24.668c1.533 0 2.414 1.743 1.506 2.977L16.5 63.594c-1.15 1.562-3.624.555-3.357-1.366l5.217-37.56h23.096Z"></path>
                  </svg>
                </div>
                <div className="text-md font-medium text-gray-600">Free plan</div>
              </div>
              <div className="text-xs text-gray-500 font-medium">For individuals or small teams looking to keep work organized.</div>
            </div>
            <div>
              <a href="https://trello.com/tour">
                <button
            type="button"
            className="w-fit border border-yellow-500 cursor-pointer hover:bg-yellow-100 transition-all duration-300 p-3 bg-white rounded"
          >
            Take a tour of Trello
          </button></a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start flex-8 pt-7 pl-8 bg-purple-50">
        <div>
          <div className="font-medium mb-3">Compare plans & pricing</div>
          <div>
            <hr className="text-purple-800 w-[290px]" />
          </div>
          <div className="text-xs text-gray-500 font-medium w-[280px] leading-5 mt-4 mb-5">
            Whether you’re a team of 2 or 2,000, Trello’s flexible pricing model
            means you only pay for what you need.
          </div>
          <a href="https://trello.com/pricing">
          <button
            type="button"
            className="w-fit border border-purple-800 cursor-pointer hover:bg-purple-100 transition-all duration-300 p-3 bg-white rounded"
          >
            View Trello pricing
          </button></a>
        </div>
      </div>
    </div>
  );
}
