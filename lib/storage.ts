import type { AppState } from "@/types";

export const APP_STORAGE_KEY = "learn-craft-ai-state";

export const defaultAppState: AppState = {
  users: [],
  currentUser: null,
  notifications: [],
  submissions: [],
  progress: {}
};
