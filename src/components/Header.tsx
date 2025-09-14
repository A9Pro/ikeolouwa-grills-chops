"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#F8F4E3]/90 backdrop-blur-sm z-20 shadow-lg border-b border-[#D4A017]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="IkeOluwa Grills & Chops Logo"
            width={40}
            height={40}
            className="mr-2 object-contain filter drop-shadow-md"
          />
          <span className="text-2xl font-bold font-cormorant text-[#4A4A4A]">
            IkeOluwa Grills & Chops
          </span>
        </Link>
        <button
          className="md:hidden text-3xl focus:outline-none text-[#4A4A4A]"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="nav-link font-cormorant text-lg">
            Home
          </Link>
          <Link href="/menu" className="nav-link font-cormorant text-lg">
            Menu
          </Link>
          <Link href="/reservations" className="nav-link font-cormorant text-lg">
            Reservations
          </Link>
          <Link href="/about" className="nav-link font-cormorant text-lg">
            About & Contact
          </Link>
        </nav>
      </div>
      <nav
        className={`md:hidden bg-[#F8F4E3]/90 ${
          isOpen ? "block" : "hidden"
        } absolute top-16 left-0 right-0 shadow-lg`}
      >
        <div className="flex flex-col items-center py-4">
          <Link
            href="/"
            className="nav-link font-cormorant text-lg py-2"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="nav-link font-cormorant text-lg py-2"
            onClick={toggleMenu}
          >
            Menu
          </Link>
          <Link
            href="/reservations"
            className="nav-link font-cormorant text-lg py-2"
            onClick={toggleMenu}
          >
            Reservations
          </Link>
          <Link
            href="/about"
            className="nav-link font-cormorant text-lg py-2"
            onClick={toggleMenu}
          >
            About |  Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}