import { FC } from "react";
import {
  MdOutlineAccountCircle,
  MdOutlineDashboardCustomize,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import IconLink from "../links/iconlink";

const NavigationBar: FC = () => {
  return (
    <nav className="h-20 w-full md:h-full md:w-20 p-4 rounded-xl shadow-2xl shadow-gray-400">
      <ul className="h-full w-full flex flex-row md:flex-col justify-center items-center gap-8 py-2">
        <li>
          <IconLink href="/" label="Overview">
            <MdOutlineSpaceDashboard />
          </IconLink>
        </li>
        <li>
          <IconLink href="/metrics" label="Metrics">
            <MdOutlineDashboardCustomize />
          </IconLink>
        </li>
        <li>
          <IconLink href="/websites" label="Websites">
            <CgWebsite />
          </IconLink>
        </li>
        <div className="h-0.5 w-full md:h-full md:w-0.5" />
        <li>
          <IconLink href="/account" label="Account">
            <MdOutlineAccountCircle />
          </IconLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
