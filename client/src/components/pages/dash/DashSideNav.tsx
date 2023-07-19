import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { PowerIcon } from "@heroicons/react/24/solid";
import { MdDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { clearToken } from "../../../redux/reducers/authSlice";
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
    path: "/dashboard/settings",
    name: "Settings",
    icon: <FiSettings className='h-6 w-6' />

  },
  {
    path: "",
    name: "Log Out",
    icon: <PowerIcon className='h-6 w-6 ' />
  },
];

const SideNav: React.FC = () => {
  const [selected, setSelected] = useState<string>("Dashboard");
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearToken());
    // location.reload();
  };
  return (
    <Card className='fixed top-0  h-full w-full max-w-[17rem] p-3 rounded-none'>
      <div className=' flex items-center gap-4  pl-3'>
        <Link to='/'>
          <img className='h-12 w-15' src={APP_LOGO} alt='brand' />
        </Link>
        <Typography variant='h6' color='blue-gray'>
          TutorTrek
        </Typography>
      </div>
      <List>
        <hr className='my-2 border-blue-gray-50' />
        {NavItems.map(({ icon, name, path }) => {
          return (
            <Link
              to={path} 
              onClick={() => {
                setSelected(name);
              }}
            > 
              <ListItem selected={name===selected}>
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
