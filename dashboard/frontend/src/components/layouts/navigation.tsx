import { FC, PropsWithChildren } from "react";
import NavigationBar from "../navigationbar/navigationbar";

const NavigationLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row justify-start items-center p-4 gap-4">
      <NavigationBar />
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default NavigationLayout;
