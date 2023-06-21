import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AddCourseValidationSchema } from '../../../../validations/instructors/AddCourse';

export interface FormValues {
    title: string;
    instructor: string;
    duration: string;
    thumbnail: string;
    introductionVideo: string;
    description: string;
    category: string;
    price: string;
  }
  
const initialValues: FormValues = {
    title: "",
    instructor: "",
    duration: "",
    thumbnail: "",
    introductionVideo: "",
    description: "",
    category: "",
    price: "",
  };
  
  

const CourseDescriptionForm:React.FC = () =>{
    const handleSubmit = (values: FormValues, { resetForm }: any) => {
        // Handle form submission
        console.log(values);
        resetForm(); // Reset the form after submission
      };
    return (
        <Formik
        initialValues={initialValues}
        validationSchema={AddCourseValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className='flex w-full justify-center mt-14 pt-3 space-x-14 '>
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
                  className='pl-2 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='title'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>

              <div className='mb-2'>
                <label
                  htmlFor='instructor'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Instructor
                </label>
                <Field
                  type='text'
                  id='instructor'
                  name='instructor'
                  className='pl-2 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='instructor'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>

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
                  className='pl-2 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='duration'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>

              <div className='mb-2'>
                <label
                  htmlFor='thumbnail'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Thumbnail URL
                </label>
                <Field
                  type='text'
                  id='thumbnail'
                  name='thumbnail'
                  className='pl-2 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='thumbnail'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
            </div>
            <div>
              <div className='mb-2'>
                <label
                  htmlFor='introductionVideo'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Introduction Video URL
                </label>
                <Field
                  type='text'
                  id='introductionVideo'
                  name='introductionVideo'
                  className='pl-2 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='introductionVideo'
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
                  type='text'
                  id='description'
                  name='description'
                  className='pl-2 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='description'
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
                  type='text'
                  id='category'
                  name='category'
                  className='pl-2 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='category'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
              <div className='mb-2'>
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
                  className='pl-2 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='price'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    )

}

export default CourseDescriptionForm