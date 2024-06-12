import React, { useContext } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import Logo from "../../images/freshcart-logo.svg";
import { authContext } from "../../Context/Authentication";
import { CartContext } from "../../Context/CartContext";
// import $ from "jquery";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(CartContext);
  const nav = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    nav("/login");
  }

  function handleActiveLink(activeLink) {
    // $(".nav-item").children().removeClass("active");
    // $(`#${activeLink}`).addClass("active");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <NavLink
            className="navbar-brand active"
            to="/"
            id="logo"
            onClick={() => handleActiveLink("logo")}
          >
            <img src={Logo} alt="Logo" />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
              {token ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      aria-current="page"
                      to="/home"
                      id="home"
                      onClick={() => handleActiveLink("home")}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      aria-current="page"
                      to="/products"
                      id="products"
                      onClick={() => handleActiveLink("products")}
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/categories"
                      id="categories"
                      onClick={() => handleActiveLink("categories")}
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/brands"
                      id="brands"
                      onClick={() => handleActiveLink("brands")}
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/allOrders"
                      id="allOrders"
                      onClick={() => handleActiveLink("allOrders")}
                    >
                      All Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/wishList"
                      id="wishList"
                      onClick={() => handleActiveLink("wishList")}
                    >
                      WishList
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item py-3 py-lg-0 text-center d-lg-none d-xl-block">
                <i className="fa-brands mx-3 mx-lg-1 mx-xl-3 cursor-pointer fa-facebook"></i>
                <i className="fa-brands mx-3 mx-lg-1 mx-xl-3 cursor-pointer fa-twitter"></i>
                <i className="fa-brands mx-3 mx-lg-1 mx-xl-3 cursor-pointer fa-whatsapp"></i>
                <i className="fa-brands mx-3 mx-lg-1 mx-xl-3 cursor-pointer fa-linkedin"></i>
              </li>

              {token ? (
                <>
                  <li className="nav-item me-lg-3">
                    <NavLink
                      className="shopCart nav-link  position-relative"
                      to="/cart"
                      id="cart"
                      onClick={() => handleActiveLink("cart")}
                    >
                      <i className="fa-solid fa-cart-shopping  text-dark"></i>
                      <span className="position-absolute  badge rounded-1 bg-main  ">
                        {numOfCartItems}
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/profile"
                      id="profile"
                      onClick={() => handleActiveLink("profile")}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/settings"
                      id="settings"
                      onClick={() => handleActiveLink("settings")}
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <span
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      aria-current="page"
                      to="/register"
                      id="register"
                      onClick={() => handleActiveLink("register")}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/login"
                      id="login"
                      onClick={() => handleActiveLink("login")}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
