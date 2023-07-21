import React, { useState, useEffect } from "react";
import RevenueChart from "./RevenueChart";
import TrendingCoursesChart from "./TrendingChart";
import EnrollmentAndProgressChart from "./ProgressChart";
import { Typography } from "@material-tailwind/react";
import { FaRupeeSign } from "react-icons/fa";
import {
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { getDashboardData } from "../../../api/endpoints/dashboardData";
import { DashData } from "../../../api/types/apiResponses/apiResponseDash";
import { formatToINR } from "../../../utils/helpers";

const AdminHomePage: React.FC = () => {
  const [dashboardData, seDashboardData] = useState<DashData | null>(null);
  const fetchDashboardDetails = async () => {
    try {
      const response = await getDashboardData();
      seDashboardData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDashboardDetails();
  }, []);
  const data = [
    { month: "Jan", revenue: 1000, coursesAdded: 350, coursesEnrolled: 330 },
    { month: "Feb", revenue: 1500, coursesAdded: 370, coursesEnrolled: 340 },
    { month: "Mar", revenue: 1200, coursesAdded: 550, coursesEnrolled: 350 },
    { month: "Apr", revenue: 1000, coursesAdded: 350, coursesEnrolled: 330 },
    { month: "May", revenue: 1500, coursesAdded: 370, coursesEnrolled: 340 },
    { month: "June", revenue: 1200, coursesAdded: 550, coursesEnrolled: 350 },
    { month: "July", revenue: 1000, coursesAdded: 350, coursesEnrolled: 330 },
    { month: "august", revenue: 1500, coursesAdded: 370, coursesEnrolled: 340 },
    { month: "sep", revenue: 1200, coursesAdded: 550, coursesEnrolled: 350 },
    // More data points...
  ];

  const dataCourse = [
    { courseName: "Course A", enrollmentCount: 500 },
    { courseName: "Course B", enrollmentCount: 480 },
    { courseName: "Course C", enrollmentCount: 450 },
    { courseName: "Course D", enrollmentCount: 420 },
    { courseName: "Course E", enrollmentCount: 400 },
    // More data points...
  ];

  const pdata = [
    { courseName: "Course A", enrollmentCount: 500, averageProgress: 400 },
    { courseName: "Course B", enrollmentCount: 480, averageProgress: 80 },
    { courseName: "Course C", enrollmentCount: 450, averageProgress: 90 },
    { courseName: "Course D", enrollmentCount: 420, averageProgress: 60 },
    { courseName: "Course E", enrollmentCount: 400, averageProgress: 70 },
    // More course data...
  ];

  return (
    <div className=' pl-5 pr-5 '>
      <div className='ml-3 mr-3 flex items-center justify-between'>
        <div className='bg-white flex-1 rounded-md pb-5 pr-5 pl-5 border shadow-sm border-gray-200 mr-4'>
          <div className='flex items-center '>
            <FaRupeeSign size={26} className='text-green-500 mr-3' />
            <div>
              <Typography variant='h6' color='blue-gray' className='pt-2 '>
                Monthly revenue
              </Typography>
              <Typography variant='body' color='gray'>
                {formatToINR(dashboardData?.monthlyRevenue??0)}
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
        <RevenueChart data={data} />
      </div>
      <div className='flex items-center '>
        <div className='py-5 px-4 w-6/12'>
          <Typography variant='h4' color='blue-gray' className='mb-4'>
            Trending Courses
          </Typography>
          <TrendingCoursesChart data={dataCourse} />
        </div>
        <div className='px-4 w-6/12'>
          <Typography variant='h4' color='blue-gray' className='mb-4'>
            Top Instructors
          </Typography>
          <EnrollmentAndProgressChart data={pdata} />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
