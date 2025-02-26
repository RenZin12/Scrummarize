import pool from './database.mjs';

export async function logEntry(taskID, userID, changed_type) {
  const result = await pool.query(
    `
    INSERT INTO history_log (
      task_id,
      user_id,
      changed_at,
      changed_type
    )
    VALUES ($1, $2, $3, $4)
    `,
    [taskID, userID, new Date(), changed_type]
  );

  return result.rowCount;
}

export async function getLogEntries(taskID) {
  const result = await pool.query(
    `
    SELECT history_log.id, changed_at, changed_type, username
    FROM history_log
    INNER JOIN users
      ON history_log.user_id = users.user_id
    WHERE task_id = $1
    `,
    [taskID]
  );

  return result.rows.map(({ id, changed_at, changed_type, username }) => ({
    id,
    changedAt: changed_at,
    changedType: changed_type,
    username,
  }));
}
