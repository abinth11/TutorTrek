import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "./components/common/error-element";
import { Student, Admin } from "./App";
import { Instructor } from "./App";
import InstructorDashboard from "./components/pages/instructors/instructor-dash-board";
import StripeContainer from "./components/pages/payment-stripe/stripe-container";
import AddCategory from "./components/pages/categories/add-category";
import EditCategory from "./components/pages/categories/edit-category";
import ListCategories from "./components/pages/categories/list-category";
import DashHome from "./components/pages/student-dash/dash-home";
import InstructorChannels from "./components/pages/channel/instructor-channels";

const LazyListCourse = lazy(
  () => import("./components/pages/course-pages/list-course")
);

const LazyInstructorsListing = lazy(
  () => import("./components/pages/instructors/list-all-instructors")
);

const LazyStudentDash = lazy(
  () => import("./components/pages/student-dash/user-dashboard")
);

const LazyInstructorIndex = lazy(
  () =>
    import("./components/pages/instructor-management/view-instructors-index")
);

const LazyStudents = lazy(
  () => import("./components/pages/student-management/students-tab")
);

const LazyCategories = lazy(
  () => import("./components/pages/categories/category-page")
);

const LazyViewCourse = lazy(
  () => import("./components/pages/course-pages/view-course")
);

const LazyWatchLesson = lazy(
  () => import("./components/pages/course-pages/watch-lesson")
);

const LazyAddCourse = lazy(
  () => import("./components/pages/add-course/add-course-form")
);

const LazyViewLesson = lazy(
  () => import("./components/pages/add-lesson/view-lessons")
);

const LazyListCourseInstructors = lazy(
  () => import("./components/pages/add-lesson/list-course-for-instructors")
);

const LazyEditLesson = lazy(
  () => import("./components/pages/add-lesson/edit-lesson")
);

const LazyEditCourse = lazy(
  () => import("./components/pages/add-course/edit-course")
);

const LazyMyStudents = lazy(
  () => import("./components/pages/instructors/my-students")
);

const LazyInstructorProfile = lazy(
  () => import("./components/pages/instructors/insructor-profile")
);

const LazyViewInstructor = lazy(
  () => import("./components/pages/instructors/view-instructor")
);

const LazyStudentProfile = lazy(
  () => import("./components/pages/student-dash/my-profile")
);

const LazyStudentCourses = lazy(
  () => import("./components/pages/student-dash/my-courses")
);

const LazyStudentHomePage = lazy(
  () => import("./components/pages/students/student-home-page")
);

const LazyStudentLogin = lazy(
  () => import("./components/pages/students/student-login-page")
);
const LazyStudentRegister = lazy(
  () => import("./components/pages/students/student-registration-page")
);
const LazyInstructorLogin = lazy(
  () => import("./components/pages/instructors/instructor-login-page")
);
const LazyInstructorRegister = lazy(
  () => import("./components/pages/instructors/instructor-register-page")
);
const LazyAdminHome = lazy(
  () => import("./components/pages/admin/admin-home-page")
);
const LazyInstructorRequests = lazy(
  () =>
    import("./components/pages/instructor-management/viewInstructor-requests")
);
const LazyViewMoreInstructorRequest = lazy(
  () =>
    import(
      "./components/pages/instructor-management/view-more-instructor-request"
    )
);
const LazyViewBlockedInstructors = lazy(
  () =>
    import("./components/pages/instructor-management/view-blocked-instructors")
);

const LazyCommunity = lazy(
  () => import("./components/pages/community/community-home")
);

const LazyAboutUs = lazy(() => import("./components/pages/about/about-us"));

const LazyContactPage = lazy(
  () => import("./components/pages/contact/contact-us")
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
      {
        path: "/community",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyCommunity />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyAboutUs />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyContactPage />
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
