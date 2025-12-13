import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AnalystDashboard() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Analyst Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          Risk analysis, data inputs, charts, predictions.
        </CardContent>
      </Card>
    </div>
  );
}
