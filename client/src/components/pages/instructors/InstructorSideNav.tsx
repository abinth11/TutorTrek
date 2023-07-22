import React, { useState } from "react";
import { Link } from "react-router-dom";
import {MdLibraryAdd} from "react-icons/md"
import {
  HomeIcon,
} from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";

import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import {IoMdChatboxes} from 'react-icons/io'
import { FaUserGraduate } from "react-icons/fa";
import {UserCircleIcon} from "@heroicons/react/24/outline";


const icon = {
  className: "w-5 h-5 text-inherit",
};
const routes = [
  {
    title: "Home",
    icon: <HomeIcon {...icon} />,
    value: "home",
    path:'/instructors/'
  },
  {
    title: "View courses",
    icon: <Square3Stack3DIcon {...icon} />,
    value: "view-course",
    path:'/instructors/view-course'
  },
  {
    title: "Add courses",
    icon: <MdLibraryAdd {...icon} />,
    value: "add-course",
    path:'/instructors/add-course'
  },
  {
    title:"My students",
    icon:<FaUserGraduate {...icon}/>,
    value:"view-students",
    path:"/instructors/view-students"
  },
  {
    title:"My Profile",
    icon:<UserCircleIcon {...icon}/>,
    value:"view-profile",
    path:"/instructors/view-profile"
  },
  {
    title:"Channels",
    icon:<IoMdChatboxes {...icon}/>,
    value:"view-channels",
    path:'/instructors/view-channels'
  },
  
];

const InstructorSideNav: React.FC = () => {
  const location = useLocation()
  const parts = location.pathname.split('/');
  const result = parts.slice(2).join('/');
  const [isActive, setIsActive] = useState<string>(result===""?'home':result);
  const selected = false;
  const handleClick = (active: string) => {
    setIsActive(active);
  };
  return (
    <nav className='bg-white h-screen w-64 border-r border-gray-300 flex flex-col'>
      <ul className='py-6'>
        {routes.map(({ title, icon, value,path },index) => {
          return (
            <Link to={path} key={index}>
             <li className='py-2 px-4'>
              <Button
                variant={isActive ===value ? "gradient" : "text"}
                color={isActive===value ? "blue" : "gray"}
                className={`flex items-center gap-4 capitalize${
                  isActive && selected ? " bg-indigo-600" : ""
                }`}
                fullWidth
                value={value}
                onClick={() => {
                  handleClick(value);
                }}
              >
                {icon}
                <Typography color={isActive===value?'inherit':'gray'} className='font-bold capitalize'>
                  {title}
                </Typography>
              </Button>
            </li>
            </Link>
           
          );
        })}
      </ul>
    </nav>
  );
};

export default InstructorSideNav;
