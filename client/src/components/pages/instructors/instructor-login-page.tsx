import React,{useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { instructorLoginValidationSchema } from "../../../validations/auth/InstructorLoginValidation";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginInstructor } from "../../../api/endpoints/auth/instructor-auth";
import { InstructorLoginInfo } from "../../../api/types/instructor/auth-interface";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../redux/reducers/authSlice";
import { selectUserType } from "../../../redux/reducers/authSlice";
import { selectIsLoggedIn } from "../../../redux/reducers/authSlice";
const InstructorLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUserType)
  const handleSubmit = async (instructorInfo: InstructorLoginInfo) => {
    try {
      const response = await loginInstructor(instructorInfo);
      const {accessToken,refreshToken}:{accessToken:string,refreshToken:string} = response.data
      dispatch(setToken({accessToken,refreshToken,userType:"instructor"}))
      toast.success(response?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      }); 
      response && navigate('/instructors')
    } catch (error:any) {
      toast.error(error.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  useEffect(() => {
    if(isLoggedIn&&user==="instructor"){
      navigate("/instructors")
    }
  },[])
  

  return (
    <div className='flex justify-center items-center mt-20 pt-5 pb-20  text-customFontColorBlack'>
      <div className='bg-white rounded-lg mx-10 shadow-xl border p-8 w-full max-w-md md:mx-auto md:p-10 lg:p-12'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-10 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={instructorLoginValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form className='mt-10 space-y-6'>
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
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='/'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <Field
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-red-500 text-sm'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign in
              </button>
            </div>
          </Form>
        </Formik>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Do not have an account?
          <Link
            to='/instructors/register'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            &nbsp; Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default InstructorLoginPage;
