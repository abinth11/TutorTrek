import * as Yup from "yup";

export const PasswordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters'),
    repeatPassword: Yup.string()
      .required('Confirm password is required')
      .test('password-match', 'Passwords must match', function (value) {
        return value === this.parent.newPassword;
      }),
  });