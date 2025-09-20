/**
 * @description Type definition for Label
 */

/**
 * Label states, use of cases, using const assertions
 */

const sizes = ['tiny', 'small', 'normal', 'medium', 'large', 'huge'] as const;
const weights = ['normal', 'bold'] as const;
const variants = ['black', 'white', 'orange', 'red', 'grey-base', 'grey-dark'] as const;

/**
 * @description Union type of those string literals defined in the array above
 */
export type Sizes = (typeof sizes)[number];
export type Variants = (typeof variants)[number];
type Weights = (typeof weights)[number];

/**
 * @description Export available options to match classes
 */
const SizesRecord: Record<Sizes, string> = {
  tiny: '--tiny',
  small: '--small',
  normal: '--normal',
  medium: '--medium',
  large: '--large',
  huge: '--huge'
};

const WeightsRecord: Record<Weights, string> = {
  normal: '--normal-weight',
  bold: '--bold-weight'
};

const VariantsRecord: Record<Variants, string> = {
  black: '--black',
  white: '--white',
  orange: '--orange',
  red: '--red',
  'grey-base': '--grey-base',
  'grey-dark': '--grey-dark'
};

/**
 * @description Export Label Props
 */
export interface LabelProps {
  /**
   * label value
   */
  value: string;
  /**
   * label Theme
   */
  variant?: Variants;
  /**
   * label Weight
   */
  weight?: Weights;
  /**
   * label Size
   */
  size?: Sizes;
  /**
   * Custom class
   */
  classNames?: string;
  /**
   * Container label class
   */
  containerClassNames?: string;

  /**
   * Required status
   */
  required?: boolean;
}

export { SizesRecord, VariantsRecord, WeightsRecord };
