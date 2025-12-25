import React from "react";

export default function About() {
  return (
    <section className="about-section">
      {/* Overlay */}
      <div className="overlay"></div>

      <div className="container position-relative">
        {/* Heading */}
        <div className="text-center text-white mb-5">
          <h2 className="fw-bold display-5">About Tasty Bites 🍔</h2>
          <p className="fs-5 mt-3 text-light">
            Delicious food, fresh ingredients & unforgettable taste
          </p>
        </div>

        {/* Content Cards */}
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="about-card">
              <h5 className="fw-bold mb-3">🍽️ Our Mission</h5>
              <p>
                Our mission is to deliver freshly prepared, high-quality meals
                that bring joy to every bite. We focus on taste, hygiene, and
                customer satisfaction.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-card">
              <h5 className="fw-bold mb-3">🔥 What We Offer</h5>
              <p>
                From mouth-watering vegetarian dishes to delicious non-veg
                meals, snacks, and beverages — our menu is crafted for every
                craving.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-card">
              <h5 className="fw-bold mb-3">⭐ Why Choose Us</h5>
              <p>
                Fresh ingredients, fast delivery, affordable prices, and
                authentic flavors make <strong>Tasty Bites</strong> your
                perfect food partner.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .about-section {
          position: relative;
          padding: 90px 0;
          background-image: url("/images/about-bg.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          z-index: 1;
        }

        .about-section .container {
          z-index: 2;
        }

        .about-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .about-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
        }

        .about-card h5 {
          color: #ff5722;
        }

        .about-card p {
          color: #333;
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  );
}
