import { createBrowserRouter } from "react-router-dom";
import StudentLoginPage from "./components/students/pages/StudentLoginPage";
import StudentRegistrationPage from "./components/students/pages/StudentRegistrationPage";
import StudentHomePage from "./components/students/pages/StudentHomePage";
import InstructorRegistrationPage from "./components/instructors/pages/InstructorRegisterPage";
import InstructorLoginPage from "./components/instructors/pages/InstructorLoginPage";
import ErrorElement from "./components/common/ErrorElement";
import AdminLoginPage from "./components/admin/pages/AdminLoginPage";
import AdminHomePage from "./components/admin/pages/AdminHomePage";
import Dashboard from "./components/admin/pages/AdminDashBoardPage";
import ViewInstructorsPage from "./components/admin/pages/InstructorManagement/ViewInstructorsIndex";
import { Student,Admin } from "./App";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Student />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <StudentHomePage />,
      },
      {
        path: "/login",
        element: <StudentLoginPage />,
      },
      {
        path: "/register",
        element: <StudentRegistrationPage />,
      },
      {
        path:"/instructors/login",
        element:<InstructorLoginPage/>
      },
      {
        path:"/instructors/register",
        element:<InstructorRegistrationPage/>
      }
    ]
  },
  {
    path:"admin",
    element:<Admin/>,
    errorElement:<ErrorElement/>,
    children:[
      {
        path:"admin/",
        element:<Dashboard/>
      },
      {
        path:"dashboard",
        element:<AdminHomePage/>
      },
      {
        path:"instructors",
        element:<ViewInstructorsPage/>
      },
      {
        path:"login",
        element:<AdminLoginPage/>
      }
    ]
  }
]);
export default AppRouter;
