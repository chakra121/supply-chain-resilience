"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
  Chip,
} from "@heroui/react";
import { useAuth } from "@/context/AuthContext";

export default function TopBar() {
  const { profile, logout } = useAuth();

  const role = profile?.role || "user";

  return (
    <Navbar className="bg-white shadow-sm border-b px-6">
      {/* 🔥 LEFT SIDE */}
      <NavbarBrand className="flex flex-col items-start">
        <p className="font-bold text-lg text-blue-600">
          {profile?.company_name || "Company"}
        </p>

        <p className="text-xs text-gray-500">
          {role === "executive" ? "Executive Dashboard" : "Analyst Dashboard"}
        </p>
      </NavbarBrand>

      {/* 🔥 RIGHT SIDE */}
      <NavbarContent justify="end" className="flex items-center gap-4">
        {/* ROLE BADGE */}
        <Chip
          color={role === "executive" ? "primary" : "secondary"}
          variant="flat"
          className="capitalize"
        >
          {role}
        </Chip>

        {/* LOGOUT */}
        <Button color="danger" variant="flat" onClick={logout}>
          Logout
        </Button>
      </NavbarContent>
    </Navbar>
  );
}