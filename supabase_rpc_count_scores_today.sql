
-- Create this function in Supabase SQL editor. It returns count of today's plays for a fid (UTC day).
create or replace function rpc_count_scores_today(p_fid text)
returns table(count bigint) as $$
  select count(*)::bigint as count
  from scores
  where fid = p_fid
    and created_at >= date_trunc('day', now() at time zone 'utc');
$$ language sql stable;
