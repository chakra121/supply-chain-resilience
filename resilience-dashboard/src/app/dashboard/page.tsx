"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardRouter() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;

    const { user, profile, loading } = auth;

    if (loading) return;

    // ❌ Not logged in
    if (!user) {
      router.push("/login");
      return;
    }

    // ✅ Role-based routing
    if (profile && profile.role === "executive") {
      router.push("/dashboard/executive");
    } else {
      router.push("/dashboard/analyst");
    }
  }, [auth, router]);

  return <p className="p-6">Redirecting...</p>;
}