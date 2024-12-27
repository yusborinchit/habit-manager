"use client";

import { Github, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function GithubButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    await signIn("github", {
      redirectTo: "/",
    });
  }

  return (
    <Button disabled={isLoading} onClick={handleSignIn}>
      {isLoading ? (
        <>
          <Loader className="animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <Github />
          <span>Sign In with Github</span>
        </>
      )}
    </Button>
  );
}
