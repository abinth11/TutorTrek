import React, { useEffect, useState } from "react";
import {
  getAllInstructorRequests,
  acceptInstructorRequest,
} from "../../../../api/endpoints/admin/instructorManagement";
import { toast } from "react-toastify";
import Modal from "../../../common/Modal";
const ViewInstructorRequests: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const [id, setId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleApiCall = async () => {
    try {
      const response = await getAllInstructorRequests();
      setRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleApiCall();
  }, []);

  const acceptRequest = async (id: string) => {
    try {
      const response = await acceptInstructorRequest(id);
      toast.success(response?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error: any) {
      toast.error(error.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleReject = (id: string) => {
    setId(id);
    setOpen(true);
  };

  return (
    <ul role='list' className='divide-y divide-gray-100'>
      {open && <Modal open={open} setOpen={setOpen} id={id} />}
      {requests?.map((person: any) => (
        <li key={person?._id} className='flex justify-between gap-x-6 py-5'>
          <div className='flex gap-x-4'>
            <img
              className='h-12 w-12 flex-none rounded-full bg-gray-50'
              src={
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
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
            <p className='text-sm leading-6 text-gray-900'>{person?.role}</p>
            {person?.lastSeen ? (
              <p className='mt-1 text-xs leading-5 text-gray-500'>
                Last seen{" "}
                <time dateTime={person?.lastSeenDateTime}>
                  {person?.lastSeen}
                </time>
              </p>
            ) : (
              <div className='mt-1 flex items-center gap-x-1.5'>
                <div className='flex-none rounded-full bg-emerald-500/20 p-1'>
                  <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                </div>
                <p className='text-xs leading-5 text-gray-500'>Online</p>
              </div>
            )}
          </div>
          <div className='flex gap-x-4'>
            <button
              onClick={() => acceptRequest(person?._id)}
              className='p-1 m-3 rounded-md bg-green-600 text-white w-20 focus:outline-none focus:ring-2 focus:ring-green-600 hover:bg-green-700 hover:shadow-md'
            >
              Accept
            </button>
            <button
              onClick={() => {
                handleReject(person._id);
              }}
              className='p-1 m-3 rounded-md bg-red-600 text-white w-20 focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-red-700 hover:shadow-md'
            >
              Reject
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ViewInstructorRequests;
