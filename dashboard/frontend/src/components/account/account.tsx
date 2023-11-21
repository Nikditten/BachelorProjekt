import { ChangeNameSchema, ChangeNameType } from "@/schemas/changenameschema";
import {
  ChangePasswordSchema,
  ChangePasswordType,
} from "@/schemas/changepasswordschema";
import {
  ChangeUsernameSchema,
  ChangeUsernameType,
} from "@/schemas/changeusernameschema";
import { useAuth } from "@/services/auth/useAuth";
import { useBackendAuth } from "@/utils/hooks";
import { Form, Formik } from "formik";
import { FC, useCallback } from "react";
import ActionButton from "../buttons/actionbutton";
import InputField from "../inputfield/inputfield";
import Modal from "../modal/modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Account: FC<Props> = ({ isOpen, onClose }) => {
  const { user, checkAuth } = useAuth();
  const { changeName, changeUsername, changePassword } = useBackendAuth();

  const changeNameInitialValue: ChangeNameType = {
    name: user?.name || "",
  };

  const handleNameChange = useCallback(
    async (values: ChangeNameType, actions: any) => {
      await changeName(values.name);
      await checkAuth();
      actions.setSubmitting(false);
    },
    [changeName, checkAuth],
  );

  const changeUsernameInitialValue: ChangeUsernameType = {
    username: user?.username || "",
  };

  const handleUsernameChange = useCallback(
    async (values: ChangeUsernameType, actions: any) => {
      await changeUsername(values.username);
      await checkAuth();
      actions.setSubmitting(false);
    },
    [changeUsername, checkAuth],
  );

  const changePasswordInitialValue: ChangePasswordType = {
    password: "",
    newpassword: "",
    repeatpassword: "",
  };

  const handlePasswordChange = useCallback(
    async (values: ChangePasswordType, actions: any) => {
      await changePassword(
        values.password,
        values.newpassword,
        values.repeatpassword,
      );
      actions.resetForm();
      actions.setSubmitting(false);
    },
    [changePassword],
  );

  return (
    <Modal
      isShown={isOpen}
      onClose={onClose}
    >
      <div className='flex h-full w-full flex-col gap-6'>
        <h1 className='w-full text-center text-4xl'>Account settings</h1>
        <div className='flex h-full w-full flex-col items-center justify-start gap-4 md:flex-row md:items-start md:justify-evenly md:gap-0'>
          <div className='flex h-full flex-col items-center justify-start gap-6'>
            <Formik
              initialValues={changeNameInitialValue}
              validationSchema={ChangeNameSchema}
              onSubmit={async (values, actions) =>
                handleNameChange(values, actions)
              }
            >
              {(props) => (
                <Form className='flex flex-col gap-2'>
                  <InputField
                    name='name'
                    label='Name'
                  />

                  <ActionButton
                    type='submit'
                    disabled={props.isSubmitting}
                  >
                    Change name
                  </ActionButton>
                </Form>
              )}
            </Formik>

            <Formik
              initialValues={changeUsernameInitialValue}
              validationSchema={ChangeUsernameSchema}
              onSubmit={async (values, actions) =>
                handleUsernameChange(values, actions)
              }
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
          </div>

          <Formik
            initialValues={changePasswordInitialValue}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values, actions) =>
              handlePasswordChange(values, actions)
            }
          >
            {(props) => (
              <Form className='flex flex-col gap-2'>
                <InputField
                  name='password'
                  label='Old password'
                  type='password'
                />

                <InputField
                  name='newpassword'
                  label='New password'
                  type='password'
                />

                <InputField
                  name='repeatpassword'
                  label='Repeat password'
                  type='password'
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
