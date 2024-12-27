import Link from "next/link";
import { auth } from "~/server/auth";
import ProfileButton from "./auth/profile-button";
import MainContainer from "./main-container";
import { Button } from "./ui/button";

export default async function Header() {
  const session = await auth();

  return (
    <MainContainer
      as="header"
      className="flex items-center justify-between py-4"
    >
      <Link href="/" className="text-xl font-semibold tracking-tighter">
        Habit Manager
      </Link>
      <nav>
        {session ? (
          <ProfileButton user={session.user} />
        ) : (
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </nav>
    </MainContainer>
  );
}
