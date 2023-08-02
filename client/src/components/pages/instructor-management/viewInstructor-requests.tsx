import React, { useEffect, useState } from "react";
import {
  getAllInstructorRequests,
} from "../../../api/endpoints/instructor-management";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useTimeAgo from "../../../hooks/useTimeAgo";
import { InstructorApiResponse } from "../../../api/types/apiResponses/api-response-instructors";



const ViewInstructorRequests: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const calculateTimeAgo = useTimeAgo();

  const handleApiCall = async () => {
    try {
      const response = await getAllInstructorRequests();
      setRequests(response.data.data);
    } catch (error:any) {
      toast.error(error.data.message,{position:toast.POSITION.BOTTOM_RIGHT})
    }
  };

  useEffect(() => {
    handleApiCall();
  }, []);
  const totalPages = 10,currentPage =1

  return (
    <ul role='list' className=' divide-gray-100  '>
      {requests?.map((person: InstructorApiResponse) => (
        <Link
          to={`/admin/instructors/requests/${person._id}`}
          key={person?._id}
        >
          <li className='flex justify-between gap-x-6 gap-y-3 mt-3 p-3 py-5 rounded-md border bg-white border-gray-300'>
            <div className='flex gap-x-4'>
              <img
                className='h-12 w-12 flex-none rounded-full bg-gray-50'
                src={person.profilePic}
                alt=''
              />
              <div className='min-w-0 flex-auto'>
                <p className='text-sm font-semibold leading-6 text-gray-900'>
                  {`${person?.firstName} ${person?.lastName}`}
                </p>
                <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                  {person?.email}
                </p>
              </div>
            </div>
            <div className='hidden sm:flex sm:flex-col sm:items-end'>
                <p className='mt-1 text-xs leading-5 text-gray-500'>
                Application sent {calculateTimeAgo(person?.dateJoined)}
              </p>
            </div>
            <div className='flex gap-x-4'>
              <button
                className='p-1 m-3 rounded-md bg-blue-600 text-white w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-blue-700 hover:shadow-md'
              >
                View
              </button>
            </div>
          </li>
        </Link>
      ))} 
      {/* <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Button
          variant='outlined'
          color='blue-gray'
          size='sm'
          // onClick={goToPreviousPage}
          // disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className='flex items-center gap-2'>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <IconButton
                key={pageNumber}
                variant={pageNumber === currentPage ? "outlined" : "text"}
                color='blue-gray'
                size='sm'
                // onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </IconButton>
            )
          )}
        </div>
        <Button
          variant='outlined'
          color='blue-gray'
          size='sm'
          // onClick={goToNextPage}
          // disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </CardFooter> */}
    </ul>
  );
};
export default ViewInstructorRequests;
