"use client";

import { CharactersTable } from "@/app/components/organisms/tables/Characters";
import { useRootStore } from "@/app/store";
// import { useToast } from "@/app/hooks/useToast";
import { useEffect } from "react";

export default function CharactersQuery() {
  const { getCharacters, characterInfo } = useRootStore();
  useEffect(() => {
    getCharacters({ page: 0 }).then(v => console.log(v));

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
    <div className="flex max-h-screen w-full flex-col items-center justify-center gap-4 p-5 text-dark-blue ">
      <h1 className="font-schwifty text-5xl text-cyan">Characters</h1>
      {characterInfo && <CharactersTable characterInfo={characterInfo} />}
    </div>
  );
}
