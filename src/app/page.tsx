import Header from "~/components/header";
import MainContainer from "~/components/main-container";

export default function HomePage() {
  return (
    <>
      <Header />
      <MainContainer as="main">Home</MainContainer>
    </>
  );
}
