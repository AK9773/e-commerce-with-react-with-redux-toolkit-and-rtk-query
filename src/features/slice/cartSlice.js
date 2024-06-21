import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartData.push(action.payload);
    },
    updateQuantity: (state, action) => {
      for (const item of state.cartData) {
        if (item._id === action.payload.productId) {
          item.quantity = action.payload.quantity;
        }
      }
    },
    removeFromCart: (state, action) => {
      const filteredArray = state.cartData.filter(
        (item) => item._id != action.payload
      );
      state.cartData = filteredArray;
    },
    updateCartFromServer: (state, action) => {
      state.cartData = [...action.payload];
    },

    emptyCart: (state) => {
      state.cartData = [];
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  updateCartFromServer,
  emptyCart,
  updateQuantity,
} = cartSlice.actions;
