"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getPasswordChecks, getPasswordStrength, validateEmail } from "@/lib/validators";

type AuthMode = "login" | "register";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordChecks = useMemo(() => getPasswordChecks(password), [password]);
  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

  const handleRegister = async () => {
    const isStrongPassword = Object.values(passwordChecks).every(Boolean);

    if (!fullName.trim()) {
      throw new Error("Please add your full name.");
    }

    if (!isStrongPassword) {
      throw new Error("Use a stronger password before creating your account.");
    }

    if (password !== confirmPassword) {
      throw new Error("Your password confirmation does not match.");
    }

    const supabase = createClient();
    const redirectUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/confirm?next=/dashboard`
        : undefined;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      throw error;
    }

    if (data.session) {
      setMessageTone("success");
      setMessage("Account created successfully.");
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setMessageTone("success");
    setMessage("Check your email to confirm your account, then sign in.");
  };

  const handleLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    setMessageTone("success");
    setMessage("Logged in successfully.");
    router.push("/dashboard");
    router.refresh();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setMessageTone("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      if (mode === "register") {
        await handleRegister();
      } else {
        await handleLogin();
      }
    } catch (error) {
      setMessageTone("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setMessage("");

    const supabase = createClient();
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?next=/dashboard`
        : undefined;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo
      }
    });

    if (error) {
      setMessageTone("error");
      setMessage(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-card">
      <span className="pill">Authentication</span>
      <h1 className="mt-4 text-3xl font-black text-slate-950">
        {mode === "login" ? "Sign in to continue learning" : "Create your learner account"}
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {mode === "login"
          ? "Use your Supabase email/password account or continue with Google."
          : "Register with email/password. Supabase will handle the secure account flow."}
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {mode === "register" ? (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              type="text"
              placeholder="Ada Lovelace"
              className="input-field"
            />
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="you@example.com"
            className="input-field"
          />
          <p className="mt-2 text-xs text-slate-500">
            {email.length === 0 || validateEmail(email)
              ? "Email format is validated before sending to Supabase."
              : "This email format looks invalid."}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Create a strong password"
            className="input-field"
          />
          <p className="mt-2 text-xs font-semibold text-slate-600">
            Password strength: {passwordStrength}
          </p>
        </div>

        {mode === "register" ? (
          <>
            <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">Password checklist</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <span>{passwordChecks.minLength ? "Done" : "Add"} 8+ characters</span>
                <span>{passwordChecks.hasUppercase ? "Done" : "Add"} an uppercase letter</span>
                <span>{passwordChecks.hasLowercase ? "Done" : "Add"} a lowercase letter</span>
                <span>{passwordChecks.hasNumber ? "Done" : "Add"} a number</span>
                <span>{passwordChecks.hasSpecial ? "Done" : "Add"} a special character</span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                placeholder="Repeat your password"
                className="input-field"
              />
            </div>
          </>
        ) : null}

        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Register"}
        </button>
      </form>

      <button type="button" className="btn-secondary mt-3 w-full" onClick={handleGoogleSignIn}>
        Continue with Google
      </button>

      {message ? (
        <div
          className={`mt-4 rounded-2xl border p-4 text-sm ${
            messageTone === "success"
              ? "border-teal-200 bg-teal-50 text-teal-900"
              : "border-rose-200 bg-rose-50 text-rose-900"
          }`}
        >
          {message}
        </div>
      ) : null}

      <p className="mt-6 text-sm text-slate-600">
        {mode === "login" ? "Need an account?" : "Already have an account?"}{" "}
        <Link
          href={mode === "login" ? "/register" : "/login"}
          className="font-semibold text-slate-900"
        >
          {mode === "login" ? "Register here" : "Login here"}
        </Link>
      </p>
    </div>
  );
}
