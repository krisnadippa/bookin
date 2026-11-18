"use client";

import React, { useState } from "react";

export default function IntroSection() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <section id="intro" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 items-center pt-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight tracking-tight text-gray-950">
          From Greenies to
          <br />
          Delight.
        </h2>
        <p className="text-gray-500 text-sm">All in the name of coffee.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        {/* Video Thumbnail Placeholder */}
        <div className="relative w-48 h-28 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-200 group">
          <img
            alt="Fern video"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1UslPn1aXdFM8Vge7oTGDh8Ofp1U-YYyjbdltL8UMSGfQICCgMF4Sya8ZUyCBw2o2TATMNaa73p2_22UF5QVT8_0aPE0GnJaAmu6NxrAupdzj2KDqVl9_u5CQv9TYpB2oMLEruHNV6f8aAnVsmcBH8kGvSPWAG7XH3m7401DPhm_6skS0TsAuI_ALGZse41wSFvd-UZiuh_qA6ysH9SXFOgyErVJ48mm1iSFnldxiWBROt9CHpHwQmA"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label="Play video"
              className="w-10 h-10 bg-white/40 hover:bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 cursor-pointer shadow-md"
            >
              <svg
                fill="currentColor"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Narrative statement with inline leaf pill */}
        <p className="text-lg sm:text-xl font-medium leading-relaxed text-gray-900">
          It doesn&apos;t have{" "}
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1U9cD72aPcFCd3Z4GEEL2rzwQQ-2XuFwO5eLzWqA8Bq7e_1T8k0awkNGmCr1ptD7LRY_S4IinjF5LfuJBWe39IKBpzdjRxFbYQHbiwzOTFdmAPpXcD8ymAPlquYE53Hg4NwCX_t5kJ_JnKTwqpjDhyCCOsd0eD0EUSHoZUeb-MwmD9ENOpbC-msH7O59gsajDBR97A1cisK6KJv7L6w9UxsS-TIhSNg3vnj5ZEZJa8wWCHgvnE2yhboxS0"
            alt="Botanical leaves"
            className="inline-block w-14 h-6 rounded-full object-cover align-middle mx-1.5 shadow-sm border border-white/50"
          />{" "}
          to taste that way. But it does. It&apos;s not your typical. It&apos;s unnecessarily good.
        </p>
      </div>
    </section>
  );
}
