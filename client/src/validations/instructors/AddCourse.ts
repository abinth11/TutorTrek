import * as Yup from "yup";
export const AddCourseValidationSchema = Yup.object().shape({
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
  });