import React,{useState} from 'react'
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

const TABLE_HEAD = ["Name", "Email", "Date Joined", "Status", "Actions", ""];

const TABLE_ROWS = [
  {
    img: "/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "Active",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "Active",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "Active",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "Blocked",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];

const ViewInstructors: React.FC = () => {
  let [blocked,setBlocked] = useState(false)
  const handleBlock = () =>{
    setBlocked(true)
  }
  const handleUnblock = () =>{
    setBlocked(false)
  }
  return (
    <Card className='h-full w-full'>
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
            <Button className='flex items-center gap-3' color='blue' size='sm'>
              <ArrowDownTrayIcon strokeWidth={2} className='h-4 w-4' /> Download
            </Button>
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
            {TABLE_ROWS.map(
              (
                {
                  img,
                  name,
                  amount,
                  date,
                  status,
                  account,
                  accountNumber,
                  expiry,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className='flex items-center gap-3'>
                        <Avatar
                          src={img}
                          alt={name}
                          size='md'
                          className='border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1'
                        />
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-bold'
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {amount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className='w-max'>
                        <Chip
                          size='sm'
                          variant='ghost'
                          value={status}
                          color={
                            status === "Active"
                              ? "green"
                              : status === "pending"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex items-center '>
                        {blocked ? (
                          <div>
                             <button onClick={handleUnblock} className='w-[80px] px-1 py-1.5 text-xs bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transform-gpu transition-transform duration-300 ease-in-out active:scale-95'>
                              Unblock
                            </button>
                          </div>
                        ) : (
                          <div>
                             <button onClick={handleBlock} className='w-[80px] px-1 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transform-gpu transition-transform duration-300 ease-in-out active:scale-95'>
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
