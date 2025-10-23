"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Background images
const backgroundImages = [
  "/images/bg1.png",
  "/images/bg2.png",
  "/images/bg3.png",
  "/images/bg4.png",
];

export default function AboutContactPage() {
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);
  const [messageBoxVisible, setMessageBoxVisible] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setBackgroundImage(backgroundImages[randomIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const showMessage = (message: string) => {
    setMessageText(message);
    setMessageBoxVisible(true);
  };

  const hideMessage = () => {
    setMessageBoxVisible(false);
  };

  // ✅ Fixed handler
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const contactData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch {
        // fallback if server sends HTML error
        data = {};
      }

      if (response.ok) {
        showMessage(
          data.message ||
            "✅ Thank you for your message! We'll get back to you shortly."
        );
        form.reset();
      } else {
        showMessage(
          data.error ||
            `❌ Something went wrong (status ${response.status}). Please try again.`
        );
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      showMessage("⚠️ Error sending your message. Please try again later.");
    }
  };

  // Custom styles
  const customStyles = `
    .font-cormorant { font-family: 'Cormorant Garamond', serif; }
    .font-lora { font-family: 'Lora', serif; }
    .nav-link { color: #1A1A1A; transition: color 200ms; position: relative; }
    .nav-link:hover { color: #D4A017; }
    .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 1px; background: #D4A017; transform: scaleX(0); transition: transform 200ms; transform-origin: left; }
    .nav-link:hover::after { transform: scaleX(1); }
    .btn-gold { padding: 0.75rem 1.5rem; background: #D4A017; color: #1A1A1A; font-weight: 500; border-radius: 9999px; transition: all 200ms; min-height: 44px; }
    .btn-gold:hover { background: #B88C14; transform: scale(1.02); }
    .btn-gold-outline { padding: 0.75rem 1.5rem; border: 1px solid #D4A017; color: #D4A017; border-radius: 9999px; transition: all 200ms; min-height: 44px; }
    .btn-gold-outline:hover { background: #D4A017; color: #1A1A1A; transform: scale(1.02); }
    .shiny-gold-card-bg { background: #F8F4E3; border: 1px solid #D4A017/50; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .social-link { color: #1A1A1A; transition: color 200ms; font-family: 'Cormorant Garamond', serif; }
    .social-link:hover { color: #D4A017; }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-white relative overflow-hidden pt-20">
        {/* Background Image Overlay */}
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-300"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/10" />

        {/* Main Content */}
        <main className="relative z-10 container mx-auto px-4 py-6 sm:px-6">
          <div className="max-w-sm mx-auto sm:max-w-md space-y-6">
            {/* About Section */}
            {/* ... unchanged ... */}

            {/* Contact Section */}
            <div className="shiny-gold-card-bg rounded-lg p-5 sm:p-6">
              <h1 className="font-cormorant text-2xl font-bold text-[#1A1A1A] mb-3 text-center sm:text-3xl">
                Contact Us
              </h1>
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input type="text" name="name" required placeholder="Full Name" className="w-full p-2 border rounded" />
                <input type="email" name="email" required placeholder="Email Address" className="w-full p-2 border rounded" />
                <textarea name="message" rows={3} required placeholder="Your message..." className="w-full p-2 border rounded" />
                <button type="submit" className="w-full btn-gold font-lora text-xs sm:text-sm">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* ✅ Message Box */}
          {messageBoxVisible && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F8F4E3] text-[#1A1A1A] px-6 py-4 rounded-lg shadow-md z-50 border border-[#D4A017]/50">
              <p className="text-center font-lora text-xs sm:text-sm mb-3">
                {messageText}
              </p>
              <button onClick={hideMessage} className="w-full btn-gold font-lora text-xs sm:text-sm">
                OK
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
