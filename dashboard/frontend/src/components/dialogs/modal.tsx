import { FC, PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
  isShown: boolean;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  isShown,
  onClose,
}) => {
  if (!isShown) return null;

  return (
    <div className='fixed inset-0 z-50 w-screen h-screen overflow-auto bg-black bg-opacity-25'>
      <div className='absolute flex flex-col items-center justify-between w-5/6 gap-4 p-4 -translate-x-1/2 -translate-y-1/2 bg-white border-black rounded-lg shadow-2xl md:w-1/2 h-5/6 md:h-3/4 left-1/2 top-1/2 shadow-gray-400'>
        <div className='flex flex-row items-center justify-end w-full'>
          <button
            className='text-2xl text-gray-300 hover:text-black'
            type='button'
            onClick={onClose}
          >
            <MdClose />
          </button>
        </div>
        <div className='w-full h-full'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
