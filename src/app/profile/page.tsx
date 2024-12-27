import { HabitForm } from "~/components/forms/habit-form";
import Header from "~/components/header";
import MainContainer from "~/components/main-container";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <MainContainer as="main">
        <HabitForm />
      </MainContainer>
      <footer className="mt-4"></footer>
    </>
  );
}
