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

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  type: string;
  image: string;
}

export interface Info {
  count: number;
  pages: number;
  next?: number;
  prev?: number;
}

export interface CharacterInfo {
  characters: Character[];
  info: Info;
}

export interface CharacterFilters {
  page?: number;
  name?: string;
  gender?: string;
  status?: string;
  species?: string;
}
