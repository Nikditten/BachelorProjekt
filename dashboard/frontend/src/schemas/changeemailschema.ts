import { InferType, object, string } from 'yup';

export const ChangeUsernameSchema = object().shape({
  username: string().required('This field cannot be empty'),
});

export type ChangeUsernameType = InferType<typeof ChangeUsernameSchema>;
