import { FC, PropsWithChildren } from "react";

const Grid: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='grid h-full w-full gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {children}
    </div>
  );
};

export default Grid;
