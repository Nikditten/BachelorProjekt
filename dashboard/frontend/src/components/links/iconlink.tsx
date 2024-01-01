import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface Props {
  href: string;
  label?: string;
  testid?: string;
}

const IconLink: FC<PropsWithChildren<Props>> = ({
  children,
  href,
  label,
  testid,
}) => {
  return (
    <Link
      href={href}
      data-testid={testid}
      className='flex flex-col items-center justify-center gap-1 text-xs'
    >
      <div className='text-3xl'>{children}</div>
      {label ?? <p>{label}</p>}
    </Link>
  );
};

export default IconLink;
