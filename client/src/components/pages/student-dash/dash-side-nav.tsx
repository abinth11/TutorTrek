import React, { useState } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {FiSettings} from 'react-icons/fi'
import { APP_LOGO } from "../../../constants/common";


const NavItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdDashboard className='h-6 w-6' />
  },
  {
    path: "/dashboard/my-courses",
    name: "My courses",
    icon: <FaUserGraduate className='h-6 w-6' />
  },
  {
    path: "/dashboard/my-profile",
    name: "My profile",
    icon: <CgProfile className='h-6 w-6' />
  },
  {
    path: "#",
    name: "Settings",
    icon: <FiSettings className='h-6 w-6' />

  },
];

const SideNav: React.FC = () => {
  const [selected, setSelected] = useState<string>("Dashboard");

  return (
    <Card className='fixed top-0  h-full w-full max-w-[17rem] p-3 rounded-none'>
      <div className=' mb-1 p-1 flex items-center gap-4  pl-3'>
        <Link to='/'>
          <img className='h-9 ' src={APP_LOGO} alt='brand' />
        </Link>
      </div>                 
      <List>
        <hr className='my-2 border-blue-gray-50' />
        {NavItems.map(({ icon, name, path },index) => {
          return (
            <Link
            key={index}
              to={path} 
              onClick={() => {
                setSelected(name);
              }}  
            > 
              <ListItem className="mt-2" selected={name===selected}>
                <ListItemPrefix>{icon}</ListItemPrefix>
                <span className=''>{name}</span>
              </ListItem>
            </Link>
          );  
        })}
      </List>
    </Card> 
  );
};

export default SideNav;
