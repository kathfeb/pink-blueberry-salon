/**
 * @description <InputForm> Molecule Component
 */

import classnames from "classnames";
import { InputFormProps } from "./types";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { useState } from "react";

const InputForm = ({
  id,
  name,
  type = "text",
  onChange: handleChange,
  disabled = false,
  placeholder,
  className: classNames,
  error,
  defaultValue,
  full = true,
  label,
  required,
  border = true,
  errors,
  showPassword = true,
  ...rest
}: InputFormProps): JSX.Element => {
  const [showField, setShowField] = useState<boolean>(false);

  return (
    <div
      className={classnames("__input-form", {
        "--form-full": full,
      })}
    >
      <div className={classnames("input__container")}>
        <div className={classnames("input__container--icon")}>
          {type === "password" && showPassword && (
            <Button
              onClick={() => setShowField(!showField)}
              variant="secondary"
              className="input__hide-btn "
            >
              {!showField && <i className="fa-regular fa-eye-slash fa-lg"></i>}
              {showField && <i className="fa-regular fa-eye fa-lg "></i>}
            </Button>
          )}

          <Input
            id={id}
            name={name}
            type={showField ? "text" : (type as any)}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            label={label}
            required={required}
            error={error || errors}
            defaultValue={defaultValue}
            fullWidth={full}
            className={classnames(
              {
                "--input--border": border,
              },
              classNames
            )}
            {...rest}
          />
        </div>
      </div>
      {errors && <p className="text-sm text-red-500 mt-1">{errors}</p>}
    </div>
  );
};

InputForm.displayName = "InputForm";

export default InputForm;
