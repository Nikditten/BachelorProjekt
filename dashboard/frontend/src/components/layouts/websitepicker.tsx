import { FC, PropsWithChildren } from "react";
import SimpleDropdown from "../dropdown/simpledropdown";

const WebsitePickerLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-start">
        <SimpleDropdown
          options={["My website", "My second website"]}
          onSelect={(option) => console.log(option)}
        />
      </div>
      {children}
    </div>
  );
};

export default WebsitePickerLayout;
