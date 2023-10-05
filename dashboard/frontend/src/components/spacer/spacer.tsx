import { FC } from "react";

interface Props {
  vertical?: boolean;
}

const Spacer: FC<Props> = ({ vertical = true }) => {
  return <div className={vertical ? "h-full w-0.5" : "h-0.5 w-full"} />;
};

export default Spacer;
