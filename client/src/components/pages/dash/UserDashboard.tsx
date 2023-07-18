import React from "react";
import DashSideNav from "./DashSideNav";
import DashHeader from "./DashHeader";
import { Outlet } from "react-router-dom";

type Props = {};

const UserDashboard: React.FC = (props: Props) => {
  return (
    <div className='fixed inset-x-0 top-0 flex flex-col font-sans'>
      <DashHeader />
      <div className='flex flex-1'>
        <div className='w-64 h-screen overflow-y-auto scrollbar-thin'>
          <DashSideNav />
        </div>   
        <div className='flex flex-col flex-1 '>
          <div className='p-4  bg-customBlueShade overflow-y-scroll scrollbar-thin  pb-32 h-screen'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
