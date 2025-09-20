import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseConfig } from "../../../config/http";
import { ProductTypes } from "./types";

// Product Api example with redux toolkit

export const productsApi = createApi({
  reducerPath: "products-api",
  baseQuery: fetchBaseQuery({
    ...baseConfig,
  }),
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getProductsById: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation({
      query: (product: ProductTypes) => ({
        url: `/products`,
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsMutation,
  useGetProductsByIdMutation,
  useCreateProductMutation,
} = productsApi as any;
