"use client";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gray-200 rounded-b-2xl backdrop-blur-md shadow-sm">

      <h1
        className="text-xl md:text-2xl font-bold text-blue-500 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Supply Chain Resilience System
      </h1>

      {/* 🔥 RIGHT: ACTIONS */}
      <div className="flex gap-3 items-center">
        {/* LOGIN */}
        <Button
          variant="bordered"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>

        {/* REGISTER DROPDOWN */}
        <Dropdown>
          <DropdownTrigger>
            <Button color="primary">Register</Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Register Options">
            <DropdownItem
              key="executive"
              onClick={() => router.push("/register/executive")}
            >
              Register as Executive
            </DropdownItem>

            <DropdownItem
              key="analyst"
              onClick={() => router.push("/register/analyst")}
            >
              Register as Analyst
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}