import { SidebarOption } from "@/app/types";
import { FC } from "react";
import { FiChevronDown } from "react-icons/fi";

export const SidebarOptionBtn: FC<
  SidebarOption & { onClick: () => void; hasChildren: boolean }
> = ({ title, Icon, hasChildren, onClick }) => {
  return (
    <button
      className="w-full p-3 transition delay-150 duration-200 ease-in-out hover:scale-105"
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        <Icon />
        <p>{title}</p>
        {hasChildren && <FiChevronDown />}
      </span>
    </button>
  );
};
