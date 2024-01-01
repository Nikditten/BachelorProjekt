import { FC, PropsWithChildren } from "react";

interface Props {
  type?: "button" | "submit" | "reset";
  filled?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  testid?: string;
}

const ActionButton: FC<PropsWithChildren<Props>> = ({
  children,
  type = "submit",
  filled = true,
  disabled = false,
  onClick,
  testid,
}) => {
  const style = filled ? "bg-black text-white" : "bg-white text-black";

  const disabledStyle = disabled ? "opacity-50" : "";

  return (
    <button
      type={type}
      data-testid={testid}
      onClick={onClick}
      disabled={disabled}
      className={`h-12 w-full rounded-lg border-[1px] border-black p-2 text-center ${style} ${disabledStyle}`}
    >
      {disabled ? <p>Loading...</p> : children}
    </button>
  );
};

export default ActionButton;
