import {
  DBProductBacklogTask,
  InsertTask,
  ProductBacklogTask,
} from '../lib/types';
import { formatProductBacklogTasksFromDB } from '../utils/formatters';
import pool from './database';

export async function fetchProductBacklogTasksFromDB(): Promise<
  ProductBacklogTask[]
> {
  const result = await pool.query<DBProductBacklogTask>(
    `
      SELECT id, name, priority_rating, story_points, 
      COALESCE(array_agg(tt.tag_id) FILTER (WHERE tt.tag_id IS NOT NULL), '{}') as tags
        FROM tasks t LEFT JOIN task_tags tt 
          ON t.id = tt.task_id
        GROUP BY t.id
    `
  );

  return result.rows.map(formatProductBacklogTasksFromDB);
}

export async function insertProductBacklogTaskToDB(
  task: InsertTask
): Promise<void> {
  const { name, description, priorityRating, storyPoints, tags, assignee } =
    task;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result = await client.query<{ id: string }>(
      `
        INSERT INTO tasks (name, description, priority_rating, story_points, assignee)
          VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `,
      [name, description, priorityRating, storyPoints, assignee]
    );

    if (tags.length > 0) {
      const queryValues = tags.map((_, i) => `($1, $${i + 2})`).join(', ');
      await client.query(
        `
          INSERT INTO task_tags(task_id, tag_id)
            VALUES ${queryValues}
        `,
        [result.rows[0].id, ...tags]
      );
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
