/**
 * @description <Label> Atom Component
 */

import classnames from 'classnames';
import { LabelProps, SizesRecord, VariantsRecord, WeightsRecord } from './types';

const Label = ({
  variant = 'black',
  classNames,
  value,
  required,
  size = 'normal',
  weight = 'normal',
  containerClassNames
}: LabelProps): JSX.Element => {
  return (
    <div className={classnames('__label-atom flex flex-row', containerClassNames)}>
      <label
        className={classnames('__label', VariantsRecord[variant], SizesRecord[size], WeightsRecord[weight], classNames)}
      >
        {value}
      </label>
      {required && (
        <div
          className={classnames('__label', SizesRecord[size], WeightsRecord[weight], classNames, 'text-feedback-error')}
        >
          &nbsp;*
        </div>
      )}
    </div>
  );
};

Label.displayName = 'Label';

export default Label;
