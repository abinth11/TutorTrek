import React, { useState, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { formatToINR } from "../../../utils/helpers";
import { enrollStudent } from "../../../api/endpoints/course/course";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";
import { FaSpinner } from "react-icons/fa";
import {FadeLoader} from "react-spinners";

interface PaymentModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdated: () => void;
  courseDetails: {
    price: number;
    overview: string;
    isPaid: boolean;
  };
}

const PaymentConfirmationModal: React.FC<PaymentModalProps> = ({
  open,
  setOpen,
  setUpdated,
  courseDetails,
}) => {
  const handleOpen = () => setOpen((cur) => !cur);
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClose = () => setOpen(false); 
  const handleConfirmPayment = async () => {
    try {
      setIsLoading(true);
      const response = await enrollStudent(courseId ?? "");
      setTimeout(() => {
        setUpdated();
        setIsLoading(false);
        setOpen(false);
        toast.success(response?.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong ", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleCourseEnroll = () => {
    if (courseDetails.isPaid) {
      navigate(`/courses/${courseId}/payment`);
    } else {
      handleConfirmPayment();
    }
  };
  const isFreeCourse = courseDetails?.isPaid === false;
  return (
    <Fragment>
      <Dialog open={open} size='sm' handler={handleOpen}>
        <DialogHeader>
          <div className='flex items-center justify-center'>
            <ExclamationCircleIcon className='h-8 w-8 text-yellow-500' />
            <Typography variant='h5' color='gray' className='ml-2'>
              Payment Confirmation
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody divider>
          <Typography variant='body' color='gray'>
            Please review the details before proceeding:
          </Typography>
          <Typography variant='body' color='gray' className='mt-4'>
            {isFreeCourse
              ? "This course is free!"
              : `Course Price: ${formatToINR(courseDetails?.price)}`}
          </Typography>
          <Typography variant='body' color='gray'>
            Course Overview: {courseDetails?.overview}
          </Typography>
        </DialogBody>
        <DialogFooter>
          {isFreeCourse ? (
            <Button
            variant='gradient'
            color='green'
            onClick={handleCourseEnroll}
            className='w-full flex items-center justify-center'
          >
            {isLoading ? (
              <span className="flex items-center">
                <span>Loading</span>
                <FaSpinner className='animate-spin ml-1' size={20} />
              </span>
            ) : (
              <span>Start Course</span>
            )}
          </Button>
          ) : (
            <Button
              variant='gradient'
              color='green'
              onClick={handleCourseEnroll}
              className='w-full'
            >
              <span>Confirm Payment</span>
            </Button>
          )}
          <Button
            variant='outlined'
            color='blue'
            onClick={handleClose}
            className='w-full mt-2'
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default PaymentConfirmationModal;
