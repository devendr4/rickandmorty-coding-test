import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/app/components/atoms/Button";
import { useRootStore } from "@/app/store";
import { Input } from "@/app/components/atoms/Input";
import { StatusSelect } from "../../molecules/selects/StatusSelect";
import { GenderSelect } from "../../molecules/selects/GenderSelect";

interface Inputs {
  name: string;
  gender: string;
  status: string;
  species: string;
}

export const CharacterFiltersForm = () => {
  const { register, handleSubmit, reset, control } = useForm<Inputs>();
  const { setCharacterFilters } = useRootStore();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    await setCharacterFilters(data);
  };
  const clear = async () => {
    reset();
    await setCharacterFilters(undefined);
  };
  return (
    <form
      className="flex flex-wrap gap-3  rounded-t-md bg-gradient-to-r from-cyan to-dark-cyan p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-wrap items-center justify-evenly gap-2 md:w-8/12">
        <div className="flex  w-full flex-col sm:w-1/3">
          <label>Name</label>
          <Input defaultValue="" {...register("name")} />
        </div>

        <div className="flex  w-full flex-col sm:w-1/3">
          <GenderSelect control={control} />
        </div>

        <div className="flex  w-full flex-col sm:w-1/3">
          <StatusSelect control={control} />
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
