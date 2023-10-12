import { InferType, object, string } from 'yup';

export const SignupSchema = object().shape({
  name: string().required('Please enter your name'),
  username: string().required('Please enter your username'),
  password: string()
    .required('Please enter your password')
    .min(10, 'Password must be at least 10 charachters'),
});

export type SignupType = InferType<typeof SignupSchema>;
