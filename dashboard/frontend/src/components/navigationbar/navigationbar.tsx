import { FC, useState } from 'react';
import {
  MdAdd,
  MdOutlineAccountCircle,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import Account from '../account/account';
import IconButton from '../buttons/iconbutton';
import IconLink from '../links/iconlink';
import Spacer from '../spacer/spacer';

const NavigationBar: FC = () => {
  const [accountModalOpen, setAccountModalOpen] = useState<boolean>(false);

  const onAccountModalOpen = () => setAccountModalOpen(true);
  const onAccountModalClose = () => setAccountModalOpen(false);

  return (
    <>
      <Account
        isOpen={accountModalOpen}
        onClose={onAccountModalClose}
      />
      <nav className='w-full h-20 px-4 py-6 shadow-2xl md:h-full md:w-20 rounded-xl shadow-gray-400'>
        <ul className='flex flex-row items-center justify-between w-full h-full gap-10 md:flex-col'>
          <li>
            <IconLink
              href='/'
              label='Overview'
            >
              <MdOutlineSpaceDashboard />
            </IconLink>
          </li>
          <Spacer vertical />
          <li>
            <IconLink
              href='/create'
              label='Website'
            >
              <MdAdd />
            </IconLink>
          </li>
          <li>
            <IconButton
              onClick={onAccountModalOpen}
              label='Account'
            >
              <MdOutlineAccountCircle />
            </IconButton>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;
