/**
 * @description Type definition for InputForm
 * @interface InputFormProps
 * @param {boolean} isRequired Active required label style
 */

import React from "react";

/**
 * Export InputFormForm Props
 */
export interface InputFormProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   *  Label text for input
   */

  label?: string;

  /**
   *  Include border style
   */

  border?: boolean;

  /**
   *  Show and Hide password action
   */

  showPassword?: boolean;

  /**
   *  Render input with full width
   */
  full?: boolean;

  /**
   * Error message to display and pass to the Input
   */
  error?: string;

  /**
   * Alternate error message prop used by some views
   */
  errors?: string;
}
