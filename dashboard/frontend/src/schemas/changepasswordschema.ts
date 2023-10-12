import { InferType, object, ref, string } from 'yup';

export const ChangePasswordSchema = object().shape({
  password: string()
    .required('Please enter your password')
    .min(10, 'Password must be at least 10 charachters'),

  newpassword: string()
    .required('Please enter a new password')
    .min(10, 'Password must be at least 10 charachters'),

  repeatpassword: string()
    .required('Please enter your new password again')
    .oneOf([ref('password')], 'You have entered two different passwords'),
});

export type ChangePasswordType = InferType<typeof ChangePasswordSchema>;
