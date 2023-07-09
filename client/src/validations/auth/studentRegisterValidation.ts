import { object, string, ref } from "yup";

export const studentRegistrationValidationSchema = object().shape({
  firstName: string().trim().required("First Name is required"),
  lastName: string().trim().required("Last Name is required"),
  email: string().email("Invalid email").trim().required("Email is required"),
  mobile: string().trim()
    .required("Mobile number is required")
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/,
      "Please enter a valid 10-digit mobile number"
    ),
  password: string().required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
