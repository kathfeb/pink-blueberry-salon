/**
 * Input Component
 */

import classnames from "classnames";
import { InputBorderRadiusRecord, InputProps, InputStyleRecord } from "./types";

const Input = ({
  id,
  name,
  type = "text",
  handleChange,
  disabled = false,
  placeholder,
  classNames,
  register,
  error = false,
  defaultValue,
  borderRadius = "small",
  styles = "small",
  full = true,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      disabled={disabled}
      onChange={(event: any) => {
        if (handleChange) {
          handleChange(event);
        }
      }}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={classnames(
        "__input",
        InputBorderRadiusRecord[borderRadius],
        InputStyleRecord[styles],
        classNames,
        {
          "--error": error && !disabled,
          "--disabled": disabled,
          "--full": full,
        }
      )}
      {...register}
      {...rest}
    />
  );
};

export default Input;
