import React, { useEffect, useState } from "react";
import { getQuizzesByLesson } from "../../../api/endpoints/course/quiz";
import { toast } from "react-toastify";
import {
  Question,
  Option,
} from "../../../api/types/apiResponses/api-response-quizzes";
import { Link } from "react-router-dom";
import { selectIsLoggedIn } from "../../../redux/reducers/authSlice";
import { useSelector } from "react-redux";

const Quizzes: React.FC<{ lessonId: string | undefined }> = ({ lessonId }) => {
  const [quizzes, setQuizzes] = useState<Question[]>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    undefined
  );
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [nextClicked, setNextClicked] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<
    boolean | undefined
  >(undefined);
  const [score, setScore] = useState<number>(0);

  const fetchQuizzes = async (lessonId: string) => {
    try {
      const response = await getQuizzesByLesson(lessonId);
      setQuizzes(response?.data?.questions);
    } catch (error: any) {
      toast.error(error?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (lessonId) {
      fetchQuizzes(lessonId);
    }
  }, [lessonId]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
  };

  const handleNextQuestion = () => {
    setNextClicked(true);

    const currentQuestion = quizzes![currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(
      (option) => option._id === selectedOptionId
    );

    if (selectedOption) {
      setAnsweredCorrectly(selectedOption.isCorrect);
      if (selectedOption.isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    }

    setTimeout(() => {
      setSelectedOptionId(undefined);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setNextClicked(false);
      setAnsweredCorrectly(undefined);
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <div className='flex flex-col items-center justify-center h-auto mb-5'>
        <div className="pt-10 pb-10 flex justify-center items-center">
          <h2 className='text-xl font-semibold mt-3'>
            Please login to solve quizzes
          </h2>
          <Link to="/login" className="ml-2 mt-3.5 text-blue-600 underline">Login</Link>
        </div>
      </div>
    );
  }

  if (currentQuestionIndex === quizzes?.length) {
    return (
      <div className='flex flex-col items-center justify-center h-auto mb-5'>
        <div>
          <h2 className='text-xl font-semibold mt-3'>
            Congrats! your score is...{score}/{quizzes.length}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className=''>
      <h2 className='text-xl ml-3 p-1 font-bold mb-4 flex items-center'>
        Questions
        <div
          className='ml-2 w-7 h-5 bg-blue-gray-100 rounded-full flex items-center justify-center text-customFontColorBlack font-light text-sm'
          style={{ borderRadius: "43% 43%" }}
        >
          {quizzes?.length}
        </div>
      </h2>

      <div className=' mx-auto px-4'>
        {quizzes?.length ? (
          <div className='w-full  shadow-sm border-gray-100 border-2 rounded-lg px-8 py-6'>
            <p className='text-lg mb-6'>
              <span className='font-bold mr-2'>
                {currentQuestionIndex + 1}.
              </span>
              {quizzes[currentQuestionIndex]?.question}
            </p>

            <ul className='space-y-4'>
              {quizzes[currentQuestionIndex]?.options.map((option: Option) => (
                <li
                  key={option._id}
                  onClick={() => handleOptionSelect(option._id)}
                  className={`${
                    selectedOptionId === option._id
                      ? nextClicked
                        ? answeredCorrectly
                          ? "bg-green-400 text-white"
                          : "bg-red-400 text-white"
                        : "bg-blue-400 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  } rounded-lg p-4 w-1/2 cursor-pointer transition-colors duration-200`}
                >
                  {option.option}
                </li>
              ))}
            </ul>
            {selectedOptionId && (
              <button
                onClick={handleNextQuestion}
                className='bg-blue-500 text-white py-2 px-4 mt-6 rounded-lg hover:bg-blue-600 transition-colors duration-200'
              >
                Next
              </button>
            )}
          </div>
        ) : (
          <p className='text-lg text-center'>
            No quizzes available for this lesson.
          </p>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
