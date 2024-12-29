CREATE DATABASE scrummarize;

\c scrummarize;

CREATE TYPE task_priority_rating AS ENUM ('low', 'medium', 'important', 'urgent');
CREATE TYPE task_status AS ENUM ('not started', 'in progress', 'completed');
CREATE TYPE task_stage AS ENUM ('planning', 'development', 'integration', 'testing');
CREATE TYPE task_tag AS ENUM ('frontend', 'backend', 'api', 'database', 'framework', 'ui', 'ux');

CREATE TABLE IF NOT EXISTS backlog(
    task_id bigserial PRIMARY KEY,
    name varchar(255) NOT NULL CHECK (length(name) > 0),
    description text NOT NULL,
    story_point int NOT NULL CHECK (story_point >= 0 AND story_point <= 100),
    priority_rating task_priority_rating NOT NULL,
    assignee varchar(255),
    status task_status NOT NULL,
    stage task_stage NOT NULL
);

CREATE TABLE IF NOT EXISTS task_tags(
    task_id bigint NOT NULL REFERENCES backlog(task_id) ON DELETE CASCADE,
    tag_value task_tag NOT NULL,
    PRIMARY KEY (task_id, tag_value)
);
