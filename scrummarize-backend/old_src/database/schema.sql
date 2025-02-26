CREATE DATABASE scrummarize;

\c scrummarize;

CREATE TABLE sprint_board(
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

CREATE TABLE tasks(
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

CREATE TABLE task_tags(
    task_id bigint NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
    tag_value task_tag NOT NULL,
    PRIMARY KEY (task_id, tag_value)
);

CREATE TYPE user_role AS ENUM ('Admin', 'Member');

CREATE TABLE users(
    user_id bigserial PRIMARY KEY,
    username varchar(255) NOT NULL CHECK(length(username) > 0) UNIQUE,
    password varchar(255) NOT NULL CHECK(length(password) > 0),
    role user_role NOT NULL
);

CREATE TABLE time_spent_log(
    id bigserial PRIMARY KEY,
    task_id bigint NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
    time_spent int NOT NULL,
    time_spent_at timestamptz NOT NULL,
    user_id bigint NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TYPE change_type AS ENUM ('Create', 'Update', 'Move');

CREATE TABLE history_log(
    id bigserial PRIMARY KEY,
    task_id bigint NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
    user_id bigint NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    changed_at timestamptz NOT NULL,
    changed_type change_type NOT NULL
);
