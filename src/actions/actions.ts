"use server";

import { revalidatePath } from "next/cache";
import { type z } from "zod";
import { parseFrom12Hour } from "~/lib/time";
import { auth } from "~/server/auth";
import { deleteHabit, insertHabit } from "~/server/db/queries";
import { type habits } from "~/server/db/schema";
import { habitFormSchema } from "~/zod-schemas";

export async function insertHabitAction(
  input: z.infer<typeof habitFormSchema>,
) {
  const { success, data } = habitFormSchema.safeParse(input);
  if (!success) return { success: false };

  const session = await auth();
  if (!session) return { success: false };

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
  if (!habitId) return { success: false };

  revalidatePath("/profile");

  return { success: true };
}

export async function deleteHabitAction(
  habitId: typeof habits.$inferSelect.id,
) {
  const session = await auth();
  if (!session) return { success: false };

  const deletedHabitId = await deleteHabit(habitId, session.user.id);
  if (!deletedHabitId) return { success: false };

  revalidatePath("/profile");

  return { success: true };
}
