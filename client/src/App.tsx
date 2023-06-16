import React from "react";
import StudentHeader from "./components/students/partials/StudentHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import AdminLoginPage from "./components/admin/pages/AdminLoginPage";
import { Sidenav } from "./components/admin/widgets/layout";
import { routes } from "./components/admin/pages/AdminDashBoardPage";
export const Student: React.FC = () => {
  return (
    <div className='bg-gray-100'>
      <StudentHeader />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export const Admin: React.FC = () => {
  const admin = true;
  return (
    <>
      {admin ? (
        <div className='bg-gray-100 flex h-screen'>
          <div className='w-80 '>
            <Sidenav routes={routes} brandImg={"/img/logo-ct-dark.png"} />
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
      )}
    </>
  );
};
