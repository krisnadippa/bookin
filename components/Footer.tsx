"use client";

import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      id="footer"
      className="bg-[#0B1A12] text-white p-8 sm:p-12 rounded-t-[3rem] mt-[-2rem] relative z-20 shadow-2xl"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1: Menu */}
        <div>
          <h5 className="text-gray-400 font-semibold mb-4 text-sm">Menu</h5>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a className="hover:text-white transition-colors" href="#goods">
                Coffee
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#goods">
                Pastries
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#goods">
                Merch
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#goods">
                Equipment
              </a>
            </li>
          </ul>
        </div>

        {/* Col 2: Company */}
        <div>
          <h5 className="text-gray-400 font-semibold mb-4 text-sm">Company</h5>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a className="hover:text-white transition-colors" href="#intro">
                About Us
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#locations">
                Locations
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#footer">
                Careers
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#footer">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Social */}
        <div>
          <h5 className="text-gray-400 font-semibold mb-4 text-sm">Social</h5>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a
                className="hover:text-white transition-colors"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="hover:text-white transition-colors"
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                className="hover:text-white transition-colors"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Stay Updated */}
        <div className="col-span-2 md:col-span-1">
          <h5 className="text-gray-400 font-semibold mb-4 text-sm">Stay Updated</h5>
          {subscribed ? (
            <div className="p-3 bg-white/10 rounded-2xl text-xs text-white">
              Thank you for subscribing to Botanical Coffee updates!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <input
                className="bg-white/10 border-none text-white text-sm rounded-l-full py-3 px-4 w-full focus:ring-1 focus:ring-white/40 focus:outline-none placeholder:text-gray-400"
                placeholder="Email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-3 rounded-r-full text-sm font-semibold hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-white/10 pt-8 gap-4">
        <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white">
          botanical
        </h2>
        <div className="text-left sm:text-right text-xs text-gray-400 space-y-1">
          <p>&copy; 2024 Botanical Coffee Shop.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
