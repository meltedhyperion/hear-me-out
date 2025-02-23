import { DashboardBody } from "@/components/dashboard-body";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return redirect("/sign-in");
  }

  const { data: conversations, error: conversationsError } = await supabase
    .from("conversations_test")
    .select("*")
    .ilike("email", user.email || "");

  if (conversationsError) {
    console.error("Error fetching conversations:", conversationsError.message);
  }
  const mockAgents = [
    {
      id: "1",
      title: "A memory lane to our trip to Kerela",
      caller_name: "Munni",
      relation_to_patient: "Daugther",
      created_on: "19-02-2023",
      situation:
        "I am calling my mother to remind her about our trip to Kerela. We went in the year 2009. We did horseback Riding, visited the tea gardens, and had a lot of fun. We stayed at a resort. Aryan and Aadi played and enjoyed a lot. Pooja got bit by a snake and had to rush to hospital",
      voice: "Munni",
      call_number: "+918294107355",
      isCompleted: false,
      questionaires: [
        {
          question: "We went to which place in Kerela?",
          answer: "Tea Gardens",
        },
        {
          question: "Who got bit by a snake?",
          answer: "Pooja",
        },
      ],
      repeat: "30min",
      times: 5,
    },
    {
      id: "2",
      title: "Puri Trip",
      person_name: "Neelu",
      created_on: "19-02-2023",
      situation:
        "I am calling my mother to talk about out Puri Trip. We went in the year 2007. We went to the beach. Aadi and Aryan played with the sand and water. Pooja was scared of the water. We visited the Jagannath Temple. We had a lot of fun. We ate a lot of food. We stayed at a hotel. We ent to market and get a wall hanging of Sri Krishna which my mother hung on her wall.",
      voice: "Jane",
    },
    {
      id: "3",
      title: "Pooja's Wedding Story",
      person_name: "Pooja",
      created_on: "19-02-2023",
      talk_mood: "sad",
      situation:
        "I am calling my grandmother to remind her of my wedding event. We had the wedding last Decemeber on 9th. We had the wedding at Vrindavan. We stayed in a resort. I married Dikshant. Gopal Uncle also came. We had a full floor to ourselves. I wore a red lehenga. The Jaimala event was grandoise. ",
      voice: "Random",
    },
  ];

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h1 className="text-3xl font-bold mb-6">Patient Scheduled Calls</h1>
      <DashboardBody agents={conversations?.length ? conversations : []} />
    </div>
  );
}
