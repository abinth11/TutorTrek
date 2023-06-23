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
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep((prevStep) => prevStep + 1);
      setIsFirstStep(false);
    } else {
      // Finish button clicked, perform final actions
      setIsLastStep(true); // Set isLastStep to true when it's the last step
      setIsCourseAdded(true);
      // Access complete form data and perform necessary actions
      console.log(formData);
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

  const handleDescriptionFormSubmit = (descriptionFormData:any) => {
    setFormData((prevData) => ({ ...prevData, description: descriptionFormData }));
  };

  const handleMediaFormSubmit = (mediaFormData:any) => {
    setFormData((prevData) => ({ ...prevData, media: mediaFormData }));
  };

  const handleQuizzesFormSubmit = (quizzesFormData:any) => {
    setFormData((prevData) => ({ ...prevData, quizzes: quizzesFormData }));
  };
  console.log(formData)

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <CourseDescriptionForm onSubmit={handleDescriptionFormSubmit} />;
      case 1:
        return <CourseMediaForm onSubmit={handleMediaFormSubmit} />;
      case 2:
        return <QuizzesForm onSubmit={handleQuizzesFormSubmit} />;
      default:
        return null;
    }
  };

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
            <div className='mt-20 bg-white ml-20 mr-20 mb-5 pb-10 border-2 rounded-lg border-gray-200'>
              {/* {renderStep()} */}
              <CourseDescriptionForm onSubmit={handleDescriptionFormSubmit} />

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
