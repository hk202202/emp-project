import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logout = () => {
    localStorage.clear();
    navigate("signup");
  };
  return (
    <div>
      <Link to="/">
        {" "}
        <img
          className="logo"
          alt="logo"
          src="https://www.shutterstock.com/image-vector/creative-modern-abstract-ecommerce-logo-260nw-2134594701.jpg"
        ></img>
      </Link>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/product">Employee List</Link>
          </li>
          <li>
            <Link to="/add">Add Employee</Link>
          </li>
          {/* <li><Link to="/update/:id">Update Product</Link></li> */}
          {/* <li></li>
          <li>
            <Link to="/Profile">Profile</Link>
          </li> */}
          <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-sign">
          <li>
            <Link to="/signup">SignUp</Link>
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
