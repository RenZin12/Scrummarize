import pool from './database.mjs';

export async function getTaskTags(taskID) {
  const result = await pool.query(
    `
        SELECT tag_value
        FROM task_tags
        WHERE task_id = $1
    `,
    [taskID]
  );

  return result.rows.map((tag) => tag.tag_value);
}

export async function addTaskTags(taskID, tags) {
  const promiseTags = tags.map(async (tag) => {
    const result = await pool.query(
      `
            INSERT INTO task_tags (task_id, tag_value)
            VALUES ($1, $2)
            RETURNING tag_value
        `,
      [taskID, tag]
    );

    return result.rows[0].tag_value;
  });

  return Promise.all(promiseTags);
}

export async function deleteTaskTag(taskID) {
  const result = await pool.query(
    `
        DELETE FROM task_tags
        WHERE task_id = $1
    `,
    [taskID]
  );

  return result.rowCount;
}
