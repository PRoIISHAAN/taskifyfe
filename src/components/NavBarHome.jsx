import { Button } from "../Buttons/Button";
import { DropdownButton } from "../Buttons/DropdownButton";
import { TrellOIcon } from "../Icons/TrelloIcon";
import { use, useEffect, useRef, useState } from "react";
import { FeaturesDropdown } from "./FeaturesDropdown";
import { SolutionsDropdown } from "./SolutionsDropdown";
import { PlansDropdown } from "./PlansDropdown";
import { ResourcesDropdown } from "./ResourcesDropdown";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate()
  const [isSticky, setIsSticky] = useState(false);
  const [Dropdown, setDropdown] = useState(null);
  const [DropdownHeight, setDropdownHeight] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const [dropdownOpacity, setDropdownOpacity] = useState(1);
  const [navbarHeight, setNavbarHeight] = useState(0);
  
  const featuresref = useRef(null);
  const solutionsref = useRef(null);
  const plansref = useRef(null);
  const resourcesref = useRef(null);
  const dropdownref = useRef(null);
  
  const featuresButtonRef = useRef(null);
  const solutionsButtonRef = useRef(null);
  const plansButtonRef = useRef(null);
  const resourcesButtonRef = useRef(null);
  const navbarRef = useRef(null);
  const navbarContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const blueBarHeight = 60;
      if (!Dropdown) {
        setIsSticky(window.scrollY > blueBarHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [Dropdown]);

  useEffect(() => {
    if (navbarContainerRef.current) {
      setNavbarHeight(navbarContainerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (Dropdown === "Features") {
      dropdownref.current = featuresref.current;
      const height = featuresref.current.scrollHeight;
      setDropdownHeight(height);
    } else if (Dropdown === "Solutions") {
      dropdownref.current = solutionsref.current;
      const height = solutionsref.current.scrollHeight;
      setDropdownHeight(height);
    } else if (Dropdown === "Plans") {
      dropdownref.current = plansref.current;
      const height = plansref.current.scrollHeight;
      setDropdownHeight(height);
    } else if (Dropdown === "Resources") {
      dropdownref.current = resourcesref.current;
      const height = resourcesref.current.scrollHeight;
      setDropdownHeight(height);
    } else if (!Dropdown) {
      setDropdownHeight(0);
    }
  }, [Dropdown]);

  useEffect(() => {
    if (Dropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [Dropdown]);

  useEffect(() => {
    const handleResize = () => {
      if (Dropdown) {
        const buttonRefs = {
          Features: featuresButtonRef,
          Solutions: solutionsButtonRef,
          Plans: plansButtonRef,
          Resources: resourcesButtonRef
        };
        
        if (buttonRefs[Dropdown]) {
          updateUnderlinePosition(buttonRefs[Dropdown]);
        }
      }
      
      // Update navbar height on resize
      if (navbarContainerRef.current) {
        setNavbarHeight(navbarContainerRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [Dropdown]);

  const updateUnderlinePosition = (buttonRef) => {
    if (buttonRef.current && navbarRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const navbarRect = navbarRef.current.getBoundingClientRect();
      
      setUnderlineStyle({
        width: buttonRect.width,
        left: buttonRect.left - navbarRect.left
      });
    }
  };

  const switchDropdown = (newDropdown, buttonRef) => {
    if (Dropdown && Dropdown !== newDropdown) {
      setDropdownOpacity(0);
      updateUnderlinePosition(buttonRef);
      
      setTimeout(() => {
        setDropdown(newDropdown);
        setIsSticky(true);
        setTimeout(() => {
          setDropdownOpacity(1);
        }, 20);
      }, 80);
    } else {
      setDropdown(newDropdown);
      setIsSticky(true);
      updateUnderlinePosition(buttonRef);
      setDropdownOpacity(1);
    }
  };

  const closeDropdown = () => {
    setDropdownOpacity(0);
    setTimeout(() => {
      setDropdown(null);
      const blueBarHeight = 60;
      setIsSticky(window.scrollY > blueBarHeight);
      setDropdownOpacity(1);
    }, 100);
  };

  return (
    <>
      <div
        ref={navbarContainerRef}
        className={`sticky top-0 z-50 ${
          isSticky ? "drop-shadow-xl" : ""
        } hover:drop-shadow-xl w-full transition-all duration-600`}
      >
        <div
          className={`flex justify-center bg-white transition-all duration-200 `}
        >
          <div>
            <div ref={navbarRef} className="flex items-center justify-between w-[1320px] bg-white relative">
              <div className="flex mt-2 mb-1 items-center">
                <div className="mx-4 mr-6">
                  <TrellOIcon></TrellOIcon>
                </div>
                <div>
                  <div className="flex w-full">
                    <div ref={featuresButtonRef} className={`hover:text-blue-500 ${ Dropdown === "Features" ?"text-blue-500":null}`}>
                      <DropdownButton
                        text={"Features"}
                        onclick={() => {
                          switchDropdown("Features", featuresButtonRef);
                        }}
                      />
                    </div>
                    <div ref={solutionsButtonRef} className={`hover:text-blue-500 ${ Dropdown === "Solutions" ?"text-blue-500":null}`}>
                      <DropdownButton
                        text={"Solutions"}
                        onclick={() => {
                          switchDropdown("Solutions", solutionsButtonRef);
                        }}
                      />
                    </div>
                    <div ref={plansButtonRef} className={`hover:text-blue-500 ${ Dropdown === "Plans" ?"text-blue-500":null}`}>
                      <DropdownButton
                        text={"Plans"}
                        onclick={() => {
                          switchDropdown("Plans", plansButtonRef);
                        }}
                      />
                    </div>
                    <div
                      onClick={closeDropdown}
                      className={`hover:text-blue-500 ${ Dropdown === "Pricing" ?"text-blue-500":null}`}
                    >
                      <Button href={"https://trello.com/pricing"} text={"Pricing"} />
                    </div>
                    <div ref={resourcesButtonRef} className={`hover:text-blue-500 ${ Dropdown === "Resources" ?"text-blue-500":null}`}>
                      <DropdownButton
                        text={"Resources"}
                        onclick={() => {
                          switchDropdown("Resources", resourcesButtonRef);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex text-lg items-center cursor-pointer">
                <div onClick={()=>{navigate("/login")}} className="px-6 py-4">Log in</div>
                <div onClick={()=>{navigate("/signup")}} className="bg-blue-600 text-white px-6 py-4 hover:bg-blue-800">
                  Get Trello for free
                </div>
              </div>
              
              <div
                className="transition-all duration-300 bg-blue-500 absolute bottom-0"
                style={{
                  width: Dropdown ? `${underlineStyle.width - 29}px` : `0px`,
                  left: `${underlineStyle.left + 11}px`,
                  height: '3px',
                  transformOrigin: 'left'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ 
          height: `${DropdownHeight}px`,
          top: `${navbarHeight}px`
        }}
        className={`fixed z-40 bg-white transition-all duration-300 w-full overflow-hidden ${
          Dropdown ? "visible" : "invisible"
        }`}
      >
        <div
          className="transition-opacity duration-100"
          style={{ opacity: dropdownOpacity }}
        >
          <div
            ref={featuresref}
            className={Dropdown === "Features" ? "block" : "hidden"}
          >
            <FeaturesDropdown
              onClose={closeDropdown}
            />
          </div>

          <div
            ref={solutionsref}
            className={Dropdown === "Solutions" ? "block" : "hidden"}
          >
            <SolutionsDropdown
              onClose={closeDropdown}
            />
          </div>

          <div
            ref={plansref}
            className={Dropdown === "Plans" ? "block" : "hidden"}
          >
            <PlansDropdown
              onClose={closeDropdown}
            />
          </div>

          <div
            ref={resourcesref}
            className={Dropdown === "Resources" ? "block" : "hidden"}
          >
            <ResourcesDropdown
              onClose={closeDropdown}
            />
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-30 bg-slate-600/50 ${
          Dropdown ? "visible" : "invisible"
        }`}
        onClick={closeDropdown}
      />

      <div className="flex justify-center bg-blue-100 py-5">
        Accelerate your teams' work with Atlassian Intelligence (AI) features 🤖
        now available for all Premium and Enterprise!
        <a className="text-blue-600 underline ml-1" href="https://www.atlassian.com/software/artificial-intelligence">
          Learn More.
        </a>
      </div>
    </>
  );
}