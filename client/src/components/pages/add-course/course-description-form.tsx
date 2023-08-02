import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AddCourseValidationSchema } from "../../../validations/course/AddCourse";
import { Switch } from "@material-tailwind/react";

export interface FormValues {
  title: string;
  instructor: string;
  duration: string;
  description: string;
  requirements:string;
  lessons:string;
  category: string;
  price: string;
  tags:string;
}

const initialValues: FormValues = {
  title: "",
  instructor: "",
  duration: "",
  description: "",
  requirements:"",
  lessons:"",
  category: "",
  price: "",
  tags:""
};

type CourseDescriptionFormProps = {
  onSubmit: (formData: any) => void;
};
const CourseDescriptionForm: React.FC<CourseDescriptionFormProps> = ({onSubmit}) => {
  const [paid, setPaid] = useState(false);
  const handleSubmit = (values: FormValues, { resetForm }: any) => {
    // Handle form submission
    onSubmit(values)
  };
  const handlePaid = () => {
    setPaid(!paid);
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
                <option value=''  disabled>
                  Select category
                </option>
                <option value='male'>Web</option>
                <option value='female'>Mobile</option>
                <option value='other'>Other</option>
              </Field>
              <ErrorMessage
                name='category'
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
          </div>
          <div>
            <div className='mb-3'>
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
                type='text'
                id='requirements'
                name='requirements'
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
                type='text'
                id='lessons'
                name='lessons'
                className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
              />
              <ErrorMessage
                name='lessons'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='mb-5 mt-2 pl-2 pt-5 '>
              <Switch id='auto-update' onClick={handlePaid} label='Paid' />
            </div>
            {paid && (
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
      </Form>
    </Formik>
  );
};

