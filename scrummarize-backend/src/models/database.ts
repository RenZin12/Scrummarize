import pg from 'pg';
import env from '../env';

const { Pool } = pg;
const pool = new Pool({
  host: env.POSTGRESQL_HOST,
  database: env.POSTGRESQL_DATABASE,
  port: env.POSTGRESQL_PORT,
  user: env.POSTGRESQL_USER,
  password: env.POSTGRESQL_PASSWORD,
});

export default pool;
