import { AnalyticsBody } from "@/components/analytics-body";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

export default async function AnalyticsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
    .ilike("email", user.email || "")
    .eq("id", params.id);

  if (conversationsError) {
    console.error("Error fetching conversations:", conversationsError.message);
  }

  const agent = conversations?.length ? conversations[0] : mockAgent;
  const chartData = mockChartData;

  return (
    <div className="flex-1 w-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Agent Analytics</h1>
      {agent && chartData ? (
        <AnalyticsBody agent={agent} chartData={chartData} />
      ) : (
        <p>Loading Call analytics...</p>
      )}
    </div>
  );
}
