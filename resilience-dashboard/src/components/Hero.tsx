"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Silk from './Silk';

export default function Hero() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-6 py-24 min-h-screen overflow-hidden">
      
      <div className="absolute inset-0 z-10">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Smarter Supply Chains with{" "}
          <span className="text-blue-500">AI Intelligence</span>
        </h1>

        <p className="mt-6 text-white max-w-2xl text-lg">
          Predict demand, manage risks, and optimize inventory using
          AI-powered insights. Built for modern enterprises to stay
          resilient in uncertain environments.
        </p>

        <div className="flex gap-4 mt-8">
          <Button
            color="primary"
            size="lg"
            onClick={() => router.push("/register")}
          >
            Get Started
          </Button>

          <Button
            variant="solid"
            size="lg"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}