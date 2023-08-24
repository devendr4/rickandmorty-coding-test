"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import { useRootStore } from "@/app/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../atoms/Button";
import { useRouter } from "next/navigation";

interface Inputs {
  username: string;
  pwd: string;
}

export const LoginForm = () => {
  const { userData } = useRootStore();
  const router = useRouter();

  console.log(userData);
  const schema = yup
    .object()
    .shape({
      username: yup
        .string()
        .required("Required field")
        .test(
          "isUsername",
          "Username doesn't match",
          v => v === userData?.username
        ),
      pwd: yup
        .string()
        .required("Required field")
        .test("isPwd", "Password doesn't match", v => v === userData?.pwd),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = () => {
    router.replace("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <h2>Login</h2>
      <label>username</label>
      <input defaultValue="" {...register("username")} />
      <p>{errors.username?.message}</p>
      <label>password</label>
      <input type={"text"} {...register("pwd")} />
      <p>{errors.pwd?.message}</p>
      <label>confirm password</label>
      <Button className="border-dark-blue p-2" type="submit">
        submit
      </Button>
    </form>
  );
};
