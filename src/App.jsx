
// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";
// import emailjs from "@emailjs/browser";

// // Bootstrap CSS & JS
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// // Initialize EmailJS
// emailjs.init("rlIFalEFE2D4uPb1C");

// // Pages
// import Home from "./Home";
// import Veg from "./Veg";
// import Nonveg from "./Nonveg";
// import Drink from "./Drink";
// import Cart from "./Cart";
// import Contact from "./contact";
// import About from "./about";
// import Orders from "./Orders";
// import Register from "./Register";
// import Login from "./Login";

// // Logout Component
// const Logout = ({ setIsLoggedIn }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <button
//       className="btn btn-warning fw-bold"
//       style={{
//         borderRadius: "50px",
//         padding: "10px 20px",
//         fontSize: "16px",
//       }}
//       onClick={handleLogout}
//     >
//       Logout
//     </button>
//   );
// };

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const cartItems = []; // Temporary array (later can use Redux)

//   // Check if user is logged in on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   return (
//     <BrowserRouter>
//       {/* ---------------- Navbar ---------------- */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
//         <div className="container-fluid">
//           <NavLink className="navbar-brand fw-bold fs-4" to="/">
//             Tasty Bites
//           </NavLink>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/">Home</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/veg">Veg</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/nonveg">Non Veg</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/drink">Drinks</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/contact">Contact</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/about">About</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/order">Orders</NavLink>
//               </li>
//             </ul>

//             <div className="d-flex align-items-center gap-2">
//               <NavLink
//                 className="btn btn-outline-light position-relative"
//                 to="/cart"
//               >
//                 🛒 Cart
//                 {cartItems.length > 0 && (
//                   <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </NavLink>

//               {/* Conditional Login/Register or Logout */}
//               {isLoggedIn ? (
//                 <Logout setIsLoggedIn={setIsLoggedIn} />
//               ) : (
//                 <>
//                   <NavLink className="btn btn-outline-light" to="/login">Login</NavLink>
//                   <NavLink className="btn btn-light text-dark" to="/register">Register</NavLink>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* ---------------- Routes ---------------- */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/veg" element={<Veg />} />
//         <Route path="/nonveg" element={<Nonveg />} />
//         <Route path="/drink" element={<Drink />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/order" element={<Orders />} />
//         <Route
//           path="/register"
//           element={<Register />}
//         />
//         <Route
//           path="/login"
//           element={<Login setIsLoggedIn={setIsLoggedIn} />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;








import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import emailjs from "@emailjs/browser";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

emailjs.init("rlIFalEFE2D4uPb1C");

// Pages
import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Drink from "./Drink";
import Cart from "./Cart";
import Contact from "./contact";
import About from "./about";
import Orders from "./Orders";
import Register from "./Register";
import Login from "./Login";

// Logout Component
const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <button
      className="btn btn-warning fw-bold"
      style={{ borderRadius: "50px", padding: "10px 20px" }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartItems = [];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            Tasty Bites
          </NavLink>

          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/veg">Veg</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/nonveg">Non Veg</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/drink">Drinks</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/order">Orders</NavLink></li>
            </ul>

            <div className="d-flex gap-2">
              <NavLink className="btn btn-outline-light" to="/cart">
                🛒 Cart
              </NavLink>

              {isLoggedIn ? (
                <Logout setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <>
                  <NavLink className="btn btn-outline-light" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="btn btn-light" to="/register">
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<Nonveg />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Orders />} />

        {/* ✅ FIXED HERE */}
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
