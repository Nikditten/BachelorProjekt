import { useWebsite } from "@/services/website/useWebsite";
import { FC, PropsWithChildren } from "react";
import SimpleDropdown from "../dropdown/simpledropdown";

const WebsiteConfigLayout: FC<PropsWithChildren> = ({ children }) => {
  const { websites, activeWebsite, setActiveWebsite } = useWebsite();

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <div className='flex w-full flex-col items-center justify-between md:flex-row md:pr-4'>
        <SimpleDropdown
          options={websites}
          selected={activeWebsite}
          onSelect={(option) => setActiveWebsite(option)}
        />
      </div>
      <div className='h-full w-full overflow-y-auto'>{children}</div>
    </div>
  );
};

export default WebsiteConfigLayout;
