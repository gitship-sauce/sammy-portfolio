-- The projects shown on the site. The picture is saved in the same row.
create table projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  what_it_does text not null,
  what_i_did text not null,
  link text,
  picture bytea,
  picture_type text
);
