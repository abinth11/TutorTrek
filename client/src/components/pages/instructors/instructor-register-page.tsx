import React, { useState, ChangeEvent } from "react";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { registerInstructor } from "../../../api/endpoints/auth/instructor-auth";
import { instructorRegistrationValidationSchema } from "../../../validations/auth/InstructorRegisterValidation";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { InstructorRegisterDataInterface } from "../../../api/types/instructor/auth-interface";
import SpinnerDialog from "../../common/spinner-page";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  qualification: "",
  subjects: "",
  experience: "",
  skills: "",
  about: "",
  password: "",
  confirmPassword: "",
};

const InstructorRegistrationPage: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [certificate, setCertificateOne] = useState<File | null>(null);
  const [certificateTwo, setCertificateTwo] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setProfilePhoto(file);
  };

  const handleSubmit = async (
    instructorInfo: InstructorRegisterDataInterface,
    { resetForm }: FormikHelpers<InstructorRegisterDataInterface>
  ) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      profilePhoto && formData.append("images", profilePhoto,'profilePic');
      certificate && formData.append("images", certificate,'certificateOne');
      certificateTwo && formData.append("images", certificateTwo,'certificateTwo');
      Object.keys(instructorInfo).forEach((key) =>
        formData.append(key, instructorInfo[key])
      );
      const response = await registerInstructor(formData);
      setIsUploading(false);
      setProfilePhoto(null)
      setCertificateOne(null)
      setCertificateTwo(null)
      resetForm();
      toast.success(response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      }); 
    } catch (error: any) {
      setIsUploading(false);
      toast.error(error.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className='mt-4 pl-32 pr-32 my-3 pb-5  text-customFontColorBlack'>
      <div className='flex items-center justify-center'>
        {isUploading && <SpinnerDialog isUploading={isUploading} />}
        <div className=' w-2/3 ml-2 mt-6 mb-8 border p-10 shadow-xl rounded-lg'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img
              className='mx-auto h-10 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Your Company'
            />
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'></h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={instructorRegistrationValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form className=''>
              <div className='p-2  mt-6 '>
                <h1 className='font-semibold text-md customFontColorBlack'>
                  Personal information's:
                </h1>
              </div>
              <div className='mt-2 mb-2 bg-white border border-gray-200 p-8 rounded-lg'>
                <div className='flex flex-wrap -mx-3 mb-4'>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <label
                      htmlFor='lastName'
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      First Name
                    </label>
                    <div className='mt-2'>
                      <Field
                        id='firstName'
                        name='firstName'
                        type='text'
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
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Last Name
                    </label>
                    <div className='mt-2'>
                      <Field
                        id='lastName'
                        name='lastName'
                        type='text'
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
                <div className='flex flex-wrap -mx-3 mb-4'>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <label
                      htmlFor='email'
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Email
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
                  <div className='w-full md:w-1/2 px-3'>
                    <label
                      htmlFor='mobile'
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Mobile
                    </label>
                    <div className='mt-2'>
                      <Field
                        id='mobile'
                        name='mobile'
                        type='text'
                        autoComplete='mobile'
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
                </div>
              </div>
              <div className='p-2 mt-4 mb-1'>
                <h1 className='font-semibold text-md customFontColorBlack'>
                  Qualifications and Experiences:
                </h1>
              </div>
              <div className=' bg-white border border-gray-200 p-8 rounded-lg'>
                <div className='flex flex-wrap -mx-3 mb-4'>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <label
                      htmlFor='qualifications'
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Qualifications
                    </label>
                    <div className='mt-2'>
                      <Field
                        id='qualification'
                        name='qualification'
                        type='text'
                        autoComplete='qualification'
                        required
                        className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                      />
                      <ErrorMessage
                        name='qualification'
                        component='div'
                        className='text-red-500 text-sm'
                      />
                    </div>
                  </div>
                  <div className='w-full md:w-1/2 px-3'>
                    <label
                      htmlFor='subjects'
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Subjects
                    </label>
                    <div className='mt-2'>
                      <Field
                        id='subjects'
                        name='subjects'
                        type='text'
                        autoComplete='subjects'
                        required
                        className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                      />
                      <ErrorMessage
                        name='subjects'
                        component='div'
                        className='text-red-500 text-sm'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap -mx-3 mb-4'>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <label
                      htmlFor='experience'
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Experience
                    </label>
                    <div className='mt-2'>
                      <Field
                        id='experience'
                        name='experience'
                        type='text'
                        autoComplete='experience'
                        required
                        className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                      />
                      <ErrorMessage
                        name='experience'
                        component='div'
                        className='text-red-500 text-sm'
                      />
                    </div>
                  </div>
                  <div className='w-full md:w-1/2 px-3'>
                    <label
                      htmlFor='skills'
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Skills
                    </label>
                    <div className='mt-2'>
                      <Field
                        id='skills'
                        name='skills'
                        type='text'
                        autoComplete='skills'
                        required
                        className=' pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                      />
                      <ErrorMessage
                        name='skills'
                        component='div'
                        className='text-red-500 text-sm'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex flex-wrap -mx-3 mb-4'>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <label
                      htmlFor='photo'
                      className='mt-2 block  text-sm font-medium leading-6 text-gray-900'
                    >
                      Photo
                    </label>
                    <div className='col-span-full'>
                      <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                        <div className='text-center'>
                          {profilePhoto ? (
                            <img
                              src={URL.createObjectURL(profilePhoto)}
                              alt='Selected Photo'
                              className='mx-auto rounded-md h-40 w-40 object-contain'
                            />
                          ) : (
                            <PhotoIcon
                              className='mx-auto h-12 w-12 text-gray-300'
                              aria-hidden='true'
                            />
                          )}
                          <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                            <label
                              htmlFor='profile-photo'
                              className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                            >
                              {profilePhoto ? "Change file" : "Upload a file"}
                              <Field
                                id='profile-photo'
                                name='profile-photo'
                                type='file'
                                onChange={handleFileChange}
                                required
                                className='sr-only'
                              />
                            </label>
                            <p className='pl-1'>or drag and drop</p>
                          </div>
                          <p className='text-xs leading-5 text-gray-600'>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-1/2 px-3'>
                    <label
                      htmlFor='about'
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      About
                    </label>
                    <div className='mt-2'>
                      <Field
                        as='textarea'
                        id='about'
                        name='about'
                        autoComplete='about'
                        required
                        className='h-full pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                      />
                      <ErrorMessage
                        name='about'
                        component='div'
                        className='text-red-500 text-sm'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-2 mt-4 mb-1'>
                <h1 className='font-semibold text-md customFontColorBlack'>
                  Certificates
                </h1>
              </div>
              <div className='flex justify-between border border-gray-200 p-8 rounded-lg '>
                <div className='flex flex-wrap w-full md:w-1/2 -mx-3 mb-4'>
                  <div className='w-full px-3 mb-6 md:mb-0'>
                    <label
                      htmlFor='photo'
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Certificate 1
                    </label>
                    <div className='col-span-full'>
                      <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                        <div className='text-center'>
                          {certificate ? (
                            <img
                              src={URL.createObjectURL(certificate)}
                              alt='Selected Photo'
                              className='mx-auto rounded-md h-40 w-40 object-contain'
                            />
                          ) : (
                            <PhotoIcon
                              className='mx-auto h-12 w-12 text-gray-300'
                              aria-hidden='true'
                            />
                          )}
                          <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                            <label
                              htmlFor='certificate-one'
                              className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                            >
                              <span>
                                {certificate ? "Change file " : "Upload a file"}
                              </span>
                              <Field
                                id='certificate-one'
                                name='certificate-one'
                                type='file'
                                required
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const file = event.target.files?.[0] || null;
                                  setCertificateOne(file);
                                }}
                                className='sr-only'
                              />
                            </label>
                            <p className='pl-1'>or drag and drop</p>
                          </div>
                          <p className='text-xs leading-5 text-gray-600'>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap w-full md:w-1/2 -mx-3 mb-4'>
                  <div className='w-full px-3 mb-6 md:mb-0'>
                    <label
                      htmlFor='photo'
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Certificate 2
                    </label>
                    <div className='col-span-full'>
                      <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                        <div className='text-center'>
                          {certificateTwo ? (
                            <img
                              src={URL.createObjectURL(certificateTwo)}
                              alt='Selected Photo'
                              className='mx-auto rounded-md h-40 w-40 object-contain'
                            />
                          ) : (
                            <PhotoIcon
                              className='mx-auto h-12 w-12 text-gray-300'
                              aria-hidden='true'
                            />
                          )}

                          <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                            <label
                              htmlFor='certificate-two'
                              className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                            >
                              <span>
                                {certificateTwo
                                  ? "Change file"
                                  : "Upload a file "}
                              </span>
                              <Field
                                id='certificate-two'
                                name='certificate-two'
                                type='file'
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const file = event.target.files?.[0] || null;
                                  setCertificateTwo(file);
                                }}
                                required
                                className='sr-only'
                              />
                            </label>
                            <p className='pl-1'>or drag and drop</p>
                          </div>
                          <p className='text-xs leading-5 text-gray-600'>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-2 mt-4 mb-1  '>
                <h1 className='font-semibold text-md customFontColorBlack'>
                  Account information's
                </h1>
              </div>
              <div className=' bg-white border border-gray-200 p-8 rounded-lg'>
                <div className='flex flex-wrap -mx-3 mb-4'>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
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
                  <div className='w-full md:w-1/2 px-3'>
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
                </div>
              </div>
              <div className='mt-6 flex items-center justify-end gap-x-6'>
                <button
                  type='button'
                  className='text-sm font-semibold leading-6 text-gray-900'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Sign up
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default InstructorRegistrationPage;
