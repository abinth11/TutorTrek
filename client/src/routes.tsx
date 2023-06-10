import { createBrowserRouter } from "react-router-dom";
import StudentLoginPage from "./components/students/pages/StudentLoginPage";
import StudentRegistrationPage from "./components/students/pages/StudentRegistrationPage";
import StudentHomePage from "./components/students/pages/StudentHomePage";
import ErrorElement from "./components/common/ErrorElement";
import App from "./App";
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    ],
  },
]);

export default AppRouter;
