import React from "react";
import logo from "../../../images/logo.png";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
const Header = () => {
  return(
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src={logo} height="100px" width="250px" />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav"
           style={{"left":"65%", "position": "absolute","font-size":"30px"}}>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">Home<span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">about</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
};
export default Header;
