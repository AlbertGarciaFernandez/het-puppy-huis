# Het Puppy Huis

Website for Het Puppy Huis and Puppy Hunter Mansion. The frontend is a Vite React app, with a small Supabase-backed gallery API exposed through Vercel Functions.

## Requirements

- Node.js 22+
- npm
- Supabase project with the gallery schema applied

## Local Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local`
3. Fill in `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `GALLERY_SESSION_SECRET`
4. Start the gallery API: `npm run dev:api`
5. Start the frontend in another terminal: `npm run dev`

The Vite dev server proxies `/api/*` to `http://localhost:3001` when `VITE_GALLERY_API_URL` is empty.

## Scripts

- `npm run dev`: start the Vite frontend on port 5000
- `npm run dev:api`: start the local gallery API on port 3001
- `npm run build`: build the production frontend
- `npm run lint`: run TypeScript checks
- `npm test`: run the test suite
- `npm run gallery:hash-password -- <password>`: generate a bcrypt hash for album passwords

## Gallery Deployment

The Vercel serverless entrypoint is `api/gallery/[...path].ts`, which mounts the existing Express gallery API.

Set these environment variables in Vercel:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GALLERY_SESSION_SECRET`
- `GALLERY_PHOTOS_BUCKET` optional, defaults to `gallery-private`
- `FRONTEND_ORIGIN` optional

After deploy, `https://www.hetpuppyhuis.com/api/gallery/albums` should return JSON.
