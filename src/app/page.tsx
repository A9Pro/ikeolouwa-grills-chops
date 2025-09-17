"use client";

import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Hero Section with Carousel */}
      <section className="relative w-full h-[60vh] sm:h-[80vh]">
        <div className="absolute inset-0">
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Hero image ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                currentImageIndex === index && isLoaded ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center bg-black/50">
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">
            Welcome to IkeOluwa Grills & Chops
          </h1>
          <p className="text-lg sm:text-xl font-cormorant text-white mb-6 max-w-md">
            Savor authentic Nigerian cuisine with a modern twist. Book your table or explore our menu today!
          </p>
          <Link
            href="/menu"
            className="inline-block bg-[#d4af37] text-white font-cormorant text-lg py-3 px-6 rounded hover:bg-[#b8972e] transition-colors"
          >
            View Menu
          </Link>
        </div>
      </section>
      {/* Additional Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-3xl font-playfair font-bold text-[#1a1a1a] mb-4">
          Our IkeOluwa
        </h2>
        <p className="text-lg font-cormorant text-[#4a4a4a] mb-6">
          At IkeOluwa Grills & Chops, we blend tradition with innovation to bring you the best of Nigerian flavors.
        </p>
        <Link
          href="/reservations"
          className="inline-block bg-[#1a1a1a] text-white font-cormorant text-lg py-3 px-6 rounded hover:bg-[#2a2a2a] transition-colors"
        >
          Book Your Meal
        </Link>
      </section>
    </div>
  );
}