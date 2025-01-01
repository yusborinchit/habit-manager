"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { type habits } from "~/server/db/schema";
import EditHabitForm from "../forms/edit-habit-form";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface Props {
  habit: typeof habits.$inferSelect;
}

export function HabitModal({ habit }: Readonly<Props>) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Habit</DialogTitle>
        <DialogDescription>
          Make changes to your habit here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea>
        <EditHabitForm habit={habit} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </DialogContent>
  );
}
