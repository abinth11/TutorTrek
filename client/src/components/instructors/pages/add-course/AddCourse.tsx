import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import AddCourseStepper from "../../partials/Stepper";
import CourseDescriptionForm from "./CourseDescriptionForm";
import CourseMediaForm from "./CourseMediaForm";
import QuizzesForm from "./QuizzesForm";
import CourseAddLandingPage from "./FinalPage";

const AddCourseForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isCourseAdded, setIsCourseAdded] = useState(false);

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep((prevStep) => prevStep + 1);
      setIsFirstStep(false);
    } else {
      // Finish button clicked, perform final actions
      setIsLastStep(true); // Set isLastStep to true when it's the last step
      setIsCourseAdded(true);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
      setIsLastStep(false);
    }
    if (activeStep === 2) {
      setIsFirstStep(true);
    }
  };

  const handleCourseAdd = () => {
    // Perform course add actions
    setIsCourseAdded(true);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <CourseDescriptionForm />;
      case 1:
        return <CourseMediaForm />;
      case 2:
        return <QuizzesForm />;
      default:
        return null;
    }
  };
  console.log(isCourseAdded)
  return (
    <div className='pb-16'>
      {isCourseAdded ? (
        <>
          <CourseAddLandingPage />
        </>
      ) : (
        <>
          {" "}
          <div className='flex justify-center'>
            <div className='pl-5 pr-5 mb-5 w-2/3'>
              <AddCourseStepper
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                setIsLastStep={setIsLastStep}
                setIsFirstStep={setIsFirstStep}
              />
            </div>
          </div>
          <div className=''>
            <div className='mt-20 ml-20 mr-20 mb-5 pb-10 border-2 rounded-lg border-gray-300'>
              {renderStep()}
            </div>
          </div>
          <div className='mb-10 mr-10 pl-8 pr-11 ml-11 flex justify-between'>
            <Button onClick={handlePrev} disabled={isFirstStep}>
              Prev
            </Button>
            <Button
              onClick={handleNext}
              disabled={activeStep === 2 && !isLastStep}
            >
              {activeStep === 2 ? "Finish" : "Next"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddCourseForm;
