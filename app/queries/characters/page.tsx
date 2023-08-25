"use client";

import { CharactersTable } from "@/app/components/organisms/tables/Characters";
// import { useToast } from "@/app/hooks/useToast";
import { getCharacters } from "@/app/services/getCharacters";
import { CharacterInfo } from "@/app/types";
import { useEffect, useState } from "react";

export default function CharactersQuery() {
  // const { userData } = useRootStore();
  useEffect(() => {
    console.log("getting");
    getCharacters({ page: 0 })
      .then(v => {
        console.log(v);
        setCharacters(v);
      })
      .catch(v => alert(v));
  }, []);
  const [characters, setCharacters] = useState<CharacterInfo>({
    info: { count: 0, pages: 0 },
    characters: [],
  });
  return (
    <div className="flex max-h-screen w-full flex-col items-center justify-center gap-4 p-5 text-dark-blue ">
      <h1 className="font-schwifty text-5xl text-cyan">Characters</h1>
      <CharactersTable characterInfo={characters} setChars={setCharacters} />
    </div>
  );
}
