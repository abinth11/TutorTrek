import React from "react";
import StudentHeader from "./components/students/partials/StudentHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import AdminLoginPage from "./components/admin/pages/AdminLoginPage";
import { Sidenav } from "./components/admin/widgets/layout";
import { routes } from "./components/admin/pages/AdminDashBoardPage";
import { useSelector } from "react-redux";
import { selectIsAdminLoggedIn } from "./redux/reducers/adminAuthSlice";
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
  const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);
  return (
    <>
      {isAdminLoggedIn ? (
        <div className='bg-gray-100 flex '>
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
