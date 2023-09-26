import { FC } from "react";

interface Props {
  show: boolean;
  message: string;
}

const Toast: FC<Props> = ({ show, message }) => {
  return (
    <div
      className={`fixed bottom-10 w-5/6 min-h-16 h-fit py-5 text-center bg-blue-400 text-white rounded-2xl ${
        show ? "visible" : "hidden"
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Toast;
