"use client";

import Header from "@/components/Header";
import FashionRecs from "@/components/notes/FashionRecs";
import { useState } from "react";

/**
 * Fashion Recommendations Page
 * Repurposes the notes layout for fashion recs MVP.
 * Shows prompt input, rec card, and Dream Closet modal.
 */
export default function FashionPage() {
  // State for Dream Closet modal
  const [showCloset, setShowCloset] = useState(false);

  return (
    <main className="bg-[#EDEDED] h-screen">
      <Header onDreamClosetClick={() => setShowCloset(true)} />
      <div className="container mx-auto py-8">
        <FashionRecs showCloset={showCloset} setShowCloset={setShowCloset} />
      </div>
    </main>
  );
}
// Explanation: This page now uses FashionRecs instead of Notes, keeping the same layout. The Dream Closet modal is controlled here and passed to FashionRecs. Next: verify UI, then remove unused notes code if desired.
