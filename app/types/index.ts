import { IconType } from "react-icons";

export interface SidebarOption {
  title: string;
  Icon: IconType;
  children?: SidebarOption[];
}
