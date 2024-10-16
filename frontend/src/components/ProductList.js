import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // To track the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [sortField, setSortField] = useState("name"); // Default sorting field
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order

  const itemsPerPage = 10; // You can set how many items to display per page

  useEffect(() => {
    getProduct();
  }, [currentPage]); // Fetch products when page or sorting changes

  const getProduct = async () => {
    try {
      let result = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortField}&order=${sortOrder}`
      );
      result = await result.json();

      setProducts(result.products);
      setTotalPages(result.totalPages); // Set total pages based on API response
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
      });
      result = await result.json();
      if (result) {
        getProduct();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      try {
        let result = await fetch(`http://localhost:5000/search/${key}`);
        result = await result.json();
        if (result) {
          setProducts(result);
        }
      } catch (error) {
        console.error("Error searching products:", error);
      }
    } else {
      getProduct();
    }
  };

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to handle sorting
  const handleSort = async (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    } else {
      setSortField(field);
      setSortOrder("asc"); // Default to ascending when changing sort field
    }
    try {
      let result = await fetch(
        `http://localhost:5000/sort?sortBy=${field}&order=${sortOrder}`
      );

      result = await result.json();
      setProducts(result);
    } catch (err) {
      console.error("Error sorting products:", err);
    }
  };

  return (
    <div className="product-list-container">
      <h3>Employee List</h3>
      <input
        className="search-product-box"
        type="text"
        placeholder="Enter Search Keyword"
        onChange={searchHandle}
      />

      {/* Sorting Controls */}
      <div className="sorting-controls">
        <button onClick={() => handleSort("name")}>
          Sort by Name{" "}
          {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
        <button onClick={() => handleSort("email")}>
          Sort by Email{" "}
          {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
        <button onClick={() => handleSort("createDate")}>
          Sort by Date{" "}
          {sortField === "createDate" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products.map((item, index) => (
              <tr key={item._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>
                  <img
                    src={
                      item.image
                        ? `http://localhost:5000/${item.image}`
                        : "default-image.png"
                    }
                    alt="Profile"
                    className="profile-image"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobileNo}</td>
                <td>{item.designation}</td>
                <td>{item.gender}</td>
                <td>{item.course}</td>
                <td>{new Date(item.createDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(item._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/update/${item._id}`} className="edit-link">
                    {" "}
                    Edit{" "}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No Results Found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-btn"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
