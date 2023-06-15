import React, { useState } from "react";
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { FaBan, FaEye } from "react-icons/fa";

const TopNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState("app");

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <Card className='mx-3 mb-5 lg:mx-4 justify-center items-center'>
      <CardBody className='p-2'>
        <div className='w-96 bg-gray-100 rounded-lg'>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <TabsHeader className='z-20'>
              <Tab value='app'>
                <FaEye className='-mt-1 mr-2 inline-block h-5 w-5' />
                View
              </Tab>
              <Tab value='message'>
                <UserPlusIcon className='-mt-0.5 mr-2 inline-block h-5 w-5' />
                Requests
              </Tab>
              <Tab value='settings'>
                <FaBan className='-mt-1 mr-2 inline-block h-5 w-5' />
                Blocked
              </Tab>
            </TabsHeader>
            {/* Content for each tab */}
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopNav;
