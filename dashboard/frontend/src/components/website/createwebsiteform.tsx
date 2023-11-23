import { CreateWebsiteFormSchema } from "@/schemas/createwebsite";
import { IWebsite } from "@/utils/types";
import { Form, Formik } from "formik";
import { FC } from "react";
import { MdClose } from "react-icons/md";
import ActionButton from "../buttons/actionbutton";
import IconButton from "../buttons/iconbutton";
import InputField from "../inputfield/inputfield";

interface Props {
  website?: IWebsite;
  onHide: () => void;
  onSubmit: (name: string, url: string) => void;
}

const CreateWebsiteForm: FC<Props> = ({ onHide, onSubmit, website }) => {
  const initialValues = website
    ? {
        name: website.name,
        url: website.url,
      }
    : {
        name: "",
        url: "",
      };

  const submitText = website ? "Update" : "Create";

  return (
    <div className='relative flex h-56 w-full flex-col items-center justify-center rounded-lg p-6 shadow-md shadow-gray-400'>
      <div className='absolute right-0 top-0 p-2 text-gray-400'>
        <IconButton onClick={onHide}>
          <MdClose />
        </IconButton>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={CreateWebsiteFormSchema}
        onSubmit={(values, actions) => {
          onSubmit(values.name, values.url);
          actions.resetForm();
          actions.setSubmitting(false);
          onHide();
        }}
      >
        {(props) => (
          <Form className='flex h-full w-11/12 flex-col items-center justify-center gap-2 self-start'>
            <InputField
              name='name'
              placeholder='Name'
            />

            <InputField
              name='url'
              placeholder='Url'
              type='url'
            />

            <ActionButton disabled={props.isSubmitting}>
              {submitText}
            </ActionButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateWebsiteForm;
