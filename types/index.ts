export type LevelSlug = "beginner" | "intermediate" | "advanced";

export type Track = {
  slug: string;
  title: string;
  summary: string;
  color: string;
};

export type LevelInfo = {
  slug: LevelSlug;
  title: string;
  headline: string;
  description: string;
};

export type Resource = {
  type: string;
  title: string;
  description: string;
  url: string;
  rating: string;
};

export type Project = {
  title: string;
  timeLimitDays: 3 | 7;
  description: string;
  goals: string[];
  submissionHint: string;
};

export type LearningPath = {
  levelLabel: string;
  intro: string;
  resources: Resource[];
  skillCheckProject?: Project;
  mainProject: Project;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  tone: "info" | "success" | "warning";
  createdAt: string;
};

export type SubmissionRecord = {
  id: string;
  trackSlug: string;
  trackTitle: string;
  level: LevelSlug;
  githubUrl?: string;
  code?: string;
  score: number;
  feedback: string;
  verdict: "pass" | "retry";
  submittedAt: string;
};

export type ProjectProgress = {
  trackSlug: string;
  level: LevelSlug;
  resourcesCompleted: boolean;
  resourcesUnlocked: boolean;
  mainProjectUnlocked: boolean;
  completed: boolean;
  mastery: number;
  latestScore?: number;
  latestFeedback?: string;
  deadlineAt?: string;
  attemptCount: number;
};

export type DashboardSummary = {
  completedLevels: number;
  mastery: number;
  activeProjects: number;
  recentAchievements: Array<{
    title: string;
    detail: string;
  }>;
  notifications: NotificationItem[];
};
