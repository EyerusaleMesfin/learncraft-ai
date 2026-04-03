"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { UserMenu } from "@/components/auth/user-menu";
import { createClient } from "@/lib/supabase/client";

const primaryLinks = [
  { href: "/" as const, label: "Home" },
  { href: "/tracks" as const, label: "Tracks" }
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      setUser(data.user ?? null);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="page-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-xl font-black tracking-tight text-slate-950">
              Learn Craft AI
            </Link>
            <p className="text-sm text-slate-500">
              Learn by track, prove skills, unlock projects
            </p>
          </div>
          {user ? (
            <div className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 lg:hidden">
              {user.user_metadata?.full_name ?? user.email}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap gap-2">
            {primaryLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            {user ? (
              <UserMenu user={user} dashboardActive={pathname === "/dashboard"} />
            ) : (
              <>
                <Link
                  href="/login"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    pathname === "/login"
                      ? "bg-orange-500 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Login
                </Link>
                <Link href="/register" className="btn-secondary px-4 py-2">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
