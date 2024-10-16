// HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the custom CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="title">Employee Management System</h1>
      <p className="description">
        Welcome to the Employee Management System. Here you can manage employee
        records effectively and efficiently. Let's get started!
      </p>

      <div className="link-container">
        <Link to="/product" className="link view-employees">
          View Employees
        </Link>
        <Link to="/add" className="link add-employee">
          Add New Employee
        </Link>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Employee Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
