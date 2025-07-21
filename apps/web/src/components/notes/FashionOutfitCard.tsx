import React from "react";

/**
 * FashionOutfitCard
 * Reusable, premium-styled card for displaying a fashion outfit.
 * Used in both Dream Closet and recommendations. Accepts children for actions (e.g., buttons).
 */
export interface FashionOutfitCardProps {
  title: string;
  top: string;
  bottom: string;
  shoes: string;
  accessories: string;
  quote?: string;
  children?: React.ReactNode;
}

export default function FashionOutfitCard({
  title,
  top,
  bottom,
  shoes,
  accessories,
  quote,
  children,
}: FashionOutfitCardProps) {
  return (
    <div
      className="bg-white/80 rounded-3xl shadow-2xl p-12 border border-gray-100 flex flex-col gap-8 hover:scale-[1.03] hover:shadow-3xl transition-transform duration-200 backdrop-blur-lg animate-fadein group relative"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 tracking-tight font-serif group-hover:text-[#7b4ae2] transition-colors duration-200">
        Ensemble: <span className="font-extrabold text-[#7b4ae2]">{title}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-4 text-xl font-light">
        <div><span className="font-semibold text-gray-700">Blouse/Top:</span> {top}</div>
        <div><span className="font-semibold text-gray-700">Trousers/Bottom:</span> {bottom}</div>
        <div><span className="font-semibold text-gray-700">Footwear/Shoes:</span> {shoes}</div>
        <div><span className="font-semibold text-gray-700">Accessories:</span> {accessories}</div>
      </div>
      <div className="pt-8 mt-4 border-t border-gray-200 flex justify-center">
        <blockquote className="italic text-2xl text-[#7b4ae2] font-serif text-center max-w-2xl bg-[#f6f1ff]/80 px-8 py-6 rounded-xl shadow-md border border-[#e3d6fa] group-hover:bg-[#ede6fa]/90 transition-colors duration-200">
          “{quote || "Elegance is the only beauty that never fades."}”
        </blockquote>
      </div>
      {children && <div className="flex justify-center gap-4 mt-6">{children}</div>}
    </div>
  );
}
// Explanation: This card is styled for premium look and can be used for both recommendations and saved outfits. Actions (like Add/Skip) can be passed as children. 