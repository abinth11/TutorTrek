import React, {useCallback } from "react";
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { FaBan, FaEye } from "react-icons/fa";

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tabValue: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ activeTab, setActiveTab }) => {
  const handleTabChange = useCallback(
    (tabValue: string) => {
      setActiveTab(tabValue);
    },
    [setActiveTab]
  );
  return (
    <Card className="mx-3 mb-5 lg:mx-4 justify-center items-center">
      <CardBody className="p-2">
        <div className="w-96 bg-gray-100 rounded-lg">
          <Tabs value={activeTab}>
            <TabsHeader className="z-20 ">
              <div
                className="w-full flex justify-center"
                onClick={() => handleTabChange("view")}
              >
                <Tab value="view" className="w-full">
                  <FaEye className="-mt-1 mr-2 inline-block h-5 w-5" />
                  View
                </Tab>
              </div>
              <div
                className="w-full flex justify-center"
                onClick={() => handleTabChange("requests")}
              >
                <Tab value="requests" className="w-full">
                  <UserPlusIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                  Requests
                </Tab>
              </div>
              <div
                className="w-full flex justify-center"
                onClick={() => handleTabChange("blocked")}
              >
                <Tab value="blocked" className="w-full">
                  <FaBan className="-mt-1 mr-2 inline-block h-5 w-5" />
                  Blocked
                </Tab>
              </div>
            </TabsHeader>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopNav;