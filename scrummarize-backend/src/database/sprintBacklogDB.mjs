import { formatSBTask, formatTimeSpentLog } from '../utils.mjs';
import pool from './database.mjs';

export async function getSBNotStartedTasks(sprintID) {
  const result = await pool.query(
    `
      SELECT *
      FROM tasks
      WHERE status = 'Not Started' AND sprint_id = $1 AND stage != 'Planning'
    `,
    [sprintID]
  );

  return result.rows.map(formatSBTask);
}

export async function getSBInProgressTasks(sprintID) {
  const result = await pool.query(
    `
      SELECT *
      FROM tasks
      WHERE status = 'In Progress' AND sprint_id = $1 AND stage != 'Planning'
    `,
    [sprintID]
  );

  return result.rows.map(formatSBTask);
}

export async function getSBCompletedTasks(sprintID) {
  const result = await pool.query(
    `
      SELECT *
      FROM tasks
      WHERE status = 'Completed' AND sprint_id = $1 AND stage != 'Planning'
    `,
    [sprintID]
  );

  return result.rows.map(formatSBTask);
}

export async function getSBTask(taskID, sprintID) {
  const result = await pool.query(
    `
      SELECT *
      FROM tasks
      WHERE task_id = $1 AND sprint_id = $2 AND stage != 'Planning'
    `,
    [taskID, sprintID]
  );

  return formatSBTask(result.rows[0]);
}

export async function modifySBTask(taskID, sprintID, taskInfo) {
  const { name, description, storyPoint, priorityRating, assignee, stage } =
    taskInfo;

  const result = await pool.query(
    `
      UPDATE tasks
      SET 
        name = $1,
        description = $2,
        story_point = $3,
        priority_rating = $4,
        assignee = $5,
        stage = $6
      WHERE task_id = $7 AND sprint_id = $8 AND stage != 'Planning'
      RETURNING *
    `,
    [
      name,
      description,
      storyPoint,
      priorityRating,
      assignee,
      stage,
      taskID,
      sprintID,
    ]
  );

  return formatSBTask(result.rows[0]);
}

export async function logTimeSpent(taskID, timeSpent) {
  const result = await pool.query(
    `
      INSERT INTO time_spent_log(
        task_id,
        time_spent,
        time_spent_at
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [taskID, timeSpent, new Date()]
  );

  return result.rows[0];
}

export async function getTotalTimeSpent(taskID) {
  const result = await pool.query(
    `
      SELECT SUM(time_spent)
      FROM time_spent_log
      WHERE task_id = $1
    `,
    [taskID]
  );

  return result.rows[0].sum || 0;
}

export async function getTimeSpentLog(taskID) {
  const result = await pool.query(
    `
      SELECT *
      FROM time_spent_log
      WHERE task_id = $1
    `,
    [taskID]
  );

  return result.rows.map(formatTimeSpentLog);
}

export async function deleteSBTask(taskID, sprintID) {
  const result = await pool.query(
    `
      UPDATE tasks
      SET 
        sprint_id = NULL,
        status = 'Not Started',
        stage = 'Planning',
        complete_at = NULL
      WHERE task_id = $1 AND sprint_id = $2 AND stage != 'Planning'
      RETURNING *
    `,
    [taskID, sprintID]
  );

  return result.rows[0];
}

export async function modifySBTaskStatus(taskID, sprintID, status) {
  let result;
  if (status === 'Completed') {
    result = await pool.query(
      `
        UPDATE tasks
        SET
          status = $1,
          complete_at = now()
        WHERE task_id = $2 AND sprint_id = $3 AND stage != 'Planning'
        RETURNING status
      `,
      [status, taskID, sprintID]
    );
  } else {
    result = await pool.query(
      `
        UPDATE tasks
        SET
          status = $1,
          complete_at = NULL
        WHERE task_id = $2 AND sprint_id = $3 AND stage != 'Planning'
        RETURNING status
      `,
      [status, taskID, sprintID]
    );
  }

  return result.rows[0];
}
