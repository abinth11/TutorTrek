import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,     
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import BlockedStudents from "./blocked-students";
import ViewStudents from "./view-students";

interface TabData {
  label: string;
  value: string;
  icon: React.ElementType;
}

export default function StudentsTab() {
  const [activeTab, setActiveTab] = useState("all");
  const [updated,setUpdated] = useState(false)

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const data: TabData[] = [
    {
      label: "All students",
      value: "all",
      icon: Square3Stack3DIcon,
    },
    {
      label: "Blocked",
      value: "blocked",
      icon: UserCircleIcon,
    },
  ];

  const tabComponents: { [key: string]: JSX.Element } = {
    all: <ViewStudents updated={updated} setUpdated={setUpdated}/>, // Replace with the component you want to show for "All students"
    blocked: <BlockedStudents updated={updated} setUpdated={setUpdated} />, // Replace with the component you want to show for "Blocked"
    // Add more components for other tabs if needed
  };

  return (
    <Tabs value={activeTab} onChange={handleTabChange} className="p-0.5">
      <TabsHeader className="ml-3.5 mr-3.5">  
        {data.map(({ label, value, icon: Icon }) => (
          <Tab key={value} value={value} >
            <div className="flex items-center  gap-2">
              <Icon className="w-5 h-5" />
              {label}
            </div> 
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value }) => (
          <TabPanel key={value} value={value} className="pt-5">
            {tabComponents[value]}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
