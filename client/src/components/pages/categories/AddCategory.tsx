import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CategoryValidationSchema } from "../../../validations/category";
import { toast } from "react-toastify";
import { addCategory } from "../../../api/endpoints/category";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
};

interface Category {
  name: string;
  description: string;
}

const AddCategory: React.FC = () => {
  const navigate = useNavigate()
  const handleSubmit = async (
    category: Category,
    { resetForm }: FormikHelpers<Category>
  ) => {
    try {
      const response = await addCategory(category);
      toast.success(response?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      resetForm();
      navigate('/admin/categories')
    } catch (error) {
      toast.error("Failed to add category", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  return (
    <div className='flex justify-center items-center w-full p-3 pb-56 bg-gray-100 text-customFontColorBlack'>
      <div className='bg-white rounded-lg mx-10 p-4  mt-28 w-1/3 md:mx-auto md:p-10 lg:p-12'>
        <Formik
          initialValues={initialValues}
          validationSchema={CategoryValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form className='mt-10 space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Category name
              </label>
              <div className='mt-2'>
                <Field
                  id='name'
                  name='name'
                  type='text'
                  autoComplete='name'
                  className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='name'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Description
                </label>
              </div>
              <div className='mt-2'>
                <Field
                  id='description'
                  name='description'
                  type='text'
                  autoComplete='description'
                  className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='description'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
            </div>

            <div className=' mt-2'>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Add
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default AddCategory;
