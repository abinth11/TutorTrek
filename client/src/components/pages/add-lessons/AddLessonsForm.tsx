import React, { useState, ChangeEvent } from "react";
import {
  Formik,
  FormikHelpers,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
} from "formik";
import { toast } from "react-toastify";
import { Button, Spinner } from "@material-tailwind/react";
import { TiTrash } from "react-icons/ti";
import * as Yup from "yup";
import QuizSwitch from "./QuizSwitch";
import { Tooltip } from "@material-tailwind/react";
import { QuizzesComponent } from "./QuizesComponent";
import { addLesson } from "../../../api/endpoints/course/lesson";
import { FormValuesLesson } from "../../../types/lesson";
import SpinnerDialog from "../../common/spinner";

interface AddLessonProps {
  courseId: string;
}

const initialValues = {
  title: "",
  description: "",
  assignments: "",
  studyMaterials: "",
  contents: "",
  duration:"",
  questions: [
    {
      question: "",
      options: [{ option: "", isCorrect: false }],
    },
  ], 
};

const lessonSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  contents: Yup.string().required("Contents are required"),
  // videoFile: Yup.string().required("Video file is required"),
  assignments: Yup.string().required("assignments file is required"),
  // studyMaterials: Yup.string().required("Video file is required"),
  duration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be a positive number"),
  // questions: Yup.array().of(
  //   Yup.object().shape({
  //     question: Yup.string().required("Question is required"),
  //     options: Yup.array().of(
  //       Yup.object().shape({
  //         option: Yup.string().required("Option is required"),
  //         isCorrect: Yup.boolean().required("Is Correct is required"),
  //       })
  //     ),
  //   })
  // ),
});

const AddLessonForm: React.FC<AddLessonProps> = ({ courseId }) => {
  const [addQuiz, setAddQuiz] = useState<boolean>(false);
  const [lessonVideo, setLessonVideo] = useState<File | null>(null);
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleVideoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setLessonVideo(file);
  };

  const handleMaterialFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setMaterialFile(file);
  };

  const handleSubmit = async (
    lesson: FormValuesLesson,
    {resetForm}: FormikHelpers<FormValuesLesson>
    )=> {
    try {
      setIsUploading(true);
      const formData = new FormData();
      lessonVideo && formData.append("media", lessonVideo, "lessonVideo");
      materialFile && formData.append("media", materialFile, "materialFile");
      Object.keys(lesson).forEach((key) => {
        if (key === "questions") {
          const questionsJSON = JSON.stringify(lesson[key]);
          formData.append(key, questionsJSON);
        } else {
          formData.append(key, lesson[key]);
        }
      });

      const response = await addLesson(courseId, formData);
      setIsUploading(false);
      setLessonVideo(null)
      setMaterialFile(null)
      resetForm()
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      setIsUploading(false);
      toast.error("Failed to add lesson", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className='flex justify-center items-center mt-10 pt-5 pb-10 text-customFontColorBlack'>
      <div className='bg-white rounded-lg mx-10 border w-full p-6'>
        <SpinnerDialog isUploading={isUploading} />
        <Formik
          initialValues={initialValues}
          validationSchema={lessonSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className='mt-10 space-y-6'>
              <div className='flex gap-4 justify-between'>
                <div className='w-1/2'>
                  <label
                    htmlFor='title'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Title
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='title'
                      name='title'
                      type='text'
                      autoComplete='off'
                      required
                      className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='title'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
                <div className='w-1/2'>
                  <label
                    htmlFor='description'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Description
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='description'
                      name='description'
                      type='text'
                      autoComplete='off'
                      required
                      className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='description'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div className='w-1/2'>
                  <label
                    htmlFor='contents'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Contents
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='contents'
                      name='contents'
                      type='text'
                      autoComplete='off'
                      required
                      className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='contents'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
                <div className='w-1/2'>
                  <label
                    htmlFor='assignments'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Assignments
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='assignments'
                      name='assignments'
                      type='text'
                      autoComplete='off'
                      required
                      className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='assignments'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div className='w-1/2'>
                  <label
                    htmlFor='videoFile'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Video file
                  </label>
                  <div className='mt-2'>
                    <input
                      id='videoFile'
                      name='videoFile'
                      type='file'
                      required
                      onChange={handleVideoFileChange}
                      autoComplete='off'
                      className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    {lessonVideo && (
                      <video
                        src={URL.createObjectURL(lessonVideo)}
                        className='h-52 w-full rounded-md p-2 mt-3'
                        controls
                      />
                    )}
                    <ErrorMessage
                      name='videoFile'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
                <div className='w-1/2'>
                  <label
                    htmlFor='studyMaterials'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Materials
                  </label>
                  <div className='mt-2'>
                    <input
                      id='studyMaterials'
                      name='studyMaterials'
                      type='file'
                      required
                      onChange={handleMaterialFileChange}
                      autoComplete='off'
                      className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    {materialFile && (
                      <img
                        src={URL.createObjectURL(materialFile)}
                        className='h-52 w-full rounded-md p-2 mt-3'
                      />
                    )}
                    <ErrorMessage
                      name='studyMaterials'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor='duration'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Duration (in minutes)
                </label>
                <div className='mt-2'>
                  <Field
                    id='duration'
                    name='duration'
                    type='number'
                    autoComplete='off'
                    required
                    className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='duration'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>
              <div>
                <div className='flex items-center mb-4'>
                  <QuizSwitch addQuiz={addQuiz} setAddQuiz={setAddQuiz} />
                </div>
                {addQuiz && (
                  <div className='max-w-md pt-10 mx-auto'>
                    <FieldArray name='questions'>
                      {({ push, remove: removeQuestion }) => (
                        <div>
                          {values.questions.map((_, index) => (
                            <div key={index} className='mb-4'>
                              <div className='mb-2'>
                                <label
                                  htmlFor={`questions.${index}.question`}
                                  className='block font-bold mb-1 leading-6 text-gray-900'
                                >
                                  Question {index + 1}
                                </label>
                                <Field
                                  type='text'
                                  id={`questions.${index}.question`}
                                  name={`questions.${index}.question`}
                                  className='border border-gray-300 px-3 py-2 rounded-lg w-full  focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                                />
                                <ErrorMessage
                                  name={`questions.${index}.question`}
                                  component='div'
                                  className='text-red-500 text-xs'
                                />
                              </div>

                              <FieldArray name={`questions.${index}.options`}>
                                {({
                                  push: pushOption,
                                  remove: removeOption,
                                }) => (
                                  <div>
                                    {values.questions[index].options.map(
                                      (_, optionIndex) => (
                                        <div key={optionIndex} className='mb-2'>
                                          <div className='flex items-center'>
                                            <Field
                                              type='text'
                                              id={`questions.${index}.options.${optionIndex}.option`}
                                              name={`questions.${index}.options.${optionIndex}.option`}
                                              className='border border-gray-300 px-3 py-2 rounded-lg w-full  focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                                            />
                                            <Field
                                              type='checkbox'
                                              id={`questions.${index}.options.${optionIndex}.isCorrect`}
                                              name={`questions.${index}.options.${optionIndex}.isCorrect`}
                                              className='ml-2'
                                            />
                                            <label
                                              htmlFor={`questions.${index}.options.${optionIndex}.isCorrect`}
                                              className='ml-1'
                                            >
                                              Correct
                                            </label>

                                            <Tooltip
                                              content='Delete option'
                                              animate={{
                                                mount: { scale: 1, y: 0 },
                                                unmount: { scale: 0, y: 25 },
                                              }}
                                            >
                                              <button
                                                type='button'
                                                onClick={() =>
                                                  removeOption(optionIndex)
                                                }
                                                className='text-red-500 ml-2'
                                              >
                                                <TiTrash size={20} />
                                              </button>
                                            </Tooltip>
                                          </div>
                                          <ErrorMessage
                                            name={`questions.${index}.options.${optionIndex}.option`}
                                            component='div'
                                            className='text-red-500 text-xs'
                                          />
                                        </div>
                                      )
                                    )}
                                    <button
                                      type='button'
                                      onClick={() =>
                                        pushOption({
                                          option: "",
                                          isCorrect: false,
                                        })
                                      }
                                      className='bg-blue-500 text-white px-4 text-xs py-2 rounded-lg'
                                    >
                                      Add Option
                                    </button>
                                  </div>
                                )}
                              </FieldArray>

                              <button
                                type='button'
                                onClick={() => removeQuestion(index)}
                                className='text-red-500 mt-2 text-xs'
                              >
                                Remove Question
                              </button>

                              <hr className='my-4' />
                            </div>
                          ))}
                          <button
                            type='button'
                            onClick={() =>
                              push({
                                question: "",
                                options: [{ option: "", isCorrect: false }],
                              })
                            }
                            className='bg-blue-500 text-white px-3 py-2 rounded-md text-xs'
                          >
                            Add Question
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                )}
              </div>
              <div className='flex justify-center'>
                <Button type='submit' color='blue'>
                  Add Lesson
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddLessonForm;
