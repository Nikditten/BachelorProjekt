import ActionButton from "@/components/actionbutton/actionbutton";
import AuthenticationContainer from "@/components/containers/authentication";
import InputField from "@/components/inputfield/inputfield";
import Spacer from "@/components/spacer/spacer";
import { LoginCredentials, LoginSchema } from "@/schemas/loginschema";
import { Form, Formik } from "formik";
import Link from "next/link";

const Login = () => {
  const initialValues: LoginCredentials = {
    username: "",
    password: "",
  };

  return (
    <AuthenticationContainer>
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
          <Form className="flex flex-col items-center justify-center gap-4">
            <InputField name="username" label="Username" type="name" />

            <InputField name="password" label="Password" type="password" />
            <ActionButton disabled={props.isSubmitting}>Login</ActionButton>
          </Form>
        )}
      </Formik>

      <Spacer />

      <Link
        className="font-light text-center text-gray-400 hover:text-gray-900"
        href="/signup"
      >
        {"Don't have an account?"}
      </Link>
    </AuthenticationContainer>
  );
};

export default Login;
