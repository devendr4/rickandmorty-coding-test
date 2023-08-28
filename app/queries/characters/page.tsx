"use client";

import { CharactersTable } from "@/app/components/organisms/tables/Characters";
import { useRootStore } from "@/app/store";
// import { useToast } from "@/app/hooks/useToast";
import { useEffect } from "react";

export default function CharactersQuery() {
  const { getCharacters, characterInfo } = useRootStore();
  useEffect(() => {
    getCharacters().then(v => console.log(v));
  }, [getCharacters]);

  return (
    <div className="container mt-5  w-full">
      <h1 className="mb-2 text-center font-schwifty text-5xl text-cyan">
        Characters
      </h1>

      {characterInfo && <CharactersTable characterInfo={characterInfo} />}
    </div>
  );
}
