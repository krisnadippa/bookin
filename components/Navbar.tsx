"use client";

import React, { useState } from "react";

interface NavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Navbar({ cartCount = 0, onOpenCart }: NavbarProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <header className="flex justify-between items-center w-full z-20">
      {/* Left Navigation */}
      <nav className="flex gap-1.5 sm:gap-2 bg-black/30 rounded-full p-1.5 backdrop-blur-md border border-white/10 shadow-lg">
        <a
          href="#home"
          onClick={() => setActiveTab("home")}
          className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
            activeTab === "home"
              ? "bg-white text-black shadow-sm"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          Home
        </a>
        <a
          href="#goods"
          onClick={() => setActiveTab("menu")}
          className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
            activeTab === "menu"
              ? "bg-white text-black shadow-sm"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          Menu
        </a>
      </nav>

      {/* Right Navigation */}
      <nav className="flex gap-2 items-center bg-black/30 rounded-full p-1.5 px-3 sm:px-4 backdrop-blur-md border border-white/10 shadow-lg text-white">
        <a
          href="#locations"
          className="text-xs sm:text-sm font-medium text-white/85 hover:text-white px-2 sm:px-3 transition-colors"
        >
          Locations
        </a>
        <a
          href="#footer"
          className="text-xs sm:text-sm font-medium text-white/85 hover:text-white px-2 sm:px-3 border-r border-white/20 transition-colors"
        >
          Jobs
        </a>
        <button
          onClick={onOpenCart}
          aria-label="Shopping Cart"
          className="pl-2 sm:pl-3 pr-1 text-white hover:text-gray-200 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <svg
            fill="none"
            height="18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
