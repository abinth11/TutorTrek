import React, { useEffect, useState } from "react";
import StudentHeader from "./components/partials/StudentHeader";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import AdminLoginPage from "./components/pages/admin/AdminLoginPage";
// import { Sidenav } from "./components/pages/admin/widgets/layout";
import { useSelector, useDispatch } from "react-redux";
import InstructorSideNav from "./components/pages/instructors/InstructorSideNav";
import InstructorHeader from "./components/pages/instructors/InstructorHeader";
import useIsOnline from "./hooks/useOnline";
import YouAreOffline from "./components/common/YouAreOffline";
import StudentFooter from "./components/partials/StudentFooter";
import { selectIsLoggedIn, selectUserType } from "./redux/reducers/authSlice";
import { selectIsFooterVisible } from "./redux/reducers/helperSlice";
import { fetchStudentData } from "./redux/reducers/studentSlice";
import SessionExpired from "./components/common/SessionExpiredModal";
import InstructorLoginPage from "./components/pages/instructors/InstructorLoginPage";
import { getInstructorDetails } from "./api/endpoints/instructor";
import { setDetails } from "./redux/reducers/instructorSlice";
import { AdminSideNav } from "./components/pages/admin/AdminSideNav";
import { toast } from "react-toastify";   

export const Student: React.FC = () => {
  const isOnline = useIsOnline();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const footerVisible = useSelector(selectIsFooterVisible);
  const dispatch = useDispatch();
  const isHeaderVisible = true;
  const user = useSelector(selectUserType);
  // usePreventBackButton(isLoggedIn);
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  const handleCloseSessionExpired = () => {
    setShowSessionExpired(false);
  };

  // Listen for the "sessionExpired" event from the interceptor
  useEffect(() => {
    const handleSessionExpired = () => {
      setShowSessionExpired(true);
    };

    window.addEventListener("sessionExpired", handleSessionExpired);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("sessionExpired", handleSessionExpired);
    };
  }, []);

  const headerClassName = `bg-gray-100 ${
    isHeaderVisible
      ? "opacity-100 transition-opacity duration-500 "
      : "opacity-0 "
  }`;

  useEffect(() => {
    if (isLoggedIn && user === "student") {
      dispatch(fetchStudentData());
    }
  }, [dispatch]);

  return (
    <>
      {showSessionExpired && (
        <SessionExpired
          show={showSessionExpired}
          onClose={handleCloseSessionExpired}
        />
      )}
      {isOnline ? (
        <div className='bg-white font-sans'>
          <div className={`${headerClassName}`}>
            <StudentHeader />
          </div>
          <Outlet />
          {footerVisible && <StudentFooter />}
        </div>
      ) : (
        <YouAreOffline />
      )}
    </>
  );
};

export const Instructor: React.FC = () => {
  const isOnline = useIsOnline();
  const user = useSelector(selectUserType);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const fetchInstructor = async () => {
    try {
      const response = await getInstructorDetails();
      dispatch(setDetails({details:response.data}))
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  useEffect(() => {
    fetchInstructor();
  }, []);

  return (
    <>
      {isOnline ? (
        isLoggedIn && user === "instructor" ? (
          <>
            <div className='fixed inset-x-0 top-0 flex flex-col font-sans'>
              <InstructorHeader />
              <div className='flex flex-1'>
                <div className='w-64 h-screen overflow-y-auto'>
                  <InstructorSideNav />
                </div>
                <div className='flex  flex-col flex-1'>
                  <div className='p-4 bg-customBlueShade overflow-y-scroll h-screen'>
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <InstructorLoginPage />
          </div>
        )
      ) : (
        <YouAreOffline />
      )}
    </>
  );
};

export const Admin: React.FC = () => {
  const isAdminLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUserType);
  const isOnline = useIsOnline();
  return (
    <>
      {isOnline ? (
        isAdminLoggedIn && user === "admin" ? (
          <div className='bg-gray-100  items-center  flex justify-center font-sans overflow-y-hidden'>
            <div className='w-80'>   
              <AdminSideNav />  
            </div>
            <div className='flex-1 pl-4 h-screen max-h-full overflow-y-scroll mt-5'>
              {/* Use 'h-screen' and 'max-h-full' to allow the container to take the full screen height */}
              <Outlet />
            </div>   
          </div>
        ) : (    
          <div className='bg-gray-100'>
            <AdminLoginPage />
          </div>
        )
      ) : (
        <YouAreOffline />
      )}
    </>
  );
};
