import pool from './database.mjs';
import { formatSprint } from '../utils.mjs';

export async function getSprints() {
  const result = await pool.query(
    `
      SELECT *
      FROM sprint_board
    `
  );

  return result.rows.map(formatSprint);
}

export async function addSprint(sprintInfo) {
  const { name, startDate, endDate } = sprintInfo;

  const result = await pool.query(
    `
      INSERT INTO sprint_board (name, start_date, end_date)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [name, startDate, endDate]
  );

  return formatSprint(result.rows[0]);
}

export async function getSprint(sprintID) {
  const result = await pool.query(
    `
      SELECT *
      FROM sprint_board
      WHERE sprint_id = $1
    `,
    [sprintID]
  );

  return formatSprint(result.rows[0]);
}

export async function modifySprint(sprintID, sprintInfo) {
  const { name, startDate, endDate } = sprintInfo;

  const result = await pool.query(
    `
      UPDATE sprint_board
      SET name = $1,
          start_date = $2,
          end_date = $3
      WHERE sprint_id = $4
      RETURNING *
    `,
    [name, startDate, endDate, sprintID]
  );

  return formatSprint(result.rows[0]);
}

export async function deleteSprint(sprintID) {
  const result = await pool.query(
    `
      DELETE FROM sprint_board
      WHERE sprint_id = $1
    `,
    [sprintID]
  );

  return result.rowCount;
}

export async function getSprintNames() {
  const result = await pool.query(
    `
      SELECT sprint_id, name
      FROM sprint_board
    `
  );

  return result.rows.map((sprintName) => ({
    sprintID: sprintName.sprint_id,
    name: sprintName.name,
  }));
}

export async function getTotalStoryPoints(sprintID) {
  const result = await pool.query(
    `
      SELECT SUM(story_point)
      FROM tasks
      WHERE sprint_id = $1
    `,
    [sprintID]
  );

  return Number(result.rows[0].sum);
}

export async function getCompletedStoryPoints(sprintID) {
  const result = await pool.query(
    `
      SELECT SUM(story_point)
      FROM tasks
      WHERE sprint_id = $1 AND status = 'Completed'
    `,
    [sprintID]
  );
  return Number(result.rows[0].sum);
}
