import Form from "@/components/add-call-form";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
export default async function AddAgentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div>
      {/* Container */}
      <Form />
    </div>
  );
}
