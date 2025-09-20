import React from "react";
import classnames from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  full?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  register,
  full = true,
  className,
  ...rest
}) => {
  return (
    <div className={classnames("form-group", { "w-full": full })}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={classnames(
          "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all",
          {
            "border-red-500": error,
            "border-gray-300": !error,
          },
          className
        )}
        {...register}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;
