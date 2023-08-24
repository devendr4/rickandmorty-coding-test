"use client";
import { HiHome } from "react-icons/hi";
import { PiMagnifyingGlassBold, PiTelevision } from "react-icons/pi";
import { BsPlusCircle } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { SidebarOption } from "@/app/types";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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
    <AnimatePresence mode="wait">
      <nav
        className={`bg-green ${open ? "w-10/12" : "w-0"}
		  transition-width
		  absolute
		  top-0
		  z-50
		  h-screen
		  min-h-screen
		  overflow-hidden text-2xl delay-150 duration-300  ease-in-out md:w-2/12 md:text-base`}
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
                    !children && route
                      ? router.push(route)
                      : setOptionOpen({
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
    </AnimatePresence>
  );
};

export default Sidebar;
