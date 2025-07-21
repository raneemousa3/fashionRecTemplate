"use client";

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f3f4f6] to-[#e3f0ff] flex flex-col items-center justify-center py-20 px-4">
      {/* Hero Section */}
      <section className="w-full max-w-3xl text-center mb-16">
        <div className="flex flex-col items-center gap-4 mb-6">
          <span className="text-5xl">👗</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold font-serif text-gray-900 mb-2 drop-shadow">YourPersonalStylist</h1>
        </div>
        <p className="text-xl sm:text-2xl text-gray-700 font-light mb-8">
          YourPersonalStylist is your AI-powered fashion companion. Get instant, personalized outfit recommendations for any occasion, save your favorite looks to your Dream Closet, and curate your unique style journey—all in one beautiful app.
        </p>
        <Link href="/suggestions">
          <button className="px-8 py-4 rounded-lg bg-[#7b4ae2] text-white text-xl font-semibold shadow hover:bg-[#5a2bb7] transition">
            Start Styling Now
          </button>
        </Link>
      </section>
      {/* Features Section */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white/80 rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col items-center">
          <span className="text-3xl mb-2">🤖</span>
          <h2 className="text-2xl font-bold mb-2 font-serif text-[#7b4ae2]">AI-Powered Recommendations</h2>
          <p className="text-gray-600 text-lg text-center">Describe your occasion or style and get instant, curated outfit ideas tailored just for you.</p>
        </div>
        <div className="bg-white/80 rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col items-center">
          <span className="text-3xl mb-2">👚</span>
          <h2 className="text-2xl font-bold mb-2 font-serif text-[#7b4ae2]">Dream Closet</h2>
          <p className="text-gray-600 text-lg text-center">Save your favorite looks to your Dream Closet and revisit them anytime for inspiration.</p>
        </div>
        <div className="bg-white/80 rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col items-center">
          <span className="text-3xl mb-2">✨</span>
          <h2 className="text-2xl font-bold mb-2 font-serif text-[#7b4ae2]">Curate & Remove Outfits</h2>
          <p className="text-gray-600 text-lg text-center">Easily add, remove, and organize your closet to reflect your evolving style.</p>
        </div>
        <div className="bg-white/80 rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col items-center">
          <span className="text-3xl mb-2">📱</span>
          <h2 className="text-2xl font-bold mb-2 font-serif text-[#7b4ae2]">Modern, Mobile-Friendly Design</h2>
          <p className="text-gray-600 text-lg text-center">Enjoy a seamless, beautiful experience on any device—your stylist is always with you.</p>
        </div>
      </section>
    </main>
  );
}
