import { ErrorMessage, Field } from "formik";
import { FC } from "react";

interface Props {
  name: string;
  type?: "text" | "number" | "name" | "email" | "password" | "date";
  label?: string;
  placeholder?: string;
}

const InputField: FC<Props> = ({ name, type = "text", label, placeholder }) => {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-1">
      {label ?? <label htmlFor={name}>{label}</label>}
      <Field
        className="w-full border-[1px] border-black px-4 py-2 rounded-lg focus:outline-none"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <ErrorMessage
        component="span"
        className="text-xs text-red-500"
        name={name}
      />
    </div>
  );
};

export default InputField;
