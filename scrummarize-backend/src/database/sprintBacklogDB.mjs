import { formatSBTask } from '../utils.mjs';
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
