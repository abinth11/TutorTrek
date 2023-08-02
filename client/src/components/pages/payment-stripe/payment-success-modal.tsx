import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate,useParams } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
interface PaymentModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentSuccessModal: React.FC<PaymentModalProps> = ({
  open,
  setOpen,
}) => {
  const handleOpen = () => setOpen((cur) => !cur);
  const {courseId} = useParams()
  const navigate = useNavigate()
  const handleClose = ()=>{
    setOpen(!open)
    navigate(`/courses/${courseId}/#success`)
  }

  return (
    <Fragment>
      <Dialog open={open} size="md" handler={handleOpen}>
        <DialogHeader>
          <div className="flex items-center justify-center">
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
            <Typography variant="h5" color="gray" className="ml-2">
              Payment Successful!
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody divider>
          <Typography variant="body" color="gray">
            Thank you for your payment. Your transaction was successful. Please
            check your email for the payment confirmation and additional
            details.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={handleClose}
            className="w-full"   
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default PaymentSuccessModal;
