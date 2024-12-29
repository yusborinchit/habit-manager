import { HabitForm } from "~/components/forms/habit-form";
import HabitCard from "~/components/habit-card";
import Header from "~/components/header";
import MainContainer from "~/components/main-container";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { getCurrent24Time } from "~/lib/time";
import { auth } from "~/server/auth";
import { getHabitsByUserId, getNextHabitByUserId } from "~/server/db/queries";

export default async function ProfilePage() {
  const session = await auth();

  const [userHabits, nextUserHabit] = await Promise.all([
    getHabitsByUserId(session!.user.id),
    getNextHabitByUserId(session!.user.id, getCurrent24Time()),
  ]);

  return (
    <>
      <Header />
      <MainContainer as="main" className="flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold tracking-tighter">
            <span className="text-hm-500">#</span> Current Habit
          </h3>
          <pre className="whitespace-break-spaces px-4">
            {nextUserHabit
              ? JSON.stringify(nextUserHabit, null, 2)
              : "Nothing yet"}
          </pre>
        </section>
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold tracking-tighter">
            <span className="text-hm-500">#</span> Your Day Habits
          </h3>
          <ScrollArea>
            <div className="flex gap-4">
              {userHabits.length > 0 ? (
                userHabits.map((habit) => (
                  <HabitCard key={habit.id} habit={habit} />
                ))
              ) : (
                <pre>Nothing to track today!</pre>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
        <HabitForm />
      </MainContainer>
      <footer className="mt-4"></footer>
    </>
  );
}
