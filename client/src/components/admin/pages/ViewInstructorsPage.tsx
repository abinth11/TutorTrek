import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from '@material-tailwind/react';
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';

function ViewInstructorsPage() {
  const [activeTab, setActiveTab] = useState('app');

  const handleTabChange = (tabValue:string) => {
    setActiveTab(tabValue);
  };

  return (
    <div className="pt-6">
      <Card className="mx-3 mb-6 lg:mx-4 justify-center">
        <CardBody className="p-2">
          <div className="mb-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* ... */}
            </div>
          </div>
          <div className="w-96 bg-gray-100 rounded-lg">
            <Tabs value={activeTab} onChange={handleTabChange}>
              <TabsHeader className="justify-end">
                <Tab value="app">
                  <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                  App
                </Tab>
                <Tab value="message">
                  <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                  Message
                </Tab>
                <Tab value="settings">
                  <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                  Settings
                </Tab>
              </TabsHeader>
              {/* Content for each tab */}
            </Tabs>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ViewInstructorsPage;
