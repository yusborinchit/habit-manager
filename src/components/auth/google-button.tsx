"use client";

import { Chrome, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    await signIn("google", {
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
          <Chrome />
          <span>Sign In with Google</span>
        </>
      )}
    </Button>
  );
}
