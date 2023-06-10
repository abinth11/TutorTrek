import React from 'react';
import StudentLoginPage from './components/students/pages/StudentLoginPage';
import StudentRegistrationPage from './components/students/pages/StudentRegistrationPage';
import StudentHeader from './components/students/partials/StudentHeader';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div  className="bg-gray-100" >
      <StudentHeader/>
      <StudentLoginPage/>
      <StudentRegistrationPage/>
      <ToastContainer/>
    </div>
    
  );
};

export default App;
