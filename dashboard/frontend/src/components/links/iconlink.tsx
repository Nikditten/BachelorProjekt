import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface Props {
  href: string;
  label?: string;
}

const IconLink: FC<PropsWithChildren<Props>> = ({ children, href, label }) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center text-xs gap-1"
    >
      <div className="text-3xl">{children}</div>
      {label ?? <p>{label}</p>}
    </Link>
  );
};

export default IconLink;
