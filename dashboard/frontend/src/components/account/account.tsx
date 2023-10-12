import {
  ChangeUsernameSchema,
  ChangeUsernameType,
} from '@/schemas/changeemailschema';
import {
  ChangePasswordSchema,
  ChangePasswordType,
} from '@/schemas/changepasswordschema';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import ActionButton from '../buttons/actionbutton';
import Modal from '../dialogs/modal';
import InputField from '../inputfield/inputfield';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Account: FC<Props> = ({ isOpen, onClose }) => {
  const changeUsernameInitialValue: ChangeUsernameType = {
    username: '',
  };

  const changePasswordInitialValue: ChangePasswordType = {
    password: '',
    newpassword: '',
    repeatpassword: '',
  };

  return (
    <Modal
      isShown={isOpen}
      onClose={onClose}
    >
      <div className='flex flex-col w-full h-full gap-6'>
        <h1 className='w-full text-4xl text-center'>Account settings</h1>
        <div className='flex flex-col items-center w-full h-full gap-4 md:items-start md:flex-row justify-start md:justify-evenly md:gap-0'>
          <Formik
            initialValues={changeUsernameInitialValue}
            validationSchema={ChangeUsernameSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form className='flex flex-col gap-2'>
                <InputField
                  name='username'
                  label='Username'
                />

                <ActionButton
                  type='submit'
                  disabled={props.isSubmitting}
                >
                  Change username
                </ActionButton>
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={changePasswordInitialValue}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form className='flex flex-col gap-2'>
                <InputField
                  name='password'
                  label='Old password'
                />

                <InputField
                  name='newpassword'
                  label='New password'
                />

                <InputField
                  name='repeatpassword'
                  label='Repeat password'
                />

                <ActionButton
                  type='submit'
                  disabled={props.isSubmitting}
                >
                  Change password
                </ActionButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default Account;
