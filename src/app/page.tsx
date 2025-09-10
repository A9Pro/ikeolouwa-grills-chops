"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const images = [
  "/images/bg1.png",
  "/images/bg2.png",
  "/images/bg3.png",
  "/images/bg4.png",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#F8F4E3] text-[#1A1A1A] font-playfair antialiased">
      {/* Global Background Pattern */}
      <div
        className="fixed inset-0 z-0 opacity-70"
        style={{
          backgroundImage: "url('/images/gold-floral-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "150px",
        }}
      ></div>
      <div className="fixed inset-0 z-0 bg-[#F8F4E3] opacity-30"></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-[#F8F4E3]/90 backdrop-blur-sm z-20 shadow-lg border-b border-[#D4A017]/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="group">
            <img
              src="/images/logo.png"
              alt="IkeOluwa Logo"
              className="w-12 h-12 object-contain filter drop-shadow-md"
            />
          </Link>
          <button
            className="md:hidden text-[#4A4A4A] focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:space-x-6 text-base font-['Cormorant_Garamond'] font-medium text-[#4A4A4A] absolute md:static top-12 left-0 w-full md:w-auto bg-[#F8F4E3]/95 md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none z-10`}
          >
            <Link href="/" className="nav-link py-2 md:py-0">
              Home
            </Link>
            <Link href="/menu" className="nav-link py-2 md:py-0">
              Menu
            </Link>
            <Link href="/reservations" className="nav-link py-2 md:py-0">
              Reservations
            </Link>
            <Link href="/about" className="nav-link py-2 md:py-0">
              About
            </Link>
            <Link href="/contact" className="nav-link py-2 md:py-0">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 overflow-hidden">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Background ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentImageIndex ? "opacity-30 scale-105" : "opacity-0"
            }`}
            loading="lazy"
          />
        ))}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div
          className={`relative rounded-2xl p-8 sm:p-12 max-w-2xl text-center z-10 flex flex-col items-center transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } shiny-gold-card-bg`}
        >
          <img
            src="/images/logo.png"
            alt="IkeOluwa Logo"
            className="w-24 sm:w-32 h-24 sm:h-32 object-contain mb-4 filter drop-shadow-lg"
          />
          <h1 className="text-5xl sm:text-6xl font-['Cormorant_Garamond'] text-[#D4A017] drop-shadow-md">
            IkeOluwa
          </h1>
          <h2 className="text-2xl sm:text-3xl font-['Cormorant_Garamond'] font-light tracking-wide text-[#333] mt-2 mb-4">
            Grills & Chops
          </h2>
          <p className="text-base sm:text-lg font-['Lora'] text-[#555] max-w-prose mb-6 italic">
            Experience the pinnacle of Nigerian culinary artistry.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Link href="/menu" className="btn-gold">
              View Our Menu
            </Link>
            <Link href="/reservations" className="btn-gold-outline">
              Make a Reservation
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative py-12 bg-[#F8F4E3] z-10 patterned-cream-bg">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-6 text-center">
          <div className="feature-card shiny-gold-card-bg">
            <h3 className="text-xl sm:text-2xl font-['Cormorant_Garamond'] text-[#D4A017] mb-2">
              Authentic Flavors
            </h3>
            <p className="text-sm sm:text-base text-[#333]">
              Indulge in expertly crafted grills and chops inspired by Nigeria’s rich culinary heritage.
            </p>
          </div>
          <div className="feature-card shiny-gold-card-bg">
            <h3 className="text-xl sm:text-2xl font-['Cormorant_Garamond'] text-[#D4A017] mb-2">
              Luxurious Ambiance
            </h3>
            <p className="text-sm sm:text-base text-[#333]">
              Dine in a setting that blends Nigerian warmth with opulent elegance.
            </p>
          </div>
          <div className="feature-card shiny-gold-card-bg">
            <h3 className="text-xl sm:text-2xl font-['Cormorant_Garamond'] text-[#D4A017] mb-2">
              Exemplary Service
            </h3>
            <p className="text-sm sm:text-base text-[#333]">
              Enjoy swift, attentive, and personalized service tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F8F4E3] py-8 relative border-t border-[#D4A017]/30 patterned-cream-bg">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <p className="text-sm sm:text-base text-[#333] font-['Cormorant_Garamond'] mb-4">
            IkeOluwa Grills & Chops &copy; 2025 | Lagos, Nigeria
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm sm:text-base">
            <Link href="https://instagram.com" className="social-link">
              Instagram
            </Link>
            <Link href="https://facebook.com" className="social-link">
              Facebook
            </Link>
            <Link href="https://twitter.com" className="social-link">
              Twitter
            </Link>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .font-playfair {
          font-family: "Playfair Display", serif;
        }
        .font-cormorant {
          font-family: "Cormorant Garamond", serif;
        }
        .font-lora {
          font-family: "Lora", serif;
        }

        .nav-link {
          @apply text-[#4A4A4A] hover:text-[#D4A017] transition-colors duration-300 relative;
        }
        .nav-link::after {
          content: "";
          @apply absolute bottom-[-2px] left-0 w-full h-[1px] bg-[#D4A017] scale-x-0 transition-transform duration-300 origin-left;
        }
        .nav-link:hover::after {
          @apply scale-x-100;
        }

        .btn-gold {
          @apply px-6 py-2 bg-[#D4A017] text-[#1A1A1A] font-semibold rounded-full shadow-lg hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base;
        }

        .btn-gold-outline {
          @apply px-6 py-2 bg-transparent text-[#D4A017] font-semibold rounded-full border-2 border-[#D4A017] shadow-lg transition-all duration-300 hover:bg-[#D4A017] hover:text-[#1A1A1A] transform hover:scale-105 text-sm sm:text-base;
        }

        .shiny-gold-card-bg {
          background-color: #F8F4E3;
          background-image: url("/images/gold-floral-pattern-dark.png");
          background-repeat: repeat;
          background-size: 100px;
          border: 1px solid #D4A017;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), inset 0 0 15px rgba(255, 215, 0, 0.3);
          position: relative;
          overflow: hidden;
        }
        .shiny-gold-card-bg::before {
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

        .patterned-cream-bg {
          background-color: #F8F4E3;
          background-image: url("/images/gold-floral-pattern.png");
          background-repeat: repeat;
          background-size: 150px;
          border-top: 1px solid #D4A017;
          border-bottom: 1px solid #D4A017;
        }

        .feature-card {
          @apply p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform-gpu;
        }

        .social-link {
          @apply text-[#4A4A4A] hover:text-[#D4A017] transition-colors duration-300 font-["Cormorant_Garamond"];
        }
      `}</style>
    </div>
  );
}