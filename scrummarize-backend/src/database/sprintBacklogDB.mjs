import { formatSBTask } from '../utils.mjs';
import pool from './database.mjs';

export async function getSBNotStartedTasks(sprintID) {
  const result = await pool.query(
    `
      SELECT *
      FROM tasks
      WHERE sprint_id = $1 AND status = 'Not Started'
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
      WHERE sprint_id = $1 AND status = 'In Progress'
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
      WHERE sprint_id = $1 AND status = 'Completed'
    `,
    [sprintID]
  );

  return result.rows.map(formatSBTask);
}
