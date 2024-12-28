import { HabitForm } from "~/components/forms/habit-form";
import Header from "~/components/header";
import MainContainer from "~/components/main-container";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { getCurrent24Time } from "~/lib/time";
import { auth } from "~/server/auth";
import { getHabitsByUserId, getNextHabitByUserId } from "~/server/db/queries";

export default async function ProfilePage() {
  const session = await auth();

  const userHabits = await getHabitsByUserId(session!.user.id);
  const nextUserHabit = await getNextHabitByUserId(
    session!.user.id,
    getCurrent24Time(),
  );

  return (
    <>
      <Header />
      <MainContainer as="main" className="flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold tracking-tighter">
            <span className="text-hm-500">#</span> Current Habit
          </h3>
          <pre className="whitespace-break-spaces">
            {JSON.stringify(nextUserHabit, null, 2)}
          </pre>
        </section>
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold tracking-tighter">
            <span className="text-hm-500">#</span> Your Day Habits
          </h3>
          <ScrollArea>
            <div className="flex gap-4">
              {userHabits.map((habit) => (
                <pre
                  key={habit.id}
                  className="min-w-fit whitespace-break-spaces"
                >
                  {JSON.stringify(habit, null, 2)}
                </pre>
              ))}
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
