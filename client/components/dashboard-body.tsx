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

const moodEmojis: { [key: string]: string } = {
  angry: "😠",
  happy: "😊",
  sad: "😢",
  // Add more moods and emojis as needed
};

export function DashboardBody({ agents }: DashboardBodyProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px]">
          <Plus className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-lg font-medium">Something Happened!</p>
        </CardContent>
      </Card>
      {agents.map((agent) => (
        <Card
          key={agent.id}
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <CardHeader>
            <CardTitle>
              {agent.title} {moodEmojis[agent.talk_mood] || "🤔"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Caller Name : {agent.person_name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Created on: {agent.created_on}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Language: {agent.language}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Voice: {agent.voice}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {agent.situation}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
