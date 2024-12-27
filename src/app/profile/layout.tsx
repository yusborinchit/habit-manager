import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Habit Manager | Profile",
};

export default async function ProfileLayout({ children }: Readonly<Props>) {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return children;
}
