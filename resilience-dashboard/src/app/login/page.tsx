"use client";

import { useState } from "react";
import { Input, Button, Card, CardBody, Divider } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithEmail(form.email, form.password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    await loginWithGoogle();
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-[400px] shadow-lg border-none bg-content1">
        <CardBody className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
            <p className="text-small text-default-500 text-center">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Email"
              variant="bordered"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Input
              label="Password"
              variant="bordered"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <Button 
              color="primary" 
              variant="solid" 
              fullWidth 
              isLoading={isLoading}
              onPress={handleLogin}
              className="mt-2"
            >
              Sign In
            </Button>
          </div>

          <div className="flex items-center gap-4 py-2">
            <Divider className="flex-1" />
            <p className="text-tiny text-default-400 uppercase">OR</p>
            <Divider className="flex-1" />
          </div>

          <Button 
            variant="bordered" 
            fullWidth 
            onPress={handleGoogle}
          >
            Continue with Google
          </Button>

          <p className="text-center text-small">
            Need an account?{" "}
            <button 
              onClick={() => router.push("/register")}
              className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}