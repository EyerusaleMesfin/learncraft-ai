"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { starterDashboard, tracks } from "@/data/tracks";
import { defaultAppState, APP_STORAGE_KEY } from "@/lib/storage";
import type {
  AppState,
  DashboardSummary,
  LevelSlug,
  NotificationItem,
  ProjectProgress,
  SessionUser,
  SubmissionRecord,
  UserRecord
} from "@/types";

type AuthInput = {
  name?: string;
  email: string;
  password?: string;
};

type SubmitProjectInput = {
  trackSlug: string;
  trackTitle: string;
  level: LevelSlug;
  githubUrl?: string;
  code?: string;
  deadlineDays: 3 | 7;
};

type EvaluationPayload = {
  score: number;
  feedback: string;
  verdict: "pass" | "retry";
};

type AppContextValue = {
  hydrated: boolean;
  currentUser: SessionUser | null;
  dashboard: DashboardSummary;
  notifications: NotificationItem[];
  progress: Record<string, ProjectProgress>;
  submissions: SubmissionRecord[];
  register: (input: AuthInput) => { success: boolean; message: string };
  login: (input: AuthInput) => { success: boolean; message: string };
  loginWithGoogle: () => { success: boolean; message: string };
  logout: () => void;
  completeBeginnerResources: (trackSlug: string, level: LevelSlug, deadlineDays: 3 | 7) => void;
  submitProject: (input: SubmitProjectInput) => Promise<EvaluationPayload>;
};

const AppContext = createContext<AppContextValue | null>(null);

function getProgressKey(trackSlug: string, level: LevelSlug) {
  return `${trackSlug}:${level}`;
}

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function buildNotification(
  title: string,
  message: string,
  tone: NotificationItem["tone"]
): NotificationItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    message,
    tone,
    createdAt: new Date().toISOString()
  };
}

function getTrackTitle(trackSlug: string) {
  return tracks.find((track) => track.slug === trackSlug)?.title ?? trackSlug;
}

function summarizeDashboard(state: AppState): DashboardSummary {
  const progressItems = Object.values(state.progress);
  const completedLevels = progressItems.filter((item) => item.completed).length;
  const activeProjects = progressItems.filter(
    (item) => item.mainProjectUnlocked && !item.completed
  ).length;
  const masteryScores = progressItems.map((item) => item.mastery).filter((item) => item > 0);
  const mastery =
    masteryScores.length > 0
      ? Math.round(masteryScores.reduce((sum, item) => sum + item, 0) / masteryScores.length)
      : 0;

  const recentAchievements =
    progressItems
      .filter((item) => item.completed || item.latestScore)
      .slice()
      .sort((a, b) => (b.deadlineAt ?? "").localeCompare(a.deadlineAt ?? ""))
      .slice(0, 3)
      .map((item) => ({
        title: `${getTrackTitle(item.trackSlug)} ${item.level} ${item.completed ? "completed" : "updated"}`,
        detail: item.completed
          ? `Level completed with ${item.mastery}% mastery.`
          : `Latest score: ${item.latestScore ?? 0}%. ${item.latestFeedback ?? ""}`.trim()
      })) || [];

  return {
    completedLevels,
    mastery,
    activeProjects,
    recentAchievements:
      recentAchievements.length > 0
        ? recentAchievements
        : starterDashboard.recentAchievements,
    notifications: state.notifications.slice(0, 4)
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultAppState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(APP_STORAGE_KEY);

      if (raw) {
        const parsed = JSON.parse(raw) as AppState;
        setState({
          ...defaultAppState,
          ...parsed,
          notifications:
            (parsed.notifications?.length ?? 0) > 0
              ? parsed.notifications
              : starterDashboard.notifications
        });
      } else {
        setState((current) => ({
          ...current,
          notifications: starterDashboard.notifications
        }));
      }
    } catch {
      setState((current) => ({
        ...current,
        notifications: starterDashboard.notifications
      }));
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const dashboard = useMemo(() => summarizeDashboard(state), [state]);

  const register = ({ name, email, password }: AuthInput) => {
    const lowerEmail = email.toLowerCase().trim();

    if (state.users.some((user) => user.email === lowerEmail)) {
      return {
        success: false,
        message: "That email already has an account. Try logging in instead."
      };
    }

    const newUser: UserRecord = {
      id: `user-${Date.now()}`,
      name: name?.trim() || lowerEmail.split("@")[0],
      email: lowerEmail,
      password: password ?? ""
    };

    const sessionUser: SessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      provider: "password"
    };

    setState((current) => ({
      ...current,
      users: [...current.users, newUser],
      currentUser: sessionUser,
      notifications: [
        buildNotification(
          "Account created",
          "Your Learn Craft AI profile is ready. Pick a track to begin.",
          "success"
        ),
        ...current.notifications
      ].slice(0, 8)
    }));

    return { success: true, message: "Account created successfully." };
  };

  const login = ({ email, password }: AuthInput) => {
    const lowerEmail = email.toLowerCase().trim();
    const matchedUser = state.users.find(
      (user) => user.email === lowerEmail && user.password === (password ?? "")
    );

    if (!matchedUser) {
      return {
        success: false,
        message: "We couldn't match that email and password."
      };
    }

    setState((current) => ({
      ...current,
      currentUser: {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        provider: "password"
      }
    }));

    return { success: true, message: "Logged in successfully." };
  };

  const loginWithGoogle = () => {
    const googleUser: SessionUser = {
      id: "google-demo-user",
      name: "Google Learner",
      email: "learner.google@example.com",
      provider: "google"
    };

    setState((current) => ({
      ...current,
      currentUser: googleUser,
      notifications: [
        buildNotification(
          "Google sign-in connected",
          "This is a mock Google login for the MVP. Replace it with a real OAuth provider later.",
          "info"
        ),
        ...current.notifications
      ].slice(0, 8)
    }));

    return { success: true, message: "Signed in with Google." };
  };

  const logout = () => {
    setState((current) => ({
      ...current,
      currentUser: null
    }));
  };

  const completeBeginnerResources = (
    trackSlug: string,
    level: LevelSlug,
    deadlineDays: 3 | 7
  ) => {
    const key = getProgressKey(trackSlug, level);

    setState((current) => {
      const existing = current.progress[key];

      return {
        ...current,
        progress: {
          ...current.progress,
          [key]: {
            trackSlug,
            level,
            resourcesCompleted: true,
            resourcesUnlocked: true,
            mainProjectUnlocked: true,
            completed: existing?.completed ?? false,
            mastery: existing?.mastery ?? 0,
            latestScore: existing?.latestScore,
            latestFeedback: existing?.latestFeedback,
            deadlineAt: existing?.deadlineAt ?? addDays(deadlineDays),
            attemptCount: existing?.attemptCount ?? 0
          }
        },
        notifications: [
          buildNotification(
            "Project unlocked",
            `${getTrackTitle(trackSlug)} ${level} project is now available with a ${deadlineDays}-day timer.`,
            "success"
          ),
          ...current.notifications
        ].slice(0, 8)
      };
    });
  };

  const submitProject = async ({
    trackSlug,
    trackTitle,
    level,
    githubUrl,
    code,
    deadlineDays
  }: SubmitProjectInput) => {
    // Backend hook: replace these API calls with your real persistence and evaluation services later.
    const submissionResponse = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trackSlug,
        level,
        githubUrl,
        code
      })
    });

    const submissionPayload = (await submissionResponse.json()) as {
      submission: { id: string; submittedAt: string };
    };

    const evaluationResponse = await fetch("/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        track: trackSlug,
        level,
        githubUrl,
        code
      })
    });

    const evaluation = (await evaluationResponse.json()) as EvaluationPayload;
    const key = getProgressKey(trackSlug, level);

    setState((current) => {
      const previous = current.progress[key];
      const completed = previous?.completed || evaluation.score >= 50;
      const resourcesUnlocked =
        level === "beginner" ? true : previous?.resourcesUnlocked || evaluation.score >= 50;
      const mainProjectUnlocked =
        level === "beginner" ? true : previous?.mainProjectUnlocked || evaluation.score >= 50;

      const nextProgress: ProjectProgress = {
        trackSlug,
        level,
        resourcesCompleted: previous?.resourcesCompleted ?? level === "beginner",
        resourcesUnlocked,
        mainProjectUnlocked,
        completed,
        mastery: Math.max(previous?.mastery ?? 0, evaluation.score),
        latestScore: evaluation.score,
        latestFeedback: evaluation.feedback,
        deadlineAt: previous?.deadlineAt ?? addDays(deadlineDays),
        attemptCount: (previous?.attemptCount ?? 0) + 1
      };

      const nextNotifications = [
        buildNotification(
          previous?.mainProjectUnlocked ? "Project submission scored" : completed ? "Skill check passed" : "Retry available",
          previous?.mainProjectUnlocked
            ? `${trackTitle} ${level} project received ${evaluation.score}% with updated feedback in the dashboard.`
            : completed
              ? `${trackTitle} ${level} unlocked new learning materials and the next project.`
              : `${trackTitle} ${level} scored ${evaluation.score}%. Review resources and try again before the deadline.`,
          previous?.mainProjectUnlocked || completed ? "success" : "warning"
        ),
        ...current.notifications
      ].slice(0, 8);

      return {
        ...current,
        submissions: [
          {
            id: submissionPayload.submission.id,
            trackSlug,
            trackTitle,
            level,
            githubUrl,
            code,
            score: evaluation.score,
            feedback: evaluation.feedback,
            verdict: evaluation.verdict,
            submittedAt: submissionPayload.submission.submittedAt
          },
          ...current.submissions
        ].slice(0, 12),
        progress: {
          ...current.progress,
          [key]: nextProgress
        },
        notifications: nextNotifications
      };
    });

    return evaluation;
  };

  const value = useMemo<AppContextValue>(
    () => ({
      hydrated,
      currentUser: state.currentUser,
      dashboard,
      notifications: state.notifications,
      progress: state.progress,
      submissions: state.submissions,
      register,
      login,
      loginWithGoogle,
      logout,
      completeBeginnerResources,
      submitProject
    }),
    [dashboard, hydrated, state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppState must be used within AppProvider.");
  }

  return context;
}
