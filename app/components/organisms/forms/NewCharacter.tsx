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

    type: yup
      .string()
      .required("Required field")
      .min(3, "Character type must be 3 characters or more"),
    gender: yup.string().required("Required field"),
    status: yup.string().required("Required field"),
  })
  .required();

interface Inputs {
  name: string;
  species: string;
  type: string;
  gender: string;
  status: string;
}

export const NewCharacterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async v => {
    console.log(v);

    const cachedCharacters: Character[] =
      (await localforage.getItem("characters")) || [];
    console.log(v);
    cachedCharacters.push({ ...v, id: 1000, image: "" });
    await localforage.setItem("characters", cachedCharacters);
    reset();
    toast({ title: "Character succesfully created!" });
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
