-- Maharashtra Travel Companion MVP schema
-- Target: PostgreSQL 15+ with PostGIS (Supabase supports PostGIS).
-- Run in a fresh development database after enabling the postgis extension.

create extension if not exists pgcrypto;
create extension if not exists postgis;

create type public.travel_mood as enum (
  'peaceful', 'adventure', 'beach', 'culture', 'family', 'party', 'shopping'
);

create type public.trip_status as enum ('draft', 'planned', 'completed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  home_city text,
  preferred_language text not null default 'en' check (preferred_language in ('en','mr','hi')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  district text not null,
  description text not null,
  location geography(point, 4326),
  moods public.travel_mood[] not null default '{}',
  min_days smallint not null default 1 check (min_days > 0),
  max_days smallint not null default 3 check (max_days >= min_days),
  indicative_budget_per_person_inr integer check (indicative_budget_per_person_inr >= 0),
  best_for text,
  season_note text,
  is_published boolean not null default false,
  data_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index destinations_location_gix on public.destinations using gist(location);
create index destinations_published_idx on public.destinations(is_published);

create table public.destination_tags (
  destination_id uuid not null references public.destinations(id) on delete cascade,
  tag text not null,
  primary key (destination_id, tag)
);

create table public.places (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null references public.destinations(id) on delete cascade,
  name text not null,
  category text not null check (category in ('attraction','hidden_gem','food','activity','viewpoint','temple','market','emergency')),
  description text,
  location geography(point, 4326),
  estimated_visit_minutes integer check (estimated_visit_minutes > 0),
  entry_fee_inr integer check (entry_fee_inr >= 0),
  opening_hours_note text,
  season_note text,
  source_name text,
  source_url text,
  verified_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index places_location_gix on public.places using gist(location);
create index places_destination_idx on public.places(destination_id);

create table public.stays (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null references public.destinations(id) on delete cascade,
  name text not null,
  stay_type text not null,
  address text,
  location geography(point, 4326),
  amenities text[] not null default '{}',
  price_band text,
  external_booking_url text,
  contact_phone text,
  source_name text,
  verified_at timestamptz,
  is_partner boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index stays_location_gix on public.stays using gist(location);
create index stays_destination_idx on public.stays(destination_id);

create table public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  origin text not null,
  start_date date,
  end_date date,
  people_count smallint not null check (people_count between 1 and 30),
  budget_total_inr integer check (budget_total_inr >= 0),
  mood public.travel_mood not null,
  transport_mode text not null default 'not_decided',
  status public.trip_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create index trips_user_updated_idx on public.trips(user_id, updated_at desc);

create table public.trip_days (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  day_number smallint not null check (day_number > 0),
  date date,
  notes text,
  unique (trip_id, day_number)
);

create table public.trip_items (
  id uuid primary key default gen_random_uuid(),
  trip_day_id uuid not null references public.trip_days(id) on delete cascade,
  place_id uuid references public.places(id) on delete set null,
  stay_id uuid references public.stays(id) on delete set null,
  custom_title text,
  item_type text not null check (item_type in ('travel','attraction','food','stay','activity','break')),
  start_time time,
  end_time time,
  sort_order integer not null default 0,
  estimated_cost_inr integer check (estimated_cost_inr >= 0),
  notes text,
  created_at timestamptz not null default now(),
  check (place_id is not null or stay_id is not null or custom_title is not null)
);

create index trip_items_day_order_idx on public.trip_items(trip_day_id, sort_order);

create table public.user_travel_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  preferred_moods public.travel_mood[] not null default '{}',
  preferred_stay_types text[] not null default '{}',
  budget_style text check (budget_style in ('budget','balanced','comfort','luxury')),
  accessibility_needs text,
  food_preferences text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table public.trip_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trip_id uuid references public.trips(id) on delete set null,
  destination_id uuid references public.destinations(id) on delete set null,
  stay_id uuid references public.stays(id) on delete set null,
  hospitality_rating smallint check (hospitality_rating between 1 and 5),
  cleanliness_rating smallint check (cleanliness_rating between 1 and 5),
  value_rating smallint check (value_rating between 1 and 5),
  review_text text,
  share_publicly boolean not null default false,
  moderation_status text not null default 'pending' check (moderation_status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table public.personal_travel_memory (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  memory_key text not null,
  memory_value jsonb not null,
  source text not null check (source in ('explicit_preference','trip_feedback','trip_history')),
  consented_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, memory_key)
);

-- Row-level security: users can read/update only their own profile, trips and private memory.
alter table public.profiles enable row level security;
alter table public.trips enable row level security;
alter table public.trip_days enable row level security;
alter table public.trip_items enable row level security;
alter table public.user_travel_preferences enable row level security;
alter table public.trip_feedback enable row level security;
alter table public.personal_travel_memory enable row level security;

create policy "profile owner read" on public.profiles for select using (auth.uid() = id);
create policy "profile owner insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profile owner update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "trip owner all" on public.trips for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "trip day owner all" on public.trip_days for all
  using (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()))
  with check (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()));
create policy "trip item owner all" on public.trip_items for all
  using (exists (select 1 from public.trip_days d join public.trips t on t.id = d.trip_id where d.id = trip_day_id and t.user_id = auth.uid()))
  with check (exists (select 1 from public.trip_days d join public.trips t on t.id = d.trip_id where d.id = trip_day_id and t.user_id = auth.uid()));

create policy "preferences owner all" on public.user_travel_preferences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "feedback owner read insert" on public.trip_feedback for select using (auth.uid() = user_id);
create policy "feedback owner insert" on public.trip_feedback for insert with check (auth.uid() = user_id);
create policy "memory owner all" on public.personal_travel_memory for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Public catalogue reads are intentionally restricted to published records.
alter table public.destinations enable row level security;
alter table public.destination_tags enable row level security;
alter table public.places enable row level security;
alter table public.stays enable row level security;

create policy "published destinations read" on public.destinations for select using (is_published = true);
create policy "published destination tags read" on public.destination_tags for select
  using (exists (select 1 from public.destinations d where d.id = destination_id and d.is_published = true));
create policy "published places read" on public.places for select using (is_published = true);
create policy "published stays read" on public.stays for select using (is_published = true);

-- Admin writes should be implemented through a trusted server-side role or a dedicated admin policy.
-- Never ship SUPABASE_SERVICE_ROLE_KEY to a browser.
