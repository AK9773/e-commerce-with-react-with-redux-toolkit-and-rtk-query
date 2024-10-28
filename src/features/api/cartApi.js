import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./baseQueryWithReauth";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: customFetchBase,

  tagTypes: ["Carts"],

  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (cart) => ({
        url: "/carts/addToCart",
        method: "POST",
        body: cart,
      }),
      invalidatesTags: ["Carts"],
    }),

    insertManyToCart: builder.mutation({
      query: (cartItems) => ({
        url: "/carts/insertManyToCart",
        method: "POST",
        body: cartItems,
      }),
      invalidatesTags: ["Carts"],
    }),

    updateQuantity: builder.mutation({
      query: (cart) => ({
        url: `/carts/updateQuantity`,
        method: "PATCH",
        body: cart,
      }),
      invalidatesTags: ["Carts"],
    }),

    deleteCart: builder.mutation({
      query: (cartId) => ({
        url: `/carts/delete/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts"],
    }),

    getCartItems: builder.query({
      query: () => ({
        url: "/carts/cartItems",
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),
  }),
});

export const {
  useAddCartMutation,
  useInsertManyToCartMutation,
  useUpdateQuantityMutation,
  useDeleteCartMutation,
  useGetCartItemsQuery,
} = cartApi;
