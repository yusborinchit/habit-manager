"use server";

import { type z } from "zod";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { habits } from "~/server/db/schema";
import { habitFormSchema } from "~/zod-schemas";

type Input = z.infer<typeof habitFormSchema>;

export async function insertHabit(input: Input) {
  const { success, data, error } = habitFormSchema.safeParse(input);
  if (!success) throw new Error(error.message);

  const session = await auth();
  if (!session) throw new Error("Not Authenticated");

  const time = `${data.time.hour}:${data.time.minute} ${data.time.mode}`;

  const [habit] = await db
    .insert(habits)
    .values({
      userId: session.user.id,
      title: data.title,
      description: data.description,
      days: JSON.stringify(data.days),
      time: time,
    })
    .returning();

  return habit;
}
