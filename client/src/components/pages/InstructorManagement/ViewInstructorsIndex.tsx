import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "../admin/widgets/layout/TopNav";
import ViewInstructors from "./ViewInstructors";
import CustomBreadCrumbs from "../../common/BreadCrumbs";
const ViewInstructorsIndex: React.FC = () => {
  const location = useLocation();
  return (
    <div className=''> 
      <TopNav  />  
      <div className="pl-5 pr-5 pt-3 ">
      <CustomBreadCrumbs  paths={location.pathname}/>
      {location.pathname === "/admin/instructors" && <ViewInstructors />}
      <Outlet />
      </div>
    </div>
  );
};

export default ViewInstructorsIndex;
