// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// // ✅ FIXED IMPORT: Import the action from the slice file, not the store file
// import { addToCart } from "./cartSlice";
// // Note: Ensure './cartSlice' is the correct relative path to your cartSlice.js

// function Drink() {
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 8;

//     // Hook to dispatch actions
//     const dispatch = useDispatch();

//     // Static drink items (You might want to fetch these from the backend 'drinks' endpoint later!)
//     const drinkItems = [
//         { id: 1, name: "Coca Cola", price: 150, description: "A classic carbonated soft drink enjoyed worldwide.", photo: "/images/coca.jpg" },
//         { id: 2, name: "Pepsi", price: 150, description: "Refreshing cola drink with a bold taste.", photo: "/images/pepsi.webp" },
//         { id: 3, name: "Lemonade", price: 120, description: "Freshly squeezed lemon drink with a tangy flavor.", photo: "/images/lemonade.webp" },
//         { id: 4, name: "Sprite", price: 135, description: "A clear lemon-lime flavored soft drink.", photo: "/images/sprite.jpeg" },
//         { id: 5, name: "Fanta Orange", price: 150, description: "Sweet and bubbly orange-flavored soda.", photo: "/images/fanta.jpeg" },
//         { id: 6, name: "Mountain Dew", price: 150, description: "Citrus-flavored soda with a bold, energizing taste.", photo: "/images/dew.jpeg" },
//         { id: 7, name: "Red Bull", price: 250, description: "Energy drink that revitalizes the body and mind.", photo: "/images/redbull.jpeg" },
//         { id: 8, name: "Gatorade", price: 200, description: "Hydrating sports drink packed with electrolytes.", photo: "/images/gato.jpeg" },
//         { id: 9, name: "Iced Tea", price: 130, description: "Chilled tea with a refreshing and sweet flavor.", photo: "/images/ice.jpeg" },
//         { id: 10, name: "Mango Juice", price: 150, description: "Smooth and sweet drink made from ripe mangoes.", photo: "/images/mango.jpeg" },
//         { id: 11, name: "Cold Coffee", price: 165, description: "Chilled coffee beverage with a creamy texture.", photo: "/images/cold.jpeg" },
//         { id: 12, name: "Buttermilk", price: 100, description: "A cooling traditional drink with mild spices.", photo: "/images/milk.avif" },
//         { id: 13, name: "Chocolate Shake", price: 210, description: "Rich and creamy shake made with real chocolate.", photo: "/images/choclate.jpg" }
//     ];

//     // Pagination logic
//     const indexOfLast = currentPage * itemsPerPage;
//     const indexOfFirst = indexOfLast - itemsPerPage;
//     const currentItems = drinkItems.slice(indexOfFirst, indexOfLast);
//     const totalPages = Math.ceil(drinkItems.length / itemsPerPage);

//     // Add to Redux cart function
//     const handleAdd = (item) => {
//         // Dispatching the action from cartSlice.js
//         dispatch(addToCart(item));
//     };

//     return (
//         <section className="py-5">
//             <div className="container">
//                 <h2 className="fw-bold text-center mb-4">Drinks Menu</h2>

//                 <div className="row g-4">
//                     {currentItems.map(item => (
//                         <div className="col-md-3" key={item.id}>
//                             <div className="card shadow border-0">
//                                 <img
//                                     src={item.photo}
//                                     className="card-img-top"
//                                     style={{ height: "180px", objectFit: "cover" }}
//                                     alt={item.name}
//                                 />

//                                 <div className="card-body text-center">
//                                     <h5 className="fw-bold">{item.name}</h5>
//                                     <p className="text-success fw-semibold">₹{item.price}</p>
//                                     <p className="small text-muted">{item.description}</p>

//                                     <button
//                                         className="btn btn-primary w-100"
//                                         onClick={() => handleAdd(item)}
//                                     >
//                                         Add to Cart
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Pagination */}
//                 <div className="mt-4 d-flex justify-content-center">
//                     <nav>
//                         <ul className="pagination">
//                             <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                                 <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
//                             </li>

//                             {[...Array(totalPages)].map((_, i) => (
//                                 <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
//                                     <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
//                                         {i + 1}
//                                     </button>
//                                 </li>
//                             ))}

//                             <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//                                 <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
//                             </li>
//                         </ul>
//                     </nav>
//                 </div>
//             </div>
//         </section>
//     );
// }import React, { useState, useEffect } from "react";





import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDrinkProducts } from "./drinkSlice";
import { addToCart } from "./cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ----------------------- PAGINATION -----------------------
const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const activePageStyle = {
    backgroundColor: "#ffc107",
    borderColor: "#ffc107",
    color: "#000",
    fontWeight: "bold",
  };

  return (
    <nav className="d-flex justify-content-center mt-5">
      <ul className="pagination shadow-sm">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <a
              onClick={() => paginate(number)}
              className="page-link"
              style={number === currentPage ? activePageStyle : null}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// ----------------------- DRINK COMPONENT -----------------------
function Drink() {
  const dispatch = useDispatch();

  const drinkItems = useSelector((state) => state.drink?.drinkItems ?? []);
  const loading = useSelector((state) => state.drink?.loading ?? false);
  const error = useSelector((state) => state.drink?.error ?? null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchDrinkProducts());
  }, [dispatch]);

  const getImageUrl = (img) => img || "/images/default.jpg";

  // Search filter
  const filteredItems = drinkItems.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Add to cart handler
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className="container py-5"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <ToastContainer />

      {/* Title */}
      <h2 className="text-center fw-bold display-5 mb-5">
        <span className="text-warning border-bottom border-warning pb-2">
          Drink
        </span>{" "}
        Menu
      </h2>

      {/* Search Bar */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6 col-10">
          <input
            type="text"
            className="form-control form-control-lg rounded-pill shadow-sm"
            placeholder="Search drinks..."
            style={{ padding: "12px 25px" }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Skeleton Loader */}
      {loading && (
        <div className="row g-4">
          {[...Array(itemsPerPage)].map((_, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow border-0 overflow-hidden rounded-3">
                <div className="placeholder-glow">
                  <span
                    className="placeholder col-12"
                    style={{ height: "200px" }}
                  ></span>
                </div>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h5>
                  <p className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </p>
                  <span
                    className="placeholder btn btn-secondary col-4 mt-2"
                    style={{ borderRadius: "50rem" }}
                  ></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && <h4 className="text-center text-danger">{error}</h4>}

      {/* Products */}
      <div className="row g-4">
        {currentItems.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow border-0 overflow-hidden hover-card rounded-3">
              <div className="position-relative">
                <img
                  src={getImageUrl(product.img)}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => (e.target.src = "/images/default.jpg")}
                />
                <span className="position-absolute bottom-0 end-0 bg-warning text-dark px-3 py-1 fw-bold rounded-start fs-6">
                  ₹{product.price}
                </span>
              </div>

              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-dark">
                  {product.name}
                </h5>
                <p className="card-text text-muted small flex-grow-1">
                  {product.description || "Tasty refreshing drink"}
                </p>

                <button
                  className="btn btn-dark w-100 rounded-pill mt-2"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart <i className="bi bi-cart-plus ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredItems.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredItems.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}

      {/* Hover effect */}
      <style>{`
        .hover-card { 
          transition: transform 0.3s, box-shadow 0.3s; 
          border: 1px solid rgba(0,0,0,0.05);
        }
        .hover-card:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important; 
        }
      `}</style>
    </div>
  );
}

export default Drink;
