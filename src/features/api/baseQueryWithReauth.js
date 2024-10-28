import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { useNavigate } from "react-router-dom";

const mutex = new Mutex();

export const baseQueryWithReauth = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // You can add any custom headers here if needed
    return headers;
  },
});

export const customFetchBase = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQueryWithReauth(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    result.error.data?.message === "jwt expired"
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQueryWithReauth(
          {
            url: "/users/refreshAccessToken",
            method: "POST",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          result = await baseQueryWithReauth(args, api, extraOptions);
        } else {
          window.dispatchEvent(new CustomEvent("unauthorizedAccess"));
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQueryWithReauth(args, api, extraOptions);
    }
  }
  return result;
};
