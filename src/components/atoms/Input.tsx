import React from "react";
import classNames from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className,
  required,
  ...props
}) => {
  return (
    <div className={classNames("space-y-1", fullWidth && "w-full")}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-pink-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={classNames(
          "px-4 py-2 border-2 rounded-lg transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-slate-300 focus:border-pink-500 focus:ring-pink-500",
          fullWidth && "w-full",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
