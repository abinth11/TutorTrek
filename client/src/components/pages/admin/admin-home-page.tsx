import React, { useState, useEffect } from "react";
import RevenueChart from "./revenue-chart";
import TrendingCoursesChart from "./trending-chart";
import CourseCategoryChart from "./progress-chart";
import { Typography } from "@material-tailwind/react";
import { FaRupeeSign } from "react-icons/fa";
import {
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import {
  getDashboardData,
  getGraphData,
} from "../../../api/endpoints/dashboard-data";
import {
  DashData,
  GraphData,
} from "../../../api/types/apiResponses/api-response-dash";
import { formatToINR } from "../../../utils/helpers";
import { toast } from "react-toastify";

const AdminHomePage: React.FC = () => {
  const [dashboardData, seDashboardData] = useState<DashData | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const fetchDashboardDetails = async () => {
    try {
      const response = await getDashboardData();
      seDashboardData(response.data);
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  const fetchGraphData = async () => {
    try {
      const response = await getGraphData();
      setGraphData(response.data);
    } catch (error) {
      toast.error("Something went wrong")
    }
  };
  useEffect(() => {
    fetchDashboardDetails();
    fetchGraphData();
  }, []);

  return (
    <div className=' pl-1'>
      <div className='ml-3 mr-3 flex items-center justify-between'>
        <div className='bg-white flex-1 rounded-md pb-5 pr-5 pl-5 border shadow-sm border-gray-200 mr-4'>
          <div className='flex items-center '>
            <FaRupeeSign size={26} className='text-green-500 mr-3' />
            <div>
              <Typography variant='h6' color='blue-gray' className='pt-2 '>
                Monthly revenue
              </Typography>
              <Typography variant='body' color='gray'>
                {formatToINR(dashboardData?.monthlyRevenue ?? 0)}
              </Typography>
            </div>
          </div>
        </div>
        <div className='bg-white flex-1 rounded-md pb-5 pr-5 pl-5 shadow-sm border border-gray-200 mr-4'>
          <div className='flex items-center'>
            <AiOutlineBook size={26} className='text-blue-500 mr-3' />
            <div>
              <Typography variant='h6' color='blue-gray' className='pt-2 '>
                Courses
              </Typography>
              <Typography variant='body' color='gray'>
                {dashboardData?.numberOfCourses}
              </Typography>
            </div>
          </div>
        </div>
        <div className='bg-white flex-1 rounded-md pb-5 shadow-sm pr-5 pl-5 border border-gray-200 mr-4'>
          <div className='flex items-center'>
            <AiOutlineUser size={26} className='text-yellow-500 mr-3' />
            <div>
              <Typography variant='h6' color='blue-gray' className='pt-2 '>
                Instructors
              </Typography>
              <Typography variant='body' color='gray'>
                {dashboardData?.numberInstructors}
              </Typography>
            </div>
          </div>
        </div>
        <div className='bg-white flex-1 rounded-md pb-5 shadow-sm pr-5 pl-5 border border-gray-200'>
          <div className='flex items-center'>
            <AiOutlineUsergroupAdd size={26} className='text-red-500 mr-3' />
            <div>
              <Typography variant='h6' color='blue-gray' className='pt-2 '>
                Students
              </Typography>
              <Typography variant='body' color='gray'>
                {dashboardData?.numberOfStudents}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className='py-5 px-4'>
        <Typography variant='h3' color='blue-gray' className='mb-4'>
          Monthly Revenue Chart
        </Typography>
        <RevenueChart data={graphData?.revenue ?? []} />
      </div>
      <div className='flex items-center '>
        <div className='py-5 px-4 w-6/12'>
          <Typography variant='h4' color='blue-gray' className='mb-4'>
            Trending Courses
          </Typography>
          <TrendingCoursesChart data={graphData?.trendingCourses??[]} />
        </div>
        <div className='px-4 w-6/12'>
          <Typography variant='h4' color='blue-gray' className='mb-4'>
            Categories
          </Typography>
          <CourseCategoryChart data={graphData?.courseByCategory??[]} />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
