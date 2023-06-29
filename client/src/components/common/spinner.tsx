import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  PropagateLoader,
  BarLoader,
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClimbingBoxLoader,
  ClipLoader,
  ClockLoader,
  DotLoader,
  FadeLoader,
  GridLoader,
  HashLoader,
  MoonLoader,
  PacmanLoader,
  PuffLoader,
  PulseLoader,
  RingLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SkewLoader,
} from "react-spinners";

interface SpinnerDialogProps {
  isUploading: boolean;
}

const SpinnerDialog: React.FC<SpinnerDialogProps> = ({ isUploading }) => {
  const [size, setSize] = useState(null);
  const [isOpen, setIsOpen] = useState(isUploading);

  const handleOpen = (value: any) => setSize(value);

  return (
    <Fragment>
      <Dialog open={isUploading} size={"sm"} handler={handleOpen}>
        <DialogBody>
          <div className='flex mt-5 justify-center items-center'>
            <HashLoader size={100} color='gray' loading={isUploading} />
          </div>
        </DialogBody>
        <DialogFooter className="mb-7 flex justify-center font-semibold">
            
          Your files are being uploaded. Please wait...
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default SpinnerDialog;
