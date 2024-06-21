import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Login from "../components/Login";
import ProductDetails from "../components/ProductDetails";
import AddProduct from "../components/AddProduct";
import SignUp from "../components/SignUp";
import Cart from "../components/Cart";
import ProtectedRoutes from "../components/ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/addProduct",
        element: <ProtectedRoutes Component={AddProduct} />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
