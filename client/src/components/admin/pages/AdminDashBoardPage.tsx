import { Routes, Route } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import {
  DashboardNavbar,
  Footer,
} from "../widgets/layout";
import {
  Cog6ToothIcon,
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import AdminHomePage from "./AdminHomePage";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/dashboard",
        element: <AdminHomePage />,
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "Instructors",
        path: "/instructors",
        element: <AdminHomePage />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Students",
        path: "/students",
        element: <AdminHomePage />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <AdminHomePage />,
      },
    ],
  },
];

export function Dashboard() {
  return (
    <div className='min-h-screen bg-blue-gray-50/50'>
      <div className='p-4 xl:ml-80'>
        <DashboardNavbar />
        {/* <Configurator /> */}
        <IconButton
          size='lg'
          color='white'
          className='fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10'
          ripple={false}
        >
          <Cog6ToothIcon className='h-5 w-5' />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "admin" &&
              pages.map(({ path, element }) => (
                <Route path={path} element={element} />
              ))
          )}
        </Routes>
        <div className='text-blue-gray-600'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
