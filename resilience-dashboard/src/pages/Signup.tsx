import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoleSelector } from "@/components/RoleSelector";

export function Signup() {
  const [role, setRole] = useState("analyst");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" />
          </div>

          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input type="password" />
          </div>

          <RoleSelector value={role} onChange={setRole} />

          <Button className="w-full">
            Sign up as {role === "analyst" ? "Analyst" : "Executive"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
