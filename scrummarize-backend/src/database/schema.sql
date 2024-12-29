CREATE DATABASE Scrummarize;

\c Scrummarize;

CREATE TYPE PriorityRatingEnum AS ENUM ('Low', 'Medium', 'Important', 'Urgent');
CREATE TYPE StatusEnum AS ENUM ('Not Started', 'In Progress', 'Completed');
CREATE TYPE StageEnum AS ENUM ('Planning', 'Development', 'Integration', 'Testing');
CREATE TYPE TagEnum AS ENUM ('Frontend', 'Backend', 'API', 'Database', 'Framework', 'UI', 'UX');

CREATE TABLE IF NOT EXISTS Backlog(
    ID BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    storyPoint INT NOT NULL CHECK (storyPoint >= 0 AND storyPoint <= 100),
    priorityRating PriorityRatingEnum NOT NULL,
    assignee VARCHAR(255),
    status StatusEnum NOT NULL,
    stage StageEnum NOT NULL
);

CREATE TABLE IF NOT EXISTS TaskTags(
    taskID BIGINT NOT NULL REFERENCES Backlog(ID) ON DELETE CASCADE,
    tagName TagEnum NOT NULL,
    PRIMARY KEY (taskID, tagName)
);
