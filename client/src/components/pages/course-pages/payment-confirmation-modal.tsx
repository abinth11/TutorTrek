import React, { useState, useEffect, Fragment } from "react";
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
import { formatToINR, formatTime } from "../../../utils/helpers";
import { enrollStudent } from "../../../api/endpoints/course/course";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

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
  const offerExpiration = "2023-08-13T22:59:59.000Z";

  const [timeLeft, setTimeLeft] = useState<number>(0);

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

  useEffect(() => {
    if (!isFreeCourse) {
      const offerEndTime = new Date(offerExpiration).getTime();
      const currentTime = new Date().getTime();

      const timeRemaining = offerEndTime - currentTime;
      setTimeLeft(timeRemaining);

      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 1000 ? prevTime - 1000 : 0));
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isFreeCourse, offerExpiration]);

  return (
    <Fragment>
      <Dialog open={open} size='sm' handler={handleOpen}>
        <DialogHeader>
          <div className='flex items-center justify-center'>
            <ExclamationCircleIcon className='h-8 w-8 text-yellow-500' />
            <Typography
              variant='h5'
              color='gray'
              className='ml-2 font-semibold'
            >
              {isFreeCourse
                ? "Explore Your Free Learning Adventure"
                : "Payment Confirmation"}
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody divider>
          <Typography variant='paragraph' className='font-semibold text-md' color='gray'>
            Please review the details before proceeding:
          </Typography>
          <Typography variant='paragraph' color='gray' className='mt-2 mb-1'>
            {isFreeCourse ? (
              <span className='font-semibold text-green-500'>
                This course is free!
              </span>
            ) : (
              <div className="bg-gray-100 p-2">
              <p className="text-lg font-semibold mb-2">🎉 Limited Time Offer 🎉</p>
              <p className="text-xl font-bold mb-2">
                Price:{" "}
                <span className="text-green-600">
                  {formatToINR(courseDetails?.price)}
                </span>{" "}
                <span className="text-gray-600 line-through">
                  {formatToINR(courseDetails?.price + 100)}
                </span>
              </p>
              <p className="text-lg">
                Offer Expires in: 
                <span className="text-gray-600 font-semibold">
                  {formatTime(timeLeft)}
                </span>
              </p>
            </div>
                    
            )}
          </Typography>
          <Typography variant='paragraph' color='gray'>
            <span className='font-semibold'>Course Overview:</span><br />
            {courseDetails?.overview}
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button  
            variant='gradient'
            color='green'
            onClick={handleCourseEnroll}
            className='w-full'
          >
            {isLoading ? (
              <span className='flex items-center'>
                <span>Processing...</span>
                <FaSpinner className='animate-spin ml-1' size={20} />
              </span>
            ) : (
              <span>{isFreeCourse ? "Start Course" : "Confirm Payment"}</span>
            )}
          </Button>
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
