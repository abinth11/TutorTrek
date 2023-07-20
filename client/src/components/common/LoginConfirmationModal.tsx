import { Fragment } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

interface Props {
  confirm: boolean;
  setConfirm: (value: boolean) => void;
}

const LoginConfirmation: React.FC<Props> = ({ confirm, setConfirm }) => {
  const navigate = useNavigate();

  const handleOpen = () => setConfirm(false);
  const handleConfirm = () => {
    setConfirm(false);
    // Check if the user is logged in here (you can implement your own logic)
    navigate("/login")
  };

  return (
    <Fragment>
      <Dialog open={confirm} size={"sm"} handler={handleOpen}>
        <DialogHeader>Login Confirmation</DialogHeader>
        <DialogBody divider>
          To purchase this course, you need to be logged in. Please log in to continue.
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleConfirm}>
            <span>Proceed to Login</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default LoginConfirmation;
