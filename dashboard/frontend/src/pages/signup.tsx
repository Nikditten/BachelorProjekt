import ActionButton from "@/components/buttons/actionbutton";
import AuthenticationLayout from "@/components/layouts/authentication";
import InputField from "@/components/inputfield/inputfield";
import Spacer from "@/components/spacer/spacer";
import { SignupCredentials, SignupSchema } from "@/schemas/signupschema";
import { Form, Formik } from "formik";
import Link from "next/link";

const SignUp = () => {
  const initialValues: SignupCredentials = {
    name: "",
    username: "",
    password: "",
  };

  return (
    <AuthenticationLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 5000);
        }}
      >
        {(props) => (
          <Form className="flex flex-col items-center justify-center gap-4">
            <InputField name="name" label="Name" type="name" />

            <InputField name="username" label="Username" type="name" />

            <InputField name="password" label="Password" type="password" />

            <ActionButton disabled={props.isSubmitting}>Register</ActionButton>
          </Form>
        )}
      </Formik>

      <Spacer />

      <Link
        className="font-light text-center text-gray-400 hover:text-gray-900"
        href="/login"
      >
        {"Already have an account?"}
      </Link>
    </AuthenticationLayout>
  );
};

export default SignUp;
