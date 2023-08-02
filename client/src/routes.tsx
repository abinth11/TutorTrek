import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "./components/common/ErrorElement";
import { Student, Admin } from "./App";
import { Instructor } from "./App";
import InstructorDashboard from "./components/pages/instructors/InstructorDashboard";
import StripeContainer from "./components/pages/payment-stripe/StripeContainer";
import AddCategory from "./components/pages/categories/AddCategory";
import EditCategory from "./components/pages/categories/EditCategory";
import ListCategories from "./components/pages/categories/ListCategory";
import DashHome from "./components/pages/student-dash/DashHome";
import InstructorChannels from "./components/pages/channel/InstructorChannels";

const LazyListCourse = lazy(
  () => import("./components/pages/course/ListCourse")
); 

const LazyInstructorsListing = lazy(
  () => import("./components/pages/instructors/ListAllInstructors")
);

const LazyStudentDash = lazy(
  () => import("./components/pages/student-dash/UserDashboard")
);

const LazyInstructorIndex = lazy(
  () => import("./components/pages/instructor-management/ViewInstructorsIndex")
);

const LazyStudents = lazy(
  () => import("./components/pages/student-management/StudentsTab")
);

const LazyCategories = lazy(
  () => import("./components/pages/categories/Categories")
);
    
const LazyViewCourse = lazy(
  () => import("./components/pages/course/view-course")
);

const LazyWatchLesson = lazy(
  () => import("./components/pages/course/watch-lesson")
);

const LazyAddCourse = lazy(
  () => import("./components/pages/add-course/AddCourse")
);

const LazyViewLesson = lazy(
  () => import("./components/pages/add-lesson/ViewLessons")
);

const LazyListCourseInstructors = lazy(
  () => import("./components/pages/add-lesson/ListCourseForIstructors")
);

const LazyEditLesson = lazy(
  () => import("./components/pages/add-lesson/EditLesson")
);

const LazyEditCourse = lazy(
  () => import("./components/pages/add-course/EditCourse")
);

const LazyMyStudents = lazy(
  () => import("./components/pages/instructors/MyStudents")
);

const LazyInstructorProfile = lazy(
  () => import("./components/pages/instructors/InsructorProfile")
);

const LazyViewInstructor = lazy(
  () => import("./components/pages/instructors/ViewInstructor")
);

const LazyStudentProfile = lazy(
  () => import("./components/pages/student-dash/MyProfile")
);

const LazyStudentCourses = lazy(
  () => import("./components/pages/student-dash/MyCourses")
);

const LazyStudentHomePage = lazy(
  () => import("./components/pages/students/StudentHomePage")
);

const LazyStudentLogin = lazy(
  () => import("./components/pages/students/StudentLoginPage")
);
const LazyStudentRegister = lazy(
  () => import("./components/pages/students/StudentRegistrationPage")
);
const LazyInstructorLogin = lazy(
  () => import("./components/pages/instructors/InstructorLoginPage")
);
const LazyInstructorRegister = lazy(
  () => import("./components/pages/instructors/InstructorRegisterPage")
);
const LazyAdminHome = lazy(
  () => import("./components/pages/admin/AdminHomePage")
);
const LazyInstructorRequests = lazy(
  () => import("./components/pages/instructor-management/ViewInstructorRequests")
);
const LazyViewMoreInstructorRequest = lazy(
  () =>
    import("./components/pages/instructor-management/ViewMoreInstructorRequest")
);
const LazyViewBlockedInstructors = lazy(
  () => import("./components/pages/instructor-management/ViewBlockedInstructors")
);

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Student />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyStudentHomePage />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyViewCourse />
          </Suspense>
        ),
      },
      {
        path: "/courses/:courseId/watch-lessons/:lessonId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyWatchLesson />
          </Suspense>
        ),
      },
      {
        path: "/tutors",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyInstructorsListing />
          </Suspense>
        ),
      },
      {
        path: "/tutors/:tutorId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyViewInstructor />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyStudentDash />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <DashHome />,
      },
      {
        path: "my-courses",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyStudentCourses />
          </Suspense>
        ),
      },
      {
        path: "my-profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyStudentProfile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "courses/:courseId/payment",
    element: <StripeContainer />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyStudentLogin />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyStudentRegister />
      </Suspense>
    ),
  },
  {
    path: "/instructors/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyInstructorLogin />
      </Suspense>
    ),
  },
  {
    path: "/instructors/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyInstructorRegister />
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: <Admin />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <LazyAdminHome />
          </Suspense>
        ),
      },
      {
        path: "instructors",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <LazyInstructorIndex />
          </Suspense>
        ),
        children: [
          {
            path: "requests",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <LazyInstructorRequests />
              </Suspense>
            ),
          },
          {
            path: "requests/:id",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <LazyViewMoreInstructorRequest />
              </Suspense>
            ),
          },
          {
            path: "blocked",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <LazyViewBlockedInstructors />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "students",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyStudents />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyCategories />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: <ListCategories />,
          },
          {
            path: "add-category",
            element: <AddCategory />,
          },
          {
            path: "edit-category/:categoryId",
            element: <EditCategory />,
          },
        ],
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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyAddCourse />
          </Suspense>
        ),
      },
      {
        path: "view-course",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyListCourseInstructors />
          </Suspense>
        ),
      },
      {
        path: "edit-course/:courseId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyEditCourse />
          </Suspense>
        ),
      },
      {
        path: "view-lessons/:courseId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyViewLesson />
          </Suspense>
        ),
      },
      {
        path: "view-lessons/:courseId/edit-lesson/:lessonId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyEditLesson />
          </Suspense>
        ),
      },
      {
        path: "view-students",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyMyStudents />
          </Suspense>
        ),
      },
      {
        path: "view-profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyInstructorProfile />
          </Suspense>
        ),
      },
      {
        path: "view-channels",
        element: <InstructorChannels />,
      },
    ],
  },
]);
export default AppRouter;
