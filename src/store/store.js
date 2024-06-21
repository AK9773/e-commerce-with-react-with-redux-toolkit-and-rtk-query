import { configureStore } from "@reduxjs/toolkit";
import userApi from "../features/api/userApi.js";
import { productApi } from "../features/api/productApi.js";
import { cartApi } from "../features/api/cartApi.js";
import userSlice from "../features/slice/userSlice.js";
import cartSlice from "../features/slice/cartSlice.js";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    user: userSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      cartApi.middleware
    ),
});

export default store;
