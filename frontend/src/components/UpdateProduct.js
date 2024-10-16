// UpdateForm.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]); // Changed state to single course
  const [file, setFile] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setEmail(result.email);
    setMobileNo(result.mobileNo);
    setDesignation(result.designation);
    setGender(result.gender);
    setCourse(result.course || []); // Adjusted to course
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCourseChange = (event) => {
    const value = event.target.value;
    setCourse(value); // Set course directly as a single value
  };

  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNo", mobileNo);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course); // Changed to course
    if (file) {
      formData.append("file", file);
    }

    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: formData,
    });
    result = await result.json();
    console.log(result);
    navigate("/"); // Navigate back to home or appropriate page
  };

  return (
    <div className="form">
      <h1>Update Details</h1>
      <input
        type="text"
        placeholder="Name"
        className="input-box"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="email"
        placeholder="Email"
        className="input-box"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="text"
        placeholder="Mobile No"
        className="input-box"
        onChange={(e) => setMobileNo(e.target.value)}
        value={mobileNo}
      />

      <select
        className="input-box"
        onChange={(e) => setDesignation(e.target.value)}
        value={designation}
      >
        <option value="">Select Designation</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>

      <div className="gender-section">
        <span>Gender: </span>
        <input
          type="radio"
          name="gender"
          value="M"
          onChange={(e) => setGender(e.target.value)}
          checked={gender === "M"}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="F"
          onChange={(e) => setGender(e.target.value)}
          checked={gender === "F"}
        />{" "}
        Female
      </div>

      <div className="course-section">
        <span>Course: </span>
        <input
          type="radio"
          value="MCA"
          checked={course === "MCA"}
          onChange={handleCourseChange}
        />{" "}
        MCA
        <input
          type="radio"
          value="BCA"
          checked={course === "BCA"}
          onChange={handleCourseChange}
        />{" "}
        BCA
        <input
          type="radio"
          value="BSC"
          checked={course === "BSC"}
          onChange={handleCourseChange}
        />{" "}
        BSC
      </div>

      <input type="file" onChange={handleFileChange} className="file-input" />

      <button onClick={updateProduct} className="app-button">
        Update Details
      </button>
    </div>
  );
};

export default UpdateForm;
