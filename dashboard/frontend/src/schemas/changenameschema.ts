import { InferType, object, string } from "yup";

export const ChangeNameSchema = object().shape({
  name: string().required("This field cannot be empty"),
});

export type ChangeNameType = InferType<typeof ChangeNameSchema>;
