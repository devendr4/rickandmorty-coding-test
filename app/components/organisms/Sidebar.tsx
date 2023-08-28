"use client";
import { HiHome } from "react-icons/hi";
import { PiMagnifyingGlassBold, PiTelevision } from "react-icons/pi";
import { BsPlusCircle } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { SidebarOption } from "@/app/types";
import { useState } from "react";
import { Hamburger } from "../molecules/Hamburger";
import { PickleRick } from "../molecules/PickleRick";
import { FullSidebarOption } from "../molecules/FullSidebarOption";
import { useRootStore } from "@/app/store";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { isLoggedIn } = useRootStore();
  const router = useRouter();

  const options: SidebarOption[] = [
    { title: "home", Icon: HiHome, route: "/" },
    {
      title: "create",
      Icon: BsPlusCircle,
      auth: true,
      route: "/create",

      children: [
        {
          title: "characters",
          Icon: BsFillPersonFill,
          route: "/create/character",
        },
        {
          title: "episodes",
          Icon: PiTelevision,
          route: "/create/episode",
        },
      ],
    },
    {
      title: "queries",
      Icon: PiMagnifyingGlassBold,
      auth: true,
      children: [
        {
          title: "characters",
          Icon: BsFillPersonFill,
          route: "/queries/characters",
        },
        {
          title: "episodes",
          Icon: PiTelevision,
          route: "/queries/episodes",
        },
      ],
    },
  ];

  /*  */
  const [optionOpen, setOptionOpen] = useState({
    title: "string",
    isOpen: false,
  });
  const [open, setOpen] = useState(false);

  return (
    <div className="w-scren">
      <nav
        className={` ${open ? "w-10/12" : "w-0 "}
		  absolute
		  top-0
			z-20
			h-screen
			overflow-hidden
		bg-gradient-to-b from-green
		  to-dark-green


		  text-2xl

		  delay-150
		  duration-300
		   ease-in-out md:sticky
		  md:h-screen  md:min-h-screen md:w-40 md:text-base`}
      >
        <ul className="flex h-full w-full flex-col gap-4 ">
          {options.map(
            ({ title, Icon, children, auth, route }) =>
              (!auth || isLoggedIn) && (
                <FullSidebarOption
                  key={title}
                  title={title}
                  Icon={Icon}
                  optionOpen={optionOpen}
                  handleClick={() => {
                    if (!children && route) router.push(route);
                    else
                      setOptionOpen({
                        title,
                        isOpen:
                          title === optionOpen.title
                            ? !optionOpen.isOpen
                            : true,
                      });
                  }}
                >
                  {children}
                </FullSidebarOption>
              )
          )}

          <PickleRick />
        </ul>
      </nav>
      <Hamburger setOpen={() => setOpen(!open)} />
    </div>
  );
};

export default Sidebar;
