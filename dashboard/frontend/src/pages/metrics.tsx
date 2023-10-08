import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import NavigationLayout from "@/components/layouts/navigation";
import WebsitePickerLayout from "@/components/layouts/websitepicker";

const Home: NextPageWithLayout = () => {
  return <div className="h-full w-full">METRICS</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <WebsitePickerLayout>{page}</WebsitePickerLayout>
    </NavigationLayout>
  );
};

export default Home;
