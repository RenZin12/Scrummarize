CREATE DATABASE scrummarize;

\c scrummarize;

CREATE TABLE IF NOT EXISTS sprint_board(
    sprint_id bigserial PRIMARY KEY,
    name varchar(255) NOT NULL CHECK (length(name) > 0),
    start_date timestamptz NOT NULL,
    end_date timestamptz NOT NULL,
    CHECK (start_date <= end_date)
);

CREATE TYPE task_priority_rating AS ENUM ('Low', 'Medium', 'Important', 'Urgent');
CREATE TYPE task_status AS ENUM ('Not Started', 'In Progress', 'Completed');
CREATE TYPE task_stage AS ENUM ('Planning', 'Development', 'Integration', 'Testing');
CREATE TYPE task_tag AS ENUM ('Frontend', 'Backend', 'API', 'Database', 'Framework', 'Testing', 'UI', 'UX');

CREATE TABLE IF NOT EXISTS tasks(
    task_id bigserial PRIMARY KEY,
    name varchar(255) NOT NULL CHECK (length(name) > 0),
    description text NOT NULL,
    story_point int NOT NULL CHECK (story_point >= 0 AND story_point <= 100),
    priority_rating task_priority_rating NOT NULL,
    assignee varchar(255),
    status task_status NOT NULL,
    stage task_stage NOT NULL,
    sprint_id bigint REFERENCES sprint_board(sprint_id) ON DELETE CASCADE,
    complete_at timestamptz
);

CREATE TABLE IF NOT EXISTS task_tags(
    task_id bigint NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
    tag_value task_tag NOT NULL,
    PRIMARY KEY (task_id, tag_value)
);

CREATE TABLE IF NOT EXISTS time_spent_log(
    task_id bigint NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
    time_spent int NOT NULL,
    time_spent_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
    user_id bigserial PRIMARY KEY,
    username varchar(255) NOT NULL CHECK(length(username) > 0) UNIQUE,
    password varchar(255) NOT NULL CHECK(length(password) > 0)
);
