

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Home() {
//   const [search, setSearch] = useState("");
//   const [showLogin, setShowLogin] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [activeTab, setActiveTab] = useState("Veg");

//   // Data
//   const vegItems = [
//     { id: "6", name: "Aloo Gobi", price: 180, img: "/images/aloo.jpg", category: "Veg" },
//     { id: "7", name: "Dal Makhani", price: 160, img: "/images/makhani.jpg", category: "Veg" },
//     { id: "8", name: "Veg Kofta Curry", price: 240, img: "/images/vegkofta.jpg", category: "Veg" },
//     { id: "9", name: "Kaju Curry", price: 300, img: "/images/Kaju.jpeg", category: "Veg" },
//     { id: "10", name: "Veg Manchurian", price: 180, img: "/images/machurian.jpeg", category: "Veg" },
//   ];

//   const nonVegItems = [
//     { id: "6", name: "Chicken Curry", price: 190, img: "/images/currey.jpeg", category: "Non-Veg" },
//     { id: "7", name: "Chicken Kebab", price: 160, img: "/images/kebabe.jpg", category: "Non-Veg" },
//     { id: "8", name: "Mutton Biryani", price: 300, img: "/images/mutton.jpeg", category: "Non-Veg" },
//     { id: "9", name: "Mutton Rogan Josh", price: 320, img: "/images/rogan.jpeg", category: "Non-Veg" },
//     { id: "10", name: "Mutton Korma", price: 280, img: "/images/korma.jpeg", category: "Non-Veg" },
//   ];

//   const drinksItems = [
//     { id: "1", name: "Iced Tea", price: 130, img: "/images/ice.jpeg", category: "Drink" },
//     { id: "2", name: "Mango Juice", price: 150, img: "/images/mango.jpeg", category: "Drink" },
//     { id: "3", name: "Cold Coffee", price: 165, img: "/images/cold.jpeg", category: "Drink" },
//     { id: "4", name: "Buttermilk", price: 100, img: "/images/milk.avif", category: "Drink" },
//     { id: "5", name: "Chocolate Shake", price: 210, img: "/images/choclate.jpg", category: "Drink" },
//   ];

//   const getCurrentItems = () => {
//     if (activeTab === "Veg") return vegItems;
//     if (activeTab === "Non-Veg") return nonVegItems;
//     if (activeTab === "Drinks") return drinksItems;
//     return [];
//   };

//   const filteredItems = getCurrentItems().filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   useEffect(() => {
//     const handleScroll = () => {
//       const totalHeight =
//         document.documentElement.scrollHeight - window.innerHeight;
//       setScrollProgress((window.scrollY / totalHeight) * 100);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToMenu = () => {
//     const section = document.getElementById("menu-section");
//     if (section) section.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <>
//       {/* SCROLL PROGRESS */}
//       <div className="position-fixed top-0 start-0 w-100">
//         <div className="progress" style={{ height: "5px" }}>
//           <div
//             className="progress-bar bg-warning"
//             role="progressbar"
//             style={{ width: `${scrollProgress}%` }}
//           ></div>
//         </div>
//       </div>

//       {/* NAVBAR */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow py-3">
//         <div className="container">
//           <a className="navbar-brand fw-bold fs-3" href="/">
//             🍔 Tasty Bites
//           </a>
//           <button
//             className="navbar-toggler"
//             data-bs-toggle="collapse"
//             data-bs-target="#nav"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div id="nav" className="collapse navbar-collapse justify-content-end">
//             <ul className="navbar-nav gap-3">
//               {["Home", "Veg", "Non Veg", "Drinks", "Cart", "Contact", "About"].map(
//                 (item) => (
//                   <li key={item} className="nav-item">
//                     <a
//                       className="nav-link fw-semibold"
//                       href={`/${item.toLowerCase().replace(" ", "")}`}
//                     >
//                       {item}
//                     </a>
//                   </li>
//                 )
//               )}
//               <li className="nav-item">
//                 <button
//                   className="btn btn-warning fw-bold px-3 rounded-pill"
//                   onClick={() => setShowLogin(true)}
//                 >
//                   Login
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section
//         className="d-flex flex-column justify-content-center align-items-center text-white bg-dark vh-100"
//         style={{
//           backgroundImage:
//             'url("https://images.unsplash.com/photo-1540189549336-e6e99c3679fe")',
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <h1 className="display-1 fw-bold text-center">Delicious Food, Delivered Fast 🍕</h1>
//         <p className="lead mt-3 text-center">Your cravings, our responsibility</p>

//         {/* Discount Ticker */}
//         <motion.div
//           className="mt-3 w-100 text-center fw-bold"
//           style={{ whiteSpace: "nowrap", overflow: "hidden" }}
//           animate={{ x: ["100%", "-100%"] }}
//           transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
//         >
//           🎉 Flat ₹100 OFF on your first order — Use code <strong>TASTY100</strong> 🎉
//         </motion.div>

//         {/* Search */}
//         <div className="d-flex flex-column flex-md-row gap-2 mt-4 w-75">
//           <input
//             type="text"
//             className="form-control flex-grow-1"
//             placeholder="Search dishes, cuisines..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button className="btn btn-warning fw-bold rounded-pill" onClick={scrollToMenu}>
//             Explore Menu ↓
//           </button>
//         </div>
//       </section>

//       {/* MENU TABS */}
//       <section className="container my-5" id="menu-section">
//         <h3 className="fw-bold mb-4 text-center">Our Menu 🍽️</h3>

//         {/* Tabs */}
//         <ul className="nav nav-pills justify-content-center mb-4">
//           {["Veg", "Non-Veg", "Drinks"].map((tab) => (
//             <li className="nav-item" key={tab}>
//               <button
//                 className={`nav-link ${activeTab === tab ? "active" : ""} rounded-pill`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* Tab Content */}
//         <div className="row g-4">
//           <AnimatePresence>
//             {filteredItems.length ? (
//               filteredItems.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   className="col-6 col-md-4 col-lg-3"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <motion.div
//                     className="card shadow-sm rounded-4 h-100"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <div className="position-relative">
//                       <img
//                         src={item.img}
//                         className="card-img-top rounded-4"
//                         alt={item.name}
//                       />
//                       {/* Category Badge */}
//                       <span className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark rounded-pill">
//                         {item.category}
//                       </span>
//                       {/* Price Tag */}
//                       <span className="position-absolute bottom-0 end-0 m-2 badge bg-dark text-white rounded-pill">
//                         ₹{item.price}
//                       </span>
//                     </div>
//                     <div className="card-body d-flex flex-column">
//                       <h5 className="card-title fw-bold">{item.name}</h5>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               ))
//             ) : (
//               <p className="text-center w-100">No dishes found 😔</p>
//             )}
//           </AnimatePresence>
//         </div>
//       </section>

//       {/* FAB */}
//       <button className="btn btn-warning position-fixed bottom-0 end-0 m-4 rounded-pill shadow-lg">
//         View Cart 🛒
//       </button>

//       {/* LOGIN POPUP */}
//       {showLogin && (
//         <div className="position-fixed inset-0 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
//           <div className="bg-white p-4 rounded-4 shadow-lg w-75 w-md-25">
//             <h5 className="fw-bold mb-3 text-center">Login 🍴</h5>
//             <input className="form-control mb-2" placeholder="Email" />
//             <input
//               className="form-control mb-3"
//               placeholder="Password"
//               type="password"
//             />
//             <button className="btn btn-warning w-100 fw-bold rounded-pill mb-2">
//               Login
//             </button>
//             <button
//               className="btn btn-link w-100"
//               onClick={() => setShowLogin(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// } export default Home;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("Veg");

  // Data
  const vegItems = [
    { id: "6", name: "Aloo Gobi", price: 180, img: "/images/aloo.jpg", category: "Veg" },
    { id: "7", name: "Dal Makhani", price: 160, img: "/images/makhani.jpg", category: "Veg" },
    { id: "8", name: "Veg Kofta Curry", price: 240, img: "/images/vegkofta.jpg", category: "Veg" },
    { id: "9", name: "Kaju Curry", price: 300, img: "/images/Kaju.jpeg", category: "Veg" },
    { id: "10", name: "Veg Manchurian", price: 180, img: "/images/machurian.jpeg", category: "Veg" },
  ];

  const nonVegItems = [
    { id: "6", name: "Chicken Curry", price: 190, img: "/images/currey.jpeg", category: "Non-Veg" },
    { id: "7", name: "Chicken Kebab", price: 160, img: "/images/kebabe.jpg", category: "Non-Veg" },
    { id: "8", name: "Mutton Biryani", price: 300, img: "/images/mutton.jpeg", category: "Non-Veg" },
    { id: "9", name: "Mutton Rogan Josh", price: 320, img: "/images/rogan.jpeg", category: "Non-Veg" },
    { id: "10", name: "Mutton Korma", price: 280, img: "/images/korma.jpeg", category: "Non-Veg" },
  ];

  const drinksItems = [
    { id: "1", name: "Iced Tea", price: 130, img: "/images/ice.jpeg", category: "Drink" },
    { id: "2", name: "Mango Juice", price: 150, img: "/images/mango.jpeg", category: "Drink" },
    { id: "3", name: "Cold Coffee", price: 165, img: "/images/cold.jpeg", category: "Drink" },
    { id: "4", name: "Buttermilk", price: 100, img: "/images/milk.avif", category: "Drink" },
    { id: "5", name: "Chocolate Shake", price: 210, img: "/images/choclate.jpg", category: "Drink" },
  ];

  const getCurrentItems = () => {
    if (activeTab === "Veg") return vegItems;
    if (activeTab === "Non-Veg") return nonVegItems;
    if (activeTab === "Drinks") return drinksItems;
    return [];
  };

  const filteredItems = getCurrentItems().filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToMenu = () => {
    const section = document.getElementById("menu-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // Framer Motion variants
  const cardVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" },
  };

  const badgeVariants = {
    category: { rest: { y: -20, opacity: 0 }, hover: { y: 0, opacity: 1 } },
    price: { rest: { scale: 0 }, hover: { scale: 1 } },
    addBtn: { rest: { opacity: 0, y: 20 }, hover: { opacity: 1, y: 0 } },
  };

  const tabVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <>
      {/* SCROLL PROGRESS */}
      <div className="position-fixed top-0 start-0 w-100">
        <div className="progress" style={{ height: "5px" }}>
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow py-3">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3" href="/">
            🍔 Tasty Bites
          </a>
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="nav" className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav gap-3">
              {["Home", "Veg", "Non Veg", "Drinks", "Cart", "Contact", "About"].map((item) => (
                <li key={item} className="nav-item">
                  <a
                    className="nav-link fw-semibold"
                    href={`/${item.toLowerCase().replace(" ", "")}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="nav-item">
                <button
                  className="btn btn-warning fw-bold px-3 rounded-pill"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="d-flex flex-column justify-content-center align-items-center text-white bg-dark vh-100"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1540189549336-e6e99c3679fe")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="display-1 fw-bold text-center">Delicious Food, Delivered Fast 🍕</h1>
        <p className="lead mt-3 text-center">Your cravings, our responsibility</p>

        {/* Discount Ticker */}
        <motion.div
          className="mt-3 w-100 text-center fw-bold"
          style={{ whiteSpace: "nowrap", overflow: "hidden" }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          🎉 Flat ₹100 OFF on your first order — Use code <strong>TASTY100</strong> 🎉
        </motion.div>

        {/* Search */}
        <div className="d-flex flex-column flex-md-row gap-2 mt-4 w-75">
          <input
            type="text"
            className="form-control flex-grow-1"
            placeholder="Search dishes, cuisines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-warning fw-bold rounded-pill" onClick={scrollToMenu}>
            Explore Menu ↓
          </button>
        </div>
      </section>

      {/* MENU TABS */}
      <section className="container my-5" id="menu-section">
        <h3 className="fw-bold mb-4 text-center">Our Menu 🍽️</h3>

        {/* Tabs */}
        <ul className="nav nav-pills justify-content-center mb-4">
          {["Veg", "Non-Veg", "Drinks"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active bg-warning text-dark" : "bg-light text-dark"} rounded-pill px-4`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="row g-4">
          <AnimatePresence mode="wait">
            {filteredItems.length ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="col-6 col-md-4 col-lg-3"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="card rounded-4 h-100 border-0 overflow-hidden"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    {/* Image + Badge */}
                    <motion.div className="position-relative overflow-hidden">
                      <motion.img
                        src={item.img}
                        className="card-img-top rounded-4"
                        alt={item.name}
                        style={{ height: "200px", objectFit: "cover" }}
                        variants={cardVariants}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark rounded-pill"
                        variants={badgeVariants.category}
                        transition={{ duration: 0.3 }}
                      >
                        {item.category}
                      </motion.span>
                      <motion.span
                        className="position-absolute bottom-0 end-0 m-2 badge bg-dark text-white rounded-pill"
                        variants={badgeVariants.price}
                        transition={{ duration: 0.3 }}
                      >
                        ₹{item.price}
                      </motion.span>
                    </motion.div>

                    {/* Card Body */}
                    <motion.div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title fw-bold text-center">{item.name}</h5>
                      <motion.button
                        className="btn btn-warning fw-bold rounded-pill mt-2 w-100"
                        variants={badgeVariants.addBtn}
                        transition={{ duration: 0.3 }}
                      >
                        Add to Cart 🛒
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <p className="text-center w-100">No dishes found 😔</p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAB */}
      <button className="btn btn-warning position-fixed bottom-0 end-0 m-4 rounded-pill shadow-lg">
        View Cart 🛒
      </button>

      {/* LOGIN POPUP */}
      {showLogin && (
        <div className="position-fixed inset-0 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
          <div className="bg-white p-4 rounded-4 shadow-lg w-75 w-md-25">
            <h5 className="fw-bold mb-3 text-center">Login 🍴</h5>
            <input className="form-control mb-2" placeholder="Email" />
            <input className="form-control mb-3" placeholder="Password" type="password" />
            <button className="btn btn-warning w-100 fw-bold rounded-pill mb-2">
              Login
            </button>
            <button className="btn btn-link w-100" onClick={() => setShowLogin(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
