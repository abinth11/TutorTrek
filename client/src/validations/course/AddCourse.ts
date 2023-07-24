import * as Yup from "yup";
export const AddCourseValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be a positive number"),
    
    category: Yup.string().required("Category is required"),
    level:Yup.string().required("Level is required"),
    tags:Yup.string().required('Tags are required'),
    about:Yup.string().required("About is required"),
    description: Yup.string().min(10,"Description is too short").required("Description is required"),
    syllabus:Yup.string().required("Syllabus is required"),
    requirements: Yup.string().required("requirements is required"),
    // price: Yup.number().when("paid", {
    //   is: true,
    //   then: Yup.number().required("Price is required") as any,
    //   otherwise: Yup.number() as any,
    // })
    // thumbnail: Yup.mixed().required("Thumbnail is required"),
    // guidelines: Yup.mixed<CustomFile>().test(
    //   "fileFormat",
    //   "Invalid file format. Only PDF files are allowed.",
    //   (value) => {
    //     if (!value) return true; // If no file is selected, consider it valid
  
    //     const supportedFormats = ["application/pdf"];
    //     return supportedFormats.includes(value.type);
    //   }
    // ),
  });

  interface CustomFile {
    type: string;
    size: number;
    name: string;
  }
    
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