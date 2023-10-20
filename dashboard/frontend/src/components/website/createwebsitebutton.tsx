import { FC } from 'react';
import { MdAdd } from 'react-icons/md';

interface Props {
  onClick: () => void;
}

const CreateWebsiteButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className='w-full h-48 flex justify-center items-center text-4xl rounded-lg border-2 border-dotted border-gray-400 text-gray-400 hover:border-black hover:text-black'
    >
      <MdAdd />
    </button>
  );
};

export default CreateWebsiteButton;
