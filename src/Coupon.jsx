import React, { useState, useEffect } from "react";

// The parent component (Cart) passes the subtotal and a function
// to update the discount amount (in currency) in the parent state.
export default function Coupon({ subtotal, setDiscountAmount }) {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");

    // Use useEffect to calculate and apply discount in real-time
    useEffect(() => {
        const inputCode = code.trim().toUpperCase();
        let maxDiscountPercentage = 0;
        let validationMessage = "";

        // --- 1. Automatic Tiered Discount Logic ---
        if (subtotal >= 1500) {
            maxDiscountPercentage = 20;
            validationMessage = "Automatic 20% OFF applied! (Order over ₹1500) 🎉";
        } else if (subtotal >= 500) {
            maxDiscountPercentage = 10;
            validationMessage = "Automatic 10% OFF applied! (Order over ₹500) 🎉";
        }

        // --- 2. Coupon Code Validation (Prioritizing the highest discount) ---
        // Added 'SAVE25' as a new code for extra value
        if (inputCode === "SAVE25" && maxDiscountPercentage < 25) {
            maxDiscountPercentage = 25;
            validationMessage = "SAVE25 Applied! You got 25% OFF! 🚀";
        } 
        
        // Handle codes that match automatic tiers (but don't override)
        else if (inputCode === "SAVE10" && maxDiscountPercentage < 10) {
            maxDiscountPercentage = 10;
            validationMessage = "SAVE10 Applied! 10% OFF! 🎉";
        } 
        
        // Show invalid message only if user typed a code AND no automatic discount was applied
        else if (inputCode.length > 0 && maxDiscountPercentage === 0) {
            validationMessage = "Invalid Coupon Code ❌";
        }

        // Handle empty/zero cases
        if (subtotal === 0) {
            setDiscountAmount(0);
            setMessage("");
            return;
        }

        if (maxDiscountPercentage === 0) {
            setDiscountAmount(0);
            setMessage(validationMessage);
            return;
        }


        // --- Calculate and Apply Maximum Discount ---
        const calculatedDiscount = subtotal * (maxDiscountPercentage / 100);
        setDiscountAmount(calculatedDiscount);
        setMessage(validationMessage);

    }, [code, subtotal, setDiscountAmount]);

    // handleApply button is now purely for UX/focus, its logic is redundant
    const handleApply = () => {
        // You could add a temporary pop-up confirmation here if desired
    };

    // Determine the color of the message
    const isSuccess = message.includes("Applied") || message.includes("Automatic");
    const messageColor = isSuccess ? "text-success" : "text-danger";

    return (
        <div className="card p-3 shadow-sm mt-3">
            <h5 className="mb-2">Apply Coupon</h5>

            <input
                type="text"
                placeholder="Enter Coupon Code (e.g., SAVE25)"
                className="form-control mb-2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <button 
                className="btn btn-primary w-100" 
                onClick={handleApply}
                disabled={subtotal === 0 || isSuccess} // Disable button if already successfully applied
            >
                {isSuccess ? 'Applied' : 'Apply'}
            </button>

            {/* Message updates in real-time */}
            {message && <p className={`mt-2 fw-bold ${messageColor}`}>{message}</p>}
        </div>
    );
}