import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddCourseStepper from "../partials/Stepper";

const AddCourseForm = () => {
  const initialValues = {
    title: "",
    instructor: "",
    duration: "",
    thumbnail: "",
    introductionVideo: "",
    description: "",
    category: "",
    price: "",
    lessons: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    instructor: Yup.string().required("Instructor is required"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be a positive number"),
    thumbnail: Yup.string().url("Invalid URL"),
    introductionVideo: Yup.string().url("Invalid URL"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    lessons: Yup.string().required("Lessons are required"),
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Card color='transparent' shadow={false}>
      <div className='flex justify-center'>
        <div className='pl-5 pr-5 mb-5  w-2/3 '>
          <AddCourseStepper />
        </div>
      </div>
      <form className='mt-8 mb-2 w-90 max-w-screen-xl ' onSubmit={handleSubmit}>
        <div className='flex justify-center'>
          <div className='mb-4 mr-5 flex flex-col gap-6'>
            <Input
              size='lg'
              label='Title:'
              type='text'
              id='title'
              name='title'
              className='w-full px-4 py-2 border rounded'
            />
            <Input
              size='lg'
              label='Instructor:'
              type='text'
              id='instructor'
              name='instructor'
              className='w-full px-4 py-2 border rounded'
            />
            <Input
              size='lg'
              label='Duration (in hours):'
              type='number'
              id='duration'
              name='duration'
              className='w-full px-4 py-2 border rounded'
            />
            <Input
              size='lg'
              label='Thumbnail URL:'
              type='text'
              id='thumbnail'
              name='thumbnail'
              className='w-full px-4 py-2 border rounded'
            />
            {/* Add more fields for the first half of the form */}
          </div>
          <div className='mb-4 ml-5 flex flex-col gap-6'>
            <Input
              size='lg'
              label='Introduction Video URL:'
              type='text'
              id='introductionVideo'
              name='introductionVideo'
              className='w-full px-4 py-2 border rounded'
            />
            <Input
              size='lg'
              label='Description:'
              type='textarea'
              id='description'
              name='description'
              className='w-full px-4 py-2 border rounded'
            />
            <Input
              size='lg'
              label='Category:'
              type='text'
              id='category'
              name='category'
              className='w-full px-4 py-2 border rounded'
            />
            <Input
              size='lg'
              label='Price:'
              type='number'
              id='price'
              name='price'
              className='w-full px-4 py-2 border rounded'
            />
            <Input
              size='lg'
              label='Lessons:'
              type='textarea'
              id='lessons'
              name='lessons'
              className='w-full px-4 py-2 border rounded'
            />
            {/* Add more fields for the second half of the form */}
          </div>
        </div>
        <div className='mt-32  flex justify-end'>
          <Button className="mr-20  ">Next</Button>
        </div>
      </form>
    </Card>
  );
};

export default AddCourseForm;
