import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import {
  blockInstructors,
  getAllInstructors,
  unblockInstructors,
} from "../../../../api/endpoints/admin/instructorManagement";
import { toast } from "react-toastify";
import { formatDate } from "../../../../utils/helpers";
import BlockReasonModal from "./BlockReasonModal";

const TABLE_HEAD = ["Name", "Email", "Date Joined", "Status", "Actions", ""];

const ViewInstructors: React.FC = () => {
  const [instructors, setInstructors] = useState([]);
  const [open,setOpen] = useState(false)
  const [updated,setUpdated] = useState(false)
  const [id,setId] = useState('')
  const fetchInstructors = async () => {
    try {
      const response = await getAllInstructors();
      setInstructors(response?.data?.data);
    } catch (error: any) {
      toast.error(error.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  useEffect(() => {
    fetchInstructors();
  }, [updated]);

  const handleUnblock = async (instructorId: string) => {
    try {
      const response = await unblockInstructors(instructorId);
      toast.success(response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setUpdated(!updated)
    } catch (error: any) {
      toast.error(error.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  return (
    <Card className='h-full w-full'>
      {open && <BlockReasonModal open={open} setOpen={setOpen}updated={updated} setUpdated={setUpdated} id={id} />}
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Manage Instructors
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              These are details about the instructors
            </Typography>
          </div>
          <div className='flex w-full shrink-0 gap-2 md:w-max'>
            <div className='w-full md:w-72'>
              <Input
                label='Search'
                icon={<MagnifyingGlassIcon className='h-5 w-5' />}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className='overflow-scroll px-0'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                >
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {instructors.map(
              (
                {
                  _id,
                  img,
                  firstName,
                  lastName,
                  email,
                  dateJoined,
                  isBlocked,
                  isVerified,
                },
                index
              ) => {
                const isLast = index === instructors.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className='flex items-center gap-3'>
                        <Avatar
                          src={img}
                          alt='image'
                          size='md'
                          className='border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1'
                        />
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-bold'
                        >
                          {`${firstName} ${lastName}`}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {formatDate(dateJoined)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className='w-max'>
                        <Chip
                          size='sm'
                          variant='ghost'
                          value={
                            isBlocked
                              ? "Blocked"
                              : isVerified === false
                              ? "Pending"
                              : "Active"
                          }
                          color={
                            isBlocked
                              ? "red"
                              : isVerified === false
                              ? "amber"
                              : "green"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex items-center '>
                        {isBlocked ? (
                          <div>
                            <button
                              onClick={() => {
                                handleUnblock(_id);
                              }}
                              className='w-[80px] px-1 py-1.5 text-xs bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transform-gpu transition-transform duration-300 ease-in-out active:scale-95'
                            >
                              Unblock
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={() => {
                                setOpen(true)
                                setId(_id)
                              }}
                              className='w-[80px] px-1 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transform-gpu transition-transform duration-300 ease-in-out active:scale-95'
                            >
                              Block
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content='Edit User'>
                        <IconButton variant='text' color='blue-gray'>
                          <PencilIcon className='h-4 w-4' />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Button variant='outlined' color='blue-gray' size='sm'>
          Previous
        </Button>
        <div className='flex items-center gap-2'>
          <IconButton variant='outlined' color='blue-gray' size='sm'>
            1
          </IconButton>
          <IconButton variant='text' color='blue-gray' size='sm'>
            2
          </IconButton>
          <IconButton variant='text' color='blue-gray' size='sm'>
            3
          </IconButton>
          <IconButton variant='text' color='blue-gray' size='sm'>
            ...
          </IconButton>
          <IconButton variant='text' color='blue-gray' size='sm'>
            8
          </IconButton>
          <IconButton variant='text' color='blue-gray' size='sm'>
            9
          </IconButton>
          <IconButton variant='text' color='blue-gray' size='sm'>
            10
          </IconButton>
        </div>
        <Button variant='outlined' color='blue-gray' size='sm'>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ViewInstructors;
