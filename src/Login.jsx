




import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // optional: button loading state

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://backend-blue-eight-28.vercel.app/api/v1/products/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true); // ✅ Update App state for navbar
        Swal.fire({
          title: "Success",
          text: "Logged in successfully!",
          icon: "success",
          confirmButtonColor: "#ffc107",
        });
        navigate("/"); // Redirect to Home
      } else {
        Swal.fire({
          title: "Error",
          text: data.error || "Invalid credentials",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          zIndex: 0,
        }}
      ></div>

      <div
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "20px",
          background: "rgba(33, 37, 41, 0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          zIndex: 1,
          color: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#ffc107" }}>
            🔐 Welcome Back
          </h2>
          <p className="text-white-50 small">Login to satisfy your cravings</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Login Button */}
          <button
            className="btn w-100 fw-bold shadow-sm"
            style={{
              background: "#ffc107",
              color: "#000",
              padding: "12px",
              borderRadius: "50px",
              border: "none",
              fontSize: "16px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            type="submit"
            disabled={loading} // prevent multiple clicks
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <p className="text-center mt-4 text-white-50">
          Don't have an account?{" "}
          <span
            className="fw-bold text-white text-decoration-underline"
            style={{ cursor: "pointer", transition: "0.2s" }}
            onClick={() => navigate("/register")}
            onMouseOver={(e) => (e.target.style.color = "#ffc107")}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

// Input style
const inputStyle = {
  borderRadius: "10px",
  padding: "12px",
  border: "1px solid #ced4da",
  background: "#fff",
  color: "#333",
};

export default Login;
