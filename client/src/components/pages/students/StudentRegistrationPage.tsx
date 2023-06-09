import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerStudent } from "../../../api/endpoints/student/auth";
import { handleApiError } from "../../../api/utils/apiError";
import { studentRegistrationValidationSchema } from "../../../validations/student/studentRegisterValidation";
import { toast } from "react-toastify";

const StudentRegistrationPage: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (studentInfo: any) => {
    try {
        const response = await registerStudent(studentInfo);
        console.log("User registered:", response);
        toast.success("User registered", {
          position: toast.POSITION.TOP_CENTER,
        });
    } catch (error) {
      setErrorMsg(handleApiError(error));
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100 text-customFontColorBlack'>
      <div className='bg-white rounded-lg mx-10 shadow-xl p-8 w-full max-w-xl md:mx-auto md:p-10 lg:p-12'>
        <div className='flex flex-col md:flex-row items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold mb-4'>Register</h2>
          <div className='flex items-center'>
            <span className='mr-2'>or</span>
            <a
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2 md:mt-0'
              href='#'
            >
              Login
            </a>
          </div>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={studentRegistrationValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className='flex flex-wrap -mx-3 mb-4'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='firstName'
                >
                  First Name
                </label>
                <Field
                  className='appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
                  id='firstName'
                  name='firstName'
                  type='text'
                  placeholder='Enter your first name'
                />
                <ErrorMessage
                  name='firstName'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='lastName'
                >
                  Last Name
                </label>
                <Field
                  className='appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
                  id='lastName'
                  name='lastName'
                  type='text'
                  placeholder='Enter your last name'
                />
                <ErrorMessage
                  name='lastName'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
            </div>

            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <Field
                className='appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none                focus:border-blue-500'
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
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='mobile'
              >
                Mobile
              </label>
              <Field
                className='appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none                focus:border-blue-500'
                id='mobile'
                name='mobile'
                type='text'
                placeholder='Enter your number'
              />
              <ErrorMessage
                name='mobile'
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
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='confirmPassword'
              >
                Confirm password
              </label>
              <Field
                className='appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Re enter your password'
              />
              <ErrorMessage
                name='confirmPassword'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between mb-6'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto'
                type='submit'
              >
                Register
              </button>
              <a
                className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2 md:mt-0'
                href='#'
              >
                Already have an account?
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default StudentRegistrationPage;
