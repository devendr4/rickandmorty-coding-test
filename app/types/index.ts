import { IconType } from "react-icons";

export interface SidebarOption {
  title: string;
  Icon: IconType;
  route?: string;
  children?: SidebarOption[];
  auth?: boolean;
}

export interface UserData {
  username: string;
  pwd: string;
}
