import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

const ImageSrc = [
  "https://images.ctfassets.net/rz1oowkt5gyp/7lpUSxVqNRggpqzCNcnfo1/04cf35d0a0ef60e18c6575eb9a0374e4/inbox-slider.png?w=1080",
  "https://images.ctfassets.net/rz1oowkt5gyp/w3lwhF5VUl2zPrQhoo6zi/87076ead73cad0973c907db1960bacfc/board-slider.png?w=1080",
  "https://images.ctfassets.net/rz1oowkt5gyp/2CRH0gvg9NCw6tdLBHIBQy/eee39403406317dc1fc841bf3f685245/planner-slider.png?w=1080"
];

const tabData = [
  {
    title: "Inbox",
    description: "When it's on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime."
  },
  {
    title: "Boards", 
    description: "Your to-do list may be long, but it can be manageable! Keep tabs on everything from \"to-dos to tackle\" to \"mission accomplished!\""
  },
  {
    title: "Planner",
    description: "Drag, drop, get it done. Snap your top tasks into your calendar and make time for what truly matters."
  }
];

export function ImageCarousal() {
  const totalSlides = ImageSrc.length;
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.realIndex;
    
    const buttons = document.querySelectorAll('[data-image-pagination-button]');
    buttons.forEach((button, index) => {
      if (index === activeIndex) {
        button.classList.remove('w-2', 'bg-black');
        button.classList.add('w-14', 'bg-gray-500');
      } else {
        button.classList.remove('w-14', 'bg-gray-500');
        button.classList.add('w-2', 'bg-black');
      }
    });

    const tabs = document.querySelectorAll('[data-image-tab]');
    tabs.forEach((tab, index) => {
      if (index === activeIndex) {
        tab.classList.remove('border-white');
        tab.classList.add('border-blue-400', 'shadow-[4px_4px_8px_-2px_rgba(0,0,0,0.2)]');
      } else {
        tab.classList.remove('border-blue-400', 'shadow-[4px_4px_8px_-2px_rgba(0,0,0,0.2)]');
        tab.classList.add('border-white');
      }
    });
  };

  const handlePaginationClick = (index, event) => {
  if (swiperRef.current && swiperRef.current.swiper) {
    swiperRef.current.swiper.slideToLoop(index);
  }
};

  const handleTabClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col mr-5">
        {tabData.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleTabClick(index)}
            className={`my-3 bg-white cursor-pointer pl-4 pt-3 pb-4 rounded-sm border-l-8 transition-all duration-300 ${
              index === 0
                ? "border-blue-400 shadow-[4px_4px_8px_-2px_rgba(0,0,0,0.2)]"
                : "border-white"
            }`}
            data-image-tab
          >
            <div className="font-medium text-lg mb-1">{tab.title}</div>
            <div className="w-80">{tab.description}</div>
          </div>
        ))}
      </div>

      <div className="ml-5 flex flex-col">
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={(e) => handlePaginationClick(index, e)}
                className={`relative h-2 rounded-full transition-all duration-300 cursor-pointer ease-out hover:bg-gray-500 ${
                  index === 0 
                    ? 'w-14 bg-gray-500' 
                    : 'w-2 bg-black'
                }`}
                data-image-pagination-button
                data-slide-index={index}
              >
              </button>
            ))}
          </div>
        </div>

        <div className="w-[850px] h-[500px] relative" id="image-carousel">
          <Swiper
          ref={swiperRef}
            modules={[Navigation]}
            loop={true}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            className="w-[850px] h-[500px] rounded-lg overflow-hidden"
            onSlideChange={handleSlideChange}
            onSwiper={(swiper) => {
              setTimeout(() => {
                const buttons = document.querySelectorAll('[data-image-pagination-button]');
                const tabs = document.querySelectorAll('[data-image-tab]');
                
                if (buttons[0]) {
                  buttons[0].classList.remove('w-2', 'bg-black');
                  buttons[0].classList.add('w-14', 'bg-gray-500');
                }
                
                if (tabs[0]) {
                  tabs[0].classList.remove('border-white');
                  tabs[0].classList.add('border-blue-400', 'shadow-[4px_4px_8px_-2px_rgba(0,0,0,0.2)]');
                }
              }, 100);
            }}
          >
            {ImageSrc.map((url, index) => (
              <SwiperSlide key={index}>
                <div className="w-[850px] h-[500px] flex items-center justify-center bg-gray-50">
                  <img 
                    src={url} 
                    alt={`Slide ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}