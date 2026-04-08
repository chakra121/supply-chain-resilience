"use client";

import { useState, useEffect } from "react";
import { createPrediction } from "@/lib/api";
import PredictionForm from "@/components/PredictionForm";
import PredictionResults from "@/components/PredictionResults";
import Charts from "@/components/Charts";
import MarkdownViewer from "@/components/MarkdownViewer";
import TopBar from "@/components/TopBar";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/react";

interface PredictionData {
  executive_summary?: string;
  [key: string]: unknown;
}

export default function AnalystDashboard() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<PredictionData | null>(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else if (profile?.role !== "analyst") router.push("/dashboard");
    }
  }, [user, profile, loading, router]);

  const handlePredict = async (form: Record<string, unknown>) => {
    try {
      setLoadingPrediction(true);
      const res = await createPrediction(form);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPrediction(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />

      <div className="p-6 space-y-6">
        <Card className="shadow-md rounded-xl">
          <CardBody>
            <h2 className="text-xl font-bold mb-4">Create Prediction</h2>

            <PredictionForm
              onSubmit={handlePredict}
              loading={loadingPrediction}
            />
          </CardBody>
        </Card>

        {data && (
          <>
            <PredictionResults data={data} />

            <Charts data={data} />
            <Card className="shadow-md rounded-xl">
              <CardBody>
                <h3 className="text-lg font-semibold mb-3">
                  Executive Summary
                </h3>

                <MarkdownViewer content={data?.executive_summary} />
              </CardBody>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}