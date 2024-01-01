import { ErrorMessage, Field } from "formik";
import { FC } from "react";

interface Props {
  name: string;
  type?: "text" | "number" | "name" | "email" | "password" | "date" | "url";
  label?: string;
  placeholder?: string;
  testid?: string;
}

const InputField: FC<Props> = ({
  name,
  type = "text",
  label,
  placeholder,
  testid,
}) => {
  return (
    <div
      className={`flex w-full flex-col items-start justify-center ${
        label ?? "gap-1"
      }`}
    >
      {label ?? <label htmlFor={name}>{label}</label>}
      <Field
        className='h-12 w-full rounded-lg border-[1px] border-black px-4 py-2 focus:outline-none'
        id={name}
        data-testid={testid}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <ErrorMessage
        component='span'
        className='text-xs text-red-500'
        name={name}
      />
    </div>
  );
};

export default InputField;
