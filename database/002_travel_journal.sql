-- Additive migration: AI Travel Journal & Blog Creator.
-- Run after schema.sql. Storage bucket creation and object policies are configured
-- separately in Supabase Storage; keep the bucket PRIVATE.

create type public.media_kind as enum ('image', 'video');
create type public.media_status as enum ('pending_upload', 'uploaded', 'processing', 'ready', 'failed', 'deleted');
create type public.blog_status as enum ('draft', 'published', 'unpublished', 'archived');
create type public.blog_style as enum ('personal_diary', 'cinematic', 'informative', 'family_friendly', 'social_caption');

create table public.trip_media (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind public.media_kind not null,
  status public.media_status not null default 'pending_upload',
  storage_bucket text not null default 'private-trip-media',
  storage_path text not null unique,
  public_derivative_path text unique,
  original_filename text,
  mime_type text not null,
  file_size_bytes bigint not null check (file_size_bytes > 0),
  checksum_sha256 text,
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  duration_seconds numeric(10,2) check (duration_seconds is null or duration_seconds >= 0),
  captured_at timestamptz,
  -- Location metadata is private and never copied to public derivatives by default.
  private_metadata jsonb not null default '{}'::jsonb,
  exif_stripped boolean not null default false,
  processing_error_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (id, trip_id, user_id)
);
create index trip_media_owner_trip_idx on public.trip_media(user_id, trip_id, created_at desc);
create index trip_media_status_idx on public.trip_media(status) where status in ('pending_upload','processing','failed');

create table public.travel_memories (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  note text,
  memory_date date,
  mood text,
  location_label text,
  food_notes text,
  stay_notes text,
  hospitality_notes text,
  expense_total_inr integer check (expense_total_inr is null or expense_total_inr >= 0),
  is_favourite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, trip_id, user_id)
);
create index travel_memories_owner_date_idx on public.travel_memories(user_id, memory_date desc nulls last);

create table public.memory_media (
  memory_id uuid not null references public.travel_memories(id) on delete cascade,
  media_id uuid not null references public.trip_media(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  sort_order integer not null default 0,
  caption text,
  primary key (memory_id, media_id)
);

create table public.memory_tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  memory_id uuid not null references public.travel_memories(id) on delete cascade,
  tag text not null check (length(trim(tag)) between 1 and 40),
  created_at timestamptz not null default now(),
  unique (memory_id, tag)
);
create index memory_tags_owner_tag_idx on public.memory_tags(user_id, tag);

create table public.travel_blogs (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  slug text unique,
  status public.blog_status not null default 'draft',
  style public.blog_style not null default 'personal_diary',
  language text not null default 'en' check (language in ('en','mr','hi')),
  intro text,
  body_markdown text not null default '',
  structured_content jsonb not null default '{}'::jsonb,
  generated_by text,
  generation_template_version text,
  generated_at timestamptz,
  published_at timestamptz,
  unpublished_at timestamptz,
  include_author_name boolean not null default false,
  public_author_label text,
  allow_search_indexing boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status <> 'published') or (slug is not null and published_at is not null))
);
create index travel_blogs_owner_idx on public.travel_blogs(user_id, updated_at desc);
create index travel_blogs_public_slug_idx on public.travel_blogs(slug) where status = 'published';

create table public.blog_media (
  blog_id uuid not null references public.travel_blogs(id) on delete cascade,
  media_id uuid not null references public.trip_media(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  sort_order integer not null default 0,
  public_caption text,
  include_in_public boolean not null default false,
  primary key (blog_id, media_id)
);

create table public.blog_shares (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.travel_blogs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  action text not null check (action in ('published','unpublished','link_rotated')),
  created_at timestamptz not null default now(),
  actor_user_id uuid not null references auth.users(id) on delete restrict
);
create index blog_shares_blog_idx on public.blog_shares(blog_id, created_at desc);

-- Ownership consistency: prevent attaching another user's media to a trip/blog/memory.
create or replace function public.assert_trip_media_owner()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (
    select 1 from public.trip_media m
    join public.trips t on t.id = m.trip_id
    where m.id = new.media_id and m.user_id = new.user_id
      and t.user_id = new.user_id
  ) then
    raise exception 'media does not belong to this user';
  end if;
  return new;
end;
$$;
create trigger memory_media_owner_guard before insert or update on public.memory_media
for each row execute function public.assert_trip_media_owner();
create trigger blog_media_owner_guard before insert or update on public.blog_media
for each row execute function public.assert_trip_media_owner();

-- RLS: private owner-only records. Policies deliberately do not expose media objects.
alter table public.trip_media enable row level security;
alter table public.travel_memories enable row level security;
alter table public.memory_media enable row level security;
alter table public.memory_tags enable row level security;
alter table public.travel_blogs enable row level security;
alter table public.blog_media enable row level security;
alter table public.blog_shares enable row level security;

create policy "trip media owner all" on public.trip_media for all
using (auth.uid() = user_id and exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()))
with check (auth.uid() = user_id and exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()));
create policy "travel memory owner all" on public.travel_memories for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "memory media owner all" on public.memory_media for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "memory tags owner all" on public.memory_tags for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "travel blog owner all" on public.travel_blogs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "blog media owner all" on public.blog_media for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "blog shares owner read" on public.blog_shares for select using (auth.uid() = user_id);
create policy "blog shares owner insert" on public.blog_shares for insert with check (auth.uid() = user_id and actor_user_id = auth.uid());

-- Anonymous public access is intentionally NOT granted to base tables.
-- Serve public blogs via a server route or a narrowly scoped SECURITY DEFINER RPC/view
-- that returns only published blog fields and explicitly included sanitized derivatives.
-- Never expose storage_path, private_metadata, trip_id, user_id, or original media URLs.

create or replace function public.assert_memory_blog_owner()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_table_name = 'memory_media' then
    if not exists (select 1 from public.travel_memories m where m.id = new.memory_id and m.user_id = new.user_id) then
      raise exception 'memory does not belong to this user';
    end if;
  elsif tg_table_name = 'blog_media' then
    if not exists (select 1 from public.travel_blogs b where b.id = new.blog_id and b.user_id = new.user_id) then
      raise exception 'blog does not belong to this user';
    end if;
  end if;
  return new;
end;
$$;
create trigger memory_media_parent_guard before insert or update on public.memory_media
for each row execute function public.assert_memory_blog_owner();
create trigger blog_media_parent_guard before insert or update on public.blog_media
for each row execute function public.assert_memory_blog_owner();
