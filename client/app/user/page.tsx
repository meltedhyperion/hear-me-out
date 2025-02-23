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

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h1 className="text-3xl font-bold mb-6">Patient Scheduled Calls</h1>
      <DashboardBody agents={conversations?.length ? conversations : []} />
    </div>
  );
}
