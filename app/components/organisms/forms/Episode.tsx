import * as yup from "yup";
import { useToast } from "@/app/hooks/useToast";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { yupResolver } from "@hookform/resolvers/yup";

import localforage from "localforage";
import { Episode } from "@/app/types";
import { FC } from "react";
import { useRootStore } from "@/app/store";

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Required field")
      .min(2, "Character name must be 2 characters or more"),
    episode: yup
      .string()
      .required("Required field")
      .min(6, "Character species must be 6 characters or more"),

    air_date: yup.string().required("Required field"),
    //   .min(3, "Character type must be 3 characters or more"),
  })
  .required();

interface Inputs {
  name: string;
  episode: string;
  air_date: string;
}

export const EpisodeForm: FC<{
  editedEpisode?: Episode;
  afterSubmit?: () => void;
}> = ({ editedEpisode, afterSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...editedEpisode,
    },
  });

  const { toast } = useToast();
  const { getEpisodes } = useRootStore();

  const onSubmit: SubmitHandler<Inputs> = async v => {
    let cachedEpisodes: Episode[] =
      (await localforage.getItem("episodes")) || [];

    const episodeIds = [...cachedEpisodes.map(char => char.id)];
    if (!editedEpisode) {
      cachedEpisodes.push({
        ...v,
        // start new episode ids at 10000 to not conflict with API in case new episode are added there
        // gets max id from previously created episode an adds 1 to keep the continuity
        id: episodeIds.length ? Math.max(...episodeIds) + 1 : 10000,
      });
      toast({ title: "Episode succesfully created!" });
    } else {
      //remove episode with filter if it was edited before to replace it with the newest version
      console.log("ID", editedEpisode.id);
      cachedEpisodes = cachedEpisodes.filter(
        char => char.id !== editedEpisode.id
      );
      cachedEpisodes.push({
        //spread edited character values that are not editable (id )
        // with values obtained from the form
        ...editedEpisode,
        ...v,
      });
      if (afterSubmit) afterSubmit();
    }

    reset();
    await localforage.setItem("episodes", cachedEpisodes);
    await getEpisodes();
    toast({ title: "Episode succesfully edited!" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col   gap-2">
      <label>Name</label>
      <Input placeholder="Name" type="text" {...register("name")} />

      <p>{errors.name?.message}</p>
      <label>Episode</label>
      <Input placeholder="Episode" type="text" {...register("episode")} />
      <p>{errors.episode?.message}</p>
      <label>Air date</label>
      <Input placeholder="Type" type="text" {...register("air_date")} />
      <p>{errors.air_date?.message}</p>

      <Button>Submit</Button>
    </form>
  );
};
