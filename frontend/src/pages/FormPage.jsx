import React, { useState } from "react";
import axios from "axios";

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    date: "",
    gender: "",
    status: "",
    phone: "",
    email: "",
    education: "",
    profile: null,
    signature: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post(
        "https://laxmi-traders02.onrender.com/api/form", // 🔥 Replace with your backend Render URL
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Form submitted successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Submit error");
    }
  };

  return (
    <div className="form-container">
      <h1>Application Form</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input type="date" name="date" onChange={handleChange} />
        <select name="gender" onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
        </select>
        <select name="status" onChange={handleChange}>
          <option>Single</option>
          <option>Married</option>
        </select>
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="education" placeholder="Education" onChange={handleChange} />
        <label>Profile</label>
        <input type="file" name="profile" onChange={handleChange} />
        <label>Signature</label>
        <input type="file" name="signature" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
