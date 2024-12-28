import { HabitForm } from "~/components/forms/habit-form";
import Header from "~/components/header";
import MainContainer from "~/components/main-container";
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
      <MainContainer as="main">
        <pre>{JSON.stringify(nextUserHabit, null, 2)}</pre>
        <div className="mb-8 flex gap-4 overflow-x-scroll">
          {userHabits.map((habit) => (
            <pre
              key={habit.id}
              className="min-w-fit whitespace-break-spaces px-4 py-2"
            >
              {JSON.stringify(habit, null, 2)}
            </pre>
          ))}
        </div>
        <HabitForm />
      </MainContainer>
      <footer className="mt-4"></footer>
    </>
  );
}
