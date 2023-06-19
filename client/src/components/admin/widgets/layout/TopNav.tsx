import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { FaBan, FaEye } from "react-icons/fa";

const TopNav: React.FC = () => {

  return (
    <Card className="mx-3 mb-5 lg:mx-4 justify-center items-center">
      <CardBody className="p-2">
        <div className="w-96 bg-gray-100 rounded-lg">
          <Tabs >
            <TabsHeader className="z-20">
              <div className="w-full flex justify-center">
                <NavLink to="/admin/instructors" className="w-full" >
                  <FaEye className="-mt-1 mr-2 inline-block h-5 w-5" />
                  View
                </NavLink>
              </div>
              <div className="w-full flex justify-center">
                <NavLink to="/admin/instructors/requests" className="w-full" >
                  <UserPlusIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                  Requests
                </NavLink>
              </div>
              <div className="w-full flex justify-center">
                <NavLink to="/admin/instructors/blocked" className="w-full" >
                  <FaBan className="-mt-1 mr-2 inline-block h-5 w-5" />
                  Blocked
                </NavLink>
              </div>
            </TabsHeader>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopNav;

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
// } from "@material-tailwind/react";
// import {
//   Square3Stack3DIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
// } from "@heroicons/react/24/solid";

// export default function TopNav() {
//   const data = [
//     {
//       label: "View",
//       value: "view",
//       icon: Square3Stack3DIcon,
//       path:'/admin/instructors'
//     },
//     {
//       label: "Requests",
//       value: "requests",
//       icon: UserCircleIcon,
//       path:'/admin/instructors/requests'

//     },
//     {
//       label: "Blocked",
//       value: "blocked",
//       icon: Cog6ToothIcon,
//       path:'/admin/instructors/blocked'
//     },
//   ];

//   return (
//     <Tabs value="view">
//       <TabsHeader>
//         {data.map(({ label, value, icon,path}) => (
//           <Tab key={value} value={value}>
//             <div className="flex items-center gap-2">
//               {React.createElement(icon, { className: "w-5 h-5" })}
//               {label}
//             </div>           
//           </Tab>
//         ))}
//       </TabsHeader>
//       {/* <TabsBody>
//         {data.map(({ value, desc }) => (
//           <TabPanel key={value} value={value}>
//             {desc}
//           </TabPanel>
//         ))}
//       </TabsBody> */}
//     </Tabs>
//   );
// }
