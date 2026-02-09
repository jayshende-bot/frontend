

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "./cartSlice";
import { createNewOrder } from "./orderSlice";
import { QRCodeCanvas } from "qrcode.react";
import Swal from "sweetalert2";
import Coupon from "./Coupon";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SendOrderEmail from "./SendOrderEmail";

function Cart() {
  const cart = useSelector((state) => state.cart ?? []);
  const dispatch = useDispatch();

  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [lastOrderData, setLastOrderData] = useState(null);

  const gstPercent = 5;
  const upiId = "8208466451@axl";

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gstAmount = (subtotal * gstPercent) / 100;
  const grandTotal = subtotal - discount + gstAmount + deliveryCharge;

  const upiLink = `upi://pay?pa=${upiId}&pn=TastyBite&am=${grandTotal.toFixed(
    2
  )}&cu=INR`;

  useEffect(() => {
    if (subtotal === 0) setDeliveryCharge(0);
    else if (subtotal < 1000) setDeliveryCharge(50);
    else setDeliveryCharge(0);
  }, [subtotal]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      Swal.fire("Cart Empty", "Please add items first.", "warning");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !user.email || !token) {
      Swal.fire("Login Required", "Please login to place order", "warning");
      return;
    }

    // ✅ Include id and name for backend validation
    const itemsForOrder = cart.map((item) => ({
      productId: item._id,
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
    }));

    const orderData = {
      email: user.email,
      items: itemsForOrder,
      // ✅ Sending the full order summary to the backend
      subtotal,
      gst: gstAmount,
      discount,
      deliveryCharge,
      grandTotal,
    };

    try {
      // The .unwrap() method will return the payload of a fulfilled action,
      // or throw an error if the action is rejected.
      const response = await dispatch(createNewOrder(orderData)).unwrap();

      // Log the response to see what the backend is actually sending.
      // This is crucial for debugging.
      console.log("Create order response from backend:", response);

      // Defensive check: Ensure the response and its nested properties exist before using them.
      // If the response is not what we expect, throw an error to be caught by the catch block.
      if (!response || !response.order || !response.order._id) {
        throw new Error("Order creation failed: Invalid response from server.");
      }

      setLastOrderData({
        orderId: response.order._id,
        totalAmount: grandTotal,
        tax: gstAmount,
      });

      dispatch(clearCart());
      Swal.fire("Success", "Order placed successfully!", "success");
    } catch (error) {
      // Log the detailed error to the console for better debugging.
      console.error("Checkout failed:", error);
      Swal.fire("Order Failed", error?.message || "Something went wrong!", "error");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-5 text-primary">
        Your Cart <i className="bi bi-cart"></i>
      </h2>

      <div className="row g-4">
        <div className="col-md-8">
          {cart.length === 0 ? (
            <h5 className="text-center text-muted">Your cart is empty</h5>
          ) : (
            cart.map((item) => (
              <div
                className="card mb-3 shadow-sm border-0 rounded-4"
                key={item._id}
              >
                <div className="row g-0 p-3">
                  <div className="col-4">
                    <img
                      src={item.img || item.photo}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: "120px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-8 ps-3">
                    <h5 className="fw-bold">{item.name}</h5>
                    <p className="m-0 text-secondary">
                      ₹{item.price} × {item.qty}
                    </p>
                    <p className="fw-semibold">
                      Total: ₹{(item.qty * item.price).toFixed(2)}
                    </p>

                    <div className="d-flex align-items-center mt-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => dispatch(decreaseQty(item._id))}
                      >
                        -
                      </button>
                      <span className="px-3 fw-bold">{item.qty}</span>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => dispatch(increaseQty(item._id))}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-3"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="col-md-4">
            <div className="card p-4 shadow-lg border-0 rounded-4">
              <h4 className="fw-bold text-primary">Order Summary</h4>

              <div className="d-flex justify-content-between mt-3">
                <span>Subtotal</span>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>GST ({gstPercent}%)</span>
                <strong>₹{gstAmount.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>Delivery Charge</span>
                <strong>₹{deliveryCharge.toFixed(2)}</strong>
              </div>

              {discount > 0 && (
                <div className="d-flex justify-content-between mt-2 text-success">
                  <span>Discount</span>
                  <strong>-₹{discount.toFixed(2)}</strong>
                </div>
              )}

              <hr />
              <div className="d-flex justify-content-between fs-4 fw-bold text-success">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>

              <Coupon subtotal={subtotal} setDiscountAmount={setDiscount} />

              <button
                className="btn btn-warning w-100 mt-3 fw-bold"
                onClick={handleCheckout}
              >
                Checkout
              </button>

              <button
                className="btn btn-info w-100 mt-2 fw-bold"
                disabled={!lastOrderData}
                onClick={() => setShowEmailPopup(true)}
              >
                Email Order Copy
              </button>

              <button
                className="btn btn-success w-100 mt-3 fw-bold"
                onClick={() => setShowQRModal(true)}
              >
                Show UPI QR
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Email Modal */}
      <Modal show={showEmailPopup} onHide={() => setShowEmailPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Email Order Copy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {lastOrderData && (
            <SendOrderEmail
              orderId={lastOrderData.orderId}
              totalAmount={lastOrderData.totalAmount}
              tax={lastOrderData.tax}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* UPI QR Modal */}
      <Modal show={showQRModal} onHide={() => setShowQRModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Scan & Pay</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <QRCodeCanvas value={upiLink} size={200} />
          <p className="mt-3 fw-bold">Amount: ₹{grandTotal.toFixed(2)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQRModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cart;
