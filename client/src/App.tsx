import React from "react";
import StudentHeader from "./components/students/partials/StudentHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import AdminLoginPage from "./components/admin/pages/AdminLoginPage";
import { Sidenav } from "./components/admin/widgets/layout";
import { routes } from "./components/admin/pages/AdminDashBoardPage";
import { useSelector } from "react-redux";
import InstructorSideNav from "./components/instructors/partials/SideNav";
import { selectIsAdminLoggedIn } from "./redux/reducers/adminAuthSlice";
import InstructorHeader from "./components/instructors/partials/InstructorHeader";
import useIsOnline from "./hooks/useOnline";
import YouAreOffline from "./components/common/YouAreOffline";

export const Student: React.FC = () => {
  const isOnline = useIsOnline();
  return (
    <>
      {isOnline ? (
        <div className='bg-gray-100'>
          <StudentHeader />
          <Outlet />
          <ToastContainer />
        </div>
      ) : (
        <YouAreOffline />
      )}
    </>
  );
};

export const Instructor: React.FC = () => {
  const isOnline = useIsOnline();
  return (
    <>
      {isOnline ? (
        <div className='bg-customBlueShade'>
          <InstructorHeader />
          <InstructorSideNav/>
          <Outlet />
          <ToastContainer />
        </div>
      ) : (
        <YouAreOffline />
      )}
    </>
  );
};

export const Admin: React.FC = () => {
  const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);
  const isOnline = useIsOnline();
  return (
    <>
      {isOnline ? (
        isAdminLoggedIn ? (
          <div className='bg-gray-100 flex'>
            <div className='w-80'>
              <Sidenav routes={routes} brandImg='/img/logo-ct-dark.png' />
            </div>
            <div className='flex-1'>
              <Outlet />
              <ToastContainer />
            </div>
          </div>
        ) : (
          <div className='bg-gray-100'>
            <AdminLoginPage />
            <ToastContainer />
          </div>
        )
      ) : (
        <YouAreOffline />
      )}
    </>
  );
};
