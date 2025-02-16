import pool from './database.mjs';

export async function getUserTotalTimeSpent(userID, startDate, endDate) {
  const result = await pool.query(
    `
    SELECT sum(time_spent)
    FROM time_spent_log
    WHERE user_id = $1 AND time_spent_at >= $2 AND time_spent_at <= $3
    `,
    [userID, startDate, endDate]
  );

  return result.rows[0].sum;
}

export async function getUserTimeSpentData(userID, startDate, endDate) {
  const result = await pool.query(
    `
    SELECT time_spent, time_spent_at
    FROM time_spent_log
    WHERE user_id = $1 AND time_spent_at >= $2 AND time_spent_at <= $3
    `,
    [userID, startDate, endDate]
  );

  return result.rows.map(({ time_spent, time_spent_at }) => ({
    timeSpent: time_spent,
    timeSpentAt: time_spent_at,
  }));
}
