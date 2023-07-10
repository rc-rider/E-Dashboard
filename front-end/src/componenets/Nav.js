import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className="nav-bar">
    <img 
    alt="logo"
    className="logo"
    src="https://static1.squarespace.com/static/61f8dff2258fca2449b49174/t/61f8e1e584e5ea641f2407be/1674279558489/"/>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          {/* <li>
            <Link to="/update">Update Product</Link>
          </li> */}
          {/* <li>
            <Link to="/profile">Profile</Link>
          </li> */}
          <li>
            <Link onClick={logout} to="/signup"> Logout  ({JSON.parse(auth).name})
              
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
