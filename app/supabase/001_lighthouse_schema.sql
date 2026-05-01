-- Lighthouse Internal Prospecting Tool Schema
-- Run this in: Supabase Dashboard → SQL Editor

-- ── Enable extensions ────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── personas ─────────────────────────────────────────────────────────────────
create table personas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  description text,
  filters jsonb default '{}',
  -- filters shape: { city, state, category, rating_min, max_reviews, no_website }
  active boolean default true
);

-- ── leads ─────────────────────────────────────────────────────────────────────
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Google Places data
  place_id text unique not null,
  business_name text not null,
  address text,
  city text,
  state text,
  phone text,
  website text,
  rating numeric(3,1),
  review_count integer,
  category text,

  -- Enriched contact data
  email text,
  contact_name text,
  contact_title text,
  linkedin_url text,

  -- Workflow state
  status text not null default 'new',
  -- new | enriched | enrolled | replied | booked | disqualified

  persona_id uuid references personas(id) on delete set null,
  notes text,
  source text default 'google_places'
);

create index leads_status_idx on leads(status);
create index leads_persona_idx on leads(persona_id);

-- updated_at trigger
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at
  before update on leads
  for each row execute function set_updated_at();

-- ── cadences ─────────────────────────────────────────────────────────────────
create table cadences (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  description text,
  persona_id uuid references personas(id) on delete set null,
  active boolean default true
);

-- ── cadence_steps ─────────────────────────────────────────────────────────────
create table cadence_steps (
  id uuid primary key default gen_random_uuid(),
  cadence_id uuid references cadences(id) on delete cascade,
  step_number integer not null,
  delay_days integer not null default 0,
  type text not null default 'email', -- email | note
  subject text,
  body text not null,
  active boolean default true,
  unique (cadence_id, step_number)
);

-- ── enrollments ───────────────────────────────────────────────────────────────
create table enrollments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  lead_id uuid not null references leads(id) on delete cascade,
  cadence_id uuid not null references cadences(id) on delete cascade,
  current_step integer default 0,
  status text not null default 'active',
  -- active | paused | replied | unsubscribed | completed | bounced
  next_send_at timestamptz default now(),
  unique (lead_id, cadence_id)
);

create index enrollments_next_send_idx on enrollments(next_send_at) where status = 'active';

-- ── email_sends ───────────────────────────────────────────────────────────────
create table email_sends (
  id uuid primary key default gen_random_uuid(),
  sent_at timestamptz default now(),
  enrollment_id uuid references enrollments(id) on delete cascade,
  step_id uuid references cadence_steps(id) on delete set null,
  lead_id uuid references leads(id) on delete cascade,
  to_email text not null,
  subject text,
  resend_id text,
  status text not null default 'sent',
  -- sent | delivered | opened | clicked | bounced | failed
  opened_at timestamptz,
  clicked_at timestamptz,
  replied_at timestamptz
);

create index email_sends_lead_idx on email_sends(lead_id);

-- ── call_logs ─────────────────────────────────────────────────────────────────
create table call_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  lead_id uuid not null references leads(id) on delete cascade,
  notes text,
  outcome text,
  -- answered | voicemail | no_answer | callback_requested | not_interested
  duration_minutes integer
);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Only authenticated users (admin) can access these tables
alter table personas enable row level security;
alter table leads enable row level security;
alter table cadences enable row level security;
alter table cadence_steps enable row level security;
alter table enrollments enable row level security;
alter table email_sends enable row level security;
alter table call_logs enable row level security;

-- Policy: authenticated users have full access (service_role bypasses RLS anyway)
create policy "authenticated full access" on personas for all to authenticated using (true) with check (true);
create policy "authenticated full access" on leads for all to authenticated using (true) with check (true);
create policy "authenticated full access" on cadences for all to authenticated using (true) with check (true);
create policy "authenticated full access" on cadence_steps for all to authenticated using (true) with check (true);
create policy "authenticated full access" on enrollments for all to authenticated using (true) with check (true);
create policy "authenticated full access" on email_sends for all to authenticated using (true) with check (true);
create policy "authenticated full access" on call_logs for all to authenticated using (true) with check (true);

-- ── Seed: default persona & cadence ──────────────────────────────────────────
insert into personas (name, description, filters) values (
  'Local SMB — No Website',
  'Businesses with 4.5+ rating, 20+ reviews, no website. Primary Lighthouse ICP.',
  '{"rating_min": 4.5, "min_reviews": 20, "no_website": true}'
);

insert into cadences (name, description) values (
  'Lighthouse Intro — 5 Touch',
  '5-email sequence introducing the Lighthouse AI Sales Platform.'
);

-- Seed cadence steps (update cadence_id after running above)
-- Use: select id from cadences where name = 'Lighthouse Intro — 5 Touch';
