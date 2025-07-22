// Imports
import React, { useState, useRef } from 'react';

const PRESET_PROMPTS = [
  'Date night outfit',
  'Travel day comfort',
  'Fall layers for campus'
];

const MOCK_OUTFITS = [
  {
    keywords: ["date"],
    outfit: {
      title: "Date Night Chic",
      top: "Silk blouse",
      bottom: "Black midi skirt",
      shoes: "Strappy heels",
      accessories: "Gold hoop earrings, clutch bag",
      tip: "Add a bold lip for extra confidence."
    }
  },
  {
    keywords: ["travel", "airport"],
    outfit: {
      title: "Travel Day Comfort",
      top: "Oversized hoodie",
      bottom: "Soft joggers",
      shoes: "Slip-on sneakers",
      accessories: "Backpack, sleep mask",
      tip: "Layer up for changing temps."
    }
  },
  {
    keywords: ["fall", "campus", "school"],
    outfit: {
      title: "Fall Campus Look",
      top: "Corduroy shacket",
      bottom: "High-waist jeans",
      shoes: "Platform boots",
      accessories: "Crossbody bag, knit beanie",
      tip: "Stick with earth tones for seasonal style."
    }
  },
  {
    keywords: ["interview", "work", "office"],
    outfit: {
      title: "Interview Ready",
      top: "Tailored blazer",
      bottom: "Slim-fit trousers",
      shoes: "Loafers",
      accessories: "Leather tote, watch",
      tip: "Keep it classic and comfortable."
    }
  },
  {
    keywords: ["rain", "rainy"],
    outfit: {
      title: "Rainy Day Casual",
      top: "Waterproof trench coat",
      bottom: "Dark skinny jeans",
      shoes: "Chelsea rain boots",
      accessories: "Umbrella, bucket hat",
      tip: "Choose quick-dry fabrics."
    }
  }
];

function getMockOutfit(prompt) {
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

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handlePreset = (preset) => {
    setPrompt(preset);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setPrompt('');
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    setTimeout(() => {
      try {
        const outfit = getMockOutfit(prompt);
        setResult(outfit);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    }, 600); // Simulate loading
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const renderResultCard = () => {
    if (loading) {
      return <div className="card loading">Loading outfit suggestion...</div>;
    }
    if (error) {
      return <div className="card error">{error}</div>;
    }
    if (result) {
      return (
        <div className="card result">
          <h2>{result.title}</h2>
          <p><b>Top:</b> {result.top}</p>
          <p><b>Bottom:</b> {result.bottom}</p>
          <p><b>Shoes:</b> {result.shoes}</p>
          <p><b>Accessories:</b> {result.accessories}</p>
          <p><i>{result.tip}</i></p>
        </div>
      );
    }
    return <div className="card placeholder">Enter a fashion prompt to get started!</div>;
  };

  return (
    <div className="app-container">
      <h1>Fashion AI Outfit Recommender</h1>
      <form onSubmit={handleSubmit} className="prompt-form">
        <input
          ref={inputRef}
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="e.g. Interview outfit in winter"
          className="prompt-input"
          aria-label="Fashion prompt input"
          autoFocus
        />
        <button
          type="submit"
          className="submit-btn"
          disabled={loading || !prompt.trim()}
          aria-label="Get outfit recommendation"
        >
          Get Outfit
        </button>
        <button
          type="button"
          className="clear-btn"
          onClick={handleClear}
          disabled={loading && !prompt && !result && !error}
          aria-label="Clear prompt and result"
        >
          ✖️
        </button>
      </form>
      <div className="preset-buttons">
        {PRESET_PROMPTS.map((preset) => (
          <button
            key={preset}
            type="button"
            className="preset-btn"
            onClick={() => handlePreset(preset)}
            disabled={loading}
            aria-label={`Use preset: ${preset}`}
          >
            {preset}
          </button>
        ))}
      </div>
      <div className="result-section">
        {renderResultCard()}
      </div>
    </div>
  );
}

// Explanation: This adds accessibility, autoFocus, and a clear button. Next: App.css polish.

export default App; 