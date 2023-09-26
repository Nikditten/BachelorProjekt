import { Field } from "formik";
import { FC } from "react";

interface Props {
  name: string;
  label?: string;
  type?: "text" | "number" | "date" | "email" | "password";
  placeholder?: string;
}

const InputField: FC<Props> = ({ name, label, type = "text", placeholder }) => {
  return (
    <div className="flex flex-col w-full h-full gap-1">
      {label && <label>{label}</label>}
      <Field
        name={name}
        className="w-full px-4 py-2 border-2 border-gray-400 rounded-md"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
