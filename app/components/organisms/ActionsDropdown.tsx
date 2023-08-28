import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/molecules/Dropdown";
import { Button } from "../atoms/Button";
import { FiMoreHorizontal } from "react-icons/fi";
import { Row } from "@tanstack/react-table";

const actions: {
  label: string;
  handleClick: () => void;
}[] = [
  {
    label: "Edit details",
    handleClick: () => {
      //
    },
  },
  /* {
    label: "Edit status",
    handleClick: () => {
      //
    },
  }, */
];
interface Props<T> {
  row: Row<T>;
  handleClick: () => void;
}

export const ActionsDropdown = <T extends object>({
  // row,
  handleClick,
}: Props<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <FiMoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {actions.map((v, index) => (
          <>
            <DropdownMenuItem key={v.label} onClick={() => handleClick()}>
              {v.label}
            </DropdownMenuItem>
            {index < actions.length && <DropdownMenuSeparator />}
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
