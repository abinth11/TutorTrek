import React from 'react';
import StudentLoginPage from './components/pages/students/StudentLoginPage';
import StudentRegistrationPage from './components/pages/students/StudentRegistrationPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const App: React.FC = () => {
  return (
    <div  className="bg-gray-100" >
      <StudentLoginPage/>
      <StudentRegistrationPage/>
      <ToastContainer/>
    </div>
    
  );
};

export default App;
