"use client";
import { Card } from "../components/atoms/Card";
import { RegisterForm } from "../components/organisms/forms/Register";

export default function Login() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4  text-dark-blue">
      <h1 className="font-schwifty text-5xl text-cyan">Register</h1>
      <Card className="w-10/12 md:w-3/6">
        <RegisterForm />
      </Card>
    </div>
  );
}
