import { FC, PropsWithChildren } from 'react';

const Widget: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-full h-full p-6 shadow-xl rounded-xl shadow-gray-400'>
      {children}
    </div>
  );
};

export default Widget;
