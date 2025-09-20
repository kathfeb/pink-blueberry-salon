/**
 * @description Type definition for InputForm
 * @interface InputFormProps
 * @extends {InputProps} InputProps from Input component
 * @param {boolean} isRequired Active required label style
 */

import { InputProps } from "../../atoms/Input/types";
import { Sizes, Variants } from "../../atoms/Label/types";

/**
 * Export InputFormForm Props
 */
export interface InputFormProps extends InputProps {
  /**
   *  Label text for input
   */

  label?: string;

  /**
   *  Label size
   */

  labelSize?: Sizes;

  /**
   *  Label color
   */

  labelColor?: Variants;

  /**
   *  error message size
   */

  errors?: string;

  /**
   *  Include border style
   */

  border?: boolean;

  /**
   *  Show and Hide password action
   */

  showPassword?: boolean;
}
