

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
//     house: "",
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

    

//    const payload = {
//   name: formData.name.trim(),
//   email: formData.email.trim(),
//   password: formData.password.trim(),
//   phone: formData.phone.trim(),
//   address: {
//     house: formData.house.trim(),
//     street: formData.street.trim(),
//     city: formData.city.trim(),
//     state: formData.state.trim(),
//     pincode: formData.pincode.trim(),
//   },
// };


//     if (Object.values(payload).some((v) => !v)) {
//       Swal.fire("Error", "All fields are required", "error");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(
//         "https://tasty-bites-backend.vercel.app/api/v1/register",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await res.json();
//       console.log("Registration response:", data); // ✅ Debug log

//       if (!res.ok) throw new Error(data.message || "Registration failed");

//       localStorage.setItem("token", data.token);

//       // ✅ Store user info (same as Login)
//       const userData = { email: data.user.email, name: data.user.name };
//       localStorage.setItem("user", JSON.stringify(userData));

//       console.log("Saved to localStorage:", { token: data.token, user: userData }); // ✅ Debug log

//       setIsLoggedIn(true);

//       Swal.fire("Success", "Registered Successfully", "success");
//       navigate("/");
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
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
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <input
//                 name="name"
//                 placeholder="Full Name"
//                 className="form-control"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <input
//                 name="phone"
//                 placeholder="Phone"
//                 className="form-control"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             className="form-control mb-3"
//             onChange={handleChange}
//             required
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             className="form-control mb-4"
//             onChange={handleChange}
//             required
//           />

//           <h5 style={{ color: "#ffc107" }}>📍 Delivery Address</h5>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <input name="house" placeholder="House No" className="form-control" onChange={handleChange} required />
//             </div>
//             <div className="col-md-6 mb-3">
//               <input name="street" placeholder="Street" className="form-control" onChange={handleChange} required />
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-4 mb-3">
//               <input name="city" placeholder="City" className="form-control" onChange={handleChange} required />
//             </div>
//             <div className="col-md-4 mb-3">
//               <input name="state" placeholder="State" className="form-control" onChange={handleChange} required />
//             </div>
//             <div className="col-md-4 mb-4">
//               <input name="pincode" placeholder="Pincode" className="form-control" onChange={handleChange} required />
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
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      phone: formData.phone.trim(),
      address: {
        house: formData.house.trim(),
        street: formData.street.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
      },
    };

    console.log("FINAL PAYLOAD:", payload);

    // ✅ Correct validation
    if (
      !payload.name ||
      !payload.email ||
      !payload.password ||
      !payload.phone ||
      !payload.address.house ||
      !payload.address.street ||
      !payload.address.city ||
      !payload.address.state ||
      !payload.address.pincode
    ) {
      Swal.fire("Error", "All fields are required", "error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://tasty-bites-backend.vercel.app/api/v1/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Registration response:", data);

      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ email: data.user.email, name: data.user.name })
      );

      setIsLoggedIn(true);
      Swal.fire("Success", "Registered Successfully", "success");
      navigate("/");
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
              <input
                name="name"
                placeholder="Full Name"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                name="phone"
                placeholder="Phone"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-control mb-4"
            onChange={handleChange}
            required
          />

          <h5 style={{ color: "#ffc107" }}>📍 Delivery Address</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                name="house"
                placeholder="House No"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                name="street"
                placeholder="Street"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                name="city"
                placeholder="City"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <input
                name="state"
                placeholder="State"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-4">
              <input
                name="pincode"
                placeholder="Pincode"
                className="form-control"
                onChange={handleChange}
                required
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

export default Register;
