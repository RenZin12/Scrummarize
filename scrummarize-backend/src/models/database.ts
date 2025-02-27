import pg from 'pg';
import env from '../env';

const pool = new pg.Pool({
  host: env.POSTGRESQL_HOST,
  database: env.POSTGRESQL_DATABASE,
  port: env.POSTGRESQL_PORT,
  user: env.POSTGRESQL_USER,
  password: env.POSTGRESQL_PASSWORD,
});

export default pool;
