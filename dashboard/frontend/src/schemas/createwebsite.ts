import { InferType, object, string } from "yup";

export const CreateWebsiteFormSchema = object().shape({
  name: string().required("Give your website a name"),
  url: string().required("Give your website a url"),
});

export type CreateWebsiteFormType = InferType<typeof CreateWebsiteFormSchema>;
