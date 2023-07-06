import React, { useEffect, useState } from "react";
import { getQuizzesByLesson } from "../../../../api/endpoints/course/course";
import { toast } from "react-toastify";
import { Question } from "../../../../api/types/apiResponses/apiResponseQuizzes";
const Quizzes: React.FC<{ lessonId: string | undefined }> = ({ lessonId }) => {
  const [quizzes, setQuizzes] = useState<Question[]>();
  const fetchQuiz = async (lessonId: string) => {
    try {
      const response = await getQuizzesByLesson(lessonId);
      setQuizzes(response.data.questions);
    } catch (error: any) {
      toast.error(error.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  useEffect(() => {
    lessonId && fetchQuiz(lessonId);
  }, []);
  return (
    <div>
        Quizzes
        {
            quizzes?.map((quiz)=>{
                return (
                    <li key={quiz._id}>
                        {quiz.question}
                    </li>
                )
            })
        }
    </div>
  )
};

export default Quizzes;
