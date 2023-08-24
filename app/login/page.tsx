"use client";
import { Card } from "../components/atoms/Card";
import { RegisterForm } from "../components/organisms/forms/Register";
import { useRootStore } from "../store";

export default function Login() {
  const { userData } = useRootStore();
  return (
    <main className="absolute left-0 right-0 top-0">
      <div className="flex h-screen flex-col items-center justify-center text-dark-blue">
        <p className="mb-4 font-schwifty text-7xl text-cyan">RICK AND MORTY</p>
        <Card className="w-2/6">
          <p>{userData ? "login" : "register"}</p>
          <RegisterForm />
        </Card>
      </div>
    </main>
  );
}
