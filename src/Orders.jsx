// // src/Orders.jsx
// import React, { useEffect } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { getUserOrders } from "./orderSlice";


// function Orders() {
//   const dispatch = useDispatch();

//   // Extract orders data from Redux state
//   const { userOrders, loading, error } = useSelector(
//     (state) => ({
//       userOrders: state.orders?.userOrders || [],
//       loading: state.orders?.loading || false,
//       error: state.orders?.error || null,
//     }),
//     shallowEqual
//   );

//   // Fetch orders when the component mounts
//   useEffect(() => {
//     // We assume the user's email is stored in localStorage after login
//     const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
//     dispatch(getUserOrders(userEmail));
//   }, [dispatch]);

//   // --- Loading and Error States ---
//   if (loading)
//     return (
//       <div className="text-center p-5">
//         <h4 className="text-muted">Loading orders...</h4>
//       </div>
//     );
//   if (error)
//     return (
//       <div className="text-center p-5">
//         <h4 className="text-danger">Error loading orders: {error}</h4>
//       </div>
//     );

//   // --- Main Render ---
//   return (
//     <div style={{ padding: "30px 70px" }}>
//       <h2 className="text-center mb-5 fw-bold">🧾 Your Orders</h2>
      
//       {/* --- Check for No Orders --- */}
//       {userOrders.length === 0 ? (
//         <p className="text-center text-muted fs-5">No orders found.</p>
//       ) : (
        
//         // --- Map over each Order ---
//         userOrders.map((order, index) => (
//           <div 
//             key={order._id || index} 
//             className="card shadow-lg mb-5" 
//             style={{ borderRadius: '15px', border: '1px solid #dcdcdc' }}
//           >
            
//             {/* 1. ORDER SUMMARY HEADER */}
//             <div className="card-header bg-light p-3" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
//                 <h5 className="mb-0 fw-bold">Order ID: <span className="text-muted small">{order._id || 'N/A'}</span></h5>
//                 <p className="mb-0 small text-success">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
//             </div>
            
//             {/* 2. ITEMS TABLE (Detail) */}
//             <div className="card-body p-3">
//               <h6 className="fw-bold mb-3">Items Purchased:</h6>
//               <div className="table-responsive">
//                 <table className="table table-sm table-striped">
//                   <thead>
//                     <tr>
//                       <th>Product</th>
//                       <th className="text-center">Qty</th>
//                       <th className="text-end">Unit Price</th>
//                       <th className="text-end">Item Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {/* Map over items array within the current order */}
//                     {order.items.map((item, itemIndex) => (
//                       <tr key={item.id || itemIndex}>
//                         <td>
//                           {/* Optional: Add item image if available */}
//                           <img 
//                             src={item.image || item.img || item.photo} 
//                             alt={item.name} 
//                             style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px' }}
//                           />
//                           {item.name}
//                         </td>
//                         <td className="text-center">{item.quantity}</td>
//                         <td className="text-end">₹{item.price?.toFixed(2) || '0.00'}</td>
//                         <td className="text-end fw-bold">₹{(item.price * item.quantity).toFixed(2)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* 3. TOTAL BILL SUMMARY (Footer) */}
//             <div className="card-footer bg-white p-3" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
//               <div className="row">
//                 <div className="col-md-6"></div> {/* Spacer for alignment */}
//                 <div className="col-md-6">
//                   <table className="table table-sm m-0">
//                     <tbody>
//                       <tr>
//                         <td>Subtotal:</td>
//                         <td className="text-end">₹{order.subtotal?.toFixed(2) || '0.00'}</td>
//                       </tr>
//                       <tr>
//                         <td>Total Discount:</td>
//                         <td className="text-end text-danger">- ₹{order.totalDiscount?.toFixed(2) || '0.00'}</td>
//                       </tr>
//                       <tr>
//                         <td>**GST Amount:**</td>
//                         <td className="text-end text-info">**+ ₹{order.gst?.toFixed(2) || '0.00'}**</td>
//                       </tr>
//                       <tr className="fw-bold fs-5 text-success">
//                         <td>GRAND TOTAL:</td>
//                         <td className="text-end">₹{order.grandTotal?.toFixed(2) || '0.00'}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Orders;   






// import React, { useEffect } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { getUserOrders } from "./orderSlice";

// function Orders() {
//   const dispatch = useDispatch();

//   const { userOrders, loading, error } = useSelector(
//     (state) => ({
//       userOrders: state.orders?.userOrders || [],
//       loading: state.orders?.loading || false,
//       error: state.orders?.error || null,
//     }),
//     shallowEqual
//   );

//   useEffect(() => {
//     const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
//     dispatch(getUserOrders(userEmail));
//   }, [dispatch]);

//   // --- Loading / Error UI ---
//   if (loading)
//     return (
//       <div className="text-center p-5">
//         <h4 className="text-muted">Loading orders...</h4>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center p-5">
//         <h4 className="text-danger">Error loading orders: {error}</h4>
//       </div>
//     );

//   return (
//     <div style={{ padding: "30px 70px" }}>
//       <h2 className="text-center mb-5 fw-bold">🧾 Your Orders</h2>

//       {/* If no orders */}
//       {userOrders.length === 0 ? (
//         <p className="text-center text-muted fs-5">No orders found.</p>
//       ) : (
//         userOrders.map((order, index) => {
//           // HANDLE INVALID DATE FIX
//           const placedDate =
//             order.createdAt && !isNaN(new Date(order.createdAt))
//               ? new Date(order.createdAt).toLocaleDateString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })
//               : "Unknown Date";

//           // --- Auto calculate totals if backend didn't send ---
//           const subtotal = order.items?.reduce(
//             (sum, item) => sum + item.price * item.quantity,
//             0
//           ) || 0;

//           const totalDiscount = order.totalDiscount || 0;
//           const gst = order.gst || subtotal * 0.05; // 5% GST default

//           const grandTotal =
//             order.grandTotal ||
//             Number(subtotal - totalDiscount + gst).toFixed(2);

//           return (
//             <div
//               key={order._id || index}
//               className="card shadow-lg mb-5"
//               style={{
//                 borderRadius: "15px",
//                 border: "1px solid #dcdcdc",
//               }}
//             >
//               {/* -------------------- HEADER -------------------- */}
//               <div
//                 className="card-header bg-light p-3"
//                 style={{
//                   borderTopLeftRadius: "15px",
//                   borderTopRightRadius: "15px",
//                 }}
//               >
//                 <h5 className="mb-1 fw-bold">
//                   Order ID:{" "}
//                   <span className="text-muted small">{order._id}</span>
//                 </h5>
//                 <p className="mb-0 small text-success">Placed on: {placedDate}</p>
//               </div>

//               {/* -------------------- ITEMS TABLE -------------------- */}
//               <div className="card-body p-3">
//                 <h6 className="fw-bold mb-3">Items Purchased:</h6>

//                 <div className="table-responsive">
//                   <table className="table table-sm table-striped">
//                     <thead>
//                       <tr>
//                         <th>Product</th>
//                         <th className="text-center">Qty</th>
//                         <th className="text-end">Unit Price</th>
//                         <th className="text-end">Item Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {order.items?.map((item, itemIndex) => (
//                         <tr key={item._id || itemIndex}>
//                           <td>
//                             <img
//                               src={
//                                 item.image ||
//                                 item.img ||
//                                 item.photo ||
//                                 "/images/default.jpg"
//                               }
//                               alt={item.name}
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 objectFit: "cover",
//                                 borderRadius: "5px",
//                                 marginRight: "10px",
//                               }}
//                             />
//                             {item.name}
//                           </td>
//                           <td className="text-center">{item.quantity}</td>
//                           <td className="text-end">
//                             ₹{item.price?.toFixed(2)}
//                           </td>
//                           <td className="text-end fw-bold">
//                             ₹{(item.price * item.quantity).toFixed(2)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* -------------------- TOTAL SUMMARY -------------------- */}
//               <div
//                 className="card-footer bg-white p-3"
//                 style={{
//                   borderBottomLeftRadius: "15px",
//                   borderBottomRightRadius: "15px",
//                 }}
//               >
//                 <div className="row">
//                   <div className="col-md-6"></div>
//                   <div className="col-md-6">
//                     <table className="table table-sm m-0">
//                       <tbody>
//                         <tr>
//                           <td>Subtotal:</td>
//                           <td className="text-end">₹{subtotal.toFixed(2)}</td>
//                         </tr>

//                         <tr>
//                           <td>Total Discount:</td>
//                           <td className="text-end text-danger">
//                             - ₹{totalDiscount.toFixed(2)}
//                           </td>
//                         </tr>

//                         <tr>
//                           <td>GST (5%):</td>
//                           <td className="text-end text-primary">
//                             + ₹{gst.toFixed(2)}
//                           </td>
//                         </tr>

//                         <tr className="fw-bold fs-5 text-success">
//                           <td>GRAND TOTAL:</td>
//                           <td className="text-end">₹{grandTotal}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }

// export default Orders;




































// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { getUserOrders } from "./orderSlice";
// import { QRCodeCanvas } from "qrcode.react";

// function Orders() {
//   const dispatch = useDispatch();
//   const [selectedOrder, setSelectedOrder] = useState(null); // modal order
//   const [showModal, setShowModal] = useState(false);

//   const { userOrders, loading, error } = useSelector(
//     (state) => ({
//       userOrders: state.orders?.userOrders || [],
//       loading: state.orders?.loading || false,
//       error: state.orders?.error || null,
//     }),
//     shallowEqual
//   );

//   useEffect(() => {
//     const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
//     dispatch(getUserOrders(userEmail));
//   }, [dispatch]);

//   if (loading)
//     return (
//       <div className="text-center p-5">
//         <h4 className="text-muted">Loading orders...</h4>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center p-5">
//         <h4 className="text-danger">Error loading orders: {error}</h4>
//       </div>
//     );

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedOrder(null);
//     setShowModal(false);
//   };

//   const gstRate = 5;

//   return (
//     <div className="container py-4">
//       <h2 className="text-center mb-5 fw-bold">🧾 Your Orders</h2>

//       {userOrders.length === 0 ? (
//         <p className="text-center text-muted fs-5">No orders found.</p>
//       ) : (
//         <div className="row g-4">
//           {userOrders.map((order, index) => (
//             <div
//               key={order._id || index}
//               className="col-md-6"
//               onClick={() => openModal(order)}
//               style={{ cursor: "pointer" }}
//             >
//               <div className="card shadow-sm p-3 h-100">
//                 <h5 className="fw-bold mb-2">Order #{index + 1}</h5>
//                 <p className="text-secondary mb-1">
//                   Placed on:{" "}
//                   {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </p>
//                 <p className="mb-0">
//                   Items: {order.items?.length || 0} | Total: ₹
//                   {order.grandTotal?.toFixed(2) ||
//                     (order.items?.reduce(
//                       (sum, i) => sum + i.price * i.quantity,
//                       0
//                     ) || 0).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ---------------- MODAL ---------------- */}
//       {showModal && selectedOrder && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content rounded-4">
//               <div className="modal-header">
//                 <h5 className="modal-title">Order Details</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={closeModal}
//                 ></button>
//               </div>

//               <div className="modal-body">
//                 <h6 className="fw-bold mb-3">Items Purchased:</h6>
//                 <div className="table-responsive">
//                   <table className="table table-sm table-striped">
//                     <thead>
//                       <tr>
//                         <th>Product</th>
//                         <th className="text-center">Qty</th>
//                         <th className="text-end">Unit Price</th>
//                         <th className="text-end">Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedOrder.items?.map((item, i) => (
//                         <tr key={i}>
//                           <td>
//                             <img
//                               src={item.image || item.img || item.photo}
//                               alt={item.name}
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 objectFit: "cover",
//                                 borderRadius: "5px",
//                                 marginRight: "10px",
//                               }}
//                             />
//                             {item.name}
//                           </td>
//                           <td className="text-center">{item.quantity}</td>
//                           <td className="text-end">₹{item.price.toFixed(2)}</td>
//                           <td className="text-end fw-bold">
//                             ₹{(item.price * item.quantity).toFixed(2)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <hr />

//                 <div className="d-flex justify-content-between">
//                   <span>Subtotal:</span>
//                   <span>
//                     ₹
//                     {selectedOrder.items?.reduce(
//                       (sum, i) => sum + i.price * i.quantity,
//                       0
//                     ).toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="d-flex justify-content-between text-danger">
//                   <span>Discount:</span>
//                   <span>₹{selectedOrder.totalDiscount?.toFixed(2) || 0}</span>
//                 </div>
//                 <div className="d-flex justify-content-between text-primary">
//                   <span>GST ({gstRate}%):</span>
//                   <span>
//                     ₹
//                     {selectedOrder.gst?.toFixed(2) ||
//                       (
//                         selectedOrder.items?.reduce(
//                           (sum, i) => sum + i.price * i.quantity,
//                           0
//                         ) * (gstRate / 100)
//                       ).toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="d-flex justify-content-between fw-bold text-success fs-5 mt-2">
//                   <span>Grand Total:</span>
//                   <span>₹{selectedOrder.grandTotal?.toFixed(2)}</span>
//                 </div>

//                 {/* QR Code */}
//                 <div className="text-center mt-4">
//                   <h6>Scan & Pay</h6>
//                   <QRCodeCanvas
//                     value={`upi://pay?pa=8208466451@axl&pn=Tasty%20Bites&am=${selectedOrder.grandTotal}&cu=INR`}
//                     size={150}
//                   />
//                 </div>
//               </div>

//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={closeModal}>
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;






import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getUserOrders } from "./orderSlice";
import { QRCodeCanvas } from "qrcode.react";

function Orders() {
  const dispatch = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { userOrders, loading, error } = useSelector(
    (state) => ({
      userOrders: state.orders?.userOrders || [],
      loading: state.orders?.loading || false,
      error: state.orders?.error || null,
    }),
    shallowEqual
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

    if (userData?.email && token) {
      // ✅ Pass both email and token to your thunk
      dispatch(getUserOrders({ email: userData.email, token }));
    }
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center p-5">
        <h4 className="text-muted">Loading orders...</h4>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-5">
        <h4 className="text-danger">Error loading orders: {error}</h4>
      </div>
    );

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const gstRate = 5;

  return (
    <div className="container py-4">
      <h2 className="text-center mb-5 fw-bold">🧾 Your Orders</h2>

      {userOrders.length === 0 ? (
        <p className="text-center text-muted fs-5">No orders found.</p>
      ) : (
        <div className="row g-4">
          {userOrders.map((order, index) => (
            <div
              key={order._id || index}
              className="col-md-6"
              onClick={() => openModal(order)}
              style={{ cursor: "pointer" }}
            >
              <div className="card shadow-sm p-3 h-100">
                <h5 className="fw-bold mb-2">Order #{index + 1}</h5>
                <p className="text-secondary mb-1">
                  Placed on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="mb-0">
                  Items: {order.items?.length || 0} | Total: ₹
                  {order.grandTotal?.toFixed(2) ||
                    (order.items?.reduce(
                      (sum, i) => sum + i.price * i.quantity,
                      0
                    ) || 0).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- MODAL ---------------- */}
      {showModal && selectedOrder && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h5 className="modal-title">Order Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body">
                <h6 className="fw-bold mb-3">Items Purchased:</h6>
                <div className="table-responsive">
                  <table className="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className="text-center">Qty</th>
                        <th className="text-end">Unit Price</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items?.map((item, i) => (
                        <tr key={i}>
                          <td>
                            <img
                              src={item.image || item.img || item.photo}
                              alt={item.name}
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                marginRight: "10px",
                              }}
                            />
                            {item.name}
                          </td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-end">₹{item.price.toFixed(2)}</td>
                          <td className="text-end fw-bold">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>
                    ₹
                    {selectedOrder.items?.reduce(
                      (sum, i) => sum + i.price * i.quantity,
                      0
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="d-flex justify-content-between text-danger">
                  <span>Discount:</span>
                  <span>₹{selectedOrder.totalDiscount?.toFixed(2) || 0}</span>
                </div>
                <div className="d-flex justify-content-between text-primary">
                  <span>GST ({gstRate}%):</span>
                  <span>
                    ₹
                    {selectedOrder.gst?.toFixed(2) ||
                      (
                        selectedOrder.items?.reduce(
                          (sum, i) => sum + i.price * i.quantity,
                          0
                        ) * (gstRate / 100)
                      ).toFixed(2)}
                  </span>
                </div>
                <div className="d-flex justify-content-between fw-bold text-success fs-5 mt-2">
                  <span>Grand Total:</span>
                  <span>₹{selectedOrder.grandTotal?.toFixed(2)}</span>
                </div>

                {/* QR Code */}
                <div className="text-center mt-4">
                  <h6>Scan & Pay</h6>
                  <QRCodeCanvas
                    value={`upi://pay?pa=8208466451@axl&pn=Tasty%20Bites&am=${selectedOrder.grandTotal}&cu=INR`}
                    size={150}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
