import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { LeftArrowIcon } from "../Icons/leftarrowicon";
import { RightArrowIcon } from "../Icons/rightarrowicon";
import { useRef } from "react";

export default function HomepageCarousel2() {
  const totalSlides = 3; 
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    const buttons = document.querySelectorAll('.custom-pagination button');
    buttons.forEach((button, index) => {
      if (index === swiper.realIndex) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  };

  const handlePaginationClick = (index, event) => {
  if (swiperRef.current && swiperRef.current.swiper) {
    swiperRef.current.swiper.slideToLoop(index);
  }
};

  return (
    <div className="w-[1092px] max-w-[1092px] mx-auto">
      <div className="flex justify-end items-center gap-4 mb-6">
        <div className="custom-pagination flex items-center gap-3 mr-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={(e) => handlePaginationClick(index, e)}
              className="relative h-2 rounded-full transition-all duration-300 ease-out bg-gray-400 w-2 mx-0.5 hover:bg-gray-500  custom-pagination-button"
              data-slide-index={index}
            >
            </button>
          ))}
        </div>


        <div className="flex gap-8">
          <button className="custom-prev bg-gray-100 group p-1 rounded-full shadow transition-colors">
            <LeftArrowIcon className="w-5 h-5 group-hover:text-blue-500 text-gray-600" />
          </button>
          <button className="custom-next bg-gray-100 group p-1 rounded-full shadow transition-colors">
            <RightArrowIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        ref = {swiperRef}
        loop={true}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        className="w-[1092px] rounded-lg overflow-hidden shadow-lg"
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          setTimeout(() => {
            const buttons = document.querySelectorAll('.custom-pagination button');
            if (buttons[swiper.realIndex]) {
              buttons[swiper.realIndex].classList.add('active');
            }
          }, 100);
        }}
      >
         <SwiperSlide>
          <div className="flex w-full h-[472px] rounded-lg border-2 border-gray-100">
            <div className="pt-14 pb-7 px-7">
              <div className="text-2xl w-[650px] leading-10 mb-22">
                [Trello is] great for simplifying complex processes. As a
                manager, I can chunk [processes] down into bite-sized pieces for
                my team and then delegate that out, but still keep a bird's-eye
                view.
              </div>
              <div>
                <div>
                  <hr className="w-[150px] mb-4" />
                </div>
                <div className="mb-1">Joey Rosenberg</div>
                <div>Global Leadership Director at Women Who Code</div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div>
                  <img
                    src="//images.ctfassets.net/rz1oowkt5gyp/2f3keSvy7vtldV4YDFKkE2/5ed788fb5257c342995d25ba8e8e313d/WomenWhoCode_logo.svg"
                    alt="Women Who Code company logo"
                    width="84"
                    height="36"
                    loading="lazy"
                    className="Picture__Image-sc-1wdxyb4-0 eYmxm"
                  />
                </div>
                <div>
                  <a
                    className="underline text-blue-500"
                    href="https://blog.trello.com/women-who-code"
                    aria-label="Read the Women Who Code customer story"
                    data-uuid="2o9mLypfF08ECjP8pn9bsL"
                    target="_blank"
                    rel="noopener"
                  >
                    Read the story
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 pt-14 pl-7 pr-14">
              <div className="text-4xl text-white font-semibold w-[300px] leading-12 mb-15">
                75% of organisations report that Trello delivers value to their
                business within 30 days
              </div>
              <div>
                <a className="underline text-blue-200" href="">
                  Trello TechValidate Survey
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex w-full h-[472px] rounded-lg border-2 border-gray-100">
            <div className="pt-14 pb-7 px-7">
              <div className="text-2xl w-[650px] leading-10 mb-32">
                Whether someone is in the office, working from home, or working
                on-site with a client, everyone can share context and
                information through Trello.
              </div>
              <div>
                <div>
                  <hr className="w-[150px] mb-4" />
                </div>
                <div className="mb-1">Sumeet Moghe</div>
                <div>Product Manager at ThoughtWorks</div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div>
                  <img className="size-[50%]"
                    src="//images.ctfassets.net/rz1oowkt5gyp/2kIh1cWqsxjtHwWHWJJPsJ/d8436f3979be6cab7931f4d276c2d5ce/thoughtworks.svg"
                    alt="ThoughtWorks company logo"
                    width="409"
                    height="66"
                    loading="lazy"
                  />
                </div>
                <div>
                  <a
                    className="underline text-blue-500"
                    href="https://blog.trello.com/women-who-code"
                    aria-label="Read the Women Who Code customer story"
                    data-uuid="2o9mLypfF08ECjP8pn9bsL"
                    target="_blank"
                    rel="noopener"
                  >
                    Read the story
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 pt-14 pl-7 pr-8">
              <div className="text-4xl text-white font-semibold w-[325px] leading-12 mb-51">
                81% of customers chose Trello for its ease of use.
              </div>
              <div>
                <a className="underline text-blue-200" href="">
                  Trello TechValidate Survey
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex w-full h-[472px] rounded-lg border-2 border-gray-100">
            <div className="pt-10 pb-7 px-7">
              <div className="text-2xl w-[650px] leading-10 mb-25">
                We used Trello to provide clarity on steps, requirements, and procedures. This was exceptional when communicating with teams that had deep cultural and language differences.
              </div>
              <div>
                <div>
                  <hr className="w-[180px] mb-4" />
                </div>
                <div className="mb-1">Jefferson Scomacao</div>
                <div>Development Manager at IKEA/PTC</div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div>
                  <img className="size-[70%]" src="//images.ctfassets.net/rz1oowkt5gyp/3X64fxSs4ek9A0ex45BUNI/911daed79127cb2f8a021da93fb68b9f/ptc-logo.svg" alt="PTC company logo" width="133" height="52" loading="lazy"/>
                </div>
                <div>
                  <a
                    className="underline text-blue-500"
                    href="https://blog.trello.com/women-who-code"
                    aria-label="Read the Women Who Code customer story"
                    data-uuid="2o9mLypfF08ECjP8pn9bsL"
                    target="_blank"
                    rel="noopener"
                  >
                    Read the story
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 pt-9 pl-7 pr-7">
              <div className="text-4xl text-white font-semibold w-[330px] leading-12 mb-8">
               74% of customers say Trello has improved communication with their co-workers and teams.
              </div>
              <div>
                <a className="underline text-blue-200" href="">
                  Trello TechValidate Survey
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <style jsx>{`
        .custom-pagination-button {
          transition: all 0.3s ease-out;
          position: relative;
          z-index: 10;
          display: block !important;
          visibility: visible !important;
          background-color: #000000 !important;
        }
        
        .custom-pagination-button.active {
          background-color: #6b7280 !important;
          width: 3.5rem !important;
        }
        
        .custom-pagination-button.clicked {
          transform: scale(1.25) !important;
        }
        
        .custom-pagination-button .ripple-effect {
          display: none;
        }
        
        .custom-pagination-button.clicked .ripple-effect {
          display: block;
          animation: ping 0.3s cubic-bezier(0, 0, 0.2, 1);
        }
        
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .custom-pagination {
          position: relative;
          z-index: 20;
          display: flex !important;
          align-items: center;
          gap: 0.25rem;
        }
        
        .custom-pagination button {
          display: block !important;
          position: relative;
          z-index: 21;
          visibility: visible !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}