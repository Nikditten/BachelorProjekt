import { ShareWebsiteSchema, ShareWebsiteType } from "@/schemas/sharewebsite";
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
  onSubmit: (username: string) => void;
}

const ShareWebsiteForm: FC<Props> = ({ onHide, onSubmit, website }) => {
  const initialValues: ShareWebsiteType = {
    username: "",
  };

  const handleSubmit = (values: ShareWebsiteType, actions: any) => {
    const { username } = values;
    const { resetForm, setSubmitting } = actions;
    onSubmit(username);
    resetForm();
    setSubmitting(false);
    onHide();
  };

  return (
    <div className='relative flex h-56 w-full flex-col items-center justify-center rounded-lg p-6 shadow-md shadow-gray-400'>
      <div className='absolute right-0 top-0 p-2 text-gray-400'>
        <IconButton onClick={onHide}>
          <MdClose />
        </IconButton>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={ShareWebsiteSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {(props) => (
          <Form className='flex h-full w-11/12 flex-col items-center justify-center gap-2 self-start'>
            <InputField
              name='username'
              label='Username'
            />

            <ActionButton disabled={props.isSubmitting}>Share</ActionButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShareWebsiteForm;
