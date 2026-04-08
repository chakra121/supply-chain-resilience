"use client";

import { Card, CardBody, Progress, Divider } from "@heroui/react";

interface PredictionData {
  delay_probability?: number;
  resilience_score?: number;
  recommended_order_quantity?: number;
  forecasted_total_demand?: number;
  required_stock?: number;
  safety_stock?: number;
  days_to_cover?: number;
}

export default function PredictionResults({
  data,
}: {
  data: PredictionData | null;
}) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md rounded-xl hover:shadow-lg transition">
          <CardBody>
            <p className="text-sm text-gray-500">Delay Probability</p>
            <h2 className="text-3xl font-bold text-red-500">
              {((data?.delay_probability ?? 0) * 100).toFixed(1)}%
            </h2>
          </CardBody>
        </Card>

        <Card className="shadow-md rounded-xl hover:shadow-lg transition">
          <CardBody>
            <p className="text-sm text-gray-500">Resilience Score</p>
            <h2 className="text-3xl font-bold text-green-600">
              {data?.resilience_score
                ? data.resilience_score.toFixed(1)
                : "0.0"}
            </h2>
          </CardBody>
        </Card>

        <Card className="shadow-md rounded-xl hover:shadow-lg transition">
          <CardBody>
            <p className="text-sm text-gray-500">Recommended Order</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {data?.recommended_order_quantity ?? 0}
            </h2>
          </CardBody>
        </Card>
      </div>

      <Card className="shadow-md rounded-xl">
        <CardBody className="space-y-3">
          <h3 className="text-lg font-semibold">Inventory Breakdown</h3>

          <Divider />

          <div className="grid md:grid-cols-2 gap-2 text-gray-700">
            <p>
              Forecasted Demand:{" "}
              <span className="font-semibold">
                {data?.forecasted_total_demand ?? 0}
              </span>
            </p>
            <p>
              Required Stock:{" "}
              <span className="font-semibold">{data?.required_stock ?? 0}</span>
            </p>
            <p>
              Safety Stock:{" "}
              <span className="font-semibold">{data?.safety_stock ?? 0}</span>
            </p>
            <p>
              Days to Cover:{" "}
              <span className="font-semibold">{data?.days_to_cover ?? 0}</span>
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="shadow-md rounded-xl">
        <CardBody className="space-y-4">
          <h3 className="text-lg font-semibold">Risk Indicators</h3>

          <div>
            <p className="text-sm mb-1">Delay Risk</p>
            <Progress
              value={(data?.delay_probability || 0) * 100}
              color="danger"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Resilience Strength</p>
            <Progress value={data?.resilience_score || 0} color="success" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}