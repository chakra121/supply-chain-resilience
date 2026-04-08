"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
} from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { registerExecutive } from "@/lib/api";
import { useRouter } from "next/navigation";
import SoftAurora from '@/components/SoftAurora';

export default function ExecutiveRegister() {
  const { registerWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company_name: "",
  });

  const handleRegister = async () => {
    try {
      await registerWithEmail(form.email, form.password);
      await registerExecutive({
        name: form.name,
        email: form.email,
        company_name: form.company_name,
      });

      alert("Executive Registered");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  const handleGoogle = async () => {
    await loginWithGoogle();
    router.push("/complete-profile?role=executive");
  };

  return (
    <main className="relative min-h-screen w-full flex items-center bg-black justify-center p-4">
      
      {/* 🌊 Background Layer */}
      <div className="fixed inset-0 z-10">
        <SoftAurora
          speed={1.1}
          scale={1.5}
          brightness={1}
          color1="#f7f7f7"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>

      {/* 💳 Executive Card with Glassmorphism */}
      <Card className="w-full max-w-md shadow-2xl z-13 backdrop-blur-md bg-white/90 border border-white/20">
        <CardBody className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Executive Signup</h2>
            <p className="text-gray-500 mt-2">Create your organization account</p>
          </div>

          <div className="space-y-4">
            <Input 
              label="Full Name" 
              variant="bordered"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input 
              label="Business Email" 
              variant="bordered"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input 
              type="password" 
              label="Password" 
              variant="bordered"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Input 
              label="Company Name" 
              variant="bordered"
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              color="primary" 
              size="lg" 
              className="font-bold shadow-lg"
              onPress={handleRegister}
            >
              Register Organization
            </Button>

            <div className="flex items-center my-2">
              <div className="grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-400 text-xs font-medium uppercase">Or continue with</span>
              <div className="grow border-t border-gray-300"></div>
            </div>

            <Button 
              variant="ghost" 
              size="lg" 
              onPress={handleGoogle}
              className="hover:bg-gray-100"
            >
              Sign up with Google
            </Button>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}