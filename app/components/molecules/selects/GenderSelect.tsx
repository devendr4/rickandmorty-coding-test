import { Control, Controller } from "react-hook-form";
import { FullSelect } from "../FullSelect";
import { FC } from "react";

export const GenderSelect: FC<{ control: Control<any, any> }> = ({
  control,
}) => {
  return (
    <>
      <label>Gender</label>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <FullSelect
            defaultValue={field.value}
            handleChange={field.onChange}
            placeholder="Gender"
            label="Gender"
            items={[
              { value: "Male", name: "Male" },
              { value: "Female", name: "Female" },
              { value: "Genderless", name: "Genderless" },
              { value: "unknown", name: "Unknown" },
            ]}
          />
        )}
      />
    </>
  );
};
