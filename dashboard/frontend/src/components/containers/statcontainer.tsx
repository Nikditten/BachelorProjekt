import { FC, PropsWithChildren } from 'react';

interface Props {
  title: string;
  unit?: string;
}

const StatContainer: FC<PropsWithChildren<Props>> = ({
  title,
  unit,
  children,
}) => {
  return (
    <div className='w-full shadow-md rounded-lg shadow-gray-400 flex flex-col justify-start items-start gap-2 p-6'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h1 className='font-light text-xl'>{title}</h1>
        <p className='font-thin text-xs'>{unit}</p>
      </div>
      <div className='w-full h-full overflow-y-auto'>{children}</div>
    </div>
  );
};

export default StatContainer;
