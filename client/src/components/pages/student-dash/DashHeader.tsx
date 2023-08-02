import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Collapse,
  IconButton,
  MenuItem
} from "@material-tailwind/react";
import { FaUserGraduate } from "react-icons/fa";
import { PowerIcon } from "@heroicons/react/24/solid";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {FiSettings} from 'react-icons/fi'

import {
  Bars2Icon,
} from "@heroicons/react/24/outline";

const NavItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: MdDashboard 
  },
  {
    path: "/dashboard/my-courses",
    name: "My courses",
    icon: FaUserGraduate
  },
  {
    path: "/dashboard/my-profile",
    name: "My profile",
    icon: CgProfile 
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    icon: FiSettings

  },
  {
    path: "",
    name: "Log Out",
    icon: PowerIcon
  },
];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {NavItems.map(({ name, icon,path }, key) => (
        <Link to={path} key={key}>
        <Typography
          key={name}
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {name}
          </MenuItem>
        </Typography>
        </Link>
      ))}
    </ul>
  );
}
    
export default function InstructorHeader() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, [])
 
  return (
    <Navbar className="mx-auto border-b bg-white border-gray-300 max-w-full   lg:pl-6 shadow-none rounded-none">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-semibold text-2xl"
        >
          TutorTrek
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"  
        > 
          <Bars2Icon className="h-6 w-6" />      
        </IconButton>
      </div>
      <Collapse open={isNavOpen} className="overflow-hidden">
      {/* <MobileNav/> */}
      <NavList/>
      </Collapse>
    </Navbar>

  );
}
