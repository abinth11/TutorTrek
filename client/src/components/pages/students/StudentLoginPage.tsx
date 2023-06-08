import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginStudent } from "../../../api/endpoints/student/auth";
import { handleApiError } from "../../../api/utils/apiError";
import { studentLoginValidationSchema } from "../../../validations/student/studentLoginValidation";
import {toast} from 'react-toastify'


const StudentLoginPage: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmit = async (studentInfo: any) => {
    try {
      const response = await loginStudent(studentInfo);
      console.log("User logged in:", response);
    } catch (error) {
      setErrorMsg(handleApiError(error));
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100 text-customFontColorBlack'>
      <div className='bg-white rounded-lg mx-10 shadow-xl p-8 w-full max-w-md md:mx-auto md:p-10 lg:p-12'>
        <div className='flex flex-col md:flex-row items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold mb-4'>Login</h2>
          <div className='flex items-center'>
            <span className='mr-2'>or</span>
            <a
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2 md:mt-0'
              href='#'
            >
              Create an account
            </a>
          </div>
        </div>

        <div className='flex items-center mb-6'>
          <button
            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border-dashed border-gray-400 rounded shadow flex items-center justify-center w-full'
            type='button'
          >
            <div className='flex items-center'>
              <img
                className='w-4 h-4 mr-2'
                src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                alt='Google Logo'
              />
              <span>Sign In with Google</span>
            </div>
          </button>
        </div>
        <div className='flex items-center justify-center my-9'>
          <hr className='flex-grow border-gray-300 bg-gray-300 w-full h-px shadow-md' />
          <span className='px-4 text-gray-600'>Or</span>
          <hr className='flex-grow border-gray-300 bg-gray-300 w-full h-px shadow-md' />
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={studentLoginValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <Field
                className='appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
                id='email'
                name='email'
                type='text'
                placeholder='Enter your email'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <Field
                className='appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
                id='password'
                name='password'
                type='password'
                placeholder='Enter your password'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between mb-6'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto'
                type='submit'
              >
                Sign In
              </button>
              <a
                className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2 md:mt-0'
                href='#'
              >
                Forgot Password?
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default StudentLoginPage;
