import { FC } from "react";
import { SidebarOptionBtn } from "../atoms/SidebarOptionBtn";
import { SidebarOption } from "@/app/types";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const FullSidebarOption: FC<
  SidebarOption & {
    optionOpen: { title: string; isOpen: boolean };
    handleClick: () => void;
  }
> = ({ children, Icon, optionOpen, title, handleClick }) => {
  const route = useRouter();

  return (
    <li className="flex flex-col p-3">
      <SidebarOptionBtn
        title={title}
        Icon={Icon}
        hasChildren={!!children}
        onClick={handleClick}
      />
      {optionOpen.isOpen && optionOpen.title === title && children && (
        <motion.div
          key={optionOpen.title}
          className="ml-3 flex flex-col items-center "
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
        >
          {children.map(child => (
            <SidebarOptionBtn
              key={child.title}
              title={child.title}
              Icon={child.Icon}
              hasChildren={!!child.children}
              onClick={() =>
                !child.children && child.route
                  ? route.push(child.route)
                  : handleClick()
              }
            />
          ))}
        </motion.div>
      )}
    </li>
  );
};
