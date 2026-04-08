// app/complete-profile/page.tsx
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
import {
  registerExecutive,
  registerAnalyst,
  getExecutives,
} from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

export default function CompleteProfile() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const roleParam = params.get("role"); // optional

  const [role, setRole] = useState(roleParam || "analyst");
  const [executives, setExecutives] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    name: "",
    company_name: "",
    executive_email: "",
  });

  useEffect(() => {
    if (role === "analyst") {
      getExecutives().then((res) => setExecutives(res.data));
    }
  }, [role]);

  const handleSubmit = async () => {
  try {
    if (role === "executive") {
      await registerExecutive({
        name: form.name,
        email: user.email,
        company_name: form.company_name,
      });
    } else {
      const exec = executives.find(
        (e) => e.email === form.executive_email
      );

      await registerAnalyst({
        name: form.name,
        email: user.email,
        executive_email: form.executive_email,
        company_name: exec.company_name,
      });
    }

    // 🔥 IMPORTANT FIX
    window.location.href = "/dashboard";

  } catch (err) {
    console.error(err);
    alert("Failed to complete profile");
  }
};

  return (
    <Card className="max-w-md mx-auto mt-20">
      <CardBody className="space-y-4">
        <h2 className="text-xl font-semibold">
          Complete Your Profile
        </h2>

        {/* ROLE SELECT */}
        <Select
          label="Select Role"
          selectedKeys={[role]}
          onSelectionChange={(keys) =>
            setRole(Array.from(keys)[0] as string)
          }
        >
          <SelectItem key="executive">Executive</SelectItem>
          <SelectItem key="analyst">Analyst</SelectItem>
        </Select>

        {/* NAME */}
        <Input
          label="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* EXECUTIVE FIELDS */}
        {role === "executive" && (
          <Input
            label="Company Name"
            onChange={(e) =>
              setForm({ ...form, company_name: e.target.value })
            }
          />
        )}

        {/* ANALYST FIELDS */}
        {role === "analyst" && (
          <Select
            label="Select Executive"
            onChange={(e) =>
              setForm({
                ...form,
                executive_email: e.target.value,
              })
            }
          >
            {executives.map((e) => (
              <SelectItem key={e.email}>
                {e.name} ({e.company_name})
              </SelectItem>
            ))}
          </Select>
        )}

        <Button onPress={handleSubmit}>
          Save Profile
        </Button>
      </CardBody>
    </Card>
  );
}