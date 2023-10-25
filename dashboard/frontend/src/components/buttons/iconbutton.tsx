import { FC, PropsWithChildren } from 'react';

interface Props {
  label?: string;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
}

const IconButton: FC<PropsWithChildren<Props>> = ({
  children,
  label,
  onClick,
  className,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`flex flex-col items-center justify-center text-xs hover:text-black ${className}`}
    >
      <div className='text-3xl'>{children}</div>
      {label && <p>{label}</p>}
    </button>
  );
};

export default IconButton;
