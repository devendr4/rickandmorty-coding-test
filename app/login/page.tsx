"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card } from "../components/atoms/Card";
import { useRootStore } from "../store";

interface Inputs {
  username: string;
  pwd: string;
  confirmPwd?: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>();
  const { setUserData, userData } = useRootStore();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify({ ...data }));
  };
  return (
    <main className="absolute top-0 left-0 right-0">
      <div className="flex flex-col justify-center items-center h-screen text-dark-blue">
        <p className="font-schwifty text-cyan text-5xl mb-4">RICK AND MORTY</p>
        <Card>
          <p>{userData ? "login" : "register"}</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <label>username</label>
            <input defaultValue="" {...register("username")} />
            <label>password</label>
            <input type="password" {...register("pwd")} />

            {!userData && (
              <>
                <label>confirm password</label>
                <input type="password" {...register("confirmPwd")} />
              </>
            )}
            <button>submit</button>
          </form>
        </Card>
      </div>
    </main>
  );
}
