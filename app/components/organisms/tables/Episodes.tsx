import { Episode, EpisodeInfo } from "@/app/types";
import { FC, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { EpisodeFiltersForm } from "../forms/EpisodeFilters";
import { GenericDataTable } from "./Generic";
import { ActionsDropdown } from "../ActionsDropdown";
import { EditModal } from "../modals/Edit";

export const EpisodesTable: FC<{
  data: EpisodeInfo;
}> = ({ data: { episodes: results, info } }) => {
  const [episode, setEpisode] = useState<Episode>();
  const columns: ColumnDef<Episode>[] = [
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        return (
          <ActionsDropdown
            row={row}
            handleClick={() => setEpisode(row.original)}
          />
        );
      },
    },
    { header: "Name", accessorKey: "name" },
    { header: "Episode", accessorKey: "episode" },
    { header: "Air date", accessorKey: "air_date" },
  ];
  return (
    <div className="rounded-xl">
      <EpisodeFiltersForm />
      {episode && (
        <EditModal
          isOpen={!!episode}
          setOpen={() => setEpisode(undefined)}
          episode={episode}
        />
      )}
      <GenericDataTable
        columns={columns}
        data={{ results, info }}
        dataType="episode"
      />
    </div>
  );
};
