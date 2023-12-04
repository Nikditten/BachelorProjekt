'use client';

import InputField from '@/components/inputfield/inputfield';
import Toast from '@/components/toast/toast';
import { Form, Formik } from 'formik';
import { useState } from 'react';

export default function FormPage() {
  const [showData, setShowData] = useState(false);
  const [data, setData] = useState({});

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      <h1 className='text-2xl font-bold'>A Form to test the analytics tool</h1>
      <Formik
        initialValues={{
          name: '',
          age: '',
          birthday: '',
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          setData(values);
          setShowData(true);
          setTimeout(() => {
            setShowData(false);
          }, 8000);
        }}
      >
        <Form className='flex flex-col items-center justify-center w-full h-full gap-4 lg:w-1/3'>
          <InputField
            name='name'
            type='text'
            placeholder='Name'
          />

          <InputField
            name='age'
            type='number'
            placeholder='Age'
          />

          <InputField
            name='birthday'
            label='Birthday'
            type='date'
            placeholder='Birthday'
          />

          <InputField
            name='email'
            type='email'
            placeholder='Email'
          />

          <InputField
            name='password'
            type='password'
            placeholder='Password'
          />

          <button
            id='SubmitButton'
            type='submit'
            disabled={showData}
            className={`w-full py-2 text-white bg-blue-400 rounded-md hover:bg-blue-300 ${
              showData && 'bg-blue-100 hover:bg-blue-100'
            }`}
          >
            Submit
          </button>
        </Form>
      </Formik>

      <Toast
        show={showData}
        message={JSON.stringify(data)}
      />
    </div>
  );
}
