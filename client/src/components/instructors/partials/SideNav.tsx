import React, { useState } from "react";
import { Link } from "react-router-dom";
import {AiFillBook, AiOutlinePlus } from "react-icons/ai";
import {
  HomeIcon,
} from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
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
    title: "View course",
    icon: <AiFillBook {...icon} />,
    value: "view-course",
    path:'/instructors/view-course'
  },
  {
    title: "Add course",
    icon: <AiOutlinePlus {...icon} />,
    value: "add-course",
    path:'/instructors/add-course'
  },
];

const InstructorSideNav: React.FC = () => {
  const [isActive, setIsActive] = useState<string>("home");
  const selected = false;
  const handleClick = (active: string) => {
    setIsActive(active);
  };
  return (
    <nav className='bg-white h-screen w-64 border-r border-gray-300 flex flex-col'>
      <ul className='py-6'>
        {routes.map(({ title, icon, value,path }) => {
          return (
            <Link to={path} >
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
