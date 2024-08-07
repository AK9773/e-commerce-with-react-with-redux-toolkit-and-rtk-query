import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import AddProduct from "../pages/AddProduct";
import SignUp from "../pages/SignUp";
import Cart from "../pages/Cart";
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
