"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { Agent, isCallCompleted } from "@/utils/utils";

interface DashboardBodyProps {
  agents: Agent[];
}

export function DashboardBody({ agents }: DashboardBodyProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNewCallClick = () => {
    setLoading(true);
    router.push("/user/schedule-new-call");
  };

  const handleCallAnalyticsClick = (id: string) => {
    router.push("/user/analytics/" + id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        onClick={handleNewCallClick}
        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px]">
          {loading ? (
            <Loader2 className="w-12 h-12 text-gray-400 animate-spin mb-2" />
          ) : (
            <Plus className="w-12 h-12 text-gray-400 mb-2" />
          )}
          <p className="text-lg font-medium">
            {loading ? "Loading..." : "Set New Call"}
          </p>
        </CardContent>
      </Card>

      {agents.map((agent) => (
        <Card
          key={agent.id}
          onClick={() => handleCallAnalyticsClick(agent.id)}
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <CardHeader>
            <CardTitle>{agent.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-gray-600 dark:text-gray-300">
            <p className="text-sm">📞 Caller: {agent.caller_name}</p>
            <p className="text-sm">
              📅 Created: {new Date(agent.created_at).toLocaleDateString()}
            </p>
            <p className="text-sm">🔊 Voice: {agent.voice}</p>
            <p className="text-sm line-clamp-2">
              📖 Context: {agent.situation}
            </p>
            <p className="text-sm">📅 Schedule: {agent.schedule}</p>
            <p className="text-sm">🔁 Repeats: {agent.repeatitions}</p>
            <p className="text-sm">
              🧑‍🤝‍🧑 Patient Relation: {agent.relation_to_patient}
            </p>
            <p className="text-sm">📞 Call Number: {agent.call_number}</p>
            <p className="text-sm">
              ✅ Completed: {isCallCompleted(agent) ? "Yes" : "In Process"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
