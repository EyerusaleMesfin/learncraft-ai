# Learn Craft AI MVP

This is a clean starter for your hackathon project using a single `Next.js` app.

## Do you need separate frontend and backend folders?

No, not for the MVP.

Use one app first:

- `app/` for pages and UI
- `app/api/` for simple backend endpoints
- `components/` for reusable UI
- `data/` for mock content
- `lib/` for helper logic
- `types/` for shared TypeScript types

This is faster and easier than creating separate `frontend` and `backend` folders.

## Project modules

1. `Module 1 - Auth`
   - `app/login/page.tsx`
   - `app/register/page.tsx`
   - UI only for now, ready for Supabase or Firebase

2. `Module 2 - Home & Landing`
   - `app/page.tsx`
   - `components/home/*`
   - Welcome section and 2-step carousel/stepper

3. `Module 3 - Track Selection`
   - `app/tracks/page.tsx`
   - Choose AI Development, App Development, or Web Development

4. `Module 4 - Level Selection & Path`
   - `app/tracks/[track]/page.tsx`
   - `app/tracks/[track]/[level]/page.tsx`
   - Beginner, Intermediate, Advanced flows

5. `Module 5 - Resources`
   - `data/tracks.ts`
   - Hardcoded YouTube and article links for now

6. `Module 6 - Project System`
   - `components/path/learning-path-client.tsx`
   - `components/path/project-card.tsx`
   - Timed projects and submission flow

7. `Module 7 - AI Evaluator`
   - `app/api/evaluate/route.ts`
   - `lib/mock-ai.ts`
   - Mock scoring from 0 to 100

8. `Module 8 - Notifications`
   - `components/notification-preview.tsx`
   - `app/dashboard/page.tsx`

9. `Module 9 - Progress Dashboard`
   - `app/dashboard/page.tsx`

## How to start

1. Install packages:

```powershell
npm.cmd install
```

2. Run the app:

```powershell
npm.cmd run dev
```

3. Open:

```text
http://localhost:3000
```

## Recommended next steps

1. Connect Supabase or Firebase for real auth and database
2. Save user progress and submissions
3. Replace mock AI scoring with OpenAI, Grok, or Claude API
4. Add protected routes after auth works
5. Move resources and projects from hardcoded data into a database
