"use client";

import React, { useState, useRef, useEffect } from "react";
import FashionOutfitCard from "./FashionOutfitCard";

const PRESET_PROMPTS = [
  "Minimalist brunch",
  "Timeless interview",
  "Old money summer garden"
];

const MOCK_OUTFITS = [
  {
    keywords: ["minimal", "minimalist", "simple", "clean"],
    outfit: {
      title: "Minimalist Brunch",
      top: "White linen button-down shirt",
      bottom: "Tailored beige trousers",
      shoes: "Leather loafers",
      accessories: "Gold watch, slim leather belt",
      tip: "Stick to neutral tones and classic cuts."
    }
  },
  {
    keywords: ["timeless", "interview", "classic", "work"],
    outfit: {
      title: "Timeless Interview",
      top: "Navy wool blazer",
      bottom: "Crisp white shirt, charcoal slacks",
      shoes: "Black cap-toe oxfords",
      accessories: "Pearl studs, leather portfolio",
      tip: "Opt for quality fabrics and subtle details."
    }
  },
  {
    keywords: ["old money", "garden", "summer", "heritage"],
    outfit: {
      title: "Old Money Garden Party",
      top: "Cream cashmere sweater draped over shoulders",
      bottom: "Pleated midi skirt",
      shoes: "Espadrille wedges",
      accessories: "Silk scarf, vintage sunglasses",
      tip: "Mix heirloom pieces with modern basics."
    }
  },
  // New hardcoded suggestions
  {
    keywords: ["date", "night", "romantic", "dinner"],
    outfit: {
      title: "Romantic Date Night",
      top: "Red silk wrap blouse",
      bottom: "Black high-waisted pencil skirt",
      shoes: "Strappy stiletto heels",
      accessories: "Diamond studs, clutch bag",
      tip: "A pop of red always makes a statement."
    }
  },
  {
    keywords: ["street", "casual", "urban", "cool"],
    outfit: {
      title: "Urban Street Style",
      top: "Oversized graphic hoodie",
      bottom: "Distressed denim jeans",
      shoes: "Chunky white sneakers",
      accessories: "Bucket hat, crossbody bag",
      tip: "Layer for both comfort and edge."
    }
  },
  {
    keywords: ["beach", "vacation", "resort", "tropical"],
    outfit: {
      title: "Tropical Beach Day",
      top: "Flowy floral kimono",
      bottom: "High-waisted bikini bottoms",
      shoes: "Slide sandals",
      accessories: "Wide-brim hat, shell necklace",
      tip: "Go for breezy fabrics and bold prints."
    }
  },
  {
    keywords: ["winter", "cozy", "chic", "cold"],
    outfit: {
      title: "Cozy Winter Chic",
      top: "Chunky knit turtleneck sweater",
      bottom: "Wool plaid trousers",
      shoes: "Knee-high suede boots",
      accessories: "Beret, oversized scarf",
      tip: "Mix textures for warmth and style."
    }
  },
  {
    keywords: ["festival", "music", "boho", "outdoor"],
    outfit: {
      title: "Boho Festival Vibes",
      top: "Crochet crop top",
      bottom: "Fringed denim shorts",
      shoes: "Ankle boots",
      accessories: "Layered necklaces, round sunglasses",
      tip: "Embrace playful accessories and patterns."
    }
  },
  {
    keywords: ["athleisure", "sporty", "gym", "active"],
    outfit: {
      title: "Sporty Athleisure",
      top: "Moisture-wicking tank top",
      bottom: "High-rise leggings",
      shoes: "Running trainers",
      accessories: "Fitness tracker, baseball cap",
      tip: "Function meets fashion for on-the-go days."
    }
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getMockOutfit(prompt: string) {
  const lower = prompt.toLowerCase();
  for (const entry of MOCK_OUTFITS) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.outfit;
    }
  }
  // Default fallback
  return {
    title: "Everyday Style",
    top: "Graphic tee",
    bottom: "Relaxed jeans",
    shoes: "White sneakers",
    accessories: "Tote bag, sunglasses",
    tip: "Confidence is your best accessory!"
  };
}

interface FashionRecsProps {
  showCloset: boolean;
  setShowCloset: (show: boolean) => void;
}

export default function FashionRecs({ showCloset, setShowCloset }: FashionRecsProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [closet, setCloset] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load closet from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("dreamCloset");
    if (stored) setCloset(JSON.parse(stored));
  }, []);

  // Save closet to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dreamCloset", JSON.stringify(closet));
  }, [closet]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handlePreset = (preset: string) => {
    setPrompt(preset);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setPrompt("");
    setResults([]);
    setError(null);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setError(null);
    setTimeout(() => {
      try {
        // Shuffle and pick 5 unique outfits
        const recs = shuffleArray(MOCK_OUTFITS).slice(0, 5).map((entry) => entry.outfit);
        setResults(recs);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }, 600); // Simulate loading
  };

  const handleAddToCloset = () => {
    if (results.length > 0) {
      setCloset((prev) => [...prev, results[0]]);
      setResults((prev) => prev.slice(1));
    }
  };

  const handleSkip = () => {
    if (results.length > 0) {
      setResults((prev) => prev.slice(1));
    }
  };

  const handleRemoveFromCloset = (idx: number) => {
    setCloset((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="fashion-container">
      <div className="fashion-prompt-section flex flex-col items-center justify-center py-10 px-4 w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            ref={inputRef}
            type="text"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Describe your occasion or style..."
            className="fashion-input flex-1 px-5 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7b4ae2] text-lg bg-white placeholder-gray-400 transition"
          />
          <button
            type="submit"
            className="fashion-btn fashion-btn-primary px-6 py-3 rounded-lg bg-[#7b4ae2] text-white font-semibold shadow hover:bg-[#5a2bb7] transition text-lg"
            disabled={loading}
          >
            Get Rec
          </button>
        </form>
        <div className="fashion-preset-btns flex flex-wrap gap-3 justify-center w-full">
          {PRESET_PROMPTS.map((preset) => (
            <button
              key={preset}
              className="fashion-btn fashion-btn-preset px-4 py-2 rounded bg-[#ede6fa] text-[#7b4ae2] font-medium hover:bg-[#e3d6fa] transition shadow-sm"
              onClick={() => handlePreset(preset)}
              disabled={loading}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
      <div className="fashion-main-card flex flex-col items-center min-h-[300px]">
        {loading && (
          <div className="fashion-loading">Finding your look...</div>
        )}
        {error && (
          <div className="fashion-error">{error}</div>
        )}
        {!loading && !error && results.length > 0 && (
          <FashionOutfitCard
            title={results[0].title}
            top={results[0].top}
            bottom={results[0].bottom}
            shoes={results[0].shoes}
            accessories={results[0].accessories}
            quote={results[0].tip}
          >
            <button className="fashion-btn fashion-btn-primary" onClick={handleAddToCloset}>Add to My Closet</button>
            <button className="fashion-btn fashion-btn-secondary" onClick={handleSkip}>Skip</button>
          </FashionOutfitCard>
        )}
        {!loading && !error && results.length === 0 && prompt && (
          <div className="text-gray-400 text-lg mt-8">No more recommendations. Try a new prompt!</div>
        )}
      </div>
      {showCloset && (
        <div className="fashion-modal-overlay">
          <div className="fashion-modal">
            <button className="fashion-modal-close" onClick={() => setShowCloset(false)} aria-label="Close closet">×</button>
            <h3 className="fashion-modal-title">Your Dream Closet</h3>
            {closet.length === 0 ? (
              <div className="fashion-modal-empty">No outfits saved yet. Add some looks!</div>
            ) : (
              <div className="fashion-modal-list">
                {closet.map((outfit, idx) => (
                  <div key={idx} className="fashion-modal-card">
                    <button className="fashion-modal-remove" onClick={() => handleRemoveFromCloset(idx)} aria-label="Remove outfit">×</button>
                    <h4 className="fashion-modal-card-title">{outfit.title}</h4>
                    <div className="fashion-modal-card-detail"><b>Top:</b> {outfit.top}</div>
                    <div className="fashion-modal-card-detail"><b>Bottom:</b> {outfit.bottom}</div>
                    <div className="fashion-modal-card-detail"><b>Shoes:</b> {outfit.shoes}</div>
                    <div className="fashion-modal-card-detail"><b>Accessories:</b> {outfit.accessories}</div>
                    <div className="fashion-modal-card-tip"><b>Tip:</b> {outfit.tip}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 