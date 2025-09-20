import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
  Control,
  FieldValues,
} from "react-hook-form";

type OnSubmit = (e?: React.BaseSyntheticEvent) => Promise<void>;
interface InputsRegister<T> extends UseFormRegister<T & FieldValues> {}
type FormErrors<T> = FieldErrorsImpl<DeepRequired<T>>;
interface FormControl<T> extends Control<T & FieldValues> {}

export interface FormTools<T> {
  onSubmit: OnSubmit;
  register: InputsRegister<T>;
  errors: FormErrors<T>;
  control?: FormControl<T>;
  setValue?: any;
  getValues?: any;
  reset?: any;
  watch?: any;
  getFiles?: (files: any) => void;
}
