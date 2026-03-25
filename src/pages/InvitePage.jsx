import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@/components/avatar";
import { Button } from "@/Buttons/Button";
import { DropdownButton } from "@/Buttons/DropdownButton";
import { ResourcesDropdown } from "@/components/ResourcesDropdown";
import { SolutionsDropdown } from "@/components/SolutionsDropdown";
import { FeaturesDropdown } from "../components/FeaturesDropdown";
import { PlansDropdown } from "../components/PlansDropdown";
import LoggedInNavBar from "@/components/LoggedInNavBar";

export default function InvitePage() {
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
          Resources: resourcesButtonRef,
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [Dropdown]);

  const updateUnderlinePosition = (buttonRef) => {
    if (buttonRef.current && navbarRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const navbarRect = navbarRef.current.getBoundingClientRect();

      setUnderlineStyle({
        width: buttonRect.width,
        left: buttonRect.left - navbarRect.left,
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

  const location = useLocation();
  const token =
    location.state?.inviteToken ||
    sessionStorage.getItem("pendingInviteToken") ||
    "";
  const navigate = useNavigate();
  const [status, setStatus] = useState("Validating invite...");
  const [error, setError] = useState("");
  const [boardMeta, setBoardMeta] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const peopleNames = (boardMeta?.boardUsers || [])
    .map((user) => user?.name)
    .filter(Boolean);
  const visibleNames = peopleNames.slice(0, 3);
  const remainingCount = Math.max(peopleNames.length - visibleNames.length, 0);
  const formattedNames = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(visibleNames);
  const inviteSummaryText =
    peopleNames.length === 0
      ? "Join this board."
      : remainingCount > 0
        ? `Join ${formattedNames} and ${remainingCount} other${remainingCount === 1 ? "" : "s"} on this board.`
        : `Join ${formattedNames} on this board.`;

  const JoinButtonHandler = async () => {
    try {
      if (!token) {
        setError("Invite token is missing.");
        return;
      }

      const joinRes = await axios.post(
        "http://localhost:3000/user/join-via-invite",
        { token },
        { withCredentials: true },
      );
      const boardId = joinRes.data?.boardId || boardMeta?.boardId;
      if (!boardId) {
        setError("Could not open board from this invite.");
        return;
      }
      sessionStorage.removeItem("pendingInviteToken");
      navigate(`/boards/${boardId}`);
    } catch (joinError) {
      console.error("Error joining via invite:", joinError);
      setError(
        joinError?.response?.data?.message ||
          "Failed to join board via invite.",
      );
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoRes = await axios.get("http://localhost:3000/user/getuserinfo", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (authError) {
        setIsAuthenticated(false);
        return;
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function getBoardMeta() {
      try {
        const boardMeta = await axios.get(
          `http://localhost:3000/user/invite/${token}/meta`,
        );

        if (!boardMeta.data?.valid) {
          if (!isCancelled) {
            setError("This invite link is invalid or expired.");
          }
          return;
        }
        setBoardMeta(boardMeta.data);
      } catch (inviteError) {
        if (!isCancelled) {
          setError("This invite link is invalid or expired.");
        }
      }
    }
    getBoardMeta();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div className="bg-[#242528] h-screen text-gray-300 w-screen">
      {!isAuthenticated && (
        <div className="flex flex-col items-center gap-12">
          <div className="bg-[#1f1f21] w-full font-semibold">
            <div
              ref={navbarContainerRef}
              className={`sticky top-0 z-50 w-full transition-all duration-600`}
              style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                className={`flex justify-center transition-all duration-200 `}
              >
                <div>
                  <div
                    ref={navbarRef}
                    className="flex items-center justify-between w-[1320px] relative"
                  >
                    <div className="flex mt-2 mb-1 items-center">
                      <div className="mx-4 mr-6">
                        <svg
                          aria-label="Trello"
                          color="white"
                          className="text-white"
                          height="22.5"
                          role="img"
                          viewBox="0 0 312 64"
                          width="109.6875"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <linearGradient
                            id="trello-logo-gradient-defaultbig"
                            x1="50.048061%"
                            x2="50.048061%"
                            y1="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0"
                              stop-color="var(--ds-background-accent-blue-bolder, #0C66E4)"
                            ></stop>
                            <stop
                              offset="1"
                              stop-color="var(--ds-background-accent-blue-subtle, #579DFF)"
                            ></stop>
                          </linearGradient>
                          <g fill="none" fill-rule="evenodd">
                            <path
                              d="m55.59.07h-47.59c-4.09405078 0-7.41448241 3.31595294-7.42006073 7.41v47.52c-.00791682 1.9730991.77030774 3.8681213 2.16269326 5.2661365 1.39238553 1.3980151 3.28425224 2.1838635 5.25736747 2.1838635h47.59c1.9713817-.0026407 3.8606757-.7896772 5.250897-2.1874031s2.1670753-3.2912295 2.1591638-5.2625969v-47.52c-.0055694-4.09014608-3.3199147-7.40449138-7.4100608-7.41zm-28.09 44.93c-.0026377.6594819-.2678382 1.2907542-.7369724 1.7542587-.4691341.4635046-1.1035619.721065-1.7630276.7158222h-10.4c-1.3602365-.005588-2.46-1.1098333-2.46-2.4700809v-30.95c0-1.3602476 1.0997635-2.4644929 2.46-2.47h10.4c1.3618668.0054804 2.4645196 1.1081332 2.47 2.47zm24-14.21c0 .6603158-.2642968 1.2931595-.7340204 1.7572465-.4697237.464087-1.1057125.7207735-1.7659796.7129359h-10.4c-1.3618668-.0056628-2.4645196-1.1083156-2.47-2.4701824v-16.74c.0054804-1.3618668 1.1081332-2.4645196 2.47-2.47h10.4c1.3602365.0055071 2.4600111 1.1097524 2.46 2.47z"
                              fill="url(#trello-logo-gradient-defaultbig)"
                            ></path>
                            <g
                              fill="#adcbfb"
                              fill-rule="nonzero"
                              transform="translate(87)"
                            >
                              <path d="m42.92 4.64v12.06h-14.29v45.75h-13.78v-45.75h-14.29v-12.06z"></path>
                              <path d="m60.46 62.45h-12.74v-45h12.74v8.62c2.42-6.07 6.29-9.68 13.18-9.24v13.33c-9-.7-13.18 1.5-13.18 8.71z"></path>
                              <path d="m143.24 62.8c-8.35 0-13.6-4-13.6-13.46v-49.27h12.83v47.51c0 2.73 1.8 3.7 4 3.7.634638.0128631 1.269419-.0172055 1.9-.09v11.09c-1.677893.4087549-3.404213.5837425-5.13.52z"></path>
                              <path d="m170 62.8c-8.35 0-13.61-4-13.61-13.46v-49.27h12.83v47.51c0 2.73 1.81 3.7 4.05 3.7.631315.0130885 1.262786-.0169816 1.89-.09v11.09c-1.687411.4126716-3.42418.5876949-5.16.52z"></path>
                              <path d="m181.31 39.93c0-13.9 8-23.41 21.78-23.41s21.61 9.48 21.61 23.41-7.92 23.58-21.61 23.58-21.78-9.77-21.78-23.58zm12.49 0c0 6.77 2.84 12.14 9.29 12.14s9.13-5.37 9.13-12.14-2.75-12-9.13-12-9.29 5.22-9.29 12z"></path>
                              <path d="m90.84 44c3.5670052.3919324 7.1516349.602204 10.74.63 9.76 0 18-2.62 18-12.07 0-9.17-8.47-16.06-18.66-16.06-13.72 0-22.51 9.95-22.51 23.85 0 14.43 7.58 23 24.71 23 5.081836.0413682 10.127233-.8605644 14.88-2.66v-10.78c-4.4 1.41-9.35 2.81-14.43 2.81-6.82 0-11.57-2.24-12.73-8.72zm9.82-17.68c3.61 0 6.51 2.45 6.51 5.8 0 4.31-4.55 5.66-9.79 5.66-2.2301144-.0102442-4.4563338-.1874058-6.66-.53.1664561-2.1013033.7692883-4.1448022 1.77-6 1.6348247-2.9938883 4.7590565-4.8714866 8.17-4.91z"></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div>
                        <div className="flex w-full">
                          <div
                            ref={featuresButtonRef}
                            className={`hover:text-blue-500 ${Dropdown === "Features" ? "text-blue-500" : null}`}
                          >
                            <DropdownButton
                              text={"Features"}
                              onclick={() => {
                                switchDropdown("Features", featuresButtonRef);
                              }}
                            />
                          </div>
                          <div
                            ref={solutionsButtonRef}
                            className={`hover:text-blue-500 ${Dropdown === "Solutions" ? "text-blue-500" : null}`}
                          >
                            <DropdownButton
                              text={"Solutions"}
                              onclick={() => {
                                switchDropdown("Solutions", solutionsButtonRef);
                              }}
                            />
                          </div>
                          <div
                            ref={plansButtonRef}
                            className={`hover:text-blue-500 ${Dropdown === "Plans" ? "text-blue-500" : null}`}
                          >
                            <DropdownButton
                              text={"Plans"}
                              onclick={() => {
                                switchDropdown("Plans", plansButtonRef);
                              }}
                            />
                          </div>
                          <div
                            onClick={closeDropdown}
                            className={`hover:text-blue-500 ${Dropdown === "Pricing" ? "text-blue-500" : null}`}
                          >
                            <Button
                              href={"https://trello.com/pricing"}
                              text={"Pricing"}
                            />
                          </div>
                          <div
                            ref={resourcesButtonRef}
                            className={`hover:text-blue-500 ${Dropdown === "Resources" ? "text-blue-500" : null}`}
                          >
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
                      <div
                        onClick={() => {
                          const nextPath = encodeURIComponent(
                            `/invite/accept-invite`,
                          );
                          navigate(`/login?next=${nextPath}`);
                        }}
                        className="px-6 py-4 font-semibold"
                      >
                        Log in
                      </div>
                      <div
                        onClick={() => {
                          const nextPath = encodeURIComponent(
                            `/invite/accept-invite`,
                          );
                          navigate(`/signup?next=${nextPath}`);
                        }}
                        className="bg-blue-400 text-black font-semibold px-6 py-4 hover:bg-blue-800"
                      >
                        Get Trello for free
                      </div>
                    </div>

                    <div
                      className="transition-all duration-300 bg-blue-500 absolute bottom-0"
                      style={{
                        width: Dropdown
                          ? `${underlineStyle.width - 29}px`
                          : `0px`,
                        left: `${underlineStyle.left + 11}px`,
                        height: "3px",
                        transformOrigin: "left",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                height: `${DropdownHeight}px`,
                top: `${navbarHeight}px`,
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
                  <FeaturesDropdown onClose={closeDropdown} />
                </div>

                <div
                  ref={solutionsref}
                  className={Dropdown === "Solutions" ? "block" : "hidden"}
                >
                  <SolutionsDropdown onClose={closeDropdown} />
                </div>

                <div
                  ref={plansref}
                  className={Dropdown === "Plans" ? "block" : "hidden"}
                >
                  <PlansDropdown onClose={closeDropdown} />
                </div>

                <div
                  ref={resourcesref}
                  className={Dropdown === "Resources" ? "block" : "hidden"}
                >
                  <ResourcesDropdown onClose={closeDropdown} />
                </div>
              </div>
            </div>

            <div
              className={`fixed inset-0 z-30 bg-slate-600/50 ${
                Dropdown ? "visible" : "invisible"
              }`}
              onClick={closeDropdown}
            />
          </div>
          <div className="text-2xl">
            <span className="font-bold">{boardMeta?.creatorName + " "}</span>
            shared
            <span className="font-bold">
              {" " + boardMeta?.boardTitle + " "}
            </span>
            with you.
          </div>
          <div className="flex">
            {boardMeta?.boardUsers.slice(0, 3).map((user, index) => (
              <div key={index} style={{ marginLeft: index === 0 ? 0 : "-8px" }}>
                <Avatar
                  initials={user.initials}
                  avatarURL={user.avatarURL}
                  avatarColor={user.avatarColor}
                  size="12"
                ></Avatar>
              </div>
            ))}
            {boardMeta?.boardUsers.length > 3 && (
              <div style={{ marginLeft: "-8px" }}>
                <Avatar
                  initials={`+${boardMeta?.boardUsers.length - 3}`}
                  avatarColor="#4c4d51"
                  size="12"
                ></Avatar>
              </div>
            )}
          </div>
          <div>{inviteSummaryText}</div>
          <div className="flex gap-4">
            <button
              className="bg-blue-400 hover:bg-blue-300 transition-all duration-200 text-black cursor-pointer text-xl py-2 px-25 rounded font-semibold"
              onClick={() => {
                const nextPath = encodeURIComponent(`/invite/accept-invite`);
                navigate(`/signup?next=${nextPath}`);
              }}
              type="button"
            >
              Sign up
            </button>
            <button
              className="bg-[#303134] hover:bg-gray-300/20 text-gray-300 transition-all duration-200 cursor-pointer text-xl py-2 px-25 rounded font-semibold"
              onClick={() => {
                const nextPath = encodeURIComponent(`/invite/accept-invite`);
                navigate(`/login?next=${nextPath}`);
              }}
              type="button"
            >
              Log in
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && (
        <div>
          <div className="bg-[#1f1f21] px-3 pb-2 mb-15">
            <LoggedInNavBar></LoggedInNavBar>
          </div>
          <div className="flex flex-col items-center gap-12">
            <div className="text-2xl">
              <span className="font-bold">{boardMeta?.creatorName + " "}</span>
              shared
              <span className="font-bold">
                {" " + boardMeta?.boardTitle + " "}
              </span>
              with you.
            </div>
            <div className="flex">
              {boardMeta?.boardUsers.slice(0, 3).map((user, index) => (
                <div
                  key={index}
                  style={{ marginLeft: index === 0 ? 0 : "-8px" }}
                >
                  <Avatar
                    initials={user.initials}
                    avatarURL={user.avatarURL}
                    avatarColor={user.avatarColor}
                    size="12"
                  ></Avatar>
                </div>
              ))}
              {boardMeta?.boardUsers.length > 3 && (
                <div style={{ marginLeft: "-8px" }}>
                  <Avatar
                    initials={`+${boardMeta?.boardUsers.length - 3}`}
                    avatarColor="#4c4d51"
                    size="12"
                  ></Avatar>
                </div>
              )}
            </div>
            <div>{inviteSummaryText}</div>
            <div className="flex gap-4">
              <button
                className="bg-blue-400 hover:bg-blue-300 transition-all duration-200 text-black cursor-pointer text-xl py-2 px-25 rounded font-semibold"
                onClick={JoinButtonHandler}
                type="button"
              >
                Join board
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
