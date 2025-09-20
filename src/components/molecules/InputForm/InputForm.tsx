/**
 * @description <InputForm> Molecule Component
 */

import classnames from 'classnames';
import { InputFormProps } from './types';
import { Input } from '../../atoms/Input';
import { Label } from '../../atoms/Label';
import { Button } from '../../atoms/Button';
import { useState } from 'react';

const InputForm = ({
  id,
  name,
  type = 'text',
  handleChange,
  disabled = false,
  placeholder,
  classNames,
  register,
  error = false,
  defaultValue,
  borderRadius = 'large',
  styles = 'small',
  full = true,
  label,
  required,
  labelSize = 'normal',
  labelColor = 'grey-dark',
  border = true,
  errors,
  showPassword = true,
  ...rest
}: InputFormProps): JSX.Element => {
  const [showField, setShowField] = useState<boolean>(false);

  return (
    <div
      className={classnames('__input-form', {
        '--form-full': full
      })}
    >
      <label htmlFor={id} className={classnames('input__container')}>
        {type !== 'hidden' && label && (
          <Label required={required} value={label} size={labelSize} variant={labelColor} classNames="capitalize" />
        )}

        <div className={classnames('input__container--icon')}>
          {type === 'password' && showPassword && (
            <Button onClick={() => setShowField(!showField)} variant="secondary-ghost" className="input__hide-btn ">
              {!showField && <i className="fa-regular fa-eye-slash fa-lg"></i>}
              {showField && <i className="fa-regular fa-eye fa-lg "></i>}
            </Button>
          )}

          <Input
            id={id}
            name={name}
            type={showField ? 'text' : type}
            handleChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            register={register}
            error={error ?? !!errors}
            defaultValue={defaultValue}
            borderRadius={borderRadius}
            styles={styles}
            full={full}
            classNames={classnames(
              {
                '--input--border': border
              },
              classNames
            )}
            {...rest}
          />
        </div>
      </label>
      {errors && <Label value={errors} size="small" variant="red" />}
    </div>
  );
};

InputForm.displayName = 'InputForm';

export default InputForm;
