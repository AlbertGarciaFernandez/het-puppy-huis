create extension if not exists pgcrypto;

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  cover_image_url text not null,
  password_hash text not null,
  access_duration_minutes integer not null default 45 check (access_duration_minutes > 0),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.album_photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums(id) on delete cascade,
  storage_path text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (album_id, storage_path)
);

create index if not exists albums_is_published_created_at_idx
  on public.albums (is_published, created_at desc);

create index if not exists album_photos_album_id_sort_order_idx
  on public.album_photos (album_id, sort_order, created_at);

comment on table public.albums is 'Public gallery album metadata with a per-album password hash.';
comment on table public.album_photos is 'Private storage paths for album photos stored in Supabase Storage.';

-- Bucket setup
-- 1. Create a private bucket called `gallery-private` for the real photos.
-- 2. Keep `cover_image_url` in albums pointing at a public cover image URL.
-- 3. Generate password hashes locally with:
--    npm run gallery:hash-password -- "your-password"
