import pool from "./database.mjs"
import { formatTask } from "../utils.mjs"

export async function getPBTasks() {
    const result = await pool.query(`
        SELECT *
        FROM backlog
    `)

    const tasks = result.rows.map(formatTask)

    return tasks
}

export async function addPBTask(taskInfo) {
    const { name, description, storyPoint, priorityRating, assignee, status, stage } = taskInfo

    const result = await pool.query(`
        INSERT INTO backlog (name, description, story_point, priority_rating, assignee, status, stage)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `, [name, description, storyPoint, priorityRating, assignee, status, stage])

    const newTask = formatTask(result.rows[0])

    return newTask
}

export async function getPBTaskTags(taskID) {
    const result = await pool.query(`
        SELECT tag_value
        FROM task_tags
        WHERE task_id = $1
    `, [taskID])

    const tags = result.rows.map(tag => tag.tag_value)

    return tags
}

export async function addPBTaskTags(taskID, tags) {
    const promiseTags = tags.map(async tag => {
        const result = await pool.query(`
            INSERT INTO task_tags (task_id, tag_value)
            VALUES ($1, $2)
            RETURNING tag_value
        `, [taskID, tag])

        return result.rows[0].tag_value
    })

    const addedTags = await Promise.all(promiseTags)
    
    return addedTags
}
