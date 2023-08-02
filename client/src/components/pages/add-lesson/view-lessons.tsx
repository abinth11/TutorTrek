import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  UserPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { formatDate } from "../../../utils/helpers";
import { getLessonsByCourse } from "../../../api/endpoints/course/lesson";
import { useParams } from "react-router-dom";
import { ApiResponseLessons } from "../../../api/types/apiResponses/api-response-instructors";
import AddLessonForm from "./add-lessons-form";
import { Link } from "react-router-dom";
import { LESSON_AVATAR } from "../../../constants/common";
  
const ViewLessons: React.FC = () => {
  const [lessons, setLessons] = useState<ApiResponseLessons[] | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const { courseId } = useParams<{ courseId: string | undefined }>();

  const fetchData = async (courseId: string) => {
    const response = await getLessonsByCourse(courseId);
    setLessons(response.data);
  };

  useEffect(() => {
    if (courseId) fetchData(courseId);
  }, [courseId]);

  return (
    <Card className='h-auto w-full mb-24'>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-8 flex items-center justify-between gap-8'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Course name
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              about the course
            </Typography>
          </div>
          <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
            <Button variant='outlined' color='blue-gray' size='sm'>
              view all
            </Button>
            <Button
              onClick={() => {
                setFormVisible(!formVisible);
              }}
              className='flex items-center gap-3'
              color='blue'
              size='sm'
            >
              {!formVisible ? (
                <UserPlusIcon strokeWidth={2} className='h-4 w-4' />
              ) : (
                ""
              )}
              {formVisible ? "View lessons" : "Add lessons"}
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <div className='w-full md:w-72'>
            <Input
              label='Search'
              icon={<MagnifyingGlassIcon className='h-5 w-5' />}
            />
          </div>
        </div>  
      </CardHeader>
      {formVisible ? (
        <AddLessonForm/>
      ) : (
        <>
          <CardBody className='overflow-scroll px-0'>
            <ul className='mt-4 w-full min-w-max text-left'>
              {lessons?.map(
                (
                  { _id, title, thumbnail, videoUrl, description, createdAt },
                  index
                ) => {
                  const isLast = index === lessons.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b  border-blue-gray-50";
                  if (index <= 4) {
                    return (
                      <li key={_id} className={`flex ${classes}`}>
                        <Avatar src={thumbnail??LESSON_AVATAR} alt='image' size='sm' />
                        <div className='flex  flex-col flex-grow ml-3 mr-8'>
                          <div className='flex items-center gap-3'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal'
                            >
                              {title}
                            </Typography>
                          </div>
                          <div className='flex items-center gap-3'>
                           
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal opacity-70'
                            >
                              {description}
                            </Typography>
                          </div>
                        </div>
                        <div className='flex  items-center mr-8'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {formatDate(createdAt)}
                          </Typography>
                        </div>
                        <div className='flex items-center mr-6 gap-2'>
                          <Tooltip content='Edit lesson'>
                          <Link to={`/instructors/view-lessons/${courseId}/edit-lesson/${_id}`}>
                            <IconButton variant='text' color='blue-gray'>
                              <PencilIcon className='h-4 w-4' />
                            </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip content='Disable lesson'>
                            <IconButton variant='text' color='blue-gray'>
                              <TrashIcon className='h-4 w-4 text-red-500' />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </li>
                    );
                  }
                  return null;
                }
              )}
            </ul>
          </CardBody>
          <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal'
            >
              Page 1 of 10
            </Typography>
            <div className='flex gap-2'>
              <Button variant='outlined' color='blue-gray' size='sm'>
                Previous
              </Button>
              <Button variant='outlined' color='blue-gray' size='sm'>
                Next
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ViewLessons;
