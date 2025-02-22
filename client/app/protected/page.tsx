import { DashboardBody } from "@/components/dashboard-body";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const mockAgents = [
    {
      id: "1",
      title: "Boss yelled at me last night",
      person_name: "Henry",
      created_on: "19-02-2023",
      talk_mood: "angry",
      situation:
        "I was yelled at by my boss last night and I feel really bad about it. I want to releave my frustation on him that he cannot just yell at me because he was having a bad day and i am his junior.",
      language: "English",
      voice: "Henry",
    },
    {
      id: "2",
      title: "Confession to my crush",
      person_name: "Jane",
      created_on: "19-02-2023",
      talk_mood: "happy",
      situation:
        "I have a crush on Jane who has been my friend since childhood",
      language: "Hindi",
      voice: "Jane",
    },

    {
      id: "3",
      title: "I am feeling lonely",
      person_name: "John",
      created_on: "19-02-2023",
      talk_mood: "sad",
      situation:
        "I am feeling lonely and I need someone to talk to and understand my point of view",
      language: "English",
      voice: "Random",
    },
  ];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const conversations = await supabase.from("conversations").select("*");
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h1 className="text-3xl font-bold mb-6">My Perfect World</h1>
      {JSON.stringify(user)}
      <DashboardBody agents={mockAgents} />
    </div>
  );
}
