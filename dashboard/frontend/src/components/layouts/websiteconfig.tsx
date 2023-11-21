import { FC, PropsWithChildren, useState } from "react";
import {
  MdInfoOutline,
  MdOutlineDashboardCustomize,
  MdOutlineSettings,
} from "react-icons/md";
import SimpleDropdown from "../dropdown/simpledropdown";
import Modal from "../modal/modal";

const WebsiteConfigLayout: FC<PropsWithChildren> = ({ children }) => {
  const websites = ["Website test 1", "Test website 2"];
  const [selectedWebsite, setSelectedWebsite] = useState<string>(websites[0]);

  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showCustomMetrics, setShowCustomMetrics] = useState<boolean>(false);

  const handleOpenInfo = () => setShowInfo(true);
  const handleCloseInfo = () => setShowInfo(false);

  const handleOpenSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);

  const handleOpenCustomMetrics = () => setShowCustomMetrics(true);
  const handleCloseCustomMetrics = () => setShowCustomMetrics(false);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <div className='flex w-full flex-col items-center justify-between md:flex-row md:pr-4'>
        <SimpleDropdown
          options={websites}
          selected={selectedWebsite}
          onSelect={(option) => setSelectedWebsite(option)}
        />

        <ul className='flex flex-row items-center justify-center gap-8 text-2xl'>
          <li>
            <button onClick={handleOpenCustomMetrics}>
              <MdOutlineDashboardCustomize />
            </button>
            <Modal
              isShown={showCustomMetrics}
              onClose={handleCloseCustomMetrics}
            >
              THIS IS CUSTOM METRICS FOR {selectedWebsite}
            </Modal>
          </li>
          <li>
            <button onClick={handleOpenInfo}>
              <MdInfoOutline />
            </button>
            <Modal
              isShown={showInfo}
              onClose={handleCloseInfo}
            >
              THIS IS INFO ABOUT {selectedWebsite}
            </Modal>
          </li>
          <li>
            <button onClick={handleOpenSettings}>
              <MdOutlineSettings />
            </button>
            <Modal
              isShown={showSettings}
              onClose={handleCloseSettings}
            >
              THIS IS SETTINGS FOR {selectedWebsite}
            </Modal>
          </li>
        </ul>
      </div>
      <div className='h-full w-full overflow-y-auto'>{children}</div>
    </div>
  );
};

export default WebsiteConfigLayout;
