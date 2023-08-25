"use client";
import { Card } from "../components/atoms/Card";
import { NewCharacterForm } from "../components/organisms/forms/NewCharacter";

export default function Create() {
  return (
    <div className="mt-20 flex  h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-2 font-schwifty text-5xl text-cyan">
        Create a new character
      </h1>
      <Card className="bg-cyan">
        <NewCharacterForm />
      </Card>
    </div>
  );
}
