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

const Sidebar = () => {
  const { userData } = useRootStore();

  const options: SidebarOption[] = [
    { title: "home", Icon: HiHome },
    {
      title: "create",
      Icon: BsPlusCircle,
      auth: true,
    },
    {
      title: "queries",
      Icon: PiMagnifyingGlassBold,
      auth: true,
      children: [
        {
          title: "characters",
          Icon: BsFillPersonFill,
        },
        {
          title: "episodes",
          Icon: PiTelevision,
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
		  overflow-hidden
		  transition-width
		  ease-in-out
		  duration-300
		  delay-150
		  sticky h-screen md:w-2/12 top-0  z-50 text-2xl md:text-base`}
      >
        <ul className="flex flex-col w-full h-full gap-4 ">
          {options.map(
            ({ title, Icon, children, auth }) =>
              (!auth || userData) && (
                <FullSidebarOption
                  key={title}
                  title={title}
                  Icon={Icon}
                  optionOpen={optionOpen}
                  handleClick={() => {
                    setOptionOpen({
                      title,
                      isOpen:
                        title === optionOpen.title ? !optionOpen.isOpen : true,
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
