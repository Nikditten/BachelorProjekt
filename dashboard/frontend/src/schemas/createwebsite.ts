import { InferType, object, string } from 'yup';

export const CreateWebsiteFormSchema = object().shape({
  name: string().required("Give your website a name")
});

export type CreateWebsiteFormType = InferType<typeof CreateWebsiteFormSchema>;
