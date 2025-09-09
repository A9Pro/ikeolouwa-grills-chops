"use client";

import { useState, useEffect } from "react";

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

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const contactData = Object.fromEntries(formData.entries());
    console.log("Contact form data:", contactData);
    showMessage("Thank you for your message! We'll get back to you shortly.");
    e.target.reset();
  };

  return (
    <div
      className="antialiased bg-cover bg-center text-[#1A1A1A] transition-all duration-500"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Lora:ital,wght@0,400;0,700;1,400&display=swap");
        .font-cormorant {
          font-family: "Cormorant Garamond", serif;
        }
        .font-lora {
          font-family: "Lora", serif;
        }
        .nav-link {
          color: #4a4a4a;
          transition: color 300ms;
          position: relative;
        }
        .nav-link:hover {
          color: #d4a017;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #d4a017;
          transform: scaleX(0);
          transition: transform 300ms;
          transform-origin: left;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }
        .card {
          background-color: #f8f4e3;
          border: 1px solid #d4a017;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(255, 215, 0, 0.4);
          position: relative;
          overflow: hidden;
          border-radius: 1.5rem;
        }
        .card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(255, 255, 255, 0.2) 100%
          );
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        .social-link {
          color: #4a4a4a;
          transition: color 300ms;
          font-size: 0.875rem;
          font-family: "Cormorant Garamond";
        }
        .social-link:hover {
          color: #d4a017;
        }
        @media (max-width: 640px) {
          .nav-link {
            font-size: 0.8rem;
            margin: 0 0.25rem;
          }
          .flex.space-x-8 {
            flex-direction: column;
            gap: 1rem;
          }
          .grid-cols-3 {
            grid-template-columns: 1fr;
          }
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2rem;
          }
          p {
            font-size: 1rem;
          }
        }
      `}</style>

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
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/menu" className="nav-link">
              Menu
            </a>
            <a href="/reservations" className="nav-link">
              Reservations
            </a>
            <a href="/about" className="nav-link">
              About
            </a>
            <a href="/about" className="nav-link">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden pt-28">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative w-full max-w-4xl z-10 space-y-8">
          {/* About Us Section */}
          <div className="card p-8 sm:p-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-cormorant text-[#D4A017] mb-4 drop-shadow-md">
              About Us
            </h1>
            <p className="text-lg font-lora text-[#555] max-w-prose mx-auto mb-6">
              Welcome to IkeOluwa Grills & Chops, where we celebrate the pinnacle of Nigerian culinary artistry. Founded with a passion for authentic flavors and a commitment to impeccable service, we are more than just a restaurant, we are a destination for an unforgettable dining experience.
            </p>
            <p className="text-lg font-lora text-[#555] max-w-prose mx-auto mb-6">
              Our Team
            </p>  
            <p className="text-lg font-lora text-[#555] max-w-prose mx-auto mb-6">
              Our team of expert chefs meticulously crafts each dish, blending traditional recipes with modern techniques to create a menu that is both familiar and exciting. At IkeOluwa Grills & Chops, we don’t just cook, we create experiences. Our specialty lies in the art of grilling, bringing out the bold, smoky flavors that only an open flame can deliver. From tender, seasoned chops to perfectly grilled cuts of meat, each dish is prepared with care, passion, and a commitment to quality. We believe food should be more than just a meal, it should be a moment to enjoy, share, and remember. That’s why we focus on freshness, rich marinades, and a balance of taste that leaves you satisfied and smiling. Whether you’re stopping by for a quick bite or planning a gathering with friends and family, At IkeOluwa Grills & Chops delivers flavor that speaks for itself. Because when it comes to good food, it’s simple: fire, flavor, and happiness on a plate.
            </p> 
            <p className="text-lg font-lora text-[#555] max-w-prose mx-auto mb-6">
              Our Delivery Locations
            </p>
            <p className="text-lg font-lora text-[#555] max-w-prose mx-auto">
              Asese, Maba, Mowe, Olowotedo, Ascon, Magboro, Ibafo, Arepo
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="card p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl font-cormorant text-[#D4A017] mb-4 drop-shadow-md text-center">
              Contact Us
            </h1>
            <p className="text-lg font-lora text-[#555] max-w-prose mx-auto mb-8 italic text-center">
              We'd love to hear from you. Please fill out the form below or use
              our contact information to get in touch.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form */}
              <div>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-[#D4A017]"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full px-4 py-3 bg-[#F8F4E3] border border-[#D4A017] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] sm:text-sm"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-[#D4A017]"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full px-4 py-3 bg-[#F8F4E3] border border-[#D4A017] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#D4A017]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1 block w-full px-4 py-3 bg-[#F8F4E3] border border-[#D4A017] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] sm:text-sm"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#D4A017] hover:bg-[#B88C14] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A017] transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="text-center md:text-left space-y-4 pt-8 md:pt-0">
                <div className="p-4 bg-[#D4A017]/10 rounded-lg border border-[#D4A017]">
                  <h3 className="text-lg font-bold text-[#D4A017] mb-2">
                    🏠 Location
                  </h3>
                  <p className="text-sm text-[#4A4A4A]">
                    58, Pakuro Road, Orimerunmu, Ogun State, Nigeria
                  </p>
                </div>
                <div className="p-4 bg-[#D4A017]/10 rounded-lg border border-[#D4A017]">
                  <h3 className="text-lg font-bold text-[#D4A017] mb-2">☎️ Phone</h3>
                  <p className="text-sm text-[#4A4A4A]">+234 701 931 4146</p>
                </div>
                <div className="p-4 bg-[#D4A017]/10 rounded-lg border border-[#D4A017]">
                  <h3 className="text-lg font-bold text-[#D4A017] mb-2">
                    <img
                      src="/images/whatsapp.png"
                      alt="WhatsApp"
                      className="inline w-5 h-5 mr-1"
                    />
                    WhatsApp
                  </h3>
                  <a
                    href="https://wa.me/message/NCGGWV7AERAFD1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#4A4A4A] hover:text-green-600"
                  >
                    Chat with us
                  </a>
                </div>
                <div className="p-4 bg-[#D4A017]/10 rounded-lg border border-[#D4A017]">
                  <h3 className="text-lg font-bold text-[#D4A017] mb-2">✉️ Email</h3>
                  <p className="text-sm text-[#4A4A4A]">
                    ikeoluwagrillsandchops@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F8F4E3] py-12 relative border-t border-t-[#D4A017]/30">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-[#333] font-['Cormorant_Garamond'] mb-4">
            IkeOluwa Grills & Chops &copy; 2025 | Lagos, Nigeria
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://instagram.com" className="social-link">
              Instagram
            </a>
            <a href="https://facebook.com" className="social-link">
              Facebook
            </a>
            <a href="https://twitter.com" className="social-link">
              Twitter
            </a>
          </div>
        </div>
      </footer>

      {/* Message Box UI */}
      {messageBoxVisible && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F8F4E3] text-[#1A1A1A] px-8 py-6 rounded-2xl shadow-xl transition-all duration-300 opacity-100 scale-100 z-50 border border-[#D4A017]">
          <p className="text-center font-lora mb-4">{messageText}</p>
          <button
            onClick={hideMessage}
            className="w-full py-2 bg-[#D4A017] text-white rounded-full hover:bg-[#B88C14] transition-colors duration-200"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}
