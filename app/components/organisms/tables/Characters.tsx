import { Character, CharacterInfo } from "@/app/types";

import { FC, useState } from "react";
import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";

import { CharacterFiltersForm } from "../forms/CharacterFilters";
import { GenericDataTable } from "./Generic";
import { ActionsDropdown } from "../ActionsDropdown";
import { EditModal } from "../modals/Edit";

interface Props {
  characterInfo: CharacterInfo;
}

export const CharactersTable: FC<Props> = ({
  characterInfo: { characters: results, info },
}) => {
  const [character, setCharacter] = useState<Character>();
  const columns: ColumnDef<Character>[] = [
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        return (
          <ActionsDropdown
            row={row}
            handleClick={() => setCharacter(row.original)}
          />
        );
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

  return (
    <div className="rounded-xl">
      <CharacterFiltersForm />
      {character && (
        <EditModal
          isOpen={!!character}
          setOpen={() => setCharacter(undefined)}
          character={character}
        />
      )}

      <GenericDataTable
        columns={columns}
        data={{ results, info }}
        dataType="char"
      />
    </div>
  );
};
