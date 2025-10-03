
-- Run this in Supabase SQL editor
create table if not exists scores (
  id bigserial primary key,
  fid text not null,
  username text,
  score integer not null,
  created_at timestamptz default now()
);
create index if not exists idx_scores_created_at on scores(created_at);
create index if not exists idx_scores_fid_created_at on scores(fid, created_at);
