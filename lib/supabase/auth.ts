import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getSupabaseUser() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function requireSupabaseUser() {
  const user = await getSupabaseUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
