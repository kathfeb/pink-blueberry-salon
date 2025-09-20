/**
 * @description Type definition for Button
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button states, use of cases, using const assertions
 */

const sizes = ['normal', 'medium', 'large'] as const;
const fontWeight = ['normal', 'semibold'] as const;
const variants = [
  'primary-blue-flat',
  'primary-blue-raised',
  'secondary-blue-flat',
  'secondary-blue-raised',
  'primary-red-flat',
  'primary-red-raised',
  'inline-primary-blue',
  'inline-secondary-blue',
  'inline-primary-red',
  'primary-orange',
  'secondary-ghost'
] as const;

/**
 * @description Union type of those string literals defined in the array above
 */
export type Sizes = (typeof sizes)[number];
type Variants = (typeof variants)[number];
type FontWeight = (typeof fontWeight)[number];
type ButtonTypeProps = JSX.IntrinsicElements['button']['type'];

/**
 * @description Export available options to match classes
 */
const SizesRecord: Record<Sizes, string> = {
  normal: '--p-normal',
  medium: '--medium',
  large: '--large'
};

const FontWeightRecord: Record<FontWeight, string> = {
  normal: '--normal',
  semibold: '--semibold'
};

const VariantsRecord: Record<Variants, string> = {
  'primary-blue-flat': '--primary-blue',
  'primary-blue-raised': '--primary-blue --raised',
  'secondary-blue-flat': '--secondary-blue',
  'secondary-blue-raised': '--secondary-blue --raised',
  'primary-orange': '--primary-orange',
  'secondary-ghost': '--secondary-ghost',
  'primary-red-flat': '--primary-red',
  'primary-red-raised': '--primary-red --raised',
  'inline-primary-blue': '--inline-primary-blue',
  'inline-secondary-blue': '--inline-secondary-blue',
  'inline-primary-red': '--inline-primary-red'
};

/**
 * @description Export Button Props
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Inside item (label, icon, etc)
   */
  children: ReactNode;
  /**
   * How large should the button be?
   */
  size?: Sizes;
  /**
   * Theme button
   */
  variant?: Variants;
  /**
   * Font weight style for button
   */
  fontWeight?: FontWeight;
  /**
   * Custom class
   */
  classNames?: string;
  /**
   * Disabled status
   */
  disabled?: boolean;
  /**
   * Button type attribute
   */
  type?: ButtonTypeProps;

  /**
   * Rounded Option
   */
  rounded?: boolean;

  /**
   * Apply full width for button
   */
  full?: boolean;

  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export { SizesRecord, VariantsRecord, FontWeightRecord };
