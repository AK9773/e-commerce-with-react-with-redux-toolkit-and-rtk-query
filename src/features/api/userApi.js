import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setError } from "../slice/userSlice";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: "include",
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/users/getUser",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 30000,
    }),

    login: builder.mutation({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    signup: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export default userApi;
export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetUserQuery,
} = userApi;
