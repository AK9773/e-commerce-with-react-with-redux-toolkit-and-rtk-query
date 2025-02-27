import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./baseQueryWithReauth";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: customFetchBase,

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

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/deleteProduct/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    getProductList: builder.query({
      query: (search) => ({
        url: `/products/getProductList${search}`,
        method: "GET",
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 30000,
    }),

    getProductdetails: builder.query({
      query: (productId) => ({
        url: `/products/getProduct/${productId}`,
        method: "GET",
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 30000,
    }),
  }),
});

export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductListQuery,
  useGetProductdetailsQuery,
} = productApi;
