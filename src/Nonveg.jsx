



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNonVegProducts } from "./nonvegSlice";
import { addToCart } from "./cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Pagination Component ---
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

function NonVeg() {
  const dispatch = useDispatch();

  // ✅ Safe selector: always return an array
  const nonVegItems = useSelector((state) => {
    const items = state.nonVeg?.nonVegItems;
    // if it's an array, return it; if it's an object with `data`, return that; otherwise, empty array
    if (Array.isArray(items)) return items;
    if (items?.data && Array.isArray(items.data)) return items.data;
    return [];
  });

  const loading = useSelector((state) => state.nonVeg?.loading ?? false);
  const error = useSelector((state) => state.nonVeg?.error ?? null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchNonVegProducts());
  }, [dispatch]);

  const getImageUrl = (img) => img || "/images/default.jpg";

  // ✅ Search Filtering with safe array
  const filteredItems = nonVegItems.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredItems.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          Non-Veg
        </span>{" "}
        Menu
      </h2>

      {/* Search Bar */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6 col-10">
          <input
            type="text"
            className="form-control form-control-lg rounded-pill shadow-sm"
            placeholder="Search for non-veg dishes..."
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

      {/* Product Items */}
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
                <h5 className="card-title fw-bold text-dark">{product.name}</h5>
                <p className="card-text text-muted small flex-grow-1">
                  {product.description || "Delicious fresh non-veg dish"}
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
      {totalItems > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}

      {/* Hover Effect */}
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

export default NonVeg;
