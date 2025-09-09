"use client";

import { useState, useEffect } from 'react';

// Main component for the shopping cart page
const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Asun (Spicy Goat Meat)', price: 15.00, quantity: 2 },
    { id: 2, name: 'Suya Skewers (Beef)', price: 10.00, quantity: 1 },
    { id: 3, name: 'Jollof Rice with Chicken', price: 18.00, quantity: 1 },
  ]);
  const [cartTotal, setCartTotal] = useState(0);

  // Calculate cart total whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cartItems]);

  const handleUpdateQuantity = (id, delta) => {
    setCartItems(currentItems =>
      currentItems
        .map(item =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with a total of:", cartTotal);
    alert('Thank you for your purchase! (Note: This is a placeholder function)');
  };

  // Custom styles for consistency with the reservations page
  const customStyles = `
    .font-cormorant {
      font-family: 'Cormorant Garamond', serif;
    }
    .font-lora {
      font-family: 'Lora', serif;
    }
    .nav-link {
      color: #4A4A4A;
      transition-property: color;
      transition-duration: 300ms;
      position: relative;
    }
    .nav-link:hover {
      color: #D4A017;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #D4A017;
      transform: scaleX(0);
      transition-property: transform;
      transition-duration: 300ms;
      transform-origin: left;
    }
    .nav-link:hover::after {
      transform: scaleX(1);
    }
    .btn-gold {
      padding: 1rem 2.5rem; /* px-10 py-3 */
      background-color: #D4A017;
      color: #1A1A1A;
      font-weight: 600;
      border-radius: 9999px; /* rounded-full */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); /* shadow-lg */
      transition-property: all;
      transition-duration: 300ms;
    }
    .btn-gold:hover {
      background-color: #B88C14;
      transform: scale(1.05);
    }
    .btn-gold-outline {
      padding: 1rem 2.5rem; /* px-10 py-3 */
      background-color: transparent;
      color: #D4A017;
      font-weight: 600;
      border-radius: 9999px; /* rounded-full */
      border: 2px solid #D4A017;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); /* shadow-lg */
      transition-property: all;
      transition-duration: 300ms;
    }
    .btn-gold-outline:hover {
      background-color: #D4A017;
      color: #1A1A1A;
      transform: scale(1.05);
    }
    .shiny-gold-card-bg {
      background-color: #F8F4E3;
      border: 1px solid #D4A017;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.4);
      position: relative;
      overflow: hidden;
    }
    .shiny-gold-card-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%);
      mix-blend-mode: overlay;
      pointer-events: none;
    }
    .patterned-cream-bg {
      background-color: #F8F4E3;
      border-top: 1px solid #D4A017;
      border-bottom: 1px solid #D4A017;
    }
    .social-link {
      color: #4A4A4A;
      transition-property: color;
      transition-duration: 300ms;
      font-size: 0.875rem; /* text-sm */
      font-family: 'Cormorant Garamond';
    }
    .social-link:hover {
      color: #D4A017;
    }
    @media (min-width: 768px) {
      .social-link {
        font-size: 1rem; /* md:text-base */
      }
    }
    @media (max-width: 640px) {
      .nav-link { font-size: 0.8rem; margin: 0 0.25rem; }
      .flex.space-x-6 { flex-direction: column; gap: 1rem; }
      .grid-cols-3 { grid-template-columns: 1fr; }
      h1 { font-size: 3rem; }
      h2 { font-size: 2rem; }
      p { font-size: 1rem; }
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-[#F8F4E3] text-[#1A1A1A] font-playfair antialiased">
        {/* Global Background Pattern - Replaced image with a gradient since images are not supported */}
        <div className="fixed inset-0 z-0 opacity-70 bg-gradient-to-br from-[#F8F4E3] via-transparent to-[#D4A017]"></div>
        <div className="fixed inset-0 z-0 bg-[#F8F4E3] opacity-30"></div>

        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full bg-[#F8F4E3]/90 backdrop-blur-sm z-20 shadow-lg border-b border-[#D4A017]/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="group">
              <img
                src="/images/logo.png"
                alt="IkeOluwa Logo"
                className="w-16 h-16 object-contain filter drop-shadow-md"
              />
            </a>
            <div className="space-x-8 text-lg font-['Cormorant_Garamond'] font-medium text-[#4A4A4A]">
              <a href="/" className="nav-link">Home</a>
              <a href="/menu" className="nav-link">Menu</a>
              <a href="/reservations" className="nav-link">Reservations</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/contact" className="nav-link">Contact</a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden pt-28">
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          <div id="cart-card" className="relative rounded-3xl p-8 sm:p-16 shadow-2xl max-w-4xl text-center z-10 flex flex-col items-center shiny-gold-card-bg w-full">
            <h1 className="text-6xl font-['Cormorant_Garamond'] text-[#D4A017] mb-4 drop-shadow-md">
              Your Cart
            </h1>
            <p className="text-xl font-['Lora'] text-[#555] max-w-prose mb-8 italic">
              Review your selected items before checkout.
            </p>

            {cartItems.length > 0 ? (
              <div className="w-full">
                <div className="space-y-6 mb-8">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center bg-[#F8F4E3] rounded-2xl p-4 border border-[#D4A017]/50 shadow-sm">
                      <div className="flex-1 text-left mb-2 sm:mb-0">
                        <h3 className="text-xl font-['Cormorant_Garamond'] text-[#1A1A1A]">{item.name}</h3>
                        <p className="text-lg font-['Lora'] text-[#555]">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D4A017] text-[#1A1A1A] hover:bg-[#B88C14] transition-all"
                          >-</button>
                          <span className="font-['Lora'] text-lg">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D4A017] text-[#1A1A1A] hover:bg-[#B88C14] transition-all"
                          >+</button>
                        </div>
                        <p className="text-lg font-['Cormorant_Garamond'] font-bold w-20 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent border border-[#E74C3C] text-[#E74C3C] hover:bg-[#E74C3C] hover:text-[#F8F4E3] transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current"><path d="M135.2 17.69C140.9 6.848 152.1 0 164.1 0H283.9C295.9 0 307.1 6.848 312.8 17.69L335.7 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32V96C32 78.33 46.33 64 64 64H145.3L135.2 17.69zM140.7 207.9C150.3 207.9 159.2 211.7 165.7 218.2L224 276.5L282.3 218.2C288.8 211.7 297.7 207.9 307.3 207.9C326.8 207.9 342.3 223.3 342.3 242.9C342.3 252.5 338.6 261.4 332.1 267.9L273.8 326.2L332.1 384.5C338.6 391 342.3 399.9 342.3 409.5C342.3 429 326.8 444.4 307.3 444.4C297.7 444.4 288.8 440.7 282.3 434.2L224 375.9L165.7 434.2C159.2 440.7 150.3 444.4 140.7 444.4C121.2 444.4 105.7 429 105.7 409.5C105.7 399.9 109.4 391 115.9 384.5L174.2 326.2L115.9 267.9C109.4 261.4 105.7 252.5 105.7 242.9C105.7 223.3 121.2 207.9 140.7 207.9zM51.8 160H396.2L386.5 448H61.5L51.8 160z"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right text-2xl font-['Cormorant_Garamond'] text-[#1A1A1A] mb-8">
                  Subtotal: <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </div>

                <button onClick={handleCheckout} className="btn-gold w-full">
                  Proceed to Checkout
                </button>
              </div>
            ) : (
              <div className="w-full">
                <p className="text-lg font-['Lora'] text-[#555]">Your cart is currently empty.</p>
                <a href="/menu" className="btn-gold mt-6">
                  Browse Menu
                </a>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#F8F4E3] py-12 relative border-t border-t-[#D4A017]/30 patterned-cream-bg">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <p className="text-[#333] font-['Cormorant_Garamond'] mb-4">
              IkeOluwa Grills & Chops &copy; 2025 | Lagos, Nigeria
            </p>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://instagram.com" className="social-link">Instagram</a>
              <a href="https://facebook.com" className="social-link">Facebook</a>
              <a href="https://twitter.com" className="social-link">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CartPage;
