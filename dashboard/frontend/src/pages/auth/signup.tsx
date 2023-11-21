import ActionButton from "@/components/buttons/actionbutton";
import InputField from "@/components/inputfield/inputfield";
import AuthenticationLayout from "@/components/layouts/authentication";
import Spacer from "@/components/spacer/spacer";
import { SignupSchema, SignupType } from "@/schemas/signupschema";
import { useAuth } from "@/services/auth/useAuth";
import { useBackendAuth } from "@/utils/hooks";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

const SignUp = () => {
  const initialValues: SignupType = {
    name: "",
    username: "",
    password: "",
  };

  const { userSignup } = useBackendAuth();
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (values: SignupType, actions: any) => {
      const { name, username, password } = values;
      const { setSubmitting } = actions;

      setSubmitting(true);

      const response = await userSignup(name, username, password);

      if (response.status === 200) {
        await login(response.content);
        router.push("/");
      } else {
        alert("An error occured please try again");
      }

      setSubmitting(false);
    },
    [login, router, userSignup],
  );

  return (
    <AuthenticationLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {(props) => (
          <Form className='flex flex-col items-center justify-center gap-4'>
            <InputField
              name='name'
              label='Name'
              type='name'
            />

            <InputField
              name='username'
              label='Username'
              type='text'
            />

            <InputField
              name='password'
              label='Password'
              type='password'
            />

            <ActionButton disabled={props.isSubmitting}>Register</ActionButton>
          </Form>
        )}
      </Formik>

      <Spacer />

      <Link
        className='text-center font-light text-gray-400 hover:text-gray-900'
        href='/login'
      >
        {"Already have an account?"}
      </Link>
    </AuthenticationLayout>
  );
};

export default SignUp;
