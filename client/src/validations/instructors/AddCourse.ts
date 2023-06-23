import * as Yup from "yup";
export const AddCourseValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    instructor: Yup.string().required("Instructor is required"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be a positive number"),
    requirements: Yup.string().required("requirements is required"),
    lessons: Yup.string().required("lessons is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
      // introductionVideo: Yup.mixed().required("Introduction video is required"),
      // thumbnail: Yup.mixed().required("Thumbnail is required"),
  });

 export const QuizValidationSchema = Yup.object().shape({
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        options: Yup.array()
          .of(
            Yup.object().shape({
              option: Yup.string().required("Option is required"),
              isCorrect: Yup.boolean().required("Specify if the option is correct"),
            })
          )
          .required("At least one option is required"),
      })
    ),
  });