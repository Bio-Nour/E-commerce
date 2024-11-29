import "./Navbar.css";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import nav_dropdown from "../../assets/nav_dropdown.png";

const Navbar = () => {
  const menuRef = useRef();

  const dropdown_toogle = (e) => {
    menuRef.current.classList.toggle("show");
    e.target.classList.toggle("open");
    e.stopPropagation();
  };

  const { getTotalCartItems } = useContext(ShopContext);
  const [menu, setMenu] = useState("shop");
  return (
    <div className="navbar flex">
      <div className="logo">
        <img src={logo} alt="" className="logo" />
        <p>SHOPPER</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toogle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          {" "}
          <Link to="/">Shop</Link> {menu === "shop" ? <hr /> : <></>}{" "}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link to="/mens">Men</Link> {menu === "mens" ? <hr /> : <></>}{" "}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link to="/womens">Women</Link>
          {menu === "womens" ? <hr /> : <></>}{" "}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          {" "}
          <Link to="kids">Kids</Link> {menu === "kids" ? <hr /> : <></>}{" "}
        </li>
      </ul>
      <div className="nav-login-cart flex">


        {/* display Logout buuton */}
        {localStorage.getItem("auth-token") ? (
          <button className="btn"
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
