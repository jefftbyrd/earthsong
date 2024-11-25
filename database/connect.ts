import type { Sql } from 'postgres';
import postgres from 'postgres';
import { postgresConfig, setEnvironmentVariables } from '../util/config';

('server-only');

setEnvironmentVariables();

declare namespace globalThis {
  let postgresSqlClient: Sql;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres(postgresConfig);
  }

  return globalThis.postgresSqlClient;
}

// Connect to PostgreSQL
export const sql = connectOneTimeToDatabase();
