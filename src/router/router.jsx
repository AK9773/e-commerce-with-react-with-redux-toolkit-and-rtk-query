import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Login from "../components/Login";
import ProductDetails from "../components/ProductDetails";
import AddProduct from "../components/AddProduct";
import SignUp from "../components/SignUp";

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
        element: <AddProduct />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
