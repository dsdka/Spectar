import pkg from 'pg';
import config from './config.js';

if (!config?.database) {
  throw new Error('DateBase not set or DATABASE_URL not set.');

}

const { Pool } = pkg;

const pool = new Pool({
  user: config.database.user,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port, // default Postgres port
  database: config.database.database
});

export default pool;