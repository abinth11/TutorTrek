import * as Yup from "yup";
export const lessonSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    contents: Yup.string().required("Contents are required"),
    about: Yup.string().required("about is required"),
    // videoFile: Yup.string().required("Video file is required"),
    // studyMaterials: Yup.string().required("Video file is required"),
    // questions: Yup.array().of(
    //   Yup.object().shape({
    //     question: Yup.string().required("Question is required"),
    //     options: Yup.array().of(
    //       Yup.object().shape({
    //         option: Yup.string().required("Option is required"),
    //         isCorrect: Yup.boolean().required("Is Correct is required"),
    //       })
    //     ),
    //   })
    // ),
  });