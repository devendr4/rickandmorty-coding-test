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
  handleChange?: (value: string) => void;
  defaultValue: string;
  label: string;
  items: {
    value: string;
    name: string;
  }[];
}

export const FullSelect: FC<Props> = ({
  placeholder,
  label,
  items,
  handleChange,
  defaultValue,
}) => {
  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
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
