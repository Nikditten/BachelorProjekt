import { FC, PropsWithChildren } from "react";

const Grid: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='grid h-full w-full grid-cols-1 gap-4 md:grid-cols-1 md:grid-rows-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-rows-4'>
      {children}
    </div>
  );
};

export default Grid;
