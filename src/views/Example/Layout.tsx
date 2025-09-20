/**
 * App module
 * @module Example for Hook-forms Layout
 *
 * @description Layout for the sign up form
 * view that receives the form tools from the hook useResolverForm
 */

import { FC } from "react";
import { FormTools } from "../../domain/form/form.types";
import { Credentials } from "../../domain/credentials/credentials.type";
import { InputForm } from "../../components/molecules/InputForm";

interface PropTypes {
  formTools: FormTools<Credentials>;
}

export const SignIpLayout: FC<PropTypes> = ({ formTools }) => {
  const { onSubmit, errors, register } = formTools;

  return (
    <div className="w-full flex flex-row justify-center">
      <form
        className={`flex flex-col gap-x-4 gap-y-6 w-64 mt-8`}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4">
          <InputForm
            type="email"
            name="email"
            id="email"
            label="Email *"
            full
            placeholder="Enter your email"
            register={register("email")}
            errors={errors.email?.message}
          />
          <InputForm
            type="password"
            name="current-password"
            id="current-password"
            full
            label="Password *"
            register={register("password")}
            placeholder="Enter your password"
            errors={errors.password?.message}
          />
        </div>

        <div className="mt-4 flex flex-row gap-4">
          <button
            type="submit"
            className="bg-primary-blue-100 px-3 py-2 text-white font-medium"
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};
