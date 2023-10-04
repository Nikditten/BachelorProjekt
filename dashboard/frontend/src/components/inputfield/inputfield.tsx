import { Field } from "formik";
import { FC } from "react";

interface Props {
  name: string;
  type?: "text" | "number" | "email" | "password" | "date";
  label?: string;
  placeholder?: string;
}

const InputField: FC<Props> = ({ name, type = "text", label, placeholder }) => {
  return (
    <div className="h-12 w-36 flex flex-col justify-center items-start gap-1">
      {label ?? <label htmlFor={name}>{label}</label>}
      <Field
        className="border-2 border-black px-2 py-1 rounded-lg focus:outline-none"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
