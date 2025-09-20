/**
 * App module
 * @module Example for Hook-forms, Redux Toolkit and RTK Query
 *
 * @description Container for the sign up form
 * view with the form tools from the hook useResolverForm
 */

import { FC, useEffect } from 'react';
import { CredentialsSchema } from '../../domain/credentials/credentials.schema';
import { Credentials } from '../../domain/credentials/credentials.type';
import { useResolverForm } from '../../hooks';

import { SignIpLayout } from './Layout';
import { useGetProductsMutation } from '../../redux/api/products';
import { useSelector } from 'react-redux';
import { selectCartCounter } from '../../redux/slices/cartCounter/selectors';

const SignUp: FC<any> = () => {
  const { count } = useSelector(selectCartCounter);
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useResolverForm<Credentials>(CredentialsSchema);

  const onSubmit = handleSubmit(async (credentials: Credentials) => {
    console.log({ credentials });
    alert(credentials.email);
  });

  const formTools = { onSubmit, register, errors };

  const [getProducts] = useGetProductsMutation();

  useEffect(() => {
    // example of how to use the api with redux toolkit
    getProducts().then((response: any) => {
      console.log('products', response);
    });

    // example how to call the slice from the store
    console.log('count', count);
  }, []);

  return <SignIpLayout formTools={formTools} />;
};
export default SignUp;
