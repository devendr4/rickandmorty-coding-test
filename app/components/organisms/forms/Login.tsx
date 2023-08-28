import { SubmitHandler, useForm } from "react-hook-form";

import { useRootStore } from "@/app/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../atoms/Button";
import { useRouter } from "next/navigation";
import { Input } from "../../atoms/Input";
import localforage from "localforage";

interface Inputs {
  username: string;
  pwd: string;
}

export const LoginForm = () => {
  const { userData, setLoggedIn } = useRootStore();
  const router = useRouter();

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
    setLoggedIn();
    router.replace("/");
  };

  const onResetSubmit = async () => {
    localStorage.clear();
    await localforage.clear();
    router.replace("/register");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* <h2>Login</h2> */}
        <label>Username</label>
        <Input defaultValue="" {...register("username")} />
        <p>{errors.username?.message}</p>
        <label>Password</label>
        <Input type={"password"} {...register("pwd")} />
        <p>{errors.pwd?.message}</p>
        <Button className="border-dark-blue p-2" type="submit">
          Submit
        </Button>
      </form>
      <button
        className="font-bold text-white underline"
        onClick={onResetSubmit}
      >
        Reset
      </button>
    </>
  );
};
