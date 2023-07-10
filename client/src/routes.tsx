import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import StudentLoginPage from "./components/pages/students/StudentLoginPage";
import StudentRegistrationPage from "./components/pages/students/StudentRegistrationPage";
import StudentHomePage from "./components/pages/students/StudentHomePage";
import InstructorRegistrationPage from "./components/pages/instructors/InstructorRegisterPage";
import InstructorLoginPage from "./components/pages/instructors/InstructorLoginPage";
import ErrorElement from "./components/common/ErrorElement";
import AdminLoginPage from "./components/pages/admin/AdminLoginPage";
import AdminHomePage from "./components/pages/admin/AdminHomePage";
import Dashboard from "./components/pages/admin/AdminDashBoardPage";
import ViewInstructorsIndex from "./components/pages/InstructorManagement/ViewInstructorsIndex";
import ViewInstructorRequests from "./components/pages/InstructorManagement/ViewInstructorRequests";
import ViewBlockedInstructors from "./components/pages/InstructorManagement/ViewBlockedInstructors";
import { Student, Admin } from "./App";
import ViewMoreInstructorRequest from "./components/pages/InstructorManagement/ViewMoreInstructorRequest";
import { Instructor } from "./App";
import InstructorDashboard from "./components/pages/instructors/InstructorDashboard";
import AddCourse from "./components/pages/add-course/AddCourse";
import ViewCourseStudent from "./components/pages/Course/ViewCourse";
import WatchLessons from "./components/pages/Course/WatchLessons";
import ListCourseForInstructors from "./components/pages/add-lessons/ListCourseForIstructors";
import ViewLessons from "./components/pages/add-lessons/ViewLessons";
import StripeContainer from "./components/pages/payment-stripe/StripeContainer";
const LazyListCourse = lazy(
  () => import("./components/pages/Course/ListCourse")
);

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
        path: "/courses",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyListCourse />
          </Suspense>
        ),
      },
      {
        path: "/courses/:courseId",
        element: <ViewCourseStudent />,
      },
      {
        path: "/courses/:courseId/watch-lessons/:lessonId",
        element: <WatchLessons />,
      },
    ],
  },{
    path:"courses/:courseId/payment",
    element:<StripeContainer/>
  },
  {
    path: "/login",
    element: (<StudentLoginPage />),
  },
  {
    path: "/register",
    element: <StudentRegistrationPage />,
  },
  {
    path: "/instructors/login",
    element: <InstructorLoginPage />,
  },
  {
    path: "/instructors/register",
    element: <InstructorRegistrationPage />,
  },
  {
    path: "admin",
    element: <Admin />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "admin/",
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <AdminHomePage />,
      },
      {
        path: "instructors",
        element: <ViewInstructorsIndex />,
        children: [
          {
            path: "requests",
            element: <ViewInstructorRequests />,
          },
          {
            path: "requests/:id",
            element: <ViewMoreInstructorRequest />,
          },
          {
            path: "blocked",
            element: <ViewBlockedInstructors />,
          },
        ],
      },
      {
        path: "login",
        element: <AdminLoginPage />,
      },
    ],
  },
  {
    path: "instructors",
    element: <Instructor />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/instructors",
        element: <InstructorDashboard />,
      },
      {
        path: "add-course",
        element: <AddCourse />,
      },
      {
        path: "view-course",
        element: <ListCourseForInstructors />,
      },
      {
        path:"view-lessons/:courseId",
        element:<ViewLessons/>,
      }
    ],
  },
]);
export default AppRouter;
