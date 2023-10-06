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
      className="flex flex-col justify-center items-center gap-1 text-xs"
    >
      <div className="text-4xl">{children}</div>
      {label ?? <p>{label}</p>}
    </Link>
  );
};

export default IconLink;
