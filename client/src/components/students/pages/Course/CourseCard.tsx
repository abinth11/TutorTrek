import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  IconButton,
  Rating
} from "@material-tailwind/react";
import {
  HeartIcon,
} from "@heroicons/react/24/solid";
import { formatToINR } from "../../../../utils/helpers";
import { CourseInterface } from "../../../../types/course";

interface CourseCardProps {
  course: CourseInterface;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card className='w-[20rem] shadow-lg'>
    <CardHeader floated={false} color='blue-gray'>
      <img src={course.thumbnail} alt='ui/ux review check' />
      <div className='to-bg-black-10 absolute inset-0 h-[10rem] w-full bg-gradient-to-tr from-transparent via-transparent to-black/60' />
    </CardHeader>
    <CardBody>
      <div className='mb-3 flex items-center justify-between'>
        <Typography variant='h5' color='blue-gray' className='font-medium'>
          {course?.title}
        </Typography>
      </div>
      <Typography color='gray' className='text-sm'>
        {course.description}
      </Typography>
      <div className='group mt-4 flex justify-between gap-3'>
        <Tooltip content={`Price: ${formatToINR(course.price)}`}>
          <Typography color='blue-gray' className='font-normal text-sm'>
            {formatToINR(course.price)}
          </Typography>
        </Tooltip>
        <Tooltip content={`Rating: ${course.rating}/5`}>
          <div className='flex items-center gap-1.5'>
            {/* <StarIcon className='-mt-0.5 h-4 w-4 text-yellow-700' /> */}
            <Rating value={course.rating} readonly />
            <Typography color='blue-gray' className='font-normal text-sm'>
              {course.rating}
            </Typography>
          </div>
        </Tooltip>
      </div>
    </CardBody>
  </Card>
  
  );
};

export default CourseCard;
