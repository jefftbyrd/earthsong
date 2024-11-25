import { cache } from 'react';
import type { Session } from '../migrations/00001-sessions';
import type { Snapshot } from '../migrations/00002-createTableSnapshots';
import { sql } from './connect';

export const getSnapshots = cache(async (sessionToken: string) => {
  const snapshots = await sql<Snapshot[]>`
    SELECT
      snapshots.*
    FROM
      snapshots
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = snapshots.user_id
        AND expiry_timestamp > now()
      )
  `;
  return snapshots;
});

export const getSnapshot = cache(
  async (sessionToken: string, snapshotId: number) => {
    const [snapshot] = await sql<Snapshot[]>`
      SELECT
        snapshots.*
      FROM
        snapshots
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.user_id = snapshots.user_id
          AND expiry_timestamp > now()
        )
      WHERE
        snapshots.id = ${snapshotId}
    `;
    return snapshot;
  },
);

export const createSnapshot = cache(
  async (sessionToken: Session['token'], sounds: string) => {
    const [snapshot] = await sql<Snapshot[]>`
      INSERT INTO
        snapshots (user_id, sounds) (
          SELECT
            sessions.user_id,
            ${sounds}
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        snapshots.*
    `;

    return snapshot;
  },
);
