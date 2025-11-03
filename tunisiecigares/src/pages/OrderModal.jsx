import React, { useState } from "react";
import "./OrderModal.css";

export default function OrderModal({ productName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      alert("❌ Error sending order. Please try again.");
    }
  };

  return (
    <>
      <button className="order-btn" onClick={() => setIsOpen(true)}>
        Order Now
      </button>

      {isOpen && (
        <div className="modal" onClick={() => setIsOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close" onClick={() => setIsOpen(false)}>
              &times;
            </button>

            {!submitted ? (
              <>
                <h2>Place Your Order</h2>
                <form onSubmit={handleSubmit}>
                  <label>Full Name</label>
                  <input type="text" name="name" required />

                  <label>Email</label>
                  <input type="email" name="email" required />

                  <label>Phone Number</label>
                  <input type="tel" name="phone" required />

                  <label>Address</label>
                  <textarea name="address" required></textarea>

                  <label>Age</label>
                  <input type="number" name="age" min="18" required />

                  <label>Product</label>
                  <input
                    type="text"
                    name="product"
                    value={productName}
                    readOnly
                  />

                  <label>Quantity</label>
                  <input type="number" name="quantity" min="1" defaultValue="1" required />

                  <label>Notes (optional)</label>
                  <textarea name="notes"></textarea>

                  <button type="submit" className="submit-btn">
                    Submit Order
                  </button>
                </form>
              </>
            ) : (
              <p className="thank-you">✅ Thank you! Your order has been sent.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
