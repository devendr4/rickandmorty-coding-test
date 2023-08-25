"use client";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  return (
    <div className="mt-20 flex  h-screen flex-col items-center justify-center">
      <h1>Create a new character</h1>
    </div>
  );
}
