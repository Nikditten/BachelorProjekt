import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import NavigationLayout from "@/components/layouts/navigation";

const Home: NextPageWithLayout = () => {
  return <div className="h-full w-full"></div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Home;
