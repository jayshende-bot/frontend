
// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Register = ({ setIsLoggedIn = () => { } }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: {
//       house: "",
//       street: "",
//       city: "",
//       state: "",
//       pincode: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (["house", "street", "city", "state", "pincode"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         address: {
//           ...prev.address,
//           [name]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Trim values
//     // const payload = {
//     //   ...formData,
//     //   name: formData.name.trim(),
//     //   email: formData.email.trim(),
//     //   password: formData.password.trim(),
//     //   phone: formData.phone.trim(),
//     //   address: {
//     //     house: formData.address.house.trim(),
//     //     street: formData.address.street.trim(),
//     //     city: formData.address.city.trim(),
//     //     state: formData.address.state.trim(),
//     //     pincode: formData.address.pincode.trim(),
//     //   },
//     // };



//  const payload = {
//   name: formData.name.trim(),
//   email: formData.email.trim(),
//   password: formData.password.trim(),
//   phone: formData.phone.trim(),

//   // ✅ convert object to string
//   address: `${formData.address.house}, ${formData.address.street}, ${formData.address.city}, ${formData.address.state} - ${formData.address.pincode}`,
// };


//     try {
//       const res = await fetch(
//         "https://tasty-bites-backend.vercel.app/api/v1/products/register",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Registration failed");

//       localStorage.setItem("token", data.token);

//       if (typeof setIsLoggedIn === "function") {
//         setIsLoggedIn(true);
//       }

//       Swal.fire({
//         title: "Success",
//         text: "Registered successfully!",
//         icon: "success",
//         confirmButtonColor: "#ffc107",
//       });

//       navigate("/");
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
//       }}
//     >
//       <div
//         className="card p-4 shadow-lg"
//         style={{
//           width: "550px",
//           borderRadius: "20px",
//           background: "rgba(33, 37, 41, 0.9)",
//           color: "#fff",
//         }}
//       >
//         <h2 className="text-center mb-4 fw-bold" style={{ color: "#ffc107" }}>
//           ✨ Create Your Account
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {/* Name & Phone */}
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Full Name</label>
//               <input
//                 name="name"
//                 className="form-control"
//                 required
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label className="form-label">Phone</label>
//               <input
//                 name="phone"
//                 className="form-control"
//                 required
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               name="email"
//               type="email"
//               className="form-control"
//               required
//               onChange={handleChange}
//               style={inputStyle}
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="form-label">Password</label>
//             <input
//               name="password"
//               type="password"
//               className="form-control"
//               required
//               onChange={handleChange}
//               style={inputStyle}
//             />
//           </div>

//           {/* Address */}
//           <h5 className="mb-3 fw-bold" style={{ color: "#ffc107" }}>
//             📍 Delivery Address
//           </h5>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <input
//                 name="house"
//                 className="form-control"
//                 placeholder="House No."
//                 required
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <input
//                 name="street"
//                 className="form-control"
//                 placeholder="Street / Area"
//                 required
//                 onChange={handleChange}
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
//                 required
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>

//             <div className="col-md-4 mb-3">
//               <input
//                 name="state"
//                 className="form-control"
//                 placeholder="State"
//                 required
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>

//             <div className="col-md-4 mb-4">
//               <input
//                 name="pincode"
//                 className="form-control"
//                 placeholder="Pincode"
//                 required
//                 onChange={handleChange}
//                 style={inputStyle}
//               />
//             </div>
//           </div>

//           <button
//             className="btn w-100 fw-bold"
//             style={{ background: "#ffc107", color: "#000" }}
//             disabled={loading}
//           >
//             {loading ? "REGISTERING..." : "REGISTER"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const inputStyle = {
//   borderRadius: "10px",
//   padding: "10px",
//   border: "1px solid #ced4da",
// };

// export default Register;



















import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = ({ setIsLoggedIn = () => {} }) => {
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

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      phone: formData.phone.trim(),
      address: `${formData.address.house}, ${formData.address.street}, ${formData.address.city}, ${formData.address.state} - ${formData.address.pincode}`,
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
      setIsLoggedIn(true);

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
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name</label>
              <input
                name="name"
                value={formData.name}
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
                value={formData.phone}
                className="form-control"
                required
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              className="form-control"
              required
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              className="form-control"
              required
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <h5 className="mb-3 fw-bold" style={{ color: "#ffc107" }}>
            📍 Delivery Address
          </h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                name="house"
                value={formData.address.house}
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
                value={formData.address.street}
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
                value={formData.address.city}
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
                value={formData.address.state}
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
                value={formData.address.pincode}
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
