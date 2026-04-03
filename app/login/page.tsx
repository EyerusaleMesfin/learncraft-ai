import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getSupabaseUser } from "@/lib/supabase/auth";

export default async function LoginPage() {
  const user = await getSupabaseUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="page-shell py-12">
      <AuthForm mode="login" />
    </div>
  );
}
