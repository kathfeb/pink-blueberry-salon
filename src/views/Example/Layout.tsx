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
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="current-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password *
            </label>
            <input
              type="password"
              id="current-password"
              {...register("password")}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-row gap-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-blue-500 px-4 py-2 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};
