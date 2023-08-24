"use client";
import { Card } from "../components/atoms/Card";
import { LoginForm } from "../components/organisms/forms/Login";
import { RegisterForm } from "../components/organisms/forms/Register";
import { useRootStore } from "../store";

export default function Login() {
  const { userData } = useRootStore();
  return (
    <main className="absolute left-0 right-0 top-0">
      <div className="flex h-screen flex-col items-center justify-center text-dark-blue">
        <Card className="w-2/6">
          {userData ? <LoginForm /> : <RegisterForm />}
        </Card>
      </div>
    </main>
  );
}
