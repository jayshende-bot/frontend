// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";

// function SendOrderEmail({ orderId, totalAmount, tax }) {

//     const [email, setEmail] = useState("");
//     const [status, setStatus] = useState("idle"); // idle, sending, success, error
//     const [statusMessage, setStatusMessage] = useState("");

//     const sendEmail = () => {
//         if (!email) {
//             setStatusMessage("Please enter a valid email address.");
//             return;
//         }

//         setStatus("sending");
//         setStatusMessage("Sending order confirmation...");

//         // NOTE: These IDs are placeholders. Replace with actual EmailJS IDs for production.
//         const SERVICE_ID = "service_orwevxq";
//         const TEMPLATE_ID = "template_nqmbems";
//         const PUBLIC_KEY = "rlIFalEFE2D4uPb1C";

//         const templateParams = {
//             order_id: orderId,
//             final_amount: totalAmount.toFixed(2),
//             tax: tax.toFixed(2),
//             email: email,
//         };

//         emailjs
//             .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
//             .then((response) => {
//                 console.log("Email sent successfully:", response);
//                 setStatus("success");
//                 setStatusMessage("Email sent successfully! Check your inbox. 📧");
//             })
//             .catch((error) => {
//                 console.error("Email error:", error);
//                 setStatus("error");
//                 setStatusMessage("Failed to send email. Check console for details. 😢");
//             });
//     };
    
//     // Determine button state and message styling
//     const isSending = status === "sending";
//     const isSuccess = status === "success";
//     const isError = status === "error";

//     let buttonClass = "btn-primary";
//     if (isSending) buttonClass = "btn-warning";
//     if (isSuccess) buttonClass = "btn-success";
//     if (isError) buttonClass = "btn-danger";

//     return (
//         <div className="mt-4 p-3 border rounded shadow-sm bg-light">
//             <h6 className="fw-bold mb-3">Send Confirmation Email</h6>
//             <input
//                 type="email"
//                 className="form-control mb-2"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={isSending}
//             />

//             <button 
//                 onClick={sendEmail} 
//                 className={`btn ${buttonClass} w-100`}
//                 disabled={isSending || totalAmount <= 0}
//             >
//                 {isSending ? "Sending..." : "Send Order Details"}
//             </button>

//             {statusMessage && (
//                 <p className={`mt-2 small mb-0 fw-bold ${isError ? 'text-danger' : (isSuccess ? 'text-success' : 'text-dark')}`}>
//                     {statusMessage}
//                 </p>
//             )}
//         </div>
//     );
// }

// export default SendOrderEmail;  



import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function SendOrderEmail({ orderId, totalAmount, tax }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    console.log("SEND EMAIL CLICKED"); // ✅ Debug: ensures button fires

    if (!email) {
      setMessage("Please enter a valid email");
      return;
    }

    if (!orderId || !totalAmount || !tax) {
      setMessage("Order data missing. Please checkout again.");
      return;
    }

    setStatus("sending");
    setMessage("Sending order details...");

    const SERVICE_ID = "service_orwevxq";
    const TEMPLATE_ID = "template_nqmbems";
    const PUBLIC_KEY = "rlIFalEFE2D4uPb1C";

    const templateParams = {
      to_email: email,
      order_id: orderId,
      total_amount: Number(totalAmount).toFixed(2),
      tax: Number(tax).toFixed(2),
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        setMessage("Email sent successfully 📧");
      })
      .catch((err) => {
        console.error("EMAILJS ERROR:", err);
        setStatus("error");
        setMessage("Failed to send email ❌");
      });
  };

  return (
    <div className="mt-3 p-3 border rounded bg-light">
      <h6 className="fw-bold">Send Order Copy</h6>

      <input
        type="email"
        className="form-control mb-2"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "sending"}
      />

      <button
        className="btn btn-primary w-100"
        onClick={sendEmail}
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Order Details"}
      </button>

      {message && (
        <p
          className={`mt-2 fw-bold ${
            status === "error"
              ? "text-danger"
              : status === "success"
              ? "text-success"
              : "text-dark"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default SendOrderEmail;
