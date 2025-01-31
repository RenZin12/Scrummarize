import { formatUser } from '../utils.mjs';
import pool from './database.mjs';

export async function findUserByUsername(username) {
  let result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE username = $1
    `,
    [username]
  );
  result = result.rows.map(formatUser);
  return result[0];
}

export async function findUserByUserID(userID) {
  let result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE user_id = $1
    `,
    [userID]
  );
  result = result.rows.map(formatUser);
  return result[0];
}

export async function addUser(username, password) {
  const result = await pool.query(
    `
    INSERT INTO users (
      username,
      password
    )
    VALUES ($1, $2)
    `,
    [username, password]
  );
  return result.rowCount;
}
