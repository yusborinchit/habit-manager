interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Habit Manager | Sign In",
};

export default function SignInLayout({ children }: Readonly<Props>) {
  return children;
}
