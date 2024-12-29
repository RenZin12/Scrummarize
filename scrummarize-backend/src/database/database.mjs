import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
    user: "postgres",
    password: "2004",
    host: "localhost",
    port: 5432,
    database: "Scrummarize"
})

export default pool
