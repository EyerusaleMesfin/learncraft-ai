# Learn Craft AI

This project uses Next.js and Supabase Authentication for real user auth.

## Features

- Email/password signup
- Email/password login
- Google OAuth login
- Session handling with Supabase SSR cookies
- Protected pages for dashboard and track routes

## Install

```powershell
npm.cmd install
```

## Environment

Copy the example file and add your Supabase values:

```powershell
Copy-Item .env.example .env.local
```

Required variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

## Supabase Setup

1. Create a Supabase project.
2. In Supabase Dashboard, go to `Authentication > Providers`.
3. Enable `Email`.
4. Enable `Google`.
5. Add your site URL and redirect URLs.

Recommended redirect URLs:

- `http://localhost:3000/auth/callback`
- `http://localhost:3000/auth/confirm`
- Your production domain equivalents

For SSR email confirmation, update the `Confirm signup` email template in Supabase:

```text
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard
```

For Google OAuth, configure the Google provider in Supabase and add:

- `http://localhost:3000/auth/callback`
- your production callback URL

## Run

```powershell
npm.cmd run dev
```

## Notes

- Authentication is now handled with Supabase.
- Middleware refreshes sessions and protects routes.
- Dashboard and track pages redirect to login when the user is not authenticated.
