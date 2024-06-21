export const addProductToLocalStorage = (product) => {
  let cart = [];
  const cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    const localCartData = JSON.parse(cartItems);
    localCartData.push(product);
    cart = [...localCartData];
  } else {
    cart.push(product);
  }
  localStorage.setItem("cartItems", JSON.stringify(cart));
};

export const removeProductFromLocalStorage = (productId) => {
  const cartItems = localStorage.getItem("cartItems");
  const cart = JSON.parse(cartItems);
  const filteredCart = cart.filter((item) => item._id !== productId);
  localStorage.setItem("cartItems", JSON.stringify(filteredCart));
};

export const updateProductQuantity = (productId, quantity) => {
  const cartItems = localStorage.getItem("cartItems");
  const cart = JSON.parse(cartItems);
  for (const item of cart) {
    if (item._id === productId) {
      item.quantity = quantity;
    }
  }
  localStorage.setItem("cartItems", JSON.stringify(cart));
};
