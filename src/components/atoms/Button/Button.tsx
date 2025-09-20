/**
 * @description <Button> Atom Component
 */

import { forwardRef } from "react";
import classnames from "classnames";
import {
  ButtonProps,
  FontWeightRecord,
  SizesRecord,
  VariantsRecord,
} from "./types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      rounded = true,
      variant = "primary-blue-flat",
      onClick,
      type = "button",
      disabled,
      classNames,
      size = "normal",
      full = false,
      fontWeight = "normal",
      ...rest
    },
    ref
  ): JSX.Element => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={classnames(
          "__button",
          VariantsRecord[variant],
          SizesRecord[size],
          FontWeightRecord[fontWeight],
          classNames,
          {
            "--rounded": rounded,
            "--disabled": disabled,
            "--full": full,
          }
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
