import { FC } from "react";
import { MdAdd } from "react-icons/md";

interface Props {
  onClick: () => void;
}

const CreateWebsiteButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className='flex h-56 w-full items-center justify-center rounded-lg border-2 border-dotted border-gray-400 text-4xl text-gray-400 hover:border-black hover:text-black'
    >
      <MdAdd />
    </button>
  );
};

export default CreateWebsiteButton;
