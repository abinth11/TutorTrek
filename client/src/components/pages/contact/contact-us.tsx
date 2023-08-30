import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { submitResponse } from "api/endpoints/contact";

const ContactUs: React.FC = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    message: Yup.string().required("Required"),
  });

  const onSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      const response = await submitResponse(values);
      response.status === "success" &&
        toast.success(response?.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      resetForm();
    } catch (error) {
      toast.error("Failed to submitted your response..!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className='flex justify-center items-center md:p-10'>
      <div className='px-4 py-8 w-3/4'>
        <h1 className='text-3xl font-semibold mb-4'>Contact Us</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Your Name
                </label>
                <Field
                  type='text'
                  id='name'
                  name='name'
                  className='w-full border rounded px-3 py-2 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='name'
                  component='div'
                  className='text-red-500'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Your Email
                </label>
                <Field
                  type='email'
                  id='email'
                  name='email'
                  className='w-full border rounded px-3 py-2 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='text-red-500'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='message'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Your Message
                </label>
                <Field
                  as='textarea'
                  id='message'
                  name='message'
                  className='w-full border rounded px-3 py-2 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                  rows={4}
                />
                <ErrorMessage
                  name='message'
                  component='div'
                  className='text-red-500'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactUs;
