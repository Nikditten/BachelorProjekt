import { FC, PropsWithChildren, useState } from 'react';
import {
  MdInfoOutline,
  MdOutlineDashboardCustomize,
  MdSettings,
} from 'react-icons/md';
import Modal from '../dialogs/modal';
import SimpleDropdown from '../dropdown/simpledropdown';

const WebsiteConfigLayout: FC<PropsWithChildren> = ({ children }) => {
  const websites = ['Website test 1', 'Test website 2'];
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
    <div className='flex flex-col items-center justify-center w-full h-full gap-4'>
      <div className='flex flex-row items-center justify-between w-full pr-4'>
        <SimpleDropdown
          options={websites}
          selected={selectedWebsite}
          onSelect={(option) => setSelectedWebsite(option)}
        />

        <ul className='flex flex-row items-center justify-center text-2xl gap-8'>
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
              <MdSettings />
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
      {children}
    </div>
  );
};

export default WebsiteConfigLayout;
