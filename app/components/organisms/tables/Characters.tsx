import { Character, CharacterInfo } from "@/app/types";

import { FC } from "react";
import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";

import { CharacterFiltersForm } from "../forms/CharacterFilters";
import { GenericDataTable } from "./Generic";
import { ActionsDropdown } from "../ActionsDropdown";

export const columns: ColumnDef<Character>[] = [
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      return <ActionsDropdown row={row} />;
    },
  },
  {
    header: "",
    accessorKey: "image",
    //render image in a custom cell
    cell: props => (
      <Image
        className="hidden md:block"
        src={props.row.original.image}
        alt={props.row.original.name}
        width={100}
        height={100}
      />
    ),
  },
  { header: "Name", accessorKey: "name" },
  { header: "Gender", accessorKey: "gender" },
  { header: "Status", accessorKey: "status" },
  { header: "Species", accessorKey: "species" },
  { header: "Type", accessorKey: "type" },
];

export const CharactersTable: FC<{
  characterInfo: CharacterInfo;
}> = ({ characterInfo: { characters: results, info } }) => {
  return (
    <div className="rounded-xl">
      <CharacterFiltersForm />
      <GenericDataTable
        columns={columns}
        data={{ results, info }}
        dataType="char"
      />
    </div>
  );
};
