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

    const data = await response.json(); // ✅ always parse JSON

    if (response.ok) {
      showMessage(data.message || "✅ Thank you for your message! We'll get back to you shortly.");
      form.reset();
    } else {
      showMessage(data.error || "❌ Something went wrong. Please try again later.");
    }
  } catch (error) {
    console.error("Submission error:", error);
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
            <div className="shiny-gold-card-bg rounded-lg p-5 sm:p-6 text-center">
              <h1 className="font-cormorant text-2xl font-bold text-[#1A1A1A] mb-3 sm:text-3xl">
                About Us
              </h1>
              <p className="font-lora text-[#666] text-xs sm:text-sm leading-relaxed mb-4">
                Welcome to IkeOluwa Grills & Chops, where we celebrate Nigerian culinary artistry. Founded with a passion for authentic flavors and impeccable service, we are a destination for unforgettable dining experiences.
              </p>
              <p className="font-lora text-[#666] text-xs sm:text-sm leading-relaxed mb-4">
                Our expert chefs blend traditional recipes with modern techniques to craft dishes that are both familiar and exciting. Specializing in grilling, we bring bold, smoky flavors to tender chops and perfectly grilled meats, prepared with care and quality.
              </p>
              <p className="font-lora text-[#666] text-xs sm:text-sm leading-relaxed">
                We focus on freshness, rich marinades, and balanced tastes to create memorable meals. Whether for a quick bite or a gathering, IkeOluwa Grills & Chops delivers fire, flavor, and happiness on a plate.
              </p>
              <p className="font-lora text-[#666] text-xs sm:text-sm leading-relaxed mt-4">
                <span className="font-medium">Delivery Location:</span> Lagos
              </p>
            </div>

            {/* Contact Section */}
            <div className="shiny-gold-card-bg rounded-lg p-5 sm:p-6">
              <h1 className="font-cormorant text-2xl font-bold text-[#1A1A1A] mb-3 text-center sm:text-3xl">
                Contact Us
              </h1>
              <p className="font-lora text-[#666] text-xs sm:text-sm italic text-center mb-4">
                We'd love to hear from you. Fill out the form or use our contact details below.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                      👤
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Full Name"
                      className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                      ✉️
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-2 top-3 text-[#D4A017] text-sm sm:text-base">
                      📝
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      placeholder="Your message..."
                      className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] resize-none sm:text-sm sm:pl-9 sm:py-3"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-gold font-lora text-xs sm:text-sm"
                  >
                    Send Message
                  </button>
                </form>
                <div className="space-y-3">
                  <div className="p-3 bg-[#D4A017]/10 rounded-md border border-[#D4A017]/30 text-center sm:p-4">
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-1 sm:text-lg">
                      🏠 Location
                    </h3>
                    <p className="text-xs text-[#666] sm:text-sm">
                      58, Pakuro Road, Orimerunmu, Ogun State, Nigeria
                    </p>
                  </div>
                  <div className="p-3 bg-[#D4A017]/10 rounded-md border border-[#D4A017]/30 text-center sm:p-4">
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-1 sm:text-lg">
                      ☎️ Phone
                    </h3>
                    <p className="text-xs text-[#666] sm:text-sm">
                      +234 701 931 4146
                    </p>
                  </div>
                  <div className="p-3 bg-[#D4A017]/10 rounded-md border border-[#D4A017]/30 text-center sm:p-4">
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-1 sm:text-lg">
                      <Image
                        src="/images/whatsapp.png"
                        alt="WhatsApp"
                        width={16}
                        height={16}
                        className="inline mr-1"
                      />
                      WhatsApp
                    </h3>
                    <a
                      href="https://wa.me/message/NCGGWV7AERAFD1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#666] hover:text-green-600 sm:text-sm"
                    >
                      Chat with us
                    </a>
                  </div>
                  <div className="p-3 bg-[#D4A017]/10 rounded-md border border-[#D4A017]/30 text-center sm:p-4">
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-1 sm:text-lg">
                      ✉️ Email
                    </h3>
                    <p className="text-xs text-[#666] sm:text-sm">
                      ikeoluwagrillsandchops@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-[#F8F4E3] py-8 relative border-t border-[#D4A017]/30 mt-6">
            <div className="max-w-sm mx-auto px-4 text-center sm:max-w-md sm:px-6">
              <p className="text-[#666] font-cormorant text-xs sm:text-sm mb-3">
                IkeOluwa Grills & Chops &copy; 2025 | Lagos, Nigeria
              </p>
              <div className="flex justify-center space-x-4">
                <a href="https://instagram.com" className="social-link text-xs sm:text-sm">
                  Instagram
                </a>
                <a href="https://facebook.com" className="social-link text-xs sm:text-sm">
                  Facebook
                </a>
                <a href="https://twitter.com" className="social-link text-xs sm:text-sm">
                  Twitter
                </a>
              </div>
            </div>
          </footer>

          {/* Message Box */}
          {messageBoxVisible && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F8F4E3] text-[#1A1A1A] px-6 py-4 rounded-lg shadow-md transition-all duration-300 opacity-100 scale-100 z-50 border border-[#D4A017]/50">
              <p className="text-center font-lora text-xs sm:text-sm mb-3">
                {messageText}
              </p>
              <button
                onClick={hideMessage}
                className="w-full btn-gold font-lora text-xs sm:text-sm"
              >
                OK
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}