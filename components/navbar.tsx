"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/components/providers/app-provider";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/tracks", label: "Tracks" }
];

const secondaryLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" }
];

export function Navbar() {
  const pathname = usePathname();
  const { currentUser, logout } = useAppState();

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
          {currentUser ? (
            <div className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 lg:hidden">
              {currentUser.name}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap gap-2">
            {primaryLinks.map((link) => {
              const active = pathname === link.href;

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
            {secondaryLinks.map((link) => {
              if (currentUser && (link.href === "/login" || link.href === "/register")) {
                return null;
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    pathname === link.href
                      ? "bg-orange-500 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {currentUser ? (
              <>
                <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 lg:block">
                  {currentUser.name}
                </div>
                <button type="button" className="btn-secondary px-4 py-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
