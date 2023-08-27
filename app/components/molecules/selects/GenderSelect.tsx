import { Control, Controller } from "react-hook-form";
import { FullSelect } from "../FullSelect";
import { FC } from "react";

export const GenderSelect: FC<{ control: Control }> = ({ control }) => {
  return (
    <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <FullSelect
          handleChange={field.onChange}
          placeholder="Gender"
          label="Gender"
          items={[
            { value: "male", name: "Male" },
            { value: "female", name: "Female" },
            { value: "genderless", name: "Genderless" },
            { value: "unknown", name: "Unknown" },
          ]}
        />
      )}
    />
  );
};
