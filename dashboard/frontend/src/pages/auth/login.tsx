import ActionButton from "@/components/buttons/actionbutton";
import InputField from "@/components/inputfield/inputfield";
import AuthenticationLayout from "@/components/layouts/authentication";
import Spacer from "@/components/spacer/spacer";
import { LoginSchema, LoginType } from "@/schemas/loginschema";
import { useAuth } from "@/services/auth/useAuth";
import { useBackend } from "@/utils/hooks";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const { authenticate } = useBackend();
  const { login } = useAuth();
  const router = useRouter();

  const initialValues: LoginType = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values: LoginType, actions: any) => {
    const { username, password } = values;
    const { setSubmitting, setFieldError } = actions;

    setSubmitting(true);

    const response = await authenticate(username, password);

    if (response.status === 200) {
      await login(response.content);
      router.push("/");
    } else if (response.status === 401) {
      setFieldError("password", response.content.detail);
      console.log(response.content);
    }

    setSubmitting(false);
  };

  return (
    <AuthenticationLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
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
