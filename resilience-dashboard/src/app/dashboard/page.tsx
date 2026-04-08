"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardRouter() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // ❌ Not logged in
    if (!user) {
      router.push("/login");
      return;
    }


    // ✅ Role-based routing
    if (profile.role === "executive") {
      router.push("/dashboard/executive");
    } else {
      router.push("/dashboard/analyst");
    }

  }, [user, profile, loading]);

  return <p className="p-6">Redirecting...</p>;
}