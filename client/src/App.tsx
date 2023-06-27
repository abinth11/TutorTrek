import React,{useState,useEffect} from "react";
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
import StudentFooter from "./components/students/partials/StudentFooter";
import { selectIsLoggedIn } from "./redux/reducers/authSlice";
import StudentLoginPage from "./components/students/pages/StudentLoginPage";
import { throttle } from 'lodash';

export const Student: React.FC = () => {
  const isOnline = useIsOnline();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const isStudentLoggedIn = true; // Assuming this value is set correctly

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollPos = window.pageYOffset;
      const scrollThreshold = 8;

      if (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > scrollThreshold) {
        setIsHeaderVisible(true);
      } else if (prevScrollPos < currentScrollPos && currentScrollPos - prevScrollPos > scrollThreshold) {
        setIsHeaderVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    }, 200); // Adjust the time interval (in milliseconds) as needed

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const headerClassName = `bg-gray-100 ${
    isHeaderVisible ? 'opacity-100 transition-opacity duration-500 ' : 'opacity-0 '
  }`;
  return (
    <>
      {isOnline ? (
        isStudentLoggedIn ? (
          <div className="bg-gray-100 ">
            <div className={`${headerClassName} `}>
            <StudentHeader />
            </div>
            <Outlet />
            <ToastContainer />
            <StudentFooter />
          </div>
        ) : (
          <div className="bg-gray-100">
          <StudentLoginPage />
          </div>
        )
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
        <>
          <div className='fixed inset-x-0 top-0 flex flex-col '>
            <InstructorHeader />
            <div className='flex flex-1'>
              <div className='w-64 h-screen overflow-y-auto'>
                <InstructorSideNav />
              </div>
              <div className='flex flex-col flex-1'>
                <div className='p-4 bg-customBlueShade overflow-y-scroll h-screen'>
                  <Outlet />
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </>
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
