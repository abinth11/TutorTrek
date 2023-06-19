import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiFillBook, AiOutlinePlus } from 'react-icons/ai';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const InstructorSideNav:React.FC = () => {
  return (
    <nav className="bg-white h-screen w-64 flex flex-col justify-between">
      <div className="p-4">
        {/* <Link to="/" className="text-xl font-bold">
          Instructor Dashboard
        </Link> */}
      </div>
      <ul className="py-4">
        <li>
          <Link
            to="/"
            className="flex items-center py-2 px-4 hover:bg-gray-200"
          >
            <AiFillHome className="mr-2" />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/courses"
            className="flex items-center py-2 px-4 hover:bg-gray-200"
          >
            <AiFillBook className="mr-2" />
            View Courses
          </Link>
        </li>
        <li>
          <Link
            to="/add-course"
            className="flex items-center py-2 px-4 hover:bg-gray-200"
          >
            <AiOutlinePlus className="mr-2" />
            Add Course
          </Link>
        </li>
        {/* Add more menu items here */}
      </ul>
      <div className="p-4">
        <Link to="/logout" className="text-red-500">
          <RiLogoutBoxRLine className="mr-2" />
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default InstructorSideNav;
