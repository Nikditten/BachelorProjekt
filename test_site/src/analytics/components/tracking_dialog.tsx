import { FC } from 'react';

const TackingDialog: FC = () => {
  return (
    <div className='fixed inset-0 z-50 h-screen w-screen overflow-auto bg-black bg-opacity-25'>
      <div className='absolute left-1/2 top-1/2 flex h-5/6 w-5/6 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between gap-4 rounded-lg border-black bg-white p-4 shadow-2xl shadow-gray-400 md:h-3/4 md:w-1/2'></div>
    </div>
  );
};

export default TackingDialog;
