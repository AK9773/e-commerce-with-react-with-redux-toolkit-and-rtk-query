import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useGetUserQuery } from "./features/api/userApi";
import { useDispatch } from "react-redux";
import { login } from "./features/slice/userSlice";
import { useEffect } from "react";
import { addToCart, updateCartFromServer } from "./features/slice/cartSlice";
import { useGetCartItemsQuery } from "./features/api/cartApi";
import UpdateUserAndCartDetails from "./components/UpdateUserAndCartDetails";

function App() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  if (!userId) {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const cart = JSON.parse(cartItems);
      if (cart && cart.length) {
        for (const item of cart) {
          dispatch(addToCart(item));
        }
      }
    }
  }

  return (
    <div>
      <div className="min-h-[10vh]">
        <Header />
      </div>
      <div className="min-h-[80vh] bg-[#f6fff8] py-4">
        <Outlet />
      </div>
      <div className="min-h-[10vh] bg-slate-700">
        <Footer />
      </div>
    </div>
  );
}

export default App;
