// Logout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); // Update login state in App
    navigate("/login"); // Redirect to login page
  };

  return (
    <button
      className="btn btn-warning fw-bold"
      style={{
        borderRadius: "50px",
        padding: "10px 20px",
        fontSize: "16px",
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
