import React,{ useState} from "react";
import {
  Button,
  Menu,    
  MenuHandler,
  MenuList,
  Avatar,       
  MenuItem,
  Typography
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import {UserCircleIcon} from "@heroicons/react/24/outline";
import { useSelector,useDispatch } from "react-redux";
import { selectInstructor } from "../../../redux/reducers/instructorSlice";
import { clearToken } from "../../../redux/reducers/authSlice";
import { clearDetails } from "../../../redux/reducers/instructorSlice";
import { USER_AVATAR } from "../../../constants/common";
import { useNavigate } from "react-router-dom";


const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },   
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

export function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const instructor = useSelector(selectInstructor)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAction = (action: string) => {
    switch (action) {
      case "My Profile":
        navigate("/instructors/view-profile");
        break;
      case "Settings":
        break;
      case "Inbox":
        break;
      case "Help":  
        break;
      case "Sign Out":
        dispatch(clearToken());
        dispatch(clearDetails())
        navigate("/instructors/login");
        break;
      default:
        break;
    }
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src={instructor.instructorDetails?.profileUrl||USER_AVATAR}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">{profileMenuItems?.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
           return (
             <MenuItem
               key={label}
              onClick={()=>handleAction(label)}
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
                 as="span"
                 variant="small"
                 className="font-normal"
                 color={isLastItem ? "red" : "inherit"}
               >
                 {label}
               </Typography>
             </MenuItem>
           );
        })}
      </MenuList>
    </Menu>
  );
}
