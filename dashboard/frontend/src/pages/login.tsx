import ActionButton from "@/components/buttons/actionbutton";
import InputField from "@/components/inputfield/inputfield";
import AuthenticationLayout from "@/components/layouts/authentication";
import Spacer from "@/components/spacer/spacer";
import { LoginSchema, LoginType } from "@/schemas/loginschema";
import { Form, Formik } from "formik";
import Link from "next/link";

const Login = () => {
  const initialValues: LoginType = {
    username: "",
    password: "",
  };

  return (
    <AuthenticationLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 5000);
        }}
      >
        {(props) => (
          <Form className='flex flex-col items-center justify-center gap-4'>
            <InputField
              name='username'
              label='Username'
              type='name'
            />

            <InputField
              name='password'
              label='Password'
              type='password'
            />
            <ActionButton disabled={props.isSubmitting}>Login</ActionButton>
          </Form>
        )}
      </Formik>

      <Spacer />

      <Link
        className='text-center font-light text-gray-400 hover:text-gray-900'
        href='/signup'
      >
        {"Don't have an account?"}
      </Link>
    </AuthenticationLayout>
  );
};

export default Login;
