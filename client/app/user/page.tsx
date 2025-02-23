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
    .from("patient_schedules")
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
      patient_relation: "Daughter", // Updated field name
      created_on: "19-02-2023",
      situation:
        "I am calling my mother to remind her about our trip to Kerela. We went in the year 2009. We did horseback riding, visited the tea gardens, and had a lot of fun. We stayed at a resort. Aryan and Aadi played and enjoyed a lot. Pooja got bit by a snake and had to rush to the hospital.",
      voice: "Munni",
      call_number: "+918294107355",
      is_completed: false, // Updated field name
      questionnaires: [
        // Fixed typo in field name
        {
          question: "We went to which place in Kerela?",
          answer: "Tea Gardens",
        },
        {
          question: "Who got bit by a snake?",
          answer: "Pooja",
        },
      ],
      schedule: "30min", // Updated field name
      repetitions: 5, // Updated field name
    },
    {
      id: "2",
      title: "Puri Trip",
      caller_name: "Neelu", // Updated field name
      patient_relation: "Mother", // Updated field name
      created_on: "19-02-2023",
      situation:
        "I am calling my mother to talk about our Puri Trip. We went in the year 2007. We went to the beach. Aadi and Aryan played with the sand and water. Pooja was scared of the water. We visited the Jagannath Temple. We had a lot of fun. We ate a lot of food. We stayed at a hotel. We went to the market and got a wall hanging of Sri Krishna which my mother hung on her wall.",
      voice: "Jane",
      call_number: "+918294107356", // Added this for consistency
      is_completed: false, // Added is_completed for consistency
      questionnaires: [],
      schedule: "1hr", // Added mock schedule
      repetitions: 3, // Added mock repetitions
    },
    {
      id: "3",
      title: "Pooja's Wedding Story",
      caller_name: "Pooja", // Updated field name
      patient_relation: "Grandmother", // Updated field name
      created_on: "19-02-2023",
      situation:
        "I am calling my grandmother to remind her of my wedding event. We had the wedding last December on 9th. We had the wedding at Vrindavan. We stayed in a resort. I married Dikshant. Gopal Uncle also came. We had a full floor to ourselves. I wore a red lehenga. The Jaimala event was grandiose.",
      voice: "Random",
      call_number: "+918294107357", // Added mock call number
      is_completed: false, // Added is_completed for consistency
      questionnaires: [],
      schedule: "2hr", // Added mock schedule
      repetitions: 2, // Added mock repetitions
    },
  ];

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h1 className="text-3xl font-bold mb-6">Patient Scheduled Calls</h1>
      <DashboardBody agents={conversations?.length ? conversations : []} />
    </div>
  );
}
