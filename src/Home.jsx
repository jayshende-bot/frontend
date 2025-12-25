import React, { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const scrollToMenu = () => {
    const section = document.getElementById("menu-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-3 shadow">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3" href="/">
            🍔 Tasty Bites
          </a>

          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="nav" className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav gap-3">
              {["Home","Veg","Non Veg","Drinks","Cart","Contact","About"].map(item => (
                <li key={item} className="nav-item">
                  <a className="nav-link fw-semibold" href={`/${item.toLowerCase().replace(" ","")}`}>
                    {item}
                  </a>
                </li>
              ))}
              <li className="nav-item">
                <button className="btn btn-warning fw-bold px-3" onClick={() => setShowLogin(true)}>
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="container text-center hero-content">
          <h1 className="display-3 fw-bold">Delicious Food, Delivered Fast 🍕</h1>
          <p className="lead mt-3">Your cravings, our responsibility</p>

          {/* SEARCH (WORKING) */}
          <div className="search-box mt-4">
            <input
              className="form-control"
              placeholder="Search dishes, cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-warning fw-bold">Search</button>
          </div>

          <button className="btn btn-outline-light mt-4 px-4" onClick={scrollToMenu}>
            Explore Menu ↓
          </button>
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="offer-banner text-center">
        🎉 Flat ₹100 OFF on your first order — Use code <strong>TASTY100</strong>
      </section>

      {/* MENU PREVIEW CAROUSEL */}
      <section className="container my-5">
        <h3 className="fw-bold mb-4 text-center">Popular Dishes 🔥</h3>
        <div className="row g-4">
          {["Pizza","Burger","Biryani","Pasta"].map(item => (
            <div key={item} className="col-6 col-md-3">
              <div className="menu-card">
                <img src={`https://source.unsplash.com/300x200/?${item}`} alt={item} />
                <h6 className="mt-2 fw-bold">{item}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENTLY ORDERED */}
      <section className="container my-5">
        <h4 className="fw-bold mb-3">Recently Ordered 🕘</h4>
        <div className="row g-3">
          {["Paneer Butter Masala","Chicken Biryani"].map(item => (
            <div key={item} className="col-md-6">
              <div className="recent-card">
                {item}
                <button className="btn btn-sm btn-outline-warning float-end">
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOGIN POPUP */}
      {showLogin && (
        <div className="login-overlay">
          <div className="login-card">
            <h5 className="fw-bold mb-3">Login 🍴</h5>
            <input className="form-control mb-2" placeholder="Email" />
            <input className="form-control mb-3" placeholder="Password" type="password" />
            <button className="btn btn-warning w-100 fw-bold">Login</button>
            <button className="btn btn-link mt-2" onClick={() => setShowLogin(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .hero {
          height: 100vh;
          background: url("https://images.unsplash.com/photo-1540189549336-e6e99c3679fe") center/cover;
          position: relative;
          display: flex;
          align-items: center;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          color: white;
        }
        .search-box {
          display: flex;
          max-width: 600px;
          margin: auto;
          gap: 10px;
        }
        .offer-banner {
          background: linear-gradient(90deg,#ff5722,#ff9800);
          color: white;
          padding: 15px;
          font-weight: bold;
        }
        .menu-card {
          background: white;
          border-radius: 15px;
          padding: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          transition: 0.3s;
        }
        .menu-card:hover {
          transform: translateY(-6px);
        }
        .menu-card img {
          width: 100%;
          border-radius: 12px;
        }
        .recent-card {
          background: #fff;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .login-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .login-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          width: 320px;
        }
        @media(max-width:576px){
          .search-box { flex-direction: column; }
        }
      `}</style>
    </>
  );
}

export default Home;
