import { FC } from 'react';
import { InputSimple, VariantsInput } from '../../../atoms/Inputs/InputSimple';
import { ErrorField } from '../../../atoms/labels/LabelError';
import { LabelInput } from '../../../atoms/labels/LabelInput';

interface InputFormTypes<T = any> {
  defaultValue?: any;
  disabled?: boolean;
  full?: boolean;
  className?: string;
  id: string;
  label: string;
  register?: any;
  name: string;
  type: VariantsInput;
  errors: string | undefined;
  placeholder?: string;
  light?: boolean;
  handleItemsValueChange?: any;
  onChageController?: any;
  typeValue?: string;
  pattern?: string;
  idIndex?: string;
}

export const InputForm: FC<InputFormTypes> = ({
  defaultValue,
  disabled,
  full,
  className,
  id,
  label,
  register,
  errors,
  name,
  type,
  placeholder,
  light = true,
  handleItemsValueChange,
  onChageController,
  typeValue,
  idIndex,
  pattern
}) => {
  return (
    <div id="input" className={`flex flex-col ${full && 'w-full'}`}>
      <LabelInput title={label} light={light} classes="text-sm font-light mb-1" />
      <InputSimple
        id={id}
        register={register}
        name={name}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`${className} !text-xs`}
        placeholder={placeholder}
        handleItemsValueChange={handleItemsValueChange}
        onChageController={onChageController}
        typeValue={typeValue}
        idIndex={idIndex}
        hasError={errors ? true : false}
        pattern={pattern}
        full
      />
      {errors && <ErrorField errorMessage={errors} classes="mt-1" />}
    </div>
  );
};
