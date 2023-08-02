import React from "react";
import { Typography } from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";

type QuizzesSwitchProps = {
  editQuiz: boolean;
  setEditQuiz: (editQuiz: boolean) => void;
};

const EditQuizSwitch: React.FC<QuizzesSwitchProps> = ({ editQuiz, setEditQuiz }) => {
  const handleSwitchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const isChecked = event.target.checked;
    setEditQuiz(isChecked);
  };

  return (
    <Switch
      checked={editQuiz}
      onChange={handleSwitchChange}
      label={
        <div>
          <Typography color="blue-gray" className="font-medium">
            Edit Quiz?
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            You'll be able to edit quizzes for the lesson.
          </Typography>
        </div>
      }
      containerProps={{
        className: "-mt-5",
      }}
    />
  );
};

export default EditQuizSwitch;
