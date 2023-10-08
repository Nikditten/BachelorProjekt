import { FC, PropsWithChildren, useState } from "react";
import SimpleDropdown from "../dropdown/simpledropdown";

const WebsitePickerLayout: FC<PropsWithChildren> = ({ children }) => {

  const websites = ["Website test 1", "Test website 2"]
  const [selectedWebsite, setSelectedWebsite] = useState<string>(websites[0])

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4">
      <div className="w-full flex justify-start">
        <SimpleDropdown
          options={websites}
          selected={selectedWebsite}
          onSelect={(option) => setSelectedWebsite(option)}
        />
      </div>
      {children}
    </div>
  );
};

export default WebsitePickerLayout;
