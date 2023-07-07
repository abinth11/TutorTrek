import React from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

interface StepperProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setIsLastStep: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCourseStepper({
  activeStep,
  setActiveStep,
  setIsLastStep,
  setIsFirstStep,
}: StepperProps) {
  const handleSetActiveStep = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => handleSetActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue" : "blue-gray"}
            >
              Course Overview
            </Typography>
            <Typography
              color={activeStep === 0 ? "blue" : "gray"}
              className="font-normal"
            >
              Course description and price
            </Typography>
          </div>
        </Step>
        <Step onClick={() => handleSetActiveStep(1)}>
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue" : "blue-gray"}
            >
              Course Content
            </Typography>
            <Typography
              color={activeStep === 1 ? "blue" : "gray"}
              className="font-normal"
            >
              Course videos and images
            </Typography>
          </div>
        </Step>
        <Step onClick={() => handleSetActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue" : "blue-gray"}
            >
              Quiz
            </Typography>
            <Typography
              color={activeStep === 2 ? "blue" : "gray"}
              className="font-normal"
            >
              Quizzes related the course
            </Typography>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}






