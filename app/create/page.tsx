"use client";
import { Card } from "../components/atoms/Card";
import { Title } from "../components/atoms/Title";
import { CharacterForm } from "../components/organisms/forms/Character";

export default function Create() {
  return (
    <div className="container flex h-screen  flex-col items-center justify-center">
      <div className=" w-10/12  md:w-3/6">
        <Title>Create a new character</Title>
        <Card className="bg-cyan">
          <CharacterForm />
        </Card>
      </div>
    </div>
  );
}
