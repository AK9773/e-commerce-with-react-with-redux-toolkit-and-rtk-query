import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/carts",
    credentials: "include",
  }),

  tagTypes: ["Carts"],

  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (cart) => ({
        url: "/addToCart",
        method: "POST",
        body: cart,
      }),
      invalidatesTags: ["Carts"],
    }),

    insertManyToCart: builder.mutation({
      query: (cartItems) => ({
        url: "/insertManyToCart",
        method: "POST",
        body: cartItems,
      }),
      invalidatesTags: ["Carts"],
    }),

    updateQuantity: builder.mutation({
      query: (cart) => ({
        url: `/updateQuantity`,
        method: "PATCH",
        body: cart,
      }),
      invalidatesTags: ["Carts"],
    }),

    deleteCart: builder.mutation({
      query: (cartId) => ({
        url: `/delete/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts"],
    }),

    getCartItems: builder.query({
      query: () => ({
        url: "/cartItems",
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
