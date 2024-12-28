import { and, asc, eq, gte } from "drizzle-orm";
import { db } from "~/server/db";
import { habits } from "~/server/db/schema";

export async function insertHabit(habit: typeof habits.$inferInsert) {
  const [habitId] = await db
    .insert(habits)
    .values(habit)
    .returning({ id: habits.id });
  return habitId;
}

export async function getHabitsByUserId(userId: typeof habits.$inferSelect.id) {
  const userHabits = await db
    .select()
    .from(habits)
    .where(eq(habits.userId, userId))
    .orderBy(asc(habits.time));
  return userHabits;
}

export async function getNextHabitByUserId(
  userId: typeof habits.$inferSelect.id,
  time: typeof habits.$inferSelect.time,
) {
  const [nextUserHabit] = await db
    .select()
    .from(habits)
    .where(and(eq(habits.userId, userId), gte(habits.time, time)))
    .orderBy(asc(habits.time))
    .limit(1);
  return nextUserHabit;
}
