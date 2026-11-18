"use client";

import React from "react";
import Navbar from "./Navbar";
import { BEANS_AVATARS } from "../data/coffee-data";

interface HeroSectionProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onExploreClick?: () => void;
}

export default function HeroSection({
  cartCount = 0,
  onOpenCart,
  onExploreClick,
}: HeroSectionProps) {
  const scrollToContent = () => {
    const el = document.getElementById("intro");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="hero-section min-h-[620px] md:h-[620px] p-6 sm:p-8 flex flex-col justify-between text-white relative rounded-3xl overflow-hidden shadow-2xl"
      style={{
        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZY9vjZTtWFWKMkkuTHnj6CLHxt7GaS5cEoVBTI9br9-Ro1PLBf8Jcewfq2akbHSuV1kFa_SY6nzHp_fq2gQDsrt9GUyT9iywe5DZ92LkXWM7juOcEkynWK1LqvdZDhXmcBH90Mcc-wshuIqBmEvllO1JC5X9emX_jD6puvSvK4ZbNpdZ-lJpiEtBzNuF-JH-TaeAlY5a2llM-Nk4eGJGg45m2bUsIuOrcraqtbs8oHvTYqyChfzp0Kg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* Dark overlay for rich contrast */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Navigation Header */}
      <Navbar cartCount={cartCount} onOpenCart={onOpenCart} />

      {/* Hero Content */}
      <div className="text-center mt-12 mb-8 flex-grow flex flex-col items-center justify-center relative z-10">
        <p className="text-base sm:text-lg font-medium mb-2 text-white/95 tracking-wide">
          Enjoy the taste of
        </p>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-5 text-white">
          botanical
        </h1>
        <p className="text-xs sm:text-sm max-w-2xl text-gray-200/95 leading-relaxed font-normal px-4">
          Our coffee doesn't have to taste that way. But it does. It's not your typical. It's unnecessarily good. Maybe that's because we're unnecessarily driven.
        </p>
      </div>

      {/* Bottom Hero Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full relative z-10 gap-6 pb-20 sm:pb-0">
        {/* Stats Glass Card */}
        <div className="glass-card rounded-3xl p-4 sm:p-5 flex gap-4 items-center max-w-sm backdrop-blur-md shadow-lg">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">99+Beans</h3>
            <p className="text-xs text-gray-300 leading-snug">
              &ldquo;Too far&rdquo; is exactly where we want to be. All in the name of coffee.
            </p>
          </div>

          {/* Stacked Bean Images */}
          <div className="flex flex-col gap-1 -ml-2 shrink-0">
            {BEANS_AVATARS.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Coffee Beans"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 object-cover shadow-sm ${
                  index === 0
                    ? "z-30"
                    : index === 1
                    ? "-mt-4 z-20"
                    : "-mt-4 z-10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Down Button */}
        <button
          onClick={scrollToContent}
          aria-label="Scroll to content"
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors mr-0 sm:mr-44 mb-2 cursor-pointer text-white"
        >
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 5v14M19 12l-7 7-7-7"></path>
          </svg>
        </button>
      </div>

      {/* Inverted Corner Cutout for Explore Button */}
      <div className="absolute bottom-0 right-0 bg-[#f8f8f8] pl-7 pt-5 pb-6 pr-8 rounded-tl-[2.5rem] z-30 flex items-center justify-center">
        {/* Top inverted corner curve SVG */}
        <svg
          className="absolute -top-7 right-0 w-7 h-7 pointer-events-none"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path d="M28 28V0C28 15.464 15.464 28 0 28H28Z" fill="#f8f8f8" />
        </svg>

        {/* Left inverted corner curve SVG */}
        <svg
          className="absolute bottom-0 -left-7 w-7 h-7 pointer-events-none"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path d="M28 28H0C15.464 28 28 15.464 28 0V28Z" fill="#f8f8f8" />
        </svg>

        <button
          onClick={onExploreClick}
          className="explore-btn px-6 py-2.5 rounded-full font-medium text-sm sm:text-base border border-gray-300 hover:bg-gray-100 transition shadow-sm tracking-tight text-black bg-white cursor-pointer active:scale-95"
        >
          Explore Goodies
        </button>
      </div>
    </section>
  );
}
