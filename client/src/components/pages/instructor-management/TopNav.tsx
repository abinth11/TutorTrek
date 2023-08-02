import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody, Tabs, TabsHeader} from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { FaBan, FaEye } from "react-icons/fa";

const TopNav: React.FC = () => {

  return (
    <Card className="mx-3 mb-5 lg:mx-4  justify-center items-center">
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