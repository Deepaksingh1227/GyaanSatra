import React, { useState } from "react";
import axios from "../api/axios"; // ✅ Use custom axios instance
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form); // ✅ relative path
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navigate based on user role
      if (res.data.user.role === "admin" || user.email === "divyanthakur856@gmail.com") {
        navigate("/admin-dashboard");
      } else {
        navigate("/notes");
      }
    } catch (err) {
      const msg = err.response?.data?.msg || "Login failed";
      alert("Login failed: " + msg);
    }
  };

  return (
    <div className="container mt-5 col-md-6 mx-auto">
      <h2 className="text-center mb-4 pt-5">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <button
            className="btn btn-link p-0"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
