
# It is live now : link → https://my-next-app-brown-one.vercel.app/
# My Next App

Next.js (App Router) application with:
- Prisma ORM (Postgres)
- NextAuth for authentication
- Email verification via Nodemailer
- Gemini (Generative Language) API integration
- Deployed to Vercel (recommended)

## Table of contents
- Overview
- Requirements
- Quick start (local)
- Environment variables
- Prisma (migrations & generate)
- Authentication & email verification
- Gemini API usage
- Deploy to Vercel
- Security & notes
- Useful commands

## Overview
This project implements user signup/login with email verification, stores users via Prisma + Postgres, and exposes a protected dashboard where authenticated users can send prompts to the Gemini endpoint and see formatted responses.

Key paths:
- Signup API: `src/app/api/signup/route.ts`
- Verify API: `src/app/api/verify/route.ts`
- Auth (NextAuth): `src/app/api/auth/[...nextauth]/route.ts`
- Gemini API: `src/app/api/gemini/route.ts`
- Client form: `src/app/api/_components/geminiform.tsx`
- Dashboard: `src/app/dashboard/page.tsx`

## Requirements
- Node.js (16+ recommended)
- npm or yarn
- A Postgres database (Neon, Supabase, Railway, etc.)
- Vercel account (for deployment)
- Gmail account with App Password (if using Gmail SMTP)

## Quick start (local)
1. Clone:
   - git clone <repo>
   - cd my-next-app

2. Install dependencies:
   - npm install

3. Create `.env` in project root (see Environment variables below).

4. Generate Prisma client:
   - npx prisma generate

5. Run migrations locally (dev):
   - npx prisma migrate dev --name init
   - (or for a quick sync) npx prisma db push

6. Start dev server:
   - npm run dev
   - Open http://localhost:3000

(Windows PowerShell example)
- $env:DATABASE_URL = 'postgresql://...'
- npx prisma migrate dev --name init

## Environment variables
Create `.env` (don't commit secrets). Example `.env.example`:

````properties
DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="a-very-long-random-string"
EMAIL_USER="you@example.com"
EMAIL_PASSWORD="your-app-password"
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
NEXT_PUBLIC_STACK_PROJECT_ID="..."
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="..."
STACK_SECRET_SERVER_KEY="..."
````
