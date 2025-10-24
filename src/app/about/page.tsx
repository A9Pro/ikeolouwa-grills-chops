"use client";

import emailjs from "@emailjs/browser";
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

  // ✅ Fixed handler for contact form
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Prepare template parameters for reservations template
      const templateParams = {
        order_id: "CONTACT-" + Date.now(), // Unique ID for contact message
        customer_name: formData.get('name'),
        customer_email: formData.get('email'),
        customer_phone: "N/A",
        delivery_address: "N/A",
        delivery_date: "N/A",
        delivery_time: "N/A",
        meal_quantity: "N/A",
        special_instructions: formData.get('message'),
        order_time: new Date().toLocaleString()
      };

      // Send email in background for better UX
      emailjs.send(
        "service_3jb0m5n",     
        "template_t8r3icp",    // Use reservations template
        templateParams,
        "XJ4j-BxpbF5DXeASx"      
      ).then(() => {
        console.log("✅ Contact message sent successfully");
      }).catch((error) => {
        console.error("❌ Contact message failed:", error);
      });

      showMessage("✅ Thank you! Your message has been sent successfully.");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      showMessage("❌ Failed to send your message. Please try again later.");
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
            <div className="shiny-gold-card-bg rounded-lg p-5 sm:p-6">
              <h1 className="font-cormorant text-2xl font-bold text-[#1A1A1A] mb-3 text-center sm:text-3xl">
                About Us
              </h1>
              <div className="space-y-3 font-lora text-[#666] text-xs leading-relaxed sm:text-sm">
                <p>
                  Welcome to <span className="font-bold text-[#D4A017]">IkeOluwa Grills & Chops</span>, 
                  your premier destination for authentic Nigerian grills and delicious local cuisine in Lagos.
                </p>
                <p>
                  We specialize in perfectly grilled chicken, turkey, catfish, and a variety of mouth-watering 
                  small chops that bring the taste of home to your table.
                </p>
                <p>
                  Our commitment is to deliver fresh, high-quality meals with exceptional service. Whether 
                  you're ordering for a family dinner, party, or special event, we've got you covered.
                </p>
                <div className="mt-4 p-3 bg-[#D4A017]/10 rounded-md border border-[#D4A017]/30">
                  <p className="font-semibold text-[#1A1A1A] mb-2">📍 Service Areas:</p>
                  <p className="text-xs sm:text-sm">
                    Asese, Maba, Mowe, Olowotedo, Ascon, Magboro, Ibafo, Arepo and surrounding areas in Lagos.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="shiny-gold-card-bg rounded-lg p-5 sm:p-6">
              <h1 className="font-cormorant text-2xl font-bold text-[#1A1A1A] mb-3 text-center sm:text-3xl">
                Contact Us
              </h1>
              <p className="font-lora text-[#666] text-xs text-center mb-4 sm:text-sm">
                Have questions or special requests? We'd love to hear from you!
              </p>

              {/* Contact Information */}
              <div className="mb-4 space-y-2 font-lora text-xs sm:text-sm">
                <div className="flex items-center justify-center space-x-2 text-[#666]">
                  <span>📞</span>
                  <a href="tel:+2348132791933" className="text-[#D4A017] hover:underline">
                    +234 813 279 1933
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2 text-[#666]">
                  <span>✉️</span>
                  <a href="mailto:herpick3@gmail.com" className="text-[#D4A017] hover:underline">
                    herpick3@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2 text-[#666]">
                  <span>📍</span>
                  <span>Lagos, Nigeria</span>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                    👤
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                    ✉️
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-2 top-3 text-[#D4A017] text-sm sm:text-base">
                    💬
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Your message..."
                    className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] resize-none sm:text-sm sm:pl-9 sm:py-3"
                  />
                </div>
                <button type="submit" className="w-full btn-gold font-lora text-xs sm:text-sm">
                  Send Message
                </button>
              </form>

              {/* Social Links */}
              <div className="mt-4 pt-4 border-t border-[#D4A017]/30">
                <p className="text-center font-lora text-xs text-[#666] mb-2 sm:text-sm">
                  Follow us on social media:
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link text-xs sm:text-sm">
                    Instagram
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link text-xs sm:text-sm">
                    Facebook
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link text-xs sm:text-sm">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Message Box */}
          {messageBoxVisible && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
              <div className="bg-[#F8F4E3] text-[#1A1A1A] px-6 py-4 rounded-lg shadow-lg max-w-sm w-full border border-[#D4A017]/50">
                <p className="text-center font-lora text-xs sm:text-sm mb-3">
                  {messageText}
                </p>
                <button onClick={hideMessage} className="w-full btn-gold font-lora text-xs sm:text-sm">
                  OK
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="relative bg-[#F8F4E3] py-8 border-t border-[#D4A017]/30 mt-6">
          <div className="max-w-sm mx-auto px-4 text-center sm:max-w-md sm:px-6">
            <p className="text-[#666] font-cormorant text-xs sm:text-sm mb-3">
              IkeOluwa Grills & Chops &copy; 2025 | Lagos, Nigeria
            </p>
            <p className="text-[#666] font-lora text-xs">
              Serving delicious grills and local cuisine with love ❤️
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}