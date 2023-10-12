import { FC, PropsWithChildren } from 'react';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  filled?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const ActionButton: FC<PropsWithChildren<Props>> = ({
  children,
  type = 'submit',
  filled = true,
  disabled = false,
  onClick,
}) => {
  const style = filled ? 'bg-black text-white' : 'bg-white text-black';

  const disabledStyle = disabled ? 'opacity-50' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-center w-full h-12 rounded-lg border-[1px] border-black p-2 ${style} ${disabledStyle}`}
    >
      {disabled ? <p>Loading...</p> : children}
    </button>
  );
};

export default ActionButton;
