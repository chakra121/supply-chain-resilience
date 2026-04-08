"use client";

import { useEffect, useState } from "react";
import { getAnalysts, getPredictionsByAnalyst } from "@/lib/api";
import { Select, SelectItem, Card, CardBody } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import PredictionResults from "@/components/PredictionResults";
import MarkdownViewer from "@/components/MarkdownViewer";
import Charts from "@/components/Charts";
import TopBar from "@/components/TopBar";

interface Analyst {
  email: string;
  name: string;
}

interface Prediction {
  _id: string;
  title: string;
  description: string;
  output: {
    executive_summary?: string;
    [key: string]: unknown;
  };
}

export default function ExecutiveDashboard() {
  const { profile, user, loading } = useAuth();
  const router = useRouter();

  const [analysts, setAnalysts] = useState<Analyst[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedPrediction, setSelectedPrediction] =
    useState<Prediction | null>(null);

  // 🔐 Auth
  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else if (profile?.role !== "executive") router.push("/dashboard");
    }
  }, [user, profile, loading, router]);

  // 👤 Fetch analysts
  useEffect(() => {
    const fetchAnalysts = async () => {
      if (!profile?.email) return;
      const res = await getAnalysts(profile.email);
      setAnalysts(res.data);
    };
    fetchAnalysts();
  }, [profile]);

  // 📄 Fetch predictions
  const handleAnalystChange = async (email: string) => {
    const res = await getPredictionsByAnalyst(email);
    setPredictions(res.data.data);
    setSelectedPrediction(null);
  };

  // 📊 Select prediction
  const handlePredictionChange = (id: string) => {
    const selected = predictions.find((p) => p._id === id);
    setSelectedPrediction(selected ?? null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔥 TOP BAR */}
      <TopBar />

      <div className="p-6 space-y-6">
        {/* FILTER SECTION */}
        <Card className="shadow-md">
          <CardBody className="grid md:grid-cols-2 gap-4">
            <Select
              label="Select Analyst"
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];
                handleAnalystChange(selected as string);
              }}
            >
              {analysts.map((a) => (
                <SelectItem key={a.email}>{a.name}</SelectItem>
              ))}
            </Select>

            <Select
              label="Select Prediction"
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];
                handlePredictionChange(selected as string);
              }}
            >
              {predictions.map((p) => (
                <SelectItem key={p._id}>{p.title}</SelectItem>
              ))}
            </Select>
          </CardBody>
        </Card>

        {/* CONTENT */}
        {selectedPrediction && (
          <>
            {/* TITLE */}
            <Card className="shadow-md">
              <CardBody>
                <h2 className="text-2xl font-bold">
                  {selectedPrediction.title}
                </h2>
                <p className="text-gray-500">
                  {selectedPrediction.description}
                </p>
              </CardBody>
            </Card>

            {/* KPI */}
            <PredictionResults data={selectedPrediction.output} />

            {/* CHARTS */}
            <Charts data={selectedPrediction.output} />

            {/* SUMMARY */}
            <Card className="shadow-md">
              <CardBody>
                <h3 className="text-lg font-semibold mb-3">
                  Executive Summary
                </h3>
                <MarkdownViewer
                  content={selectedPrediction.output?.executive_summary}
                />
              </CardBody>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}