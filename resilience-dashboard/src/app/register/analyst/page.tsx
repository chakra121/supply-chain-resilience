"use client";

import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Card,
  CardBody,
} from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { getExecutives, registerAnalyst } from "@/lib/api";
import { useRouter } from "next/navigation";
import SoftAurora from '@/components/SoftAurora';

export default function AnalystRegister() {
  const { registerWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [executives, setExecutives] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    name: "",
    email: "",
    password: "",
    executive_email: "",
  });

  useEffect(() => {
    getExecutives().then((res) => setExecutives(res.data));
  }, []);

  const handleRegister = async () => {
    try {
      await registerWithEmail(form.email, form.password);
      const exec = executives.find((e) => e.email === form.executive_email);

      await registerAnalyst({
        name: form.name,
        email: form.email,
        executive_email: form.executive_email,
        company_name: exec.company_name,
      });

      alert("Analyst Registered");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  const handleGoogle = async () => {
    await loginWithGoogle();
    router.push("/complete-profile?role=analyst");
  };

  return (
    // 🛠️ Wrapper to handle the full-screen layout
    <main className="relative min-h-screen w-full flex items-center bg-black justify-center p-4">
      
      {/* 🌊 Background Layer: Fixed and behind everything */}
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

      {/* 💳 Foreground Layer: Your Card */}
      <Card className="w-full max-w-md shadow-xl z-13 backdrop-blur-sm bg-white/90">
        <CardBody className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Analyst Signup</h2>
            <p className="text-gray-500 mt-2">Join your organization's supply chain team</p>
          </div>

          <div className="space-y-4">
            <Input
              label="Name"
              variant="bordered"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              label="Email"
              variant="bordered"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              type="password"
              label="Password"
              variant="bordered"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <Select
              label="Select Executive"
              variant="bordered"
              className="text-black"
              selectedKeys={form.executive_email ? new Set([form.executive_email]) : new Set()}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setForm((prev: any) => ({
                  ...prev,
                  executive_email: selected,
                }));
              }}
            >
              {executives.map((e) => (
                <SelectItem key={e.email} textValue={e.name} className="text-black">
                  {e.name} ({e.company_name})
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <Button color="primary" size="lg" onPress={handleRegister} className="font-semibold">
              Create Account
            </Button>

            <div className="flex items-center my-2">
              <div className="grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-400 text-sm">OR</span>
              <div className="grow border-t border-gray-300"></div>
            </div>

            <Button variant="ghost" size="lg" onPress={handleGoogle} className="font-medium">
              Sign up with Google
            </Button>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}