import { object, string, InferType } from "yup";

export const LoginSchema = object().shape({
  username: string().required("Please enter your username"),
  password: string()
    .required("Please enter your password")
    .min(10, "Password must be at least 10 charachters"),
});

export type LoginCredentials = InferType<typeof LoginSchema>;