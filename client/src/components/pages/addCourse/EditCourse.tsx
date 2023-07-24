import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { AddCourseValidationSchema } from "../../../validations/course/AddCourse";
import { Switch } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { getIndividualCourse } from "../../../api/endpoints/course/course";
import { useParams } from "react-router-dom";
import { CourseInterface } from "../../../types/course";
const EditCourse: React.FC = () => {
  const [paid, setPaid] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [introduction, setIntroduction] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<CourseInterface | null>(null);
  const { courseId } = useParams();
  interface InitialValType {
    title: string,
    instructor:string,
    duration:string|number,
    description:string,
    requirements:string,
    lessons:string,
    category:string,
    price:string|number,
    tags: string,
  }
  const initialValues:InitialValType = {
    title: "",
    instructor: "",
    duration: "",
    description: "",
    requirements: "",
    lessons: "",
    category: "",
    price: "",
    tags: "",
  };

  const fetchCourse = async (courseId: string) => {
    try {
      setLoading(true);
      const response = await getIndividualCourse(courseId);
      setCourse(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    if (course) {
      initialValues.title = course.title;
      initialValues.category=course.category;
      initialValues.description=course.description
      initialValues.duration=course.duration   
      initialValues.tags=course.tags.join(' ')  
      initialValues.price=course.price
      initialValues.requirements=course.requirements.join('')
      setPaid(course.isPaid)
    }
  }, [course]);

  useEffect(() => {
    if (courseId) {
      fetchCourse(courseId);
    }
  }, []);
  const handleFormSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      introduction && formData.append("files", introduction);
      thumbnail && formData.append("files", thumbnail);
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      // const response = await addCourse(formData);
      // toast.success(response.data.message, {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // });  
    } catch (error: any) {
      toast.error(error.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  if (loading) {
    return <div>loading...</div>;
  }

  const handlePaid = () => {
    setPaid(!paid);
  };

  return (
    <div className='mb-20'>
      <div className='ml-12 pl-20'>
        <h1 className='font-bold text-xl text-gray-800'>Edit Course</h1>
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={AddCourseValidationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <div className='bg-white ml-32  rounded-lg border-2 border-gray-200 mr-32 mb-24 mt-2 p-5'>
            <div className='flex  w-full justify-center mt-10 pt-3 space-x-14 '>
              <div>
                <div className='mb-2'>
                  <label
                    htmlFor='title'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Title
                  </label>
                  <Field
                    type='text'
                    id='title'
                    name='title'
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='title'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>

                <div className='mb-2'>
                  <label
                    htmlFor='category'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Category
                  </label>
                  <Field
                    as='select'
                    id='category'
                    name='category'
                    className='pl-2 block w-80 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  >
                    <option value='' disabled>
                      Select category
                    </option>
                    <option value='male'>Web</option>
                    <option value='female'>Mobile</option>
                  </Field>
                  <ErrorMessage
                    name='category'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
                <div className='mb-2'>
                  <label
                    htmlFor='tags'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Tags
                  </label>
                  <Field
                    type='text'
                    id='tags'
                    name='tags'
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='tags'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>

                <div className='mb-2'>
                  <div className='mb-5 mt-2 pl-2 pt-5 '>
                    <Switch
                      id='auto-update'
                      onClick={handlePaid}
                      label='Paid'
                      checked={paid}
                    />
                  </div>

                  {paid && (
                    <div className=''>
                      <label
                        htmlFor='price'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Price
                      </label>
                      <Field
                        type='number'
                        id='price'
                        name='price'
                        className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                      />
                      <ErrorMessage
                        name='price'
                        component='div'
                        className='text-red-500 text-sm'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>

                <div className='mb-2'>
                  <label
                    htmlFor='duration'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Duration
                  </label>
                  <Field
                    type='number'
                    id='duration'
                    name='duration'
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='duration'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>

                <div className='mb-2'>
                  <label
                    htmlFor='description'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Description
                  </label>
                  <Field
                    as='textarea'
                    id='description'
                    name='description'
                    rows={4}
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='description'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>

                <div className='mb-2'>
                  <label
                    htmlFor='requirements'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Requirements
                  </label>
                  <Field
                    as='textarea'
                    id='requirements'
                    name='requirements'
                    rows={4}
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='requirements'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>

                <div className='mb-2'>
                  <label
                    htmlFor='lessons'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Lessons
                  </label>
                  <Field
                    as='textarea'
                    id='lessons'
                    name='lessons'
                    rows={4}
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='lessons'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>
            </div>
            <div className='flex w-full justify-center mt-14 pt-3 space-x-14'>
              <div>
                <div className='mb-2'>
                  <label
                    htmlFor='introductionVideo'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Introduction Video
                  </label>
                  <input
                    type='file'
                    id='introductionVideo'
                    name='introductionVideo'
                    accept='video/*'
                    onChange={(event) => {
                      const file = event.target.files?.[0] || null;
                      setIntroduction(file);
                    }}
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='introductionVideo'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>

              <div>
                <div className='mb-2'>
                  <label
                    htmlFor='thumbnail'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Thumbnail
                  </label>
                  <input
                    type='file'
                    id='thumbnail'
                    name='thumbnail'
                    accept='image/*'
                    onChange={(event) => {
                      const file = event.target.files?.[0] || null;
                      setThumbnail(file);
                    }}
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='thumbnail'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center  mt-8'>
              <button
                type='submit'
                className='bg-blue-500 mt-5 text-white px-3 py-2 rounded-md'
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditCourse;
