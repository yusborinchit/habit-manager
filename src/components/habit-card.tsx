"use client";

import { Ellipsis, Loader, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteHabitAction } from "~/actions/actions";
import { type habits } from "~/server/db/schema";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  habit: typeof habits.$inferSelect;
}

export default function HabitCard({ habit }: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      const { success } = await deleteHabitAction(habit.id);
      if (success) {
        router.refresh();
      } else {
        console.error("ERROR ON DELETE");
      }
    });
  }
  return (
    <article className="relative w-[500px] px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="absolute right-0 top-0">
          <Button variant="ghost" size="icon">
            <Ellipsis className="!h-6 !w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Pencil />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash />
                <span>Delete</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <pre className="whitespace-break-spaces">
        {JSON.stringify(habit, null, 2)}
      </pre>
    </article>
  );
}