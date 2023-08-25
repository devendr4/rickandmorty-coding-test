"use client";

import { EpisodesTable } from "@/app/components/organisms/tables/Episodes";
import { useRootStore } from "@/app/store";
import { useEffect } from "react";

export default function EpisodesQuery() {
  const { getEpisodes, episodeInfo } = useRootStore();
  useEffect(() => {
    getEpisodes().then(v => console.log(v));
  }, [getEpisodes]);
  return (
    <div className="container mt-5  w-full">
      <h1 className="mb-2 text-center font-schwifty text-5xl text-cyan">
        Episode
      </h1>
      {episodeInfo && <EpisodesTable data={episodeInfo} />}
    </div>
  );
}
