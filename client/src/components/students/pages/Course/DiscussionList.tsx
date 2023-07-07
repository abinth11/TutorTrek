import React from "react";
import useTimeAgo from "../../../../hooks/useTimeAgo";
import { BiMessageRoundedDots } from "react-icons/bi";
import { MdOutlineMoreVert } from "react-icons/md";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

interface DiscussionListProps {
  name: string;
  content: string;
  profileUrl: string;
  date: string;
}

const MenuBar: React.FC = () => {
  return (
    <Menu placement='left-start'>
      <MenuHandler>
        <button>
          <MdOutlineMoreVert className=' text-customFontColorBlack text-xl mr-3' />
        </button>
      </MenuHandler>
      <MenuList>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
  );
};

const DiscussionListEl: React.FC<DiscussionListProps> = ({
  name,
  content,
  profileUrl,
  date,
}) => {
  const calculateTimeAgo = useTimeAgo();
  return (
    <li className='border-b mt-3 border-gray-300 p-6'>
      <div className='flex justify-between'>
        <div className='flex'>
          <img className='w-12 h-12' src={profileUrl} alt='image' />
          <div className='ml-2'>
            <h2 className='font-semibold text-customFontColorBlack'>{name}</h2>
            <h2 className='font-light text-xs'>{calculateTimeAgo(date)}</h2>
            <br />
          </div>
        </div>
        <MenuBar />
      </div>
      <h2 className='mt-1'>{content}</h2>
      <div className='pt-1'>
        <button className='flex items-center text-customFontColorBlack hover:text-blue-gray-400'>
          <BiMessageRoundedDots className='text-2xl' />
          <span className='ml-1'>0 Replies</span>
        </button>
      </div>
    </li>
  );
};

export default DiscussionListEl;
