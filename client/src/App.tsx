import React from 'react';
import StudentLoginPage from './components/pages/students/StudentLoginPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const App: React.FC = () => {
  return (
    <div  className="bg-gray-100" >
      <StudentLoginPage/>
      <ToastContainer/>
    </div>
    
  );
};

export default App;
