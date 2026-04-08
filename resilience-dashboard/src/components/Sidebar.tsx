"use client";

import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { profile } = useAuth();

  return (
    <div className="w-64 bg-black text-white p-4">
      <h2 className="text-xl font-bold">{profile?.company_name}</h2>
    </div>
  );
}