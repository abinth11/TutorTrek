import * as Yup from "yup";
export const CategoryValidationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  description: Yup.string().required("description is required"),
});
