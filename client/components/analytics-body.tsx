"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Function to determine condition based on chart data
const determineCondition = (data) => {
  const trend = data[data.length - 1].correctAnswers - data[0].correctAnswers;
  if (trend > 0) return "Good";
  if (trend < 0) return "Deteriorating";
  return "Stable";
};

interface AnalyticsBodyProps {
  agent: any;
  chartData: any[];
}

export function AnalyticsBody({ agent, chartData }: AnalyticsBodyProps) {
  const [condition, setCondition] = useState("Loading...");

  useEffect(() => {
    setCondition(determineCondition(chartData));
  }, [chartData]);

  return (
    <div className="container mx-auto py-8">
      <Button className="mb-4" onClick={() => window.history.back()}>
        Back to Dashboard
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{agent.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Caller:</strong> {agent.caller_name} (
            {agent.relation_to_patient})
          </p>
          <p>
            <strong>Created on:</strong>{" "}
            {new Date(agent.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Voice:</strong> {agent.voice}
          </p>
          <p>
            <strong>Call Number:</strong> {agent.call_number}
          </p>
          <p>
            <strong>Repeat Interval:</strong> {agent.schedule}
          </p>
          <p>
            <strong>Number of Repeats:</strong> {agent.repeatitions}
          </p>
          <p>
            <strong>Context:</strong> {agent.situation}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {agent.isCompleted ? "Completed" : "In Progress"}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Answer Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="slot" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="correctAnswers"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patient Condition</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {condition === "Good" && "🟢 "}
            {condition === "Stable" && "🟠 "}
            {condition === "Deteriorating" && "🔴 "}
            {condition}
          </p>
          <p>
            Based on the number of correct answers over time, the patient's
            condition appears to be {condition.toLowerCase()}.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
