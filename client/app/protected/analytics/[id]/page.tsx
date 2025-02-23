"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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

const mockAgent = {
  id: "1",
  title: "A memory lane to our trip to Kerala",
  caller_name: "Munni",
  relation_to_patient: "Daughter",
  created_on: "2023-02-19T00:00:00Z",
  situation: "I am calling my mother to remind her about our trip to Kerala...",
  voice: "Munni",
  call_number: "+918294107355",
  isCompleted: false,
  repeat: "30min",
  times: 5,
};

const mockChartData = [
  { slot: 1, correctAnswers: 3 },
  { slot: 2, correctAnswers: 4 },
  { slot: 3, correctAnswers: 2 },
  { slot: 4, correctAnswers: 5 },
  { slot: 5, correctAnswers: 4 },
];

const determineCondition = (data) => {
  const trend = data[data.length - 1].correctAnswers - data[0].correctAnswers;
  if (trend > 0) return "Improving";
  if (trend < 0) return "Deteriorating";
  return "Stable";
};

export default function AgentAnalyticsPage() {
  const router = useRouter();
  const params = useParams();
  const [agent, setAgent] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [condition, setCondition] = useState("Loading...");

  useEffect(() => {
    if (params?.id) {
      setAgent(mockAgent);
      setChartData(mockChartData);
      setCondition(determineCondition(mockChartData));
    }
  }, [params]);

  return (
    <div className="container mx-auto py-8">
      <Button onClick={() => router.push("/protected")} className="mb-4">
        Back to Dashboard
      </Button>

      {agent ? (
        <>
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
                {new Date(agent.created_on).toLocaleDateString()}
              </p>
              <p>
                <strong>Voice:</strong> {agent.voice}
              </p>
              <p>
                <strong>Call Number:</strong> {agent.call_number}
              </p>
              <p>
                <strong>Repeat Interval:</strong> {agent.repeat}
              </p>
              <p>
                <strong>Number of Repeats:</strong> {agent.times}
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
                <ResponsiveContainer
                  width="100%"
                  height={300}
                  className="min-w-[250px]"
                >
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
                {condition === "Improving" && "🟢 "}
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
        </>
      ) : (
        <p>Loading agent data...</p>
      )}
    </div>
  );
}
