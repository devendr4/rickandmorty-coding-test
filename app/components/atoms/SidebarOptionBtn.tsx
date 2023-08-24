import { SidebarOption } from "@/app/types";
import { FC } from "react";
import { FiChevronDown } from "react-icons/fi";

export const SidebarOptionBtn: FC<
  SidebarOption & { onClick: () => void; hasChildren: boolean }
> = ({ title, Icon, children, onClick }) => {
  return (
    <button
      className="p-3 w-full hover:scale-110 transition ease-in-out delay-150 duration-200 border-2 border-cyan"
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        <Icon />
        <p>{title}</p>
        {children && <FiChevronDown />}
      </span>
    </button>
  );
};
