import * as yup from "yup";
import { Button } from "@/app/components/atoms/Button";
import { FullSelect } from "@/app/components/molecules/FullSelect";
import { Input } from "../../atoms/Input";
import { useToast } from "@/app/hooks/useToast";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Required field"),
    species: yup.string().required("Required field"),
    type: yup.string().required("Required field"),
    status: yup.string().required("Required field"),
  })
  .required();

export const NewCharacterForm = () => {
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  const { toast } = useToast();
  const onSubmit = () => {
    toast({ title: "Character succesfully created!" });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col   gap-2">
      <label>Name</label>
      <Input placeholder="Name" type="text" {...register("name")} />

      <label>Species</label>
      <Input placeholder="Species" type="text" {...register("species")} />
      <label>Type</label>
      <Input placeholder="Type" type="text" {...register("type")} />
      <div className="flex flex-wrap justify-center gap-2">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FullSelect
              {...field}
              placeholder="Status"
              label="Status"
              items={[
                { value: "dead", name: "Dead" },
                { value: "alive", name: "Alive" },
                { value: "unknown", name: "Unknown" },
              ]}
            />
          )}
        />
        <FullSelect
          placeholder="Gender"
          label="Gender"
          items={[
            { value: "male", name: "Male" },
            { value: "female", name: "Female" },
            { value: "genderless", name: "Genderless" },
            { value: "unknown", name: "Unknown" },
          ]}
        />
      </div>
      <Button>Submit</Button>
    </form>
  );
};
