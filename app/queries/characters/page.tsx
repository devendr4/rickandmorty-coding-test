"use client";

import { CharactersTable } from "@/app/components/organisms/tables/Characters";
import { useRootStore } from "@/app/store";
// import { useToast } from "@/app/hooks/useToast";
import { useEffect } from "react";

export default function CharactersQuery() {
  const { getCharacters, characterInfo } = useRootStore();
  useEffect(() => {
    getCharacters().then(v => console.log(v));

    // console.log("getting");
    // getCharacters({ page: 0 })
    //   .then(v => {
    //     console.log(v);
    //     setCharacters(v);
    //   })
    //   .catch(v => alert(v));
  }, [getCharacters]);
  // const [characters, setCharacters] = useState<CharacterInfo>({
  //   info: { count: 0, pages: 0 },
  //   characters: [],
  // });
  return (
    <div className="container mt-5  w-full">
      <h1 className="mb-2 text-center font-schwifty text-5xl text-cyan">
        Characters
      </h1>
      {characterInfo && <CharactersTable characterInfo={characterInfo} />}
    </div>
  );
}
