"use client";
import { Card } from "../components/atoms/Card";
import { Title } from "../components/atoms/Title";
import { NewCharacterForm } from "../components/organisms/forms/NewCharacter";

export default function Create() {
  return (
    <div className="container flex h-screen  flex-col items-center justify-center">
      <div className=" w-10/12  md:w-3/6">
        <Title>Create a new character</Title>
        <Card className="bg-cyan">
          <NewCharacterForm />
        </Card>
      </div>
    </div>
  );
}
