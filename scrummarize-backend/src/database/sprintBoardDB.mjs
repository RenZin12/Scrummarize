import pool from "./database.mjs";
import { formatSprint } from "../utils.mjs";

export async function getSprints() {
    const result = await pool.query(`
        SELECT *
        FROM sprint_board
    `)

    return result.rows.map(formatSprint)
}

export async function addSprint(sprintInfo) {
    const { name, startDate, endDate } = sprintInfo

    const result = await pool.query(`
        INSERT INTO sprint_board (name, start_date, end_date)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [name, startDate, endDate])

    return formatSprint(result.rows[0])
}
