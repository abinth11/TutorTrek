import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CourseInterface } from "../../../types/course";
import { BsPlayCircle } from "react-icons/bs";

const MyCourseCard: React.FC<CourseInterface> = ({
  coursesEnrolled,
  title,
  thumbnailUrl,
  description,
  duration,
}) => {
  return (
    <Card className='w-80 h-[25rem] border-none shadow-none hover:border-gray-300 hover:border-md hover:shadow-md transition-transform duration-300 overflow-hidden border-2 border-gray-200 hover:scale-105'>
      <CardHeader shadow={false} floated={false} className='h-48'>
        <img
          src={thumbnailUrl}  
          
          className='w-full h-30 object-cover transition-transform duration-300 transform hover:scale-105'
        />
      </CardHeader>
      <CardBody>
        <div className='flex items-center justify-between mb-2'>
          <Typography color='blue-gray' className='font-medium'>
            {title}
          </Typography>
          <Typography color='blue-gray' className='font-medium mr-2'>
            {duration}w
          </Typography>
        </div>
        <p className="text-gray text-sm line-clamp-1">{description}</p>

        {/* <Typography  
          variant='small'
          color='gray'
          className='opacity-75 text-sm line-clamp-1'
        >
          {description}  
        </Typography> */}
      </CardBody>
      <CardFooter className='pt-0'>
        <Button
          ripple={false}
          fullWidth={true}
          className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none flex items-center justify-center hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100'
        >
          <span className='mr-2'>Watch now</span>
          <BsPlayCircle className='text-xl text-gray-500' />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyCourseCard;
