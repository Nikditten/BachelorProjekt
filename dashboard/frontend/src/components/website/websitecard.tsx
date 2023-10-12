import { FC } from 'react';
import { BiCopy } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import IconButton from '../buttons/iconbutton';

interface Props {
  title: string;
  id: string;
}

const WebsiteCard: FC<Props> = ({ title, id }) => {
  return (
    <div className='w-full md:w-96 h-48 shadow-md rounded-lg shadow-gray-400 flex flex-col justify-between items-center p-6'>
      <div className='w-full text-start'>
        <h1 className='font-bold w-full'>{title}</h1>
        <h3 className='w-full'>{id}</h3>
      </div>

      <ul className='w-full flex flex-row items-center justify-end gap-4'>
        <li>
          <IconButton onClick={() => {}}>
            <BiCopy />
          </IconButton>
        </li>
        <li>
          <IconButton onClick={() => {}}>
            <MdDeleteOutline />
          </IconButton>
        </li>
      </ul>
    </div>
  );
};

export default WebsiteCard;
