import { cache } from 'react';
import type { User } from '../migrations/00000-createTableUsers';
import type { Session } from '../migrations/00001-sessions';
import { sql } from './connect';

export const getValidSessionToken = cache(
  async (sessionToken: Session['token']) => {
    const [session] = await sql<Session[]>`
      SELECT
        sessions.token,
        sessions.user_id
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
    `;

    return session;
  },
);

export const createSessionInsecure = cache(
  async (userId: User['id'], token: Session['token']) => {
    const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (token, user_id)
      VALUES
        (
          ${token},
          ${userId}
        )
      RETURNING
        sessions.token,
        sessions.user_id
    `;

    await sql`
      DELETE FROM sessions
      WHERE
        sessions.expiry_timestamp < now()
    `;

    return session;
  },
);

export const deleteSession = cache(async (sessionToken: Session['token']) => {
  const [snapshot] = await sql<Session[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${sessionToken}
    RETURNING
      sessions.token,
      sessions.user_id
  `;

  return snapshot;
});
