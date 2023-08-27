import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/atoms/Select";
import { FC } from "react";

interface Props {
  placeholder: string;
  label: string;
  items: {
    value: string;
    name: string;
  }[];
}

export const FullSelect: FC<Props> = ({ placeholder, label, items }) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map(v => (
            <SelectItem key={v.value} value={v.value}>
              {v.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
