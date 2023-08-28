"use client";
import { Card } from "../components/atoms/Card";
import { LoginForm } from "../components/organisms/forms/Login";
import { RegisterForm } from "../components/organisms/forms/Register";
import { useRootStore } from "../store";

export default function Login() {
  const { userData } = useRootStore();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4  text-dark-blue">
      <h1 className="font-schwifty text-5xl text-cyan">
        {userData ? "Login" : "Register"}
      </h1>
      <Card className="w-10/12 md:w-3/6">
        {userData ? <LoginForm /> : <RegisterForm />}
      </Card>
    </div>
  );
}
