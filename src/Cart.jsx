

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   increaseQty,
//   decreaseQty,
//   removeFromCart,
//   clearCart,
// } from "./cartSlice";
// import { createNewOrder } from "./orderSlice";
// import { QRCodeCanvas } from "qrcode.react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import Coupon from "./Coupon";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

// function Cart() {
//   const cart = useSelector((state) => state.cart ?? []);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // USER EMAIL (Login or Guest)
//   const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

//   const [discount, setDiscount] = useState(0);
//   const [deliveryCharge, setDeliveryCharge] = useState(0);
//   const [showQRModal, setShowQRModal] = useState(false);
//   const [lastOrderData, setLastOrderData] = useState(null); // store last order

//   const gst = 5;
//   const upiId = "8208466451@axl";

//   const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
//   const gstAmount = (subtotal * gst) / 100;
//   const grandTotal = subtotal - discount + gstAmount + deliveryCharge;

//   const upiLink = `upi://pay?pa=${upiId}&pn=TastyBite&am=${grandTotal.toFixed(
//     2
//   )}&cu=INR`;

//   // DELIVERY CHARGES
//   useEffect(() => {
//     if (subtotal >= 1000) setDeliveryCharge(0);
//     else if (subtotal > 0) setDeliveryCharge(50);
//     else setDeliveryCharge(0);
//   }, [subtotal]);

//   // SEND ORDER EMAIL
//   const sendOrderEmail = async (orderData) => {
//     try {
//       await fetch("https://your-backend.com/send-order-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       Swal.fire(
//         "Email Sent",
//         `Order details have been sent to: ${orderData.email}`,
//         "success"
//       );
//     } catch (err) {
//       console.error("Failed to send email:", err);
//       Swal.fire("Error", "Failed to send email.", "error");
//     }
//   };

//   // CHECKOUT
//   const handleCheckout = async () => {
//     if (cart.length === 0) {
//       Swal.fire("Cart Empty", "Please add items first.", "warning");
//       return;
//     }

//     const itemsForOrder = cart.map((item) => ({
//       id: item._id,
//       name: item.name,
//       price: item.price,
//       quantity: item.qty,
//       image: item.img || item.photo,
//     }));

//     const orderData = {
//       email: userEmail,
//       items: itemsForOrder,
//       subtotal,
//       totalDiscount: discount,
//       gst: gstAmount,
//       deliveryCharge,
//       grandTotal,
//     };

//     try {
//       const response = await dispatch(createNewOrder(orderData)).unwrap();
//       dispatch(clearCart());
//       setLastOrderData(orderData); // save order to allow email resend

//       // ✅ Send email automatically
//       await sendOrderEmail(orderData);

//       Swal.fire({
//         title: "Order Placed Successfully!",
//         text: `Bill has been sent to: ${userEmail}`,
//         icon: "success",
//         confirmButtonText: "Go to Orders",
//       }).then(() => {
//         navigate("/order", {
//           replace: true,
//           state: { order: response.order },
//         });
//       });
//     } catch (error) {
//       Swal.fire("Order Failed", error.message || "Something went wrong!", "error");
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="text-center fw-bold mb-5 text-primary">
//         Your Cart <i className="bi bi-cart"></i>
//       </h2>

//       <div className="row g-4">
//         {/* LEFT — ITEMS */}
//         <div className="col-md-8">
//           {cart.length === 0 ? (
//             <h5 className="text-center text-muted">Your cart is empty</h5>
//           ) : (
//             cart.map((item) => (
//               <div className="card mb-3 shadow-sm border-0 rounded-4" key={item._id}>
//                 <div className="row g-0 p-3">
//                   <div className="col-4">
//                     <img
//                       src={item.img || item.photo}
//                       alt={item.name}
//                       className="img-fluid rounded"
//                       style={{ height: "120px", objectFit: "cover" }}
//                     />
//                   </div>

//                   <div className="col-8 ps-3">
//                     <h5 className="fw-bold">{item.name}</h5>

//                     <p className="m-0 text-secondary">
//                       ₹{item.price} × {item.qty}
//                     </p>

//                     <p className="fw-semibold">
//                       Total: ₹{(item.qty * item.price).toFixed(2)}
//                     </p>

//                     <div className="d-flex align-items-center mt-2">
//                       <button
//                         className="btn btn-sm btn-outline-primary"
//                         onClick={() => dispatch(decreaseQty(item._id))}
//                       >
//                         -
//                       </button>

//                       <span className="px-3 fw-bold">{item.qty}</span>

//                       <button
//                         className="btn btn-sm btn-outline-primary"
//                         onClick={() => dispatch(increaseQty(item._id))}
//                       >
//                         +
//                       </button>

//                       <button
//                         className="btn btn-sm btn-danger ms-3"
//                         onClick={() => dispatch(removeFromCart(item._id))}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* RIGHT — SUMMARY */}
//         {cart.length > 0 && (
//           <div className="col-md-4">
//             <div className="card p-4 shadow-lg border-0 rounded-4">
//               <p className="mb-2 text-secondary fw-semibold">
//                 Logged in as: <span className="text-primary">{userEmail}</span>
//               </p>

//               <h4 className="fw-bold text-primary">Order Summary</h4>

//               <div className="d-flex justify-content-between mt-3">
//                 <span>Subtotal</span>
//                 <strong>₹{subtotal.toFixed(2)}</strong>
//               </div>

//               <div className="d-flex justify-content-between mt-2">
//                 <span>Discount</span>
//                 <strong className="text-danger">-₹{discount.toFixed(2)}</strong>
//               </div>

//               <div className="d-flex justify-content-between mt-2">
//                 <span>Delivery Charge</span>
//                 <strong>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</strong>
//               </div>

//               <div className="d-flex justify-content-between mt-2">
//                 <span>GST (5%)</span>
//                 <strong>₹{gstAmount.toFixed(2)}</strong>
//               </div>

//               <hr />

//               <div className="d-flex justify-content-between fs-4 fw-bold text-success">
//                 <span>Grand Total</span>
//                 <span>₹{grandTotal.toFixed(2)}</span>
//               </div>

//               <Coupon subtotal={subtotal} setDiscountAmount={setDiscount} />

//               <button
//                 className="btn btn-warning w-100 mt-3 fw-bold"
//                 onClick={handleCheckout}
//               >
//                 Checkout
//               </button>

//               <button
//                 className="btn btn-outline-danger w-100 mt-2 fw-bold"
//                 onClick={() => dispatch(clearCart())}
//               >
//                 Clear Cart
//               </button>

//               <button
//                 className="btn btn-success w-100 mt-3 fw-bold"
//                 onClick={() => setShowQRModal(true)}
//               >
//                 Show UPI QR
//               </button>

//               <button
//                 className="btn btn-info w-100 mt-2 fw-bold"
//                 onClick={() => lastOrderData && sendOrderEmail(lastOrderData)}
//               >
//                 Email Me Order Copy
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* QR POPUP */}
//       <Modal show={showQRModal} onHide={() => setShowQRModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Scan & Pay</Modal.Title>
//         </Modal.Header>

//         <Modal.Body className="text-center">
//           <QRCodeCanvas value={upiLink} size={200} />
//           <p className="mt-3 fw-bold">Amount: ₹{grandTotal.toFixed(2)}</p>
//           <p className="text-secondary">
//             Payment will be linked to your email: <br />
//             <strong>{userEmail}</strong>
//           </p>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowQRModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default Cart;










// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   increaseQty,
//   decreaseQty,
//   removeFromCart,
//   clearCart,
// } from "./cartSlice";
// import { createNewOrder } from "./orderSlice";
// import { QRCodeCanvas } from "qrcode.react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import Coupon from "./Coupon";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

// function Cart() {
//   const cart = useSelector((state) => state.cart ?? []);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

//   const [discount, setDiscount] = useState(0);
//   const [deliveryCharge, setDeliveryCharge] = useState(0);
//   const [showQRModal, setShowQRModal] = useState(false);
//   const [lastOrderData, setLastOrderData] = useState(null);

//   const gst = 5;
//   const upiId = "8208466451@axl";

//   const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
//   const gstAmount = (subtotal * gst) / 100;
//   const grandTotal = subtotal - discount + gstAmount + deliveryCharge;

//   const upiLink = `upi://pay?pa=${upiId}&pn=TastyBite&am=${grandTotal.toFixed(
//     2
//   )}&cu=INR`;

//   useEffect(() => {
//     if (subtotal >= 1000) setDeliveryCharge(0);
//     else if (subtotal > 0) setDeliveryCharge(50);
//     else setDeliveryCharge(0);
//   }, [subtotal]);

//   // ===============================
//   // SEND ORDER EMAIL (BACKEND)
//   // ===============================
//   const sendOrderEmail = async (orderData) => {
//     try {
//       // ✅ Use your backend route here
//       const res = await fetch("http://localhost:3000/api/v1/products/orders/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       if (!res.ok) throw new Error("Failed to send email");

//       Swal.fire(
//         "Email Sent",
//         `Order details have been sent to: ${orderData.email}`,
//         "success"
//       );
//     } catch (err) {
//       console.error("Failed to send email:", err);
//       Swal.fire("Error", "Failed to send email.", "error");
//     }
//   };

//   // ===============================
//   // HANDLE CHECKOUT
//   // ===============================
//   const handleCheckout = async () => {
//     if (cart.length === 0) {
//       Swal.fire("Cart Empty", "Please add items first.", "warning");
//       return;
//     }

//     const itemsForOrder = cart.map((item) => ({
//       id: item._id,
//       name: item.name,
//       price: item.price,
//       quantity: item.qty,
//       image: item.img || item.photo,
//     }));

//     const orderData = {
//       email: userEmail,
//       items: itemsForOrder,
//       subtotal,
//       totalDiscount: discount,
//       gst: gstAmount,
//       deliveryCharge,
//       finalTotal: grandTotal, // backend requires finalTotal
//     };

//     try {
//       // ✅ Dispatch order creation
//       const response = await dispatch(createNewOrder(orderData)).unwrap();
//       dispatch(clearCart());
//       setLastOrderData(orderData);

//       // ✅ Send order email
//       await sendOrderEmail(orderData);

//       Swal.fire({
//         title: "Order Placed Successfully!",
//         text: `Bill has been sent to: ${userEmail}`,
//         icon: "success",
//         confirmButtonText: "Go to Orders",
//       }).then(() => {
//         navigate("/order", {
//           replace: true,
//           state: { order: response }, // response already contains order data
//         });
//       });
//     } catch (error) {
//       Swal.fire("Order Failed", error.message || "Something went wrong!", "error");
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="text-center fw-bold mb-5 text-primary">
//         Your Cart <i className="bi bi-cart"></i>
//       </h2>

//       <div className="row g-4">
//         {/* LEFT — ITEMS */}
//         <div className="col-md-8">
//           {cart.length === 0 ? (
//             <h5 className="text-center text-muted">Your cart is empty</h5>
//           ) : (
//             cart.map((item) => (
//               <div className="card mb-3 shadow-sm border-0 rounded-4" key={item._id}>
//                 <div className="row g-0 p-3">
//                   <div className="col-4">
//                     <img
//                       src={item.img || item.photo}
//                       alt={item.name}
//                       className="img-fluid rounded"
//                       style={{ height: "120px", objectFit: "cover" }}
//                     />
//                   </div>
//                   <div className="col-8 ps-3">
//                     <h5 className="fw-bold">{item.name}</h5>
//                     <p className="m-0 text-secondary">
//                       ₹{item.price} × {item.qty}
//                     </p>
//                     <p className="fw-semibold">
//                       Total: ₹{(item.qty * item.price).toFixed(2)}
//                     </p>
//                     <div className="d-flex align-items-center mt-2">
//                       <button
//                         className="btn btn-sm btn-outline-primary"
//                         onClick={() => dispatch(decreaseQty(item._id))}
//                       >
//                         -
//                       </button>
//                       <span className="px-3 fw-bold">{item.qty}</span>
//                       <button
//                         className="btn btn-sm btn-outline-primary"
//                         onClick={() => dispatch(increaseQty(item._id))}
//                       >
//                         +
//                       </button>
//                       <button
//                         className="btn btn-sm btn-danger ms-3"
//                         onClick={() => dispatch(removeFromCart(item._id))}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* RIGHT — SUMMARY */}
//         {cart.length > 0 && (
//           <div className="col-md-4">
//             <div className="card p-4 shadow-lg border-0 rounded-4">
//               <p className="mb-2 text-secondary fw-semibold">
//                 Logged in as: <span className="text-primary">{userEmail}</span>
//               </p>

//               <h4 className="fw-bold text-primary">Order Summary</h4>

//               <div className="d-flex justify-content-between mt-3">
//                 <span>Subtotal</span>
//                 <strong>₹{subtotal.toFixed(2)}</strong>
//               </div>
//               <div className="d-flex justify-content-between mt-2">
//                 <span>Discount</span>
//                 <strong className="text-danger">-₹{discount.toFixed(2)}</strong>
//               </div>
//               <div className="d-flex justify-content-between mt-2">
//                 <span>Delivery Charge</span>
//                 <strong>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</strong>
//               </div>
//               <div className="d-flex justify-content-between mt-2">
//                 <span>GST (5%)</span>
//                 <strong>₹{gstAmount.toFixed(2)}</strong>
//               </div>

//               <hr />
//               <div className="d-flex justify-content-between fs-4 fw-bold text-success">
//                 <span>Grand Total</span>
//                 <span>₹{grandTotal.toFixed(2)}</span>
//               </div>

//               <Coupon subtotal={subtotal} setDiscountAmount={setDiscount} />

//               <button
//                 className="btn btn-warning w-100 mt-3 fw-bold"
//                 onClick={handleCheckout}
//               >
//                 Checkout
//               </button>

//               <button
//                 className="btn btn-outline-danger w-100 mt-2 fw-bold"
//                 onClick={() => dispatch(clearCart())}
//               >
//                 Clear Cart
//               </button>

//               <button
//                 className="btn btn-success w-100 mt-3 fw-bold"
//                 onClick={() => setShowQRModal(true)}
//               >
//                 Show UPI QR
//               </button>

//               <button
//                 className="btn btn-info w-100 mt-2 fw-bold"
//                 onClick={() => lastOrderData && sendOrderEmail(lastOrderData)}
//               >
//                 Email Me Order Copy
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* QR POPUP */}
//       <Modal show={showQRModal} onHide={() => setShowQRModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Scan & Pay</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center">
//           <QRCodeCanvas value={upiLink} size={200} />
//           <p className="mt-3 fw-bold">Amount: ₹{grandTotal.toFixed(2)}</p>
//           <p className="text-secondary">
//             Payment will be linked to your email: <br />
//             <strong>{userEmail}</strong>
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowQRModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default Cart;


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

  const gst = 5;
  const upiId = "8208466451@axl";

  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const gstAmount = (subtotal * gst) / 100;
  const grandTotal = subtotal - discount + gstAmount + deliveryCharge;

  const upiLink = `upi://pay?pa=${upiId}&pn=TastyBite&am=${grandTotal.toFixed(
    2
  )}&cu=INR`;

  useEffect(() => {
    if (subtotal >= 1000) setDeliveryCharge(0);
    else if (subtotal > 0) setDeliveryCharge(50);
    else setDeliveryCharge(0);
  }, [subtotal]);

  // ===============================
  // CHECKOUT
  // ===============================
  const handleCheckout = async () => {
    if (cart.length === 0) {
      Swal.fire("Cart Empty", "Please add items first.", "warning");
      return;
    }

    const itemsForOrder = cart.map((item) => ({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
    }));

    const orderData = {
      items: itemsForOrder,
      subtotal,
      gst: gstAmount,
      finalTotal: grandTotal,
    };

    try {
      const response = await dispatch(createNewOrder(orderData)).unwrap();

      // ✅ CRITICAL FIX HERE
      setLastOrderData({
        orderId: response.order._id,
        totalAmount: grandTotal,
        tax: gstAmount,
      });

      dispatch(clearCart());

      Swal.fire("Success", "Order placed successfully!", "success");
    } catch (error) {
      Swal.fire("Order Failed", "Something went wrong!", "error");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-5 text-primary">
        Your Cart <i className="bi bi-cart"></i>
      </h2>

      <div className="row g-4">
        {/* LEFT — CART ITEMS */}
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

        {/* RIGHT — SUMMARY */}
        {cart.length > 0 && (
          <div className="col-md-4">
            <div className="card p-4 shadow-lg border-0 rounded-4">
              <h4 className="fw-bold text-primary">Order Summary</h4>

              <div className="d-flex justify-content-between mt-3">
                <span>Subtotal</span>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>GST (5%)</span>
                <strong>₹{gstAmount.toFixed(2)}</strong>
              </div>

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

      {/* EMAIL POPUP */}
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

      {/* QR POPUP */}
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
