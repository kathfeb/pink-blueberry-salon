import { FC } from "react";
import { Input } from "../../../atoms/Input";

interface InputFormTypes<T = any> {
  defaultValue?: any;
  disabled?: boolean;
  full?: boolean;
  className?: string;
  id: string;
  label: string;
  register?: any; // remains for compatibility where react-hook-form is used
  name: string;
  type: React.HTMLInputTypeAttribute;
  errors: string | undefined;
  placeholder?: string;
  light?: boolean;
  handleItemsValueChange?: any;
  onChageController?: any;
  typeValue?: string;
  pattern?: string;
  idIndex?: string;
}

export const InputForm: FC<InputFormTypes> = ({
  defaultValue,
  disabled,
  full,
  className,
  id,
  label,
  register,
  errors,
  name,
  type,
  placeholder,
  light = true,
  handleItemsValueChange,
  onChageController,
  typeValue,
  idIndex,
  pattern,
}) => {
  return (
    <div id="input" className={`flex flex-col ${full ? "w-full" : ""}`}>
      <Input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`${className ?? ""} !text-xs`}
        placeholder={placeholder}
        label={label}
        fullWidth
        error={errors}
        {...(register ? register : {})}
        pattern={pattern as unknown as string}
      />
      {errors && <p className="text-sm text-red-500 mt-1">{errors}</p>}
    </div>
  );
};
