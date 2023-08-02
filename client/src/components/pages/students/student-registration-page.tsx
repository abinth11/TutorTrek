import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerStudent } from "../../../api/endpoints/auth/student-auth";
import { studentRegistrationValidationSchema } from "../../../validations/auth/studentRegisterValidation";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SelectInterest from "./custom-select-box";
import { StudentData } from "../../../types/student";
import { useNavigate } from "react-router-dom";
import { APP_LOGO } from "../../../constants/common";
import GoogleAuthComponent from "../../common/google-auth-component";

const StudentRegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (studentInfo: StudentData) => {
    try {   
       await registerStudent(studentInfo);   
      toast.success("User registered", {  
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className="m-5 pt-16  pb-20">
      <div className="flex justify-center items-center h-screen text-customFontColorBlack">
        <div className="bg-white rounded-lg mx-4 sm:mx-auto md:mx-auto pt-10 lg:mx-auto shadow-xl p-4 sm:p-10 md:p-8 lg:p-10 w-full max-w-xl border">
          <div className='mb-8 sm:mx-auto sm:w-full sm:max-w-sm'>
            <img
              className='mx-auto h-10 w-auto'
              src={APP_LOGO}
              alt='Your Company'
            />
            <h2 className='mt-3 lg:mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Register here..
            </h2>
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              mobile: "",
              interests: [],
            }}
            validationSchema={studentRegistrationValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className='flex flex-wrap -mx-3 mb-4'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label
                    htmlFor='lastName'
                    className='md:mt-2 block text-sm font-medium leading-6 text-gray-900'
                  >
                    First Name
                  </label>
                  <div className='md:mt-2'>
                    <Field
                      id='firstName'
                      name='firstName'
                      type='firstName'
                      autoComplete='firstName'
                      required
                      className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='firstName'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
                <div className='w-full md:w-1/2 px-3'>
                  <label
                    htmlFor='lastName'
                    className='md:mt-2 block text-sm font-medium leading-6 text-gray-900'
                  >
                    Last Name
                  </label>
                  <div className='md:mt-2'>
                    <Field
                      id='lastName'
                      name='lastName'
                      type='lastName'
                      autoComplete='lastName'
                      required
                      className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                    />
                    <ErrorMessage
                      name='lastName'
                      component='div'
                      className='text-red-500 text-sm'
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <Field
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='mobile'
                  className='block mt-2 text-sm font-medium leading-6 text-gray-900'
                >
                  Mobile
                </label>
                <div className='mt-2'>
                  <Field
                    id='mobile'
                    name='mobile'
                    type='number'
                    autoComplete='mobile'
                    maxLength={10}
                    required
                    className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='mobile'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>
              <SelectInterest />
              <div>
                <label
                  htmlFor='password'
                  className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='mt-2'>
                  <Field
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='password'
                    required
                    className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='confirmPassword'
                  className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                >
                  Confirm password
                </label>
                <div className='mt-2'>
                  <Field
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    autoComplete='confirmPassword'
                    required
                    className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  />
                  <ErrorMessage
                    name='confirmPassword'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                </div>
              </div>
              <div className='m-5'>
                <GoogleAuthComponent />
              </div>
              <div className='flex flex-col md:flex-row items-center justify-between mb-6'>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                >
                  Sign up
                </button>
              </div>
            </Form>
          </Formik>
          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account?
            <Link
              to='/login'
              className='font-semibold leading-6 text-blue-600 hover:text-indigo-500'
            >
              &nbsp; Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationPage;
