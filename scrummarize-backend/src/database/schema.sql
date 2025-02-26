CREATE DATABASE scrummarize;

\c scrummarize;

CREATE TYPE role AS ENUM ('Administrator', 'Member');

CREATE TABLE users (
  id bigserial PRIMARY KEY,
  username varchar(255) UNIQUE NOT NULL CHECK (length(username) > 0),
  password varchar(255) NOT NULL CHECK(length(password) > 0),
  role role NOT NULL
);

CREATE TABLE sprints (
  id bigserial PRIMARY KEY,
  name varchar(255) NOT NULL CHECK (length(name) > 0),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  CHECK (start_date <= end_date)
);

CREATE TYPE task_status AS ENUM ('Not Started', 'In Progress', 'Completed');
CREATE TYPE task_stage AS ENUM ('Planning', 'Development', 'Integration', 'Testing');

CREATE TABLE tasks (
  id bigserial PRIMARY KEY,
  name varchar(255) NOT NULL CHECK (length(name) > 0),
  description varchar(255) NOT NULL,
  priority_rating integer NOT NULL CHECK(priority_rating >= 1 AND priority_rating <= 4),
  story_points integer NOT NULL CHECK(story_points >= 0),
  assignee bigint references users(id) ON DELETE SET NULL,
  status task_status NOT NULL,
  stage task_stage NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  completed_at timestamptz,
  sprint_id bigint references sprints(id) ON DELETE CASCADE,
);

CREATE TABLE tags (
  id bigint PRIMARY KEY,
  name varchar(255) UNIQUE NOT NULL
);

CREATE TABLE task_tags (
  task_id bigint NOT NULL references tasks(id) ON DELETE CASCADE,
  tag_id bigint NOT NULL references tags(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, tag_id)
);

CREATE TABLE task_time_logs (
  id bigserial PRIMARY KEY,
  task_id bigint NOT NULL references tasks(id) ON DELETE CASCADE,
  user_id bigint NOT NULL references users(id) ON DELETE CASCADE,
  duration integer NOT NULL CHECK (duration > 0),
  time timestamptz NOT NULL DEFAULT NOW(),
);

CREATE TYPE change_action AS ENUM ('Created', 'Updated', 'Moved');

CREATE TABLE task_history_logs (
  id bigserial PRIMARY KEY,
  task_id bigint NOT NULL references tasks(id) ON DELETE CASCADE,
  user_id bigint NOT NULL references users(id) ON DELETE CASCADE,
  change_type change_action NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT NOW()
);
