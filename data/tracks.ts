import type { DashboardSummary, LearningPath, LevelInfo, LevelSlug, Track } from "@/types";

export const levels: LevelInfo[] = [
  {
    slug: "beginner",
    title: "Beginner",
    headline: "Start with guided resources and unlock your first build",
    description:
      "Best for learners who want a clear learning path before they begin a timed project."
  },
  {
    slug: "intermediate",
    title: "Intermediate",
    headline: "Take a skill check and unlock the next project",
    description:
      "Start with a practical project. A passing AI score unlocks resources and the next challenge."
  },
  {
    slug: "advanced",
    title: "Advanced",
    headline: "Prove advanced readiness with a tougher skill check",
    description:
      "Built for learners who want to move quickly from validation into higher-level projects."
  }
];

export const tracks: Track[] = [
  {
    slug: "ai-development",
    title: "AI Development",
    summary:
      "Learn prompt engineering, AI UX, and feature integration through guided resources, skill checks, and timed projects.",
    color: "#ef7d34"
  },
  {
    slug: "app-development",
    title: "App Development",
    summary:
      "Practice product thinking, app flows, APIs, and delivery patterns with realistic challenge-based learning.",
    color: "#0f766e"
  },
  {
    slug: "web-development",
    title: "Web Development",
    summary:
      "Build strong frontend and full-stack instincts with responsive UI, routing, and reusable component projects.",
    color: "#2563eb"
  }
];

const learningPaths: Record<string, Record<LevelSlug, LearningPath>> = {
  "ai-development": {
    beginner: {
      levelLabel: "Beginner",
      intro:
        "Begin with high-rated starter material on AI product thinking and prompt design. Once you complete the learning step, your first project unlocks automatically.",
      resources: [
        {
          type: "YouTube",
          title: "AI Product Basics for Beginners",
          description:
            "A clear walkthrough of what AI features actually do inside products and how beginners can approach them.",
          url: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
          rating: "4.9/5"
        },
        {
          type: "Article",
          title: "Prompt Engineering Guide",
          description:
            "Read a beginner-friendly guide to writing prompts, refining instructions, and evaluating responses.",
          url: "https://platform.openai.com/docs/guides/prompt-engineering",
          rating: "4.8/5"
        }
      ],
      mainProject: {
        title: "Study Helper Chatbot",
        timeLimitDays: 3,
        description:
          "Build a small chatbot interface that helps students ask course-related questions and receive structured answers.",
        goals: [
          "Design a simple chat input and response layout",
          "Handle loading, empty, and error states",
          "Explain how prompts or responses are structured"
        ],
        submissionHint: "Share a GitHub repo or paste key code for your chatbot flow."
      }
    },
    intermediate: {
      levelLabel: "Intermediate",
      intro:
        "Start with a skill-check project. If your AI score reaches 50% or more, you unlock materials and a stronger AI build project.",
      resources: [
        {
          type: "YouTube",
          title: "How to Ship an AI MVP",
          description:
            "See how to define one clear user problem, connect a model, and keep the scope under control.",
          url: "https://www.youtube.com/watch?v=3P7wQkQxX0w",
          rating: "4.8/5"
        },
        {
          type: "Article",
          title: "Patterns for AI Applications",
          description:
            "Review common interface patterns for AI workflows, outputs, confidence cues, and human review.",
          url: "https://platform.openai.com/docs/guides",
          rating: "4.7/5"
        }
      ],
      skillCheckProject: {
        title: "Quick AI Summarizer Skill Check",
        timeLimitDays: 3,
        description:
          "Create a small feature that accepts text input and returns a structured summary view with clear UX states.",
        goals: [
          "Accept free-text input",
          "Render a summarized output panel",
          "Show at least one meaningful loading or status state"
        ],
        submissionHint: "Paste the summary component logic or share a repo with the feature."
      },
      mainProject: {
        title: "AI Resume Feedback Tool",
        timeLimitDays: 7,
        description:
          "Build a tool that accepts resume content and returns practical AI-style feedback across multiple sections.",
        goals: [
          "Capture resume input cleanly",
          "Display structured feedback with categories",
          "Explain how your evaluation flow works"
        ],
        submissionHint: "Submit your GitHub link or key feedback-generation code."
      }
    },
    advanced: {
      levelLabel: "Advanced",
      intro:
        "Use the advanced skill check to prove readiness. Passing unlocks challenge resources and a more complex AI workflow project.",
      resources: [
        {
          type: "YouTube",
          title: "Production AI UX Patterns",
          description:
            "Study how stronger AI experiences communicate confidence, progress, retries, and multi-step results.",
          url: "https://www.youtube.com/watch?v=6M4nA6B4D3U",
          rating: "4.9/5"
        },
        {
          type: "Article",
          title: "Structured Outputs and Tool Use",
          description:
            "Review higher-signal patterns for predictable responses and tool-driven model workflows.",
          url: "https://platform.openai.com/docs/guides/function-calling",
          rating: "4.8/5"
        }
      ],
      skillCheckProject: {
        title: "Prompt Workflow Skill Check",
        timeLimitDays: 3,
        description:
          "Build a small multi-step assistant flow that shows planning, generation, and a final response.",
        goals: [
          "Break one request into multiple steps",
          "Represent those steps in the UI",
          "Produce a final structured result"
        ],
        submissionHint: "Submit the workflow UI or code showing multi-step prompt handling."
      },
      mainProject: {
        title: "Research Assistant Workspace",
        timeLimitDays: 7,
        description:
          "Create a workspace that accepts a topic, plans subtasks, and returns a polished research summary.",
        goals: [
          "Design a multi-step flow with clear task status",
          "Show structured results and final recommendations",
          "Keep the interface easy to follow on mobile and desktop"
        ],
        submissionHint: "Share your repo or the code responsible for planning and output rendering."
      }
    }
  },
  "app-development": {
    beginner: {
      levelLabel: "Beginner",
      intro:
        "Learn basic app architecture, screen flows, and API thinking through highly rated starter resources before your first timed build unlocks.",
      resources: [
        {
          type: "YouTube",
          title: "App Design Fundamentals",
          description:
            "A beginner overview of screens, navigation, feedback states, and common product patterns.",
          url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
          rating: "4.7/5"
        },
        {
          type: "Article",
          title: "Introduction to Client APIs",
          description:
            "Learn how applications send, receive, and display data from backend services.",
          url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction",
          rating: "4.8/5"
        }
      ],
      mainProject: {
        title: "Habit Tracker App",
        timeLimitDays: 3,
        description:
          "Build a habit tracker that lets users add tasks, update completion state, and review simple progress.",
        goals: [
          "Add, list, and remove habits",
          "Show progress feedback in the interface",
          "Keep the interaction flow straightforward"
        ],
        submissionHint: "Submit the screens or core state-management code for your habit tracker."
      }
    },
    intermediate: {
      levelLabel: "Intermediate",
      intro:
        "Begin with a focused skill check. A passing score unlocks supporting learning material and a richer app project.",
      resources: [
        {
          type: "YouTube",
          title: "Small-Team App Architecture",
          description:
            "A practical guide to organizing views, state, and reusable modules in growing app projects.",
          url: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
          rating: "4.7/5"
        },
        {
          type: "Article",
          title: "React State and Async Patterns",
          description:
            "Review data loading, error handling, and UI consistency patterns that make apps feel solid.",
          url: "https://react.dev/learn",
          rating: "4.8/5"
        }
      ],
      skillCheckProject: {
        title: "Task Flow Skill Check",
        timeLimitDays: 3,
        description:
          "Build a small task flow with list and detail screens to prove app-structure readiness.",
        goals: [
          "Use list and detail UI states",
          "Show a clear user journey",
          "Keep state updates readable"
        ],
        submissionHint: "Share the repo or core navigation/state code for your task flow."
      },
      mainProject: {
        title: "Delivery Tracking App",
        timeLimitDays: 7,
        description:
          "Create an app that shows delivery status updates, checkpoints, and progress indicators.",
        goals: [
          "Represent package states visually",
          "Use reusable cards or sections",
          "Handle mock API data gracefully"
        ],
        submissionHint: "Submit your repo or the code handling package status and progress UI."
      }
    },
    advanced: {
      levelLabel: "Advanced",
      intro:
        "Use the advanced skill check to show stronger product thinking. Passing unlocks resources and a larger team-style project.",
      resources: [
        {
          type: "YouTube",
          title: "Advanced Product Thinking for Apps",
          description:
            "Go beyond isolated screens and design coherent app experiences with stronger user journeys.",
          url: "https://www.youtube.com/watch?v=J---aiyznGQ",
          rating: "4.8/5"
        },
        {
          type: "Article",
          title: "Offline-Friendly App UX",
          description:
            "Learn resilient design patterns for delayed sync, missing network, and saved local work.",
          url: "https://web.dev/learn/pwa",
          rating: "4.7/5"
        }
      ],
      skillCheckProject: {
        title: "Collaboration Skill Check",
        timeLimitDays: 3,
        description:
          "Build a lightweight collaborative screen with updates, participants, and task states.",
        goals: [
          "Represent multiple user states clearly",
          "Organize the UI into modular sections",
          "Demonstrate product-level thinking"
        ],
        submissionHint: "Share your collaboration flow implementation or repo."
      },
      mainProject: {
        title: "Team Workspace App",
        timeLimitDays: 7,
        description:
          "Build a collaborative workspace dashboard with tasks, updates, reminders, and role-based sections.",
        goals: [
          "Create a modular dashboard layout",
          "Show reminders and project updates",
          "Explain your component architecture choices"
        ],
        submissionHint: "Submit the dashboard repo or core code for tasks, updates, and notifications."
      }
    }
  },
  "web-development": {
    beginner: {
      levelLabel: "Beginner",
      intro:
        "Start with highly rated web basics and responsive design material. Once you finish the resources, your first build unlocks.",
      resources: [
        {
          type: "YouTube",
          title: "Modern Web Development Basics",
          description:
            "A beginner-friendly overview of HTML, CSS, JavaScript, and component-driven UI thinking.",
          url: "https://www.youtube.com/watch?v=G3e-cpL7ofc",
          rating: "4.9/5"
        },
        {
          type: "Article",
          title: "Responsive Design Fundamentals",
          description:
            "Learn how to build layouts that feel intentional on both mobile and desktop screens.",
          url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
          rating: "4.8/5"
        }
      ],
      mainProject: {
        title: "Portfolio Website",
        timeLimitDays: 3,
        description:
          "Build a responsive portfolio with a strong hero section, about content, projects, and contact details.",
        goals: [
          "Use responsive layout techniques",
          "Create visual hierarchy with typography and spacing",
          "Keep the page structure clean and reusable"
        ],
        submissionHint: "Share your repo or paste the code for your responsive portfolio sections."
      }
    },
    intermediate: {
      levelLabel: "Intermediate",
      intro:
        "Prove your readiness with a short web skill check. Pass with 50% or higher to unlock resources and the next project.",
      resources: [
        {
          type: "YouTube",
          title: "React Project Structure",
          description:
            "See practical ways to organize reusable components and keep medium-sized apps maintainable.",
          url: "https://www.youtube.com/watch?v=wIyHSOugGGw",
          rating: "4.8/5"
        },
        {
          type: "Article",
          title: "Next.js App Router Basics",
          description:
            "Learn the foundations of routing, layouts, and rendering for modern web apps.",
          url: "https://nextjs.org/docs/app",
          rating: "4.8/5"
        }
      ],
      skillCheckProject: {
        title: "Responsive Search UI Skill Check",
        timeLimitDays: 3,
        description:
          "Create a searchable UI with filters, empty states, and a polished card layout.",
        goals: [
          "Implement at least one filter or search interaction",
          "Handle empty and active-result states",
          "Demonstrate responsive layout choices"
        ],
        submissionHint: "Submit the repository or relevant UI code for your searchable experience."
      },
      mainProject: {
        title: "Course Marketplace Page",
        timeLimitDays: 7,
        description:
          "Build a course marketplace with category filtering, reusable cards, and a details experience.",
        goals: [
          "Use reusable card and layout components",
          "Implement simple search or filtering",
          "Create a clean content hierarchy"
        ],
        submissionHint: "Share your repo or the code for filtering, cards, and page composition."
      }
    },
    advanced: {
      levelLabel: "Advanced",
      intro:
        "Use the advanced skill check to prove strong UI and architecture instincts. Passing unlocks challenge materials and a larger admin-style project.",
      resources: [
        {
          type: "YouTube",
          title: "Scalable Frontend Architecture",
          description:
            "Review patterns that help larger interfaces stay organized as features and contributors increase.",
          url: "https://www.youtube.com/watch?v=FJDVKeh7RJI",
          rating: "4.8/5"
        },
        {
          type: "Article",
          title: "Data Fetching and Caching in Next.js",
          description:
            "Understand modern decisions around rendering, caching, and user-perceived performance.",
          url: "https://nextjs.org/docs/app/building-your-application/data-fetching",
          rating: "4.7/5"
        }
      ],
      skillCheckProject: {
        title: "Admin Analytics Skill Check",
        timeLimitDays: 3,
        description:
          "Build a compact analytics dashboard that shows metrics, states, and clear layout hierarchy.",
        goals: [
          "Present multiple stat views clearly",
          "Handle loading or empty states intentionally",
          "Keep the information architecture easy to scan"
        ],
        submissionHint: "Submit your dashboard code or repo for the analytics skill check."
      },
      mainProject: {
        title: "Learning Platform Admin Panel",
        timeLimitDays: 7,
        description:
          "Create a responsive admin interface with analytics, learner management, reminders, and modular sections.",
        goals: [
          "Design a strong dashboard layout",
          "Show filters, stats, and user management areas",
          "Maintain clean reusable component structure"
        ],
        submissionHint: "Share your repo or the core dashboard and learner-management implementation."
      }
    }
  }
};

const starterNotifications = [
  {
    id: "welcome-1",
    title: "Welcome to Learn Craft AI",
    message: "Choose a track, pick your level, and start unlocking projects with AI feedback.",
    tone: "info" as const,
    createdAt: new Date().toISOString()
  },
  {
    id: "welcome-2",
    title: "Project reminders are active",
    message: "Timed projects will appear in your dashboard once you unlock them.",
    tone: "warning" as const,
    createdAt: new Date().toISOString()
  }
];

export const starterDashboard: DashboardSummary = {
  completedLevels: 0,
  mastery: 0,
  activeProjects: 0,
  recentAchievements: [
    {
      title: "No completed levels yet",
      detail: "Finish a beginner flow or pass a skill check to start building your progress history."
    }
  ],
  notifications: starterNotifications
};

export function getTrackBySlug(slug: string) {
  return tracks.find((track) => track.slug === slug);
}

export function isValidLevel(level: string): level is LevelSlug {
  return levels.some((item) => item.slug === level);
}

export function getLearningPath(trackSlug: string, level: LevelSlug) {
  return learningPaths[trackSlug][level];
}
