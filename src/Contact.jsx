import React from "react";

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="container">
        <div className="row align-items-center g-5">
          
          {/* Left Content */}
          <div className="col-lg-6 text-white">
            <h1 className="display-5 fw-bold mb-3">
              Get in Touch 🍔
            </h1>
            <p className="fs-5 text-light mb-4">
              Have questions about your order, delivery, or menu items?
              We’re here to help you enjoy your food without worries!
            </p>

            <div className="contact-info">
              <p>
                📧 <strong>Email:</strong>{" "}
                <a href="mailto:shendejay01@gmail.com">
                  shendejay01@gmail.com
                </a>
              </p>
              <p>
                📞 <strong>Phone:</strong>{" "}
                <a href="tel:+918208466451">
                  +91 82084 66451
                </a>
              </p>
              <p>🕒 <strong>Support Hours:</strong> 10 AM – 10 PM</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="col-lg-6">
            <div className="contact-card">
              <h4 className="fw-bold mb-3 text-center">
                Send Us a Message 🍕
              </h4>

              <form>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Your Name"
                  required
                />

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Your Email"
                  required
                />

                <textarea
                  className="form-control mb-4"
                  rows="4"
                  placeholder="Your message or order issue..."
                  required
                ></textarea>

                <button className="btn btn-food w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Styles */}
      <style>{`
        .contact-section {
          padding: 80px 0;
          background: linear-gradient(
            120deg,
            #ff5722,
            #ff9800
          );
        }

        .contact-info p {
          font-size: 1.05rem;
          margin-bottom: 12px;
        }

        .contact-info a {
          color: #fff;
          text-decoration: none;
        }

        .contact-card {
          background: #ffffff;
          padding: 35px;
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-6px);
        }

        .form-control {
          border-radius: 12px;
          padding: 12px;
          border: 1px solid #ddd;
        }

        .form-control:focus {
          border-color: #ff9800;
          box-shadow: 0 0 0 0.2rem rgba(255, 152, 0, 0.25);
        }

        .btn-food {
          background: linear-gradient(
            90deg,
            #ff5722,
            #ff9800
          );
          color: #fff;
          font-weight: bold;
          padding: 12px;
          border-radius: 30px;
          border: none;
          transition: transform 0.3s ease;
        }

        .btn-food:hover {
          transform: scale(1.05);
          background: linear-gradient(
            90deg,
            #ff9800,
            #ff5722
          );
        }
      `}</style>
    </section>
  );
}
