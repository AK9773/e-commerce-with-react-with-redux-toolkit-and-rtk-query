import { configureStore } from "@reduxjs/toolkit";
import userApi from "../features/userApi.js";
import { productApi } from "../features/productApi.js";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, productApi.middleware),
});

export default store;
