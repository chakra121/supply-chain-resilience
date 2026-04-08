"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardBody } from "@heroui/react";

interface ChartData {
  forecasted_total_demand?: number;
  required_stock?: number;
  recommended_order_quantity?: number;
  delay_probability?: number;
  resilience_score?: number;
  safety_stock?: number;
}

export default function Charts({ data }: { data: ChartData | null }) {
  if (!data) return null;

  // 📊 Bar Chart Data
  const barData = [
    {
      name: "Demand",
      value: data?.forecasted_total_demand || 0,
    },
    {
      name: "Required",
      value: data?.required_stock || 0,
    },
    {
      name: "Order",
      value: data?.recommended_order_quantity || 0,
    },
  ];

  // ⚠️ Risk Chart
  const riskData = [
    {
      name: "Delay Risk",
      value: (data?.delay_probability || 0) * 100,
    },
    {
      name: "Resilience",
      value: data?.resilience_score || 0,
    },
  ];

  // 📦 Pie Chart Data
  const pieData = [
    {
      name: "Safety Stock",
      value: data?.safety_stock || 0,
    },
    {
      name: "Working Stock",
      value: (data?.required_stock || 0) - (data?.safety_stock || 0),
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* 📊 DEMAND VS STOCK */}
      <Card className="shadow-md rounded-xl">
        <CardBody>
          <h3 className="font-semibold mb-3">Demand vs Stock</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      {/* ⚠️ RISK VS RESILIENCE */}
      <Card className="shadow-md rounded-xl">
        <CardBody>
          <h3 className="font-semibold mb-3">Risk vs Resilience</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      {/* 📦 INVENTORY PIE */}
      <Card className="shadow-md rounded-xl md:col-span-2">
        <CardBody>
          <h3 className="font-semibold mb-3">Inventory Composition</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}