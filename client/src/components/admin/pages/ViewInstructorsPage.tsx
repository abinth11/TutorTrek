import React from "react";
import TopNav from "../widgets/layout/TopNav";
import ViewInstructorRequests from "./ViewInstructorRequests";
const ViewInstructorsPage: React.FC = () => {
  return (
    <div className='pt-6'>
      <TopNav />
      <div className="p-10 m-5 shadow-lg rounded-lg bg-white">
      <ViewInstructorRequests/>
      </div>
    </div>
  );
};

export default ViewInstructorsPage;
