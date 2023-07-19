import  { useState,useEffect} from "react";
import {
  Button,
  Menu,    
  MenuHandler,
  MenuList,
  Avatar,       
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { getProfileUrl } from "../../api/endpoints/student";
import { toast } from "react-toastify";


// profile menu component
const profileMenuItems = [
  // {
  //   label: "My Profile",
  //   icon: UserCircleIcon,
  // },
  // {
  //   label: "Edit Profile",
  //   icon: Cog6ToothIcon,
  // },
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
  const [loading,setLoading] = useState(false)
  const [profileUrl,setProfileUrl]=useState<string>("")
  const fetchUrl = async () => {
    try {
      setLoading(true)
      const response = await getProfileUrl();
      setProfileUrl(response.data)
      setLoading(false)
    } catch (error:any) {
      toast.error(error?.data?.message, {  
        position: toast.POSITION.BOTTOM_RIGHT,   
      });
    }
  };
  useEffect(() => {
    fetchUrl();
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

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
            src={"../profile.jpg"}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {/* {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          // return (
          //   <MenuItem
          //     key={label}
          //     onClick={closeMenu}
          //     className={`flex items-center gap-2 rounded ${
          //       isLastItem
          //         ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
          //         : ""
          //     }`}
          //   >
          //     {React.createElement(icon, {
          //       className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
          //       strokeWidth: 2,
          //     })}
          //     <Typography
          //       as="span"
          //       variant="small"
          //       className="font-normal"
          //       color={isLastItem ? "red" : "inherit"}
          //     >
          //       {label}
          //     </Typography>
          //   </MenuItem>
          // );
        })} */}
      </MenuList>
    </Menu>
  );
}
