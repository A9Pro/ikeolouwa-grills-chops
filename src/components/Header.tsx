"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-[#1a1a1a] text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="IkeOluwa Grills & Chops Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-2xl font-bold font-playfair">
            IkeOluwa Grills & Chops
          </span>
        </Link>
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-[#d4af37] font-cormorant text-lg">
            Home
          </Link>
          <Link href="/menu" className="hover:text-[#d4af37] font-cormorant text-lg">
            Menu
          </Link>
          <Link href="/reservations" className="hover:text-[#d4af37] font-cormorant text-lg">
            Reservations
          </Link>
          <Link href="/about" className="hover:text-[#d4af37] font-cormorant text-lg">
            About
          </Link>
        </nav>
      </div>
      <nav
        className={`md:hidden bg-[#1a1a1a] ${
          isOpen ? "block" : "hidden"
        } absolute top-16 left-0 right-0 shadow-lg`}
      >
        <div className="flex flex-col items-center py-4">
          <Link
            href="/"
            className="py-2 text-lg font-cormorant hover:text-[#d4af37]"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="py-2 text-lg font-cormorant hover:text-[#d4af37]"
            onClick={toggleMenu}
          >
            Menu
          </Link>
          <Link
            href="/reservations"
            className="py-2 text-lg font-cormorant hover:text-[#d4af37]"
            onClick={toggleMenu}
          >
            Reservations
          </Link>
          <Link
            href="/about"
            className="py-2 text-lg font-cormorant hover:text-[#d4af37]"
            onClick={toggleMenu}
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}