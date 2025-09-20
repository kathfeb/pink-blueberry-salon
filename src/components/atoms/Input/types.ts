/**
 * @description Type definition for Inputs
 */

import { InputHTMLAttributes } from 'react';
/**
 * States definitions
 */
const types = ['text', 'email', 'number', 'color', 'password', 'url', 'tel', 'hidden'] as const;
const borderRadius = ['small', 'medium', 'large', 'full'] as const;
const style = ['small', 'medium'] as const;

/**
 * Union type of those string literals defined in the array above
 */
export type InputTypeProps = (typeof types)[number];
export type InputBorderRadius = (typeof borderRadius)[number];
export type InputStyle = (typeof style)[number];

/**
 * @description Export available options to match classes
 */

const InputBorderRadiusRecord: Record<InputBorderRadius, string> = {
  small: '--rounded-small',
  medium: '--rounded-medium',
  large: '--rounded-large ',
  full: '--rounded-full'
};

const InputStyleRecord: Record<InputStyle, string> = {
  small: '--size-small',
  medium: '--size-medium'
};

/**
 * Export Input Props
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input type attribute
   */
  type?: InputTypeProps;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Input ID
   */
  id: string;
  /**
   * Input name attribute
   */
  name: string;
  /**
   * Disabled status
   */
  disabled?: boolean;

  /**
   * Active full width
   */
  full?: boolean;

  /**
   * Border radius size
   */
  borderRadius?: InputBorderRadius;

  /**
   * Input size variant
   */

  styles?: InputStyle;

  /**
   * Error hint
   */
  error?: boolean;
  /**
   * Optional onChange event
   */
  handleChange?: (event: any) => void;
  /**
   * Optional classes
   */
  classNames?: string;
  /**
   * Default value for the input
   */
  defaultValue?: any;
  /**
   *  Register Name
   */
  register?: any;
}

export { InputBorderRadiusRecord, InputStyleRecord };
