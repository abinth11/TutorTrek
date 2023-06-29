import React, { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  PencilIcon,
  UserPlusIcon,
  TrashIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { getCourseByInstructor } from "../../../../api/endpoints/instructor/course";
import { GetCourseByInstructorInterface } from '../../../../api/types/apiResponses/apiResponseInstructors';
import { formatDate } from '../../../../utils/helpers';
import { Link } from 'react-router-dom';

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Pending",
    value: "pending",
  },
];

const ViewLessons: React.FC = () => {
  const [courses, setCourses] = useState<GetCourseByInstructorInterface[] | null>(null);

  const fetchData = async () => {
    const response = await getCourseByInstructor();
    setCourses(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(courses);

  return (
    <Card className="h-full w-full mb-24">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Course name
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              about the course
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" color="blue-gray" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" color="blue" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add lesson
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <ul className="mt-4 w-full min-w-max text-left">
          {courses?.map(({ _id, title, thumbnail, description, category, createdAt, isVerified }, index) => {
            const isLast = index === courses.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b  border-blue-gray-50";
            if (index <= 4) {
              return (
                <li key={_id} className={`flex ${classes}`}>
                  <Avatar src={thumbnail} alt="image" size="sm" />
                  <div className="flex  flex-col flex-grow ml-3 mr-8">
                    <div className="flex items-center gap-3">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {title}
                      </Typography>
                      <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                        {/* {description} */}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {category}
                      </Typography>
                      <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                        {/* {category} */}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex  items-center mr-8">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={isVerified ? "active" : "pending"}
                      color={isVerified ? "green" : "blue-gray"}
                    />
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {formatDate(createdAt)}
                    </Typography>
                  </div>
                  <div className="flex items-center mr-6 gap-2">
                    <Tooltip content="Add lessons">
                      <Link to="/instructors/view-lessons">
                        <IconButton variant="text" color="blue-gray">
                          <SquaresPlusIcon className="h-4 w-4 text-blue-500" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip content="Edit course">
                      <IconButton variant="text" color="blue-gray">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete course">
                      <IconButton variant="text" color="blue-gray">
                        <TrashIcon className="h-4 w-4 text-red-500" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ViewLessons;
