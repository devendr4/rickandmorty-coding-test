import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/app/components/atoms/Button";
import { useRootStore } from "@/app/store";
import { Input } from "@/app/components/atoms/Input";

interface Inputs {
  name: string;
  episode: string;
}

export const EpisodeFiltersForm = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { setEpisodeFilters } = useRootStore();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    await setEpisodeFilters(data);
  };
  const clear = async () => {
    reset();
    await setEpisodeFilters(undefined);
  };
  return (
    <form
      className="flex flex-wrap gap-3 rounded-t-md  bg-green p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex  flex-wrap items-center justify-around gap-2 md:w-8/12">
        <div className="flex   flex-col sm:w-1/3">
          <label>Name</label>
          <Input defaultValue="" {...register("name")} />
        </div>

        <div className="flex  flex-col sm:w-1/3">
          <label>Episode</label>
          <Input type="text" {...register("episode")} />
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
