import React, { useState } from "react";
import TopNav from "../../widgets/layout/TopNav";
import ViewInstructorRequests from "./ViewInstructorRequests";
import ViewInstructors from "./ViewInstructors";
import ViewBlockedInstructors from "./ViewBlockedInstructors";
const ViewInstructorsIndex: React.FC = () => {
  const [activeTab, setActiveTab] = useState("view");

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "view":
        return <ViewInstructors />;
      case "requests":
        return <ViewInstructorRequests />;
      case "blocked":
        return <ViewBlockedInstructors />;
      default:
        return null;
    }
  };

  return (
    <div className='pt-6'>
      <TopNav activeTab={activeTab} setActiveTab={handleTabChange} />
      <div className='p-10 m-5 shadow-lg rounded-lg bg-white'>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ViewInstructorsIndex;
