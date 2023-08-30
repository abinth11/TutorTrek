import React,{useState} from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { clearToken } from "../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_AVATAR } from "../../constants/common";
import { selectStudent } from "../../redux/reducers/studentSlice";
import LogoutConfirmationModal from "./student-logout-modal";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  // {
  //   label: "Inbox",
  //   icon: InboxArrowDownIcon,
  // },
  {
    label: "Settings",
    icon: Cog6ToothIcon,
  },
  // {
  //   label: "Help",
  //   icon: LifebuoyIcon,
  // },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

export default function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector(selectStudent);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState<boolean>(false);


  const handleAction = (action: string) => {
    switch (action) {
      case "My Profile":
        navigate("/dashboard/my-profile");
        break;
      case "Settings":
        navigate("#");
        break;
      case "Inbox":
        break;
      case "Help":
        break;
      case "Sign Out":
        setLogoutConfirmationOpen(true);
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    setTimeout(()=>{
      dispatch(clearToken());
      navigate("/");
    },2000)
  };
  

  return (
    <>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
        <MenuHandler>
          <Button
            variant='text'
            color='blue-gray'
            className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
          >
            <Avatar
              variant='circular'
              size='sm'
              alt='candice wu'
              className='border border-blue-500 p-0.5'
              src={student.studentDetails?.profilePic?.url || USER_AVATAR}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className='p-1'>
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={key}
                onClick={() => handleAction(label)}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as='span'
                  variant='small'
                  className='font-normal'
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <LogoutConfirmationModal
        open={logoutConfirmationOpen}
        setOpen={setLogoutConfirmationOpen}
        onConfirmLogout={handleLogout}
      />
    </>
  );
}
