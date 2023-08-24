"use client";
import { useRouter } from "next/navigation";
import { Button } from "./components/atoms/Button";
import { useRootStore } from "./store";

export default function Login() {
  const router = useRouter();
  const { isLoggedIn } = useRootStore();
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-4">
      <h1 className="mb-4 text-center font-schwifty text-7xl text-cyan">
        welcome to the <br />
        rick and morty docs
      </h1>
      <p className="font-schwifty text-3xl text-white">
        All the Rick and Morty information <br />
        you need under one place!
      </p>
      {!isLoggedIn ? (
        <Button variant="secondary" onClick={() => router.push("/login")}>
          Sign in / Register
        </Button>
      ) : (
        <div className="flex flex-col gap-3">
          <Button variant="secondary" onClick={() => router.push("/create")}>
            Create a new character
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push("/query/characters")}
          >
            Browse characters
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push("/query/episodes")}
          >
            Browse episodes
          </Button>
        </div>
      )}
    </div>
  );
}
