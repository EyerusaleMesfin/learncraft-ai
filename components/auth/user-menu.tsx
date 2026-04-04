"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export function UserMenu({
  user,
  dashboardActive = false
}: {
  user: User;
  dashboardActive?: boolean;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <Link
        href="/dashboard"
        data-testid="dashboard-link"
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          dashboardActive
            ? "bg-orange-500 text-white"
            : "bg-white text-slate-700 hover:bg-slate-100"
        }`}
      >
        Dashboard
      </Link>
      <div
        className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 lg:block"
        data-testid="user-identity"
      >
        {user.user_metadata?.full_name ?? user.email}
      </div>
      <button
        type="button"
        className="btn-secondary px-4 py-2"
        onClick={handleLogout}
        data-testid="logout-button"
      >
        Logout
      </button>
    </>
  );
}
