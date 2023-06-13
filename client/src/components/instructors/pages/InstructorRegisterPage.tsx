import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { instructorRegistrationValidationSchema } from "../../../validations/instructors/InstructorRegisterValidation";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const InstructorRegistrationPage: React.FC = () => {
  const handleSubmit = async (instructorInfo: any) => {
    try {
        console.log(instructorInfo)
      toast.success("Your registration is pending verification by the administrators.You will receive an email once your registration is approved", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error: any) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className='mt-4 pl-32 pr-32 my-3 pb-5   bg-gray-100 text-customFontColorBlack'>
      <div className='flex items-center justify-center'>
        <div className=' w-1/2 ml-2 mt-6 mb-8'>
          <div className='flex items-center justify-center'>
            <h2 className='font-bold text-xl'>Sign up to post courses</h2>
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              mobile: "",
              qualification: "",
              subjects:"",
              experience:"",
              skills:"",
              about:"",
              password:"",
              confirmPassword:""
            }}
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
                      className='mt-2 block text-sm font-medium leading-6 text-gray-900'
                    >
                      Photo
                    </label>
                    <div className='col-span-full'>
                      <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                        <div className='text-center'>
                          <PhotoIcon
                            className='mx-auto h-12 w-12 text-gray-300'
                            aria-hidden='true'
                          />
                          <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                            <label
                              htmlFor='photo'
                              className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                            >
                              <span>Upload a file</span>
                              <Field
                                id='photo'
                                name='photo'
                                type='file'
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
                        className=' h-full pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
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

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

export function InstructorRegistrationPages() {
  return (
    <form>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Profile
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-4'>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Username
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'>
                    workcation.com/
                  </span>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    autoComplete='username'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='janesmith'
                  />
                </div>
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='about'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                About
              </label>
              <div className='mt-2'>
                <textarea
                  id='about'
                  name='about'
                  rows={3}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  defaultValue={""}
                />
              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>
                Write a few sentences about yourself.
              </p>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='photo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Photo
              </label>
              <div className='mt-2 flex items-center gap-x-3'>
                <UserCircleIcon
                  className='h-12 w-12 text-gray-300'
                  aria-hidden='true'
                />
                <button
                  type='button'
                  className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                >
                  Change
                </button>
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='cover-photo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Cover photo
              </label>
              <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                <div className='text-center'>
                  <PhotoIcon
                    className='mx-auto h-12 w-12 text-gray-300'
                    aria-hidden='true'
                  />
                  <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                    >
                      <span>Upload a file</span>
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
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

        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Personal Information
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Use a permanent address where you can receive mail.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label
                htmlFor='first-name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                First name
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='first-name'
                  id='first-name'
                  autoComplete='given-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='last-name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Last name
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='last-name'
                  id='last-name'
                  autoComplete='family-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='country'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Country
              </label>
              <div className='mt-2'>
                <select
                  id='country'
                  name='country'
                  autoComplete='country-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='street-address'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Street address
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='street-address'
                  id='street-address'
                  autoComplete='street-address'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-2 sm:col-start-1'>
              <label
                htmlFor='city'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                City
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='city'
                  id='city'
                  autoComplete='address-level2'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='region'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                State / Province
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='region'
                  id='region'
                  autoComplete='address-level1'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='postal-code'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                ZIP / Postal code
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='postal-code'
                  id='postal-code'
                  autoComplete='postal-code'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Notifications
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            We'll always let you know about important changes, but you pick what
            else you want to hear about.
          </p>

          <div className='mt-10 space-y-10'>
            <fieldset>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                By Email
              </legend>
              <div className='mt-6 space-y-6'>
                <div className='relative flex gap-x-3'>
                  <div className='flex h-6 items-center'>
                    <input
                      id='comments'
                      name='comments'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                  </div>
                  <div className='text-sm leading-6'>
                    <label
                      htmlFor='comments'
                      className='font-medium text-gray-900'
                    >
                      Comments
                    </label>
                    <p className='text-gray-500'>
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className='relative flex gap-x-3'>
                  <div className='flex h-6 items-center'>
                    <input
                      id='candidates'
                      name='candidates'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                  </div>
                  <div className='text-sm leading-6'>
                    <label
                      htmlFor='candidates'
                      className='font-medium text-gray-900'
                    >
                      Candidates
                    </label>
                    <p className='text-gray-500'>
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className='relative flex gap-x-3'>
                  <div className='flex h-6 items-center'>
                    <input
                      id='offers'
                      name='offers'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                  </div>
                  <div className='text-sm leading-6'>
                    <label
                      htmlFor='offers'
                      className='font-medium text-gray-900'
                    >
                      Offers
                    </label>
                    <p className='text-gray-500'>
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Push Notifications
              </legend>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                These are delivered via SMS to your mobile phone.
              </p>
              <div className='mt-6 space-y-6'>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='push-everything'
                    name='push-notifications'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='push-everything'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Everything
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='push-email'
                    name='push-notifications'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='push-email'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Same as email
                  </label>
                </div>
                <div className='flex items-center gap-x-3'>
                  <input
                    id='push-nothing'
                    name='push-notifications'
                    type='radio'
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='push-nothing'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
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
          Save
        </button>
      </div>
    </form>
  );
}
