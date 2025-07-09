// src/pages/SignupPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
            "http://localhost:5000/api/auth/signup",
            formData,
            {
                headers: {
                "Content-Type": "application/json",  // ✅ REQUIRED
                },
            }
            );
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };


  return (
    <div className="container mt-5 pt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Sign Up</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="form-control mb-3"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Don't allow selecting admin role */}
        <select
        name="role"
        className="form-control mb-4"
        value={formData.role}
        onChange={handleChange}
        disabled // make fixed
        >
        <option value="user">User</option>
        </select>


        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
