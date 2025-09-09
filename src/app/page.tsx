"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const images = [
  "/images/bg1.png", // Assuming these are luxurious food/restaurant images
  "/images/bg2.png",
  "/images/bg3.png",
  "/images/bg4.png",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4E3] text-[#1A1A1A] font-playfair antialiased">
      {/* Global Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-70" style={{ backgroundImage: "url('/images/gold-floral-pattern.png')", backgroundRepeat: "repeat", backgroundSize: "200px" }}></div>
      <div className="fixed inset-0 z-0 bg-[#F8F4E3] opacity-30"></div> {/* Soft overlay for base color */}


      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-[#F8F4E3]/90 backdrop-blur-sm z-20 shadow-lg border-b border-[#D4A017]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="group">
            <img
              src="/images/logo.png" // Ensure logo has transparent background
              alt="IkeOluwa Logo"
              className="w-16 h-16 object-contain filter drop-shadow-md"
            />
          </Link>
          <div className="space-x-8 text-lg font-['Cormorant_Garamond'] font-medium text-[#4A4A4A]">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/menu" className="nav-link">Menu</Link>
            <Link href="/reservations" className="nav-link">Reservations</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/about" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
        {/* Background Images Slideshow (slightly darker, more atmospheric) */}
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
        {/* Darker Overlay for Readability on images */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        {/* Hero Card - Reflecting the VIP card/fabric design */}
        <div
          className={`relative rounded-3xl p-16 shadow-2xl max-w-3xl text-center z-10 flex flex-col items-center transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } shiny-gold-card-bg`}
        >
          <img
            src="/images/logo.png" // Ensure logo has transparent background
            alt="IkeOluwa Logo"
            className="w-36 h-36 object-contain mb-6 filter drop-shadow-lg"
          />
          <h1 className="text-8xl font-['Cormorant_Garamond'] text-[#D4A017] drop-shadow-md">
            IkeOluwa
          </h1>
          <h2 className="text-4xl font-['Cormorant_Garamond'] font-light tracking-wide text-[#333] mt-2 mb-6">
            Grills & Chops
          </h2>
          <p className="text-xl font-['Lora'] text-[#555] max-w-prose mb-8 italic">
            Experience the pinnacle of Nigerian culinary artistry.
          </p>
          <div className="flex space-x-6">
            <Link href="/menu" className="btn-gold">
              View Our Menu
            </Link>
            <Link href="/reservations" className="btn-gold-outline">
              Make a Meal Reservation
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section - Reflecting the fabric texture */}
      <section className="relative py-20 bg-[#F8F4E3] z-10 patterned-cream-bg">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="feature-card shiny-gold-card-bg">
            <h3 className="text-2xl font-['Cormorant_Garamond'] text-[#D4A017] mb-3">Authentic Flavors</h3>
            <p className="text-[#333]">Indulge in expertly crafted grills and chops inspired by Nigeria’s rich culinary heritage.</p>
          </div>
          <div className="feature-card shiny-gold-card-bg">
            <h3 className="text-2xl font-['Cormorant_Garamond'] text-[#D4A017] mb-3">Luxurious Ambiance</h3>
            <p className="text-[#333]">Dine in a setting that blends Nigerian warmth with opulent elegance, perfect for any occasion.</p>
          </div>
          <div className="feature-card shiny-gold-card-bg">
            <h3 className="text-2xl font-['Cormorant_Garamond'] text-[#D4A017] mb-3">Exemplary Service</h3>
            <p className="text-[#333]">Enjoy swift, attentive, and personalized service tailored to your every need and desire.</p>
          </div>
        </div>
      </section>

      {/* Footer - With a subtle pattern */}
      <footer className="bg-[#F8F4E3] py-12 relative border-t border-t-[#D4A017]/30 patterned-cream-bg">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-[#333] font-['Cormorant_Garamond'] mb-4">
            IkeOluwa Grills & Chops &copy; 2025 | Lagos, Nigeria
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="https://instagram.com" className="social-link">Instagram</Link>
            <Link href="https://facebook.com" className="social-link">Facebook</Link>
            <Link href="https://twitter.com" className="social-link">Twitter</Link>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }
        .font-lora {
          font-family: 'Lora', serif;
        }

        .nav-link {
          @apply text-[#4A4A4A] hover:text-[#D4A017] transition-colors duration-300 relative;
        }
        .nav-link::after {
          content: '';
          @apply absolute bottom-[-5px] left-0 w-full h-[1px] bg-[#D4A017] scale-x-0 transition-transform duration-300 origin-left;
        }
        .nav-link:hover::after {
          @apply scale-x-100;
        }

        .btn-gold {
          @apply px-10 py-3 bg-[#D4A017] text-[#1A1A1A] font-semibold rounded-full shadow-lg hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-105;
        }

        .btn-gold-outline {
          @apply px-10 py-3 bg-transparent text-[#D4A017] font-semibold rounded-full border-2 border-[#D4A017] shadow-lg transition-all duration-300 hover:bg-[#D4A017] hover:text-[#1A1A1A] transform hover:scale-105;
        }

        .shiny-gold-card-bg {
          background-color: #F8F4E3; /* Base cream color */
          background-image: url('/images/gold-floral-pattern-dark.png'); /* A darker version of the pattern for contrast */
          background-repeat: repeat;
          background-size: 150px;
          border: 1px solid #D4A017;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.4); /* Inner and outer glow */
          position: relative;
          overflow: hidden; /* For inner shine */
        }
        .shiny-gold-card-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%);
          mix-blend-mode: overlay; /* Creates a reflective shine */
          pointer-events: none;
        }
        
        .patterned-cream-bg {
          background-color: #F8F4E3;
          background-image: url('/images/gold-floral-pattern.png');
          background-repeat: repeat;
          background-size: 200px;
          border-top: 1px solid #D4A017;
          border-bottom: 1px solid #D4A017;
        }

        .feature-card {
          @apply p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 transform-gpu;
        }

        .social-link {
          @apply text-[#4A4A4A] hover:text-[#D4A017] transition-colors duration-300 text-sm md:text-base font-['Cormorant_Garamond'];
        }
        
        @media (max-width: 640px) {
          .nav-link { font-size: 0.8rem; margin: 0 0.25rem; }
          .flex.space-x-6 { flex-direction: column; gap: 1rem; }
          .grid-cols-3 { grid-template-columns: 1fr; }
          h1 { font-size: 4rem; }
          h2 { font-size: 2rem; }
          p { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
}
