import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { AddCourseValidationSchema } from "../../../validations/course/AddCourse";
import { Switch } from "@material-tailwind/react";
import { addCourse } from "../../../api/endpoints/course/course";
import { toast } from "react-toastify";
import { getAllCategories } from "../../../api/endpoints/category";
import { ApiResponseCategory } from "../../../api/types/apiResponses/api-response-category";
interface CourseFormValues {
  title: string;
  duration: string;
  category: string;
  level: string;
  tags: string;
  about: string;
  description: string;
  syllabus: string;
  requirements: string;
  price: string;
  [key: string]: string;
}

const initialValues = {
  title: "",
  duration: "",
  category: "",
  level: "",
  tags: "",
  about: "",
  description: "",
  syllabus: "",
  requirements: "",
  price: "",
};

const CombinedForm: React.FC = () => {
  const [paid, setPaid] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [guidelines, setGuidelines] = useState<File | null>(null);
  const [introduction,setIntroduction] = useState<File | null>(null)
  const [categories, setCategories] = useState<ApiResponseCategory[] | null>(
    null
  );

  const handleFormSubmit = async (
    values: CourseFormValues,
    { resetForm }: FormikHelpers<CourseFormValues>
  ) => {
    try {
      const formData = new FormData();
      guidelines && formData.append("files", guidelines);
      thumbnail && formData.append("files", thumbnail);
      introduction && formData.append("files",introduction)
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      const response = await addCourse(formData);
      toast.success(response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      resetForm();
      setGuidelines(null)
      setThumbnail(null)
      setIntroduction(null)
    } catch (error: any) {
      toast.error(error.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handlePaid = () => {
    setPaid(!paid);
  };

  return (
    <div className='mb-20'>
      <div className='ml-12 pl-20'>
        <h1 className='font-bold text-xl text-gray-800'>Create Course</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={AddCourseValidationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <div className='bg-white ml-32  rounded-lg border-2 border-gray-200 mr-32 mb-24 mt-2 p-5'>
            <div className='flex  w-full justify-center mt-10 pt-3 space-x-14 '>
              <div>
                <div className='mb-3'>
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

                <div className='mb-3'>
                  <label
                    htmlFor='duration'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Duration (in weeks)
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

                <div className='mb-3'>
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
                    {categories?.map(({ _id, name }, index) => (
                      <option selected={index === 0} key={_id}>
                        {name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name='category'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>

                <div className='mb-3'>
                  <label
                    htmlFor='level'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Level
                  </label>
                  <Field
                    as='select'
                    id='level'
                    name='level'
                    className='pl-2 block w-80 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  >
                    <option value='easy' selected>
                      Easy
                    </option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                  </Field>
                  <ErrorMessage
                    name='level'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
                <div className='mb-3'>
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

                <div className='mb-3'>
                  <div className='mb-5 mt-2 pl-2 pt-5 '>
                    <Switch
                      id='auto-update'
                      onClick={handlePaid}
                      label='Paid'
                    />
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

                  <div className='mb-2'>
                    <label
                      htmlFor='introduction-video'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Introduction video
                    </label>
                    <input
                      type='file'
                      id='introduction-video'
                      name='introduction-video'
                      accept='video/*'
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        setIntroduction(file);
                      }}
                      required
                      className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='introduction-video'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className='mb-2'>
                  <label
                    htmlFor='about'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    About
                  </label>
                  <Field
                    as='textarea'
                    id='about'
                    name='about'
                    rows={4}
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='about'
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
                    htmlFor='syllabus'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Syllabus
                  </label>
                  <Field
                    as='textarea'
                    id='syllabus'
                    name='syllabus'
                    rows={4}
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='syllabus'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
                <div className='mb-2'>
                  <label
                    htmlFor='syllabus'
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
              </div>
            </div>
            <div className='flex w-full justify-center mt-14 pt-3 space-x-14'>
              <div>
                <div className='mb-2'>
                  <label
                    htmlFor='guidelines'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Course guidelines
                  </label>
                  <input
                    type='file'
                    id='guidelines'
                    name='guidelines'
                    accept='application/pdf'
                    onChange={(event) => {
                      const file = event.target.files?.[0] || null;
                      setGuidelines(file);
                    }}
                    required
                    className='pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='guidelines'
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
                    required
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

export default CombinedForm;
