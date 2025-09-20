/**
 * @description Hook for yup resolver form validation with react-hook-form
 */
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const useResolverForm = <T>(schema: yup.AnyObjectSchema, defaultValues?: any): UseFormReturn<T & FieldValues> =>
  useForm<T & FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  });
