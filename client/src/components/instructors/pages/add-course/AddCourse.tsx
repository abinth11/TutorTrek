import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AddCourseValidationSchema } from "../../../../validations/instructors/AddCourse";
import { Switch } from "@material-tailwind/react";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  instructor: Yup.string().required("Instructor is required"),
  duration: Yup.string().required("Duration is required"),
  description: Yup.string().required("Description is required"),
  requirements: Yup.string().required("Requirements are required"),
  lessons: Yup.string().required("Lessons are required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number().when("paid", {
    is: true,
    then: Yup.number().required("Price is required") as any,
    otherwise: Yup.number() as any,
  }),
  tags: Yup.string().required("Tags are required"),
  introductionVideo: Yup.mixed().required("Introduction video is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
});

const CombinedForm: React.FC = () => {
  const [paid, setPaid] = useState(false);

  const handleFormSubmit = (values:any) => {
   console.log(values)
  };

  const handlePaid = () => {
    setPaid(!paid);
  };

  return (
    <div className="mb-20">
      <div className="ml-12 pl-20">
      <h1 className="font-bold text-xl text-gray-800">Create Course</h1>
      </div>
      <Formik
        initialValues={{
          title: "",
          instructor: "",
          duration: "",
          description: "",
          requirements: "",
          lessons: "",
          category: "",
          price: "",
          tags: "",
          introductionVideo: null,
          thumbnail: null,
        }}
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
                    htmlFor='instructor'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Instructor
                  </label>
                  <Field
                    type='text'
                    id='instructor'
                    name='instructor'
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
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
                    type='text'
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
                    // onChange={(event) => {
                    //   form.setFieldValue("introductionVideo", event.currentTarget.files?.[0]);
                    //   handleVideoChange(event);
                    // }}                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
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
                    // onChange={(event) => {
                    //   form.setFieldValue("thumbnail", event.currentTarget.files?.[0]);
                    //   handleThumbnailChange(event);
                    // }}
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
            type="submit"
              className="bg-blue-500 mt-5 text-white px-3 py-2 rounded-md">
              Submit
            </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CombinedForm;
