import { InferType, object, string } from "yup";

export const LoginSchema = object().shape({
  username: string().required("Please enter your username"),
  password: string().required("Please enter your password"),
});

export type LoginType = InferType<typeof LoginSchema>;
