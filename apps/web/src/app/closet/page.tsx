"use client";

import React, { useEffect, useState } from "react";
import FashionOutfitCard from "@/components/notes/FashionOutfitCard";

// import Header from "@/components/Header"; // Uncomment if you want header here

type Outfit = {
  title: string;
  top: string;
  bottom: string;
  shoes: string;
  accessories: string;
  quote?: string;
};

export default function DreamClosetPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("dreamCloset");
    if (stored) setOutfits(JSON.parse(stored));
  }, []);

  // Remove outfit by index
  const handleRemove = (idx: number) => {
    const updated = outfits.filter((_, i) => i !== idx);
    setOutfits(updated);
    localStorage.setItem("dreamCloset", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0e9f7] via-[#f8fafc] to-[#e3f0ff] pb-20">
      {/* Sticky, glassy header */}
      <header className="sticky top-0 z-30 w-full bg-white/60 backdrop-blur-md shadow-sm py-6 px-4 flex flex-col items-center border-b border-gray-200 mb-12">
        <h1 className="text-6xl font-extrabold text-center tracking-tight text-gray-900 drop-shadow-lg font-serif mb-2">Your Dream Closet</h1>
        <p className="text-center text-2xl text-gray-500 font-light italic">Curated Elegance</p>
      </header>
      {/* Responsive grid for cards */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4 animate-fadein">
        {outfits.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-xl py-32 bg-white/60 rounded-2xl shadow-inner backdrop-blur-md border border-gray-200">No outfits saved yet.</div>
        ) : (
          outfits.map((outfit, idx) => (
            <div key={idx} className="relative">
              <button
                onClick={() => handleRemove(idx)}
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-red-100 text-red-600 rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Remove outfit"
                title="Remove from closet"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <FashionOutfitCard {...outfit} />
            </div>
          ))
        )}
      </div>
      {/* Floating back-to-top button */}
      <a
        href="#top"
        className="fixed bottom-8 right-8 z-40 bg-[#7b4ae2] text-white rounded-full shadow-lg p-4 hover:bg-[#5a2bb7] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7b4ae2] animate-fadein"
        style={{ display: 'inline-block' }}
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </a>
      <style jsx global>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadein {
          animation: fadein 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </main>
  );
} 