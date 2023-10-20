import { FC } from 'react';
import { BiCopy } from 'react-icons/bi';
import { MdDeleteOutline, MdOutlineSettings } from 'react-icons/md';
import IconButton from '../buttons/iconbutton';

interface Props {
  title: string;
  id: string;
}

const WebsiteCard: FC<Props> = ({ title, id }) => {
  return (
    <div className='w-full h-48 shadow-md rounded-lg shadow-gray-400 flex flex-col justify-between items-center p-6'>
      <div className='w-full text-start'>
        <h1 className='font-bold w-full text-xl'>{title}</h1>
        <h3 className='w-full mt-3'>Your API key:</h3>
        <span className='font-thin'>{id}</span>
      </div>

      <ul className='w-full flex flex-row items-center justify-end gap-4'>
        <li>
          <IconButton onClick={() => {}}>
            <BiCopy />
          </IconButton>
        </li>
        <li>
          <IconButton
            className='hover:text-red-600'
            onClick={() => {}}
          >
            <MdDeleteOutline />
          </IconButton>
        </li>
      </ul>
    </div>
  );
};

export default WebsiteCard;
