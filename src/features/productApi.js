import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: "include",
  }),

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products/addProduct",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    getProductList: builder.query({
      query: (search) => ({
        url: `/products/getProductList${search}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useAddProductMutation, useGetProductListQuery } = productApi;
