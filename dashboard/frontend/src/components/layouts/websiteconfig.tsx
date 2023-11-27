import { useWebsite } from "@/services/website/useWebsite";
import { FC, PropsWithChildren, useState } from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import SimpleDropdown from "../dropdown/simpledropdown";
import Modal from "../modal/modal";

const WebsiteConfigLayout: FC<PropsWithChildren> = ({ children }) => {
  const { websites, activeWebsite, setActiveWebsite } = useWebsite();

  const [showCustomMetrics, setShowCustomMetrics] = useState<boolean>(false);

  const handleOpenCustomMetrics = () => setShowCustomMetrics(true);
  const handleCloseCustomMetrics = () => setShowCustomMetrics(false);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <div className='flex w-full flex-col items-center justify-between md:flex-row md:pr-4'>
        <SimpleDropdown
          options={websites}
          selected={activeWebsite}
          onSelect={(option) => setActiveWebsite(option)}
        />

        {activeWebsite && (
          <ul className='flex flex-row items-center justify-center gap-8 text-2xl'>
            <li>
              <button onClick={handleOpenCustomMetrics}>
                <MdOutlineDashboardCustomize />
              </button>
              <Modal
                isShown={showCustomMetrics}
                onClose={handleCloseCustomMetrics}
              >
                THIS IS CUSTOM METRICS FOR {activeWebsite!.name}
              </Modal>
            </li>
          </ul>
        )}
      </div>
      <div className='h-full w-full overflow-y-auto'>{children}</div>
    </div>
  );
};

export default WebsiteConfigLayout;
