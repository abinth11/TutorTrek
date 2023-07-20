import React, { Fragment } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

interface Props {
  show: boolean;
  onClose: () => void;
}

const SessionExpired: React.FC<Props> = ({ show, onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onClose();
    // Check if the user is logged in here (you can implement your own logic)
    navigate("/login");
  };

  return (
    <Fragment>
      <Dialog open={show} size={"sm"} handler={onClose}>
        <DialogHeader className="text-xl font-bold">Session Expired</DialogHeader>
        <DialogBody divider>
          <p className="text-gray-700">
            Your session has expired. To continue, please log in again.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={onClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="filled"
            color="blue"
            onClick={handleConfirm}
            className="text-white"
          >
            <span>Log In</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default SessionExpired;
