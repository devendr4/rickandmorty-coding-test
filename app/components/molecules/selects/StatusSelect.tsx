import { Control, Controller } from "react-hook-form";
import { FullSelect } from "../FullSelect";
import { FC } from "react";

export const StatusSelect: FC<{ control: Control<any, any> }> = ({
  control,
}) => {
  return (
    <>
      <label>Status</label>
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FullSelect
            handleChange={field.onChange}
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
    </>
  );
};
