
// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Register = ({ setIsLoggedIn }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: { house: "", street: "", city: "", state: "", pincode: "" },
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (["house", "street", "city", "state", "pincode"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         address: { ...prev.address, [name]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Trim all values before sending
//     const payload = {
//       ...formData,
//       name: formData.name.trim(),
//       email: formData.email.trim(),
//       password: formData.password.trim(),
//       phone: formData.phone.trim(),
//       address: {
//         house: formData.address.house.trim(),
//         street: formData.address.street.trim(),
//         city: formData.address.city.trim(),
//         state: formData.address.state.trim(),
//         pincode: formData.address.pincode.trim(),
//       },
//     };

//     try {
//       const res = await fetch("http://localhost:3000/api/v1/products/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Failed to register");

//       // Save token and update login state
//       localStorage.setItem("token", data.token);
//       setIsLoggedIn(true);

//       Swal.fire({
//         title: "Success",
//         text: "Registered successfully!",
//         icon: "success",
//         confirmButtonColor: "#ffc107",
//       });

//       navigate("/"); // redirect to Home
//     } catch (err) {
//       Swal.fire({
//         title: "Error",
//         text: err.message,
//         icon: "error",
//         confirmButtonColor: "#d33",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{
//         minHeight: "100vh",
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1600&q=80')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         position: "relative",
//       }}
//     >
//       {/* Overlay */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.65)",
//           zIndex: 0,
//         }}
//       ></div>

//       <div
//         className="card p-4 shadow-lg"
//         style={{
//           width: "550px",
//           borderRadius: "20px",
//           background: "rgba(33, 37, 41, 0.85)",
//           backdropFilter: "blur(10px)",
//           border: "1px solid rgba(255, 255, 255, 0.15)",
//           color: "#fff",
//           zIndex: 1,
//         }}
//       >
//         <h2
//           className="text-center mb-4 fw-bold"
//           style={{
//             color: "#ffc107",
//             fontSize: "28px",
//             textShadow: "0px 2px 10px rgba(255, 193, 7, 0.3)",
//           }}
//         >
//           ✨ Create Your Account
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {/* Personal Info */}
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label fw-semibold">Full Name</label>
//               <input
//                 name="name"
//                 className="form-control"
//                 placeholder="Enter your name"
//                 onChange={handleChange}
//                 required
//                 style={inputStyle}
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <label className="form-label fw-semibold">Phone Number</label>
//               <input
//                 name="phone"
//                 className="form-control"
//                 placeholder="Phone number"
//                 onChange={handleChange}
//                 required
//                 style={inputStyle}
//               />
//             </div>
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-semibold">Email</label>
//             <input
//               name="email"
//               type="email"
//               className="form-control"
//               placeholder="Enter your email"
//               onChange={handleChange}
//               required
//               style={inputStyle}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="form-label fw-semibold">Password</label>
//             <input
//               name="password"
//               type="password"
//               className="form-control"
//               placeholder="Create strong password"
//               onChange={handleChange}
//               required
//               style={inputStyle}
//             />
//           </div>

//           {/* Address Section */}
//           <h5
//             className="mb-3 fw-bold border-bottom pb-2"
//             style={{
//               color: "#ffc107",
//               fontSize: "18px",
//               borderColor: "rgba(255,255,255,0.2)",
//             }}
//           >
//             📍 Delivery Address
//           </h5>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <input
//                 name="house"
//                 className="form-control"
//                 placeholder="House No."
//                 onChange={handleChange}
//                 required
//                 style={inputStyle}
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <input
//                 name="street"
//                 className="form-control"
//                 placeholder="Street / Area"
//                 onChange={handleChange}
//                 required
//                 style={inputStyle}
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-4 mb-3">
//               <input
//                 name="city"
//                 className="form-control"
//                 placeholder="City"
//                 onChange={handleChange}
//                 required
//                 style={inputStyle}
//               />
//             </div>
//             <div className="col-md-4 mb-3">
//               <input
//                 name="state"
//                 className="form-control"
//                 placeholder="State"
//                 onChange={handleChange}
//                 required
//                 style={inputStyle}
//               />
//             </div>
//             <div className="col-md-4 mb-3">
//               <input
//                 name="pincode"
//                 className="form-control"
//                 placeholder="Pincode"
//                 onChange={handleChange}
//                 required
//                 style={inputStyle}
//               />
//             </div>
//           </div>

//           <button
//             className="btn w-100 fw-bold mt-2 shadow-sm"
//             style={{
//               background: "#ffc107",
//               color: "#000",
//               padding: "12px",
//               borderRadius: "50px",
//               fontSize: "16px",
//               border: "none",
//               transition: "0.3s",
//             }}
//             onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
//             onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "REGISTERING..." : "REGISTER"}
//           </button>
//         </form>

//         <p className="text-center mt-4 text-white-50">
//           Already have an account?{" "}
//           <span
//             className="fw-bold text-white text-decoration-underline"
//             style={{ cursor: "pointer" }}
//             onClick={() => navigate("/login")}
//             onMouseOver={(e) => (e.target.style.color = "#ffc107")}
//             onMouseOut={(e) => (e.target.style.color = "#fff")}
//           >
//             Login here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// // Input style
// const inputStyle = {
//   borderRadius: "10px",
//   padding: "10px 12px",
//   border: "1px solid #ced4da",
//   background: "#fff",
//   color: "#333",
//   fontSize: "14px",
// };

// export default Register;











import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = ({ setIsLoggedIn = () => { } }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: {
      house: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["house", "street", "city", "state", "pincode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Trim values
    const payload = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      phone: formData.phone.trim(),
      address: {
        house: formData.address.house.trim(),
        street: formData.address.street.trim(),
        city: formData.address.city.trim(),
        state: formData.address.state.trim(),
        pincode: formData.address.pincode.trim(),
      },
    };

    try {
      const res = await fetch(
        "https://tasty-bites-backend.vercel.app/api/v1/products/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("token", data.token);

      if (typeof setIsLoggedIn === "function") {
        setIsLoggedIn(true);
      }

      Swal.fire({
        title: "Success",
        text: "Registered successfully!",
        icon: "success",
        confirmButtonColor: "#ffc107",
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#d33",
      });
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
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "550px",
          borderRadius: "20px",
          background: "rgba(33, 37, 41, 0.9)",
          color: "#fff",
        }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#ffc107" }}>
          ✨ Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name & Phone */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name</label>
              <input
                name="name"
                className="form-control"
                required
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                className="form-control"
                required
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              required
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              required
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Address */}
          <h5 className="mb-3 fw-bold" style={{ color: "#ffc107" }}>
            📍 Delivery Address
          </h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                name="house"
                className="form-control"
                placeholder="House No."
                required
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                name="street"
                className="form-control"
                placeholder="Street / Area"
                required
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                name="city"
                className="form-control"
                placeholder="City"
                required
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                name="state"
                className="form-control"
                placeholder="State"
                required
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="col-md-4 mb-4">
              <input
                name="pincode"
                className="form-control"
                placeholder="Pincode"
                required
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <button
            className="btn w-100 fw-bold"
            style={{ background: "#ffc107", color: "#000" }}
            disabled={loading}
          >
            {loading ? "REGISTERING..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  borderRadius: "10px",
  padding: "10px",
  border: "1px solid #ced4da",
};

export default Register;
