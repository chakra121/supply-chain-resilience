"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white">
      <Navbar />
      <Hero />
    </div>
  );
}