import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../features/api/userApi";
import { logout } from "../features/slice/userSlice.js";
import { emptyCart } from "../features/slice/cartSlice.js";
import UpdateUserAndCartDetails from "./UpdateUserAndCartDetails.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo.jpg";
import Input from "./Input.jsx";
import { useGetProductListQuery } from "../features/api/productApi.js";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItem, setCartItem] = useState(0);
  const userData = useSelector((state) => state.user.userData);
  const cart = useSelector((state) => state.cart.cartData);
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();
  const userId = localStorage.getItem("userId");
  const [inputValue, setInputValue] = useState("");
  const { data, error, isError, isLoading } = useGetProductListQuery(
    `?limit=5&keyword=${inputValue}`
  );
  const activeLinkCssClass =
    "font-bold bg-[#43f395] border-[#44FF00] border-2 p-[5px] rounded-[5px] shadow-[3px_3px_10px_3px_#ebe4e4]";
  const inActiveLinkCssClass = "text-[#001524] hover:text-[#1b393b]";

  useEffect(() => {
    if (cart) {
      setCartItem(cart.length);
    }
  }, [cart]);

  const logoutHandle = async () => {
    await logoutMutation();
    dispatch(logout());
    dispatch(emptyCart());
    localStorage.removeItem("userId");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const search = (e) => {
    setInputValue(e.target.value);
  };

  const navigateToDetailPage = () => {
    navigate(`/product/${product?._id}`);
  };

  return (
    <nav className="bg-[#d4f1f9] px-2 min-h-[10vh] ">
      <div className=" px-8 flex justify-between items-center">
        <div className="flex">
          <span className="text-[#001524] hover:text-[#e2fdff] text-3xl font-semibold flex items-center mr-4 relative">
            <NavLink className="text-[#001524] hover:text-[#e2fdff] font-bold mr-6">
              <img className="h-10 w-10 object-contain" src={logo} alt="Logo" />
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeLinkCssClass : inActiveLinkCssClass
              }
            >
              <FontAwesomeIcon icon={faHouse} />
            </NavLink>
          </span>
          <div className="flex items-center justify-start mb-2 border-gray-600 mr-4">
            <Input
              value={inputValue}
              className="rounded-none rounded-s-md relative z-10"
              onChange={search}
              placeholder="Search your products.."
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="h-10 mt-4 rounded-e-md bg-white"
            />
            {inputValue && (
              <div className="absolute min-w-60">
                <ul className="relative top-24 z-10 bg-slate-200">
                  {data &&
                    data?.products.productList.map((product) => (
                      <li
                        key={product._id}
                        className="border-b-2 border-blue-400"
                      >
                        <a href={`/product/${product?._id}`}>{product.name}</a>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <ul className="flex space-x-4 text-xl">
            {userData && userData.role === "seller" && (
              <li>
                <NavLink
                  to="/addProduct"
                  className={({ isActive }) =>
                    isActive ? activeLinkCssClass : inActiveLinkCssClass
                  }
                >
                  Add Product
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to={cartItem ? "/cart" : "#"}
                className={({ isActive }) =>
                  isActive && cartItem
                    ? activeLinkCssClass
                    : inActiveLinkCssClass
                }
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <sup>{cartItem}</sup>
              </NavLink>
            </li>
            {userData ? (
              <li className={inActiveLinkCssClass} onClick={logoutHandle}>
                Logout
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeLinkCssClass : inActiveLinkCssClass
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="md:hidden">
          <button
            className="text-[#505c64] hover:text-[#e2fdff]"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {userId && (
          <>
            <UpdateUserAndCartDetails />
          </>
        )}
      </div>
      {/* Conditional rendering based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#48cae4] py-8">
          <ul className="flex flex-col space-y-2">
            <li className="mx-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeLinkCssClass : inActiveLinkCssClass
                }
              >
                Home
              </NavLink>
            </li>
            {userData && userData.role === "seller" && (
              <li className="mx-auto">
                <NavLink
                  to="/addProduct"
                  className={({ isActive }) =>
                    isActive ? activeLinkCssClass : inActiveLinkCssClass
                  }
                >
                  Add Product
                </NavLink>
              </li>
            )}
            <li className="mx-auto">
              <NavLink
                to={cartItem ? "/cart" : "#"}
                className={({ isActive }) =>
                  isActive ? activeLinkCssClass : inActiveLinkCssClass
                }
              >
                Cart <sup>{cartItem}</sup>
              </NavLink>
            </li>
            {userData ? (
              <li
                className={({ isActive }) =>
                  isActive ? activeLinkCssClass : inActiveLinkCssClass
                }
                onClick={logoutHandle}
              >
                Logout
              </li>
            ) : (
              <li className="mx-auto">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeLinkCssClass : inActiveLinkCssClass
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
