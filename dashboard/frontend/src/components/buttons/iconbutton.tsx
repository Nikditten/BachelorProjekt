import { FC, PropsWithChildren } from 'react';

interface Props {
  label?: string;
  onClick: () => void;
}

const IconButton: FC<PropsWithChildren<Props>> = ({
  children,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className='flex flex-col items-center justify-center text-xs'
    >
      <div className='text-3xl'>{children}</div>
      {label && <p>{label}</p>}
    </button>
  );
};

export default IconButton;
