import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { useRootStore } from "@/app/store";
import { Input } from "../atoms/Input";

interface Inputs {
  name: string;
  gender: string;
  status: string;
  species: string;
}

export const CharacterFiltersForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { setFilters, getCharacters } = useRootStore();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    await setFilters(data);
  };
  const clear = async () => {
    await setFilters(undefined);
  };
  return (
    <form
      className="flex flex-wrap gap-3 rounded-t-md  bg-green p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-wrap items-center justify-evenly gap-2 md:w-8/12">
        <div className="flex  w-full flex-col sm:w-1/3">
          <label>Name</label>
          <Input defaultValue="" {...register("name")} />
        </div>
        <div className="flex w-full flex-col sm:w-1/3">
          <label>Gender</label>
          <Input type="text" {...register("gender")} />
        </div>
        <div className="flex  w-full flex-col sm:w-1/3">
          <label>Status</label>
          <Input type="text" {...register("status")} />
        </div>
        <div className="flex  w-full flex-col sm:w-1/3">
          <label>Species</label>
          <Input type="text" {...register("species")} />
        </div>
      </div>
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2 md:w-3/12 md:flex-col">
        <Button type="submit">Submit</Button>
        <Button onClick={clear} variant="secondary">
          Clear
        </Button>
      </div>
    </form>
  );
};
