"use client";
import { EpisodeForm } from "@/app/components/organisms/forms/Episode";
import { Card } from "../../components/atoms/Card";
import { Title } from "../../components/atoms/Title";

export default function Create() {
  return (
    <div className="container flex h-screen  flex-col items-center justify-center">
      <div className=" w-10/12  md:w-3/6">
        <Title>Create a new episode</Title>
        <Card className="bg-cyan">
          <EpisodeForm />
        </Card>
      </div>
    </div>
  );
}
