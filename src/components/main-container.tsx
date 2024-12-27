import { cn } from "~/lib/utils";

interface Props {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

export default function MainContainer({
  children,
  as,
  className,
}: Readonly<Props>) {
  const Component = as ?? "div";
  return (
    <Component className={cn("mx-auto max-w-screen-sm px-4", className)}>
      {children}
    </Component>
  );
}
