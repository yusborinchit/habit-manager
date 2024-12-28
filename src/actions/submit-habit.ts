"use server";

import { revalidatePath } from "next/cache";
import { type z } from "zod";
import { parseFrom12Hour } from "~/lib/time";
import { auth } from "~/server/auth";
import { insertHabit } from "~/server/db/queries";
import { habitFormSchema } from "~/zod-schemas";

export async function submitHabitAction(
  input: z.infer<typeof habitFormSchema>,
) {
  const { success, data, error } = habitFormSchema.safeParse(input);
  if (!success) throw new Error(error.message);

  const session = await auth();
  if (!session) throw new Error("Not Authenticated");

  const time12 = `${data.time.hour}:${data.time.minute} ${data.time.mode}`;
  const time24 = parseFrom12Hour(time12);

  const habit = {
    userId: session.user.id,
    title: data.title,
    description: data.description,
    days: JSON.stringify(data.days),
    time: time24,
  };

  const habitId = await insertHabit(habit);
  if (!habitId) throw new Error("Failed to insert habit");

  revalidatePath("/profile");

  return habitId;
}
