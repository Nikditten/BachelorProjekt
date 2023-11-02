import { FC, PropsWithChildren } from 'react';

interface Props {
  title: string;
  className?: string;
}

const HeaderContainer: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  className,
}) => {
  return (
    <div
      className={`h-full w-full flex flex-col justify-center items-center gap-2 ${className}`}
    >
      <h1 className='w-full pl-2 text-start text-2xl font-light'> {title}</h1>
      {children}
    </div>
  );
};

export default HeaderContainer;
