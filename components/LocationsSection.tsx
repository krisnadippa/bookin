"use client";

import React, { useState } from "react";
import { LOCATIONS, LocationItem } from "../data/coffee-data";

export default function LocationsSection() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <section id="locations" className="mb-20 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {LOCATIONS.map((loc) => (
          <article
            key={loc.id}
            onClick={() => setSelectedCity(loc.city)}
            className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-md transition-all duration-300 hover:shadow-xl"
          >
            {/* Background Image */}
            <img
              alt={`${loc.city} branch`}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                loc.isFeatured ? "" : "grayscale"
              }`}
              src={loc.image}
            />

            {/* Dark Gradient Overlay */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                loc.isFeatured
                  ? "bg-black/40 group-hover:bg-black/35"
                  : "bg-black/60 group-hover:bg-black/50"
              }`}
            />

            {/* Content Container */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
              <div>
                <h3 className="text-3xl font-bold mb-2 tracking-tight">
                  {loc.city}
                </h3>
                <p className="text-sm text-gray-200 line-clamp-3 leading-relaxed">
                  {loc.description}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Navigating to Botanical Coffee Shop - ${loc.city}`);
                  }}
                  className={`backdrop-blur-sm px-4 py-2 rounded-full text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    loc.isFeatured
                      ? "bg-black/40 hover:bg-black/60 text-white"
                      : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                >
                  <svg
                    fill="none"
                    height="12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Navigate</span>
                </button>

                {loc.days && loc.hours && (
                  <div className="text-right">
                    <p className="text-xs text-gray-300">{loc.days}</p>
                    <p className="text-xs font-semibold">{loc.hours}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Right Arrow Button (Featured on Prague) */}
            {loc.isFeatured && (
              <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg transition-transform duration-300 group-hover:rotate-45">
                <svg
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
