import { redirect } from "next/navigation";

const HomePage = () => {
  redirect("/sign-in");

  return <div>Home</div>;
};

export default HomePage;
