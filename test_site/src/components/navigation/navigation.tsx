"use client";

import navigation_data from "@/data/navigation_data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const Navigation: FC = () => {
  const pathname = usePathname();

  const isActive = (href: string) => (pathname === href ? "underline" : "none");

  return (
    <nav className="w-full h-16 px-6 text-xl text-white bg-blue-400">
      <ul className="flex flex-row items-center justify-center h-full gap-6">
        {navigation_data.map((item) => {
          return (
            <li key={item.id}>
              <Link
                className={`${isActive(item.path)} hover:text-blue-100`}
                href={item.path}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
