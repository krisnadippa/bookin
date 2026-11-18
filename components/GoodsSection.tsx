"use client";

import React, { useState } from "react";
import { PRODUCTS, Product } from "../data/coffee-data";

interface GoodsSectionProps {
  onAddToCart?: (product: Product) => void;
}

export default function GoodsSection({ onAddToCart }: GoodsSectionProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <section id="goods" className="mb-20 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-950 leading-none">
          Unnecessarily
          <br />
          Good Good(s)
        </h2>
        <a
          href="#goods"
          className="self-start sm:self-auto bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition shadow-sm active:scale-95"
        >
          Shop All
        </a>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => {
          const isLiked = !!favorites[product.id];

          return (
            <div
              key={product.id}
              className="group cursor-pointer flex flex-col justify-between"
            >
              {/* Product Image Frame */}
              <div className="relative bg-gray-200 rounded-3xl overflow-hidden aspect-[4/3] mb-4 shadow-sm">
                {/* Wishlist Heart Button */}
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(e, product.id)}
                  aria-label="Add to wishlist"
                  className={`absolute top-4 left-4 w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10 cursor-pointer shadow-md ${
                    isLiked
                      ? "bg-red-500 text-white scale-110"
                      : "bg-black/30 hover:bg-black/50 text-white"
                  }`}
                >
                  <svg
                    fill={isLiked ? "currentColor" : "none"}
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>

                {/* Product Photo */}
                <img
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={product.image}
                />
              </div>

              {/* Product Info & Action */}
              <div className="flex justify-between items-end gap-2">
                <div>
                  <h4 className="text-xl font-bold mb-1 text-gray-900 group-hover:text-black transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                    {product.notes}
                  </p>
                  <p className="font-semibold text-sm text-gray-950">
                    {product.price}
                  </p>
                </div>

                {/* Add to Cart / Action Button */}
                <button
                  type="button"
                  onClick={() => onAddToCart && onAddToCart(product)}
                  aria-label={`Buy ${product.name}`}
                  className="w-10 h-10 shrink-0 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-md group-hover:rotate-45 cursor-pointer active:scale-95"
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
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
