import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate("/notes");
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input name="email" className="form-control mb-3" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" className="form-control mb-3" placeholder="Password" onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
