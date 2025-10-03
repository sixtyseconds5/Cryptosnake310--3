
# CryptoSnake — JavaScript-only (Next.js + Tailwind + Supabase + Farcaster OAuth placeholders)

This package is a deploy-ready JavaScript Next.js app with:
- Snake game UI (Tailwind)
- OAuth login flow placeholders for Farcaster (server-side token exchange)
- Supabase integration for leaderboard & daily play limits
- SQL files included — upload ZIP to Vercel / GitHub & deploy

## Environment variables (set these in Vercel)
- SUPABASE_URL
- SUPABASE_KEY (service_role recommended for server-side)
- FARCASTER_CLIENT_ID
- FARCASTER_CLIENT_SECRET
- FARCASTER_REDIRECT_URI (e.g. https://yourdomain.com/api/auth/callback)
- NEXT_PUBLIC_SITE_URL (e.g. https://yourdomain.com)

## Supabase setup
1. Create Supabase project.
2. In SQL editor run `supabase_schema.sql` and `supabase_rpc_count_scores_today.sql`.

## Farcaster OAuth
Replace placeholder Farcaster endpoints in `/pages/api/auth/login.js` and `/pages/api/auth/callback.js` with the real Farcaster OAuth endpoints and scopes.

## Deploy
1. Push this repo to GitHub or upload ZIP to Vercel.
2. Set environment variables in Vercel.
3. Deploy — the app will be live.
