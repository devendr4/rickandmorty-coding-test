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
            defaultValue={field.value}
            handleChange={field.onChange}
            placeholder="Status"
            label="Status"
            items={[
              { value: "Dead", name: "Dead" },
              { value: "Alive", name: "Alive" },
              { value: "unknown", name: "Unknown" },
            ]}
          />
        )}
      />
    </>
  );
};
