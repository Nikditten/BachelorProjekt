import { FC, PropsWithChildren } from 'react';

const Grid: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:grid-rows-4'>
      {children}
    </div>
  );
};

export default Grid;
