import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { useRootStore } from "@/app/store";

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
      className="flex flex-wrap rounded-t-md  bg-green p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-10/12 flex-wrap justify-around gap-2">
        <div className="flex w-1/3 flex-col">
          <label>Name</label>
          <input defaultValue="" {...register("name")} />
        </div>
        <div className="flex w-1/3 flex-col">
          <label>Gender</label>
          <input type="text" {...register("gender")} />
        </div>
        <div className="flex w-1/3 flex-col">
          <label>Status</label>
          <input type="text" {...register("status")} />
        </div>
        <div className="flex w-1/3 flex-col">
          <label>Species</label>
          <input type="text" {...register("species")} />
        </div>
      </div>
      <div className="flex w-2/12 flex-col items-center justify-center gap-2">
        <Button type="submit">Submit</Button>
        <Button onClick={clear} variant="secondary">
          Clear
        </Button>
      </div>
    </form>
  );
};
