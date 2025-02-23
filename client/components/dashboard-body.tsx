"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Agent {
  id: string;
  title: string;
  person_name: string;
  created_on: string;
  talk_mood: string;
  situation: string;
  language: string;
  voice: string;
}

interface DashboardBodyProps {
  agents: Agent[];
}

export function DashboardBody({ agents }: DashboardBodyProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        onClick={() => router.push("/protected/schedule-new-call")}
        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px]">
          <Plus className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-lg font-medium">Set New Call</p>
        </CardContent>
      </Card>

      {agents.map((agent) => (
        <Card
          key={agent.id}
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <CardHeader>
            <CardTitle>{agent.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-gray-600 dark:text-gray-300">
            <p className="text-sm">📞 Caller: {agent.person_name}</p>
            <p className="text-sm">📅 Created: {agent.created_on}</p>
            <p className="text-sm">🔊 Voice: {agent.voice}</p>
            <p className="text-sm line-clamp-2">📖 {agent.situation}</p>
            <p className="text-sm">🔁 Repeats: {agent.talk_mood}</p>
            <p className="text-sm">✅ Completed: No</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
