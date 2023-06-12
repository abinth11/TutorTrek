import React from "react";
import StudentHeader from "./components/students/partials/StudentHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
const App: React.FC = () => {
  return (
    <div className='bg-gray-100'>
    
        <StudentHeader />
        <Outlet />
        <ToastContainer />
    </div>
  );
};

export default App;
