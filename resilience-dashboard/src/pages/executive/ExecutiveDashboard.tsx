import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExecutiveDashboard() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Executive Dashboard</CardTitle>
        </CardHeader>
        <CardContent>High-level insights, KPIs, alerts, decisions.</CardContent>
      </Card>
    </div>
  );
}
