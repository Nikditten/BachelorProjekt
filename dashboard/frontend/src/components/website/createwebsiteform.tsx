import { CreateWebsiteFormSchema } from '@/schemas/createwebsite';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { MdClose } from 'react-icons/md';
import IconButton from '../buttons/iconbutton';
import InputField from '../inputfield/inputfield';

interface Props {
  isVisible: boolean;
  onHide: () => void;
  onSubmit: (name: string) => void;
}

const CreateWebsiteForm: FC<Props> = ({ isVisible, onHide, onSubmit }) => {
  if (!isVisible) return null;

  return (
    <div className='w-full h-48 relative shadow-md rounded-lg shadow-gray-400 flex flex-col justify-center items-center p-6'>
      <div className='absolute top-0 right-0 p-2 text-gray-400'>
        <IconButton onClick={onHide}>
          <MdClose />
        </IconButton>
      </div>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={CreateWebsiteFormSchema}
        onSubmit={(values) => {
          onSubmit(values.name);
          onHide();
        }}
      >
        <Form className='flex flex-row justify-center items-end gap-2'>
          <InputField
            name='name'
            label='Name'
          />
        </Form>
      </Formik>
    </div>
  );
};

export default CreateWebsiteForm;
