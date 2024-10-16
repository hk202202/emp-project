import React, { useState } from "react";

const AddForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourses] = useState("");
  const [file, setFile] = useState(null);
  const [valid, setValid] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the file object
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !mobileNo ||
      !designation ||
      !gender ||
      !course ||
      !file
    ) {
      setValid(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;

    // Use FormData to send both the text and file data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNo", mobileNo);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course);
    formData.append("file", file); // Append the file

    try {
      let result = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: formData, // Send FormData
      });
      result = await result.json();

      // Reset the form
      setName("");
      setEmail("");
      setMobileNo("");
      setDesignation("");
      setGender("");
      setCourses("");
      setFile(null);
      setValid(false);

      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="form">
      <h1>Add Details</h1>

      <input
        type="text"
        placeholder="Name"
        className="input-box"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {valid && !name && <span className="invalid-input">Invalid name</span>}

      <input
        type="email"
        placeholder="Email"
        className="input-box"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {valid && !email && <span className="invalid-input">Invalid email</span>}

      <input
        type="text"
        placeholder="Mobile No"
        className="input-box"
        onChange={(e) => setMobileNo(e.target.value)}
        value={mobileNo}
      />
      {valid && !mobileNo && (
        <span className="invalid-input">Invalid mobile number</span>
      )}

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
      {valid && !designation && (
        <span className="invalid-input">Invalid designation</span>
      )}

      <div>
        <span>Gender: </span>
        <input
          type="radio"
          name="gender"
          value="M"
          onChange={(e) => setGender(e.target.value)}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="F"
          onChange={(e) => setGender(e.target.value)}
        />{" "}
        Female
      </div>
      {valid && !gender && (
        <span className="invalid-input">Invalid gender</span>
      )}

      <div>
        <span>Course: </span>
        <input
          type="checkbox"
          value="MCA"
          onChange={() => setCourses("MCA")}
        />{" "}
        MCA
        <input
          type="checkbox"
          value="BCA"
          onChange={() => setCourses("BCA")}
        />{" "}
        BCA
        <input
          type="checkbox"
          value="BSC"
          onChange={() => setCourses("BSC")}
        />{" "}
        BSC
      </div>
      {valid && !course && (
        <span className="invalid-input">Invalid course selection</span>
      )}

      <input type="file" onChange={handleFileChange} />
      {valid && !file && (
        <span className="invalid-input">Invalid file upload</span>
      )}

      <button onClick={handleSubmit} className="app-button">
        Submit
      </button>
    </div>
  );
};

export default AddForm;
