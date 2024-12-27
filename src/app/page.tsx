import Link from "next/link";
import SignOutButton from "~/components/auth/sign-out-button";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <header className="mx-auto flex max-w-[900px] justify-between p-4">
      <Link href="/" className="text-xl font-semibold tracking-tighter">
        Habit Manager
      </Link>
      <nav>
        {session ? (
          <SignOutButton user={session.user} />
        ) : (
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
