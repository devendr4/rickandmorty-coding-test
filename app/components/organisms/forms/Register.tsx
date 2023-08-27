"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import { useRootStore } from "@/app/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../atoms/Button";
import { useRouter } from "next/navigation";
import { Input } from "../../atoms/Input";

interface Inputs {
  username: string;
  pwd: string;
  confirmPwd: string;
}

const schema = yup
  .object()
  .shape({
    username: yup.string().required("Required field"),
    pwd: yup
      .string()
      .required("Required field")
      .min(6, "Password must have 6 characters minimum")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must contain a lowercase letter, an upercase letter, a special character and a number"
      ),
    confirmPwd: yup
      .string()
      .required("Required field")
      .oneOf([yup.ref("pwd")], "Passwords must match"),
  })
  .required();

export const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const { setUserData } = useRootStore();
  const onSubmit: SubmitHandler<Inputs> = data => {
    setUserData({ username: data.username, pwd: data.pwd });

    router.replace("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {/* <h2>Register</h2> */}
      <label>username</label>
      <Input defaultValue="" {...register("username")} />
      <p>{errors.username?.message}</p>
      <label>password</label>
      <Input type={"password"} {...register("pwd")} />
      <p>{errors.pwd?.message}</p>
      <label>confirm password</label>
      <Input type={"password"} {...register("confirmPwd")} />
      <p>{errors.confirmPwd?.message}</p>
      <Button className="border-dark-blue p-2" type="submit">
        submit
      </Button>
    </form>
  );
};
