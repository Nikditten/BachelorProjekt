import { InferType, object, string } from "yup";

export const ShareWebsiteSchema = object().shape({
  username: string().required("Please enter your username"),
});

export type ShareWebsiteType = InferType<typeof ShareWebsiteSchema>;
