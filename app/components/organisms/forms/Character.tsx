import * as yup from "yup";
import { useToast } from "@/app/hooks/useToast";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { StatusSelect } from "../../molecules/selects/StatusSelect";
import { GenderSelect } from "../../molecules/selects/GenderSelect";

import localforage from "localforage";
import { Character } from "@/app/types";
import { FC } from "react";
import { useRootStore } from "@/app/store";

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Required field")
      .min(2, "Character name must be 2 characters or more"),
    species: yup
      .string()
      .required("Required field")
      .min(3, "Character species must be 3 characters or more"),

    type: yup.string(),
    //   .required("Required field")
    //   .min(3, "Character type must be 3 characters or more"),
    gender: yup.string().required("Required field"),
    status: yup.string().required("Required field"),
  })
  .required();

interface Inputs {
  name: string;
  species: string;
  type?: string;
  gender: string;
  status: string;
}

export const CharacterForm: FC<{
  editedCharacter?: Character;
  afterSubmit?: () => void;
}> = ({ editedCharacter, afterSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...editedCharacter,
    },
  });

  const { toast } = useToast();
  const { getCharacters } = useRootStore();

  const onSubmit: SubmitHandler<Inputs> = async v => {
    let cachedCharacters: Character[] =
      (await localforage.getItem("characters")) || [];

    const characterIds = [...cachedCharacters.map(char => char.id)];
    if (!editedCharacter) {
      cachedCharacters.push({
        ...v,
        // start new character ids at 10000 to not conflict with API in case new characters are added there
        // gets max id from previously created characters an adds 1 to keep the continuity
        id: characterIds.length ? Math.max(...characterIds) + 1 : 10000,
        image: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
      });
      toast({ title: "Character succesfully created!" });
    } else {
      //remove character with filter if it was edited before to replace it with the newest version
      console.log("ID", editedCharacter.id);
      cachedCharacters = cachedCharacters.filter(
        char => char.id !== editedCharacter.id
      );
      cachedCharacters.push({
        //spread edited character values that are not editable (id and image)
        // with values obtained from the form
        ...editedCharacter,
        ...v,
      });
      if (afterSubmit) afterSubmit();
    }

    reset();
    await localforage.setItem("characters", cachedCharacters);
    await getCharacters();
    toast({ title: "Character succesfully edited!" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col   gap-2">
      <label>Name</label>
      <Input placeholder="Name" type="text" {...register("name")} />

      <p>{errors.name?.message}</p>
      <label>Species</label>
      <Input placeholder="Species" type="text" {...register("species")} />
      <p>{errors.species?.message}</p>
      <label>Type</label>
      <Input placeholder="Type" type="text" {...register("type")} />
      <p>{errors.type?.message}</p>
      <div className="flex  justify-center gap-2">
        <div className="w-1/2">
          {<StatusSelect control={control} />}
          <p>{errors.status?.message}</p>
        </div>

        <div className="w-1/2">
          {<GenderSelect control={control} />}
          <p>{errors.gender?.message}</p>
        </div>
      </div>
      <Button>Submit</Button>
    </form>
  );
};
