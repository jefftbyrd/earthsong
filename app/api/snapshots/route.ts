import { NextResponse } from 'next/server';
import { createSnapshot } from '../../../database/snapshots';
import {
  type Snapshot,
  snapshotSchema,
} from '../../../migrations/00002-createTableSnapshots';
import { getCookie } from '../../../util/cookies';

export type CreateSnapshotResponseBodyPost =
  | {
      snapshot: { textContent: Snapshot['textContent'] };
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateSnapshotResponseBodyPost>> {
  // Task: Create a snapshot for the current logged in user
  // 1. Get the snapshot data from the request
  const body = await request.json();

  // 2. Validate snapshots data with zod
  const result = snapshotSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request does not contain snapshot object' },
      {
        status: 400,
      },
    );
  }

  // 3. Get the token from the cookie
  const sessionTokenCookie = await getCookie('sessionToken');

  // 4. Create the snapshot
  const newSnapshot =
    sessionTokenCookie &&
    (await createSnapshot(
      sessionTokenCookie,
      result.data.title,
      result.data.textContent,
    ));

  // 5. If the snapshot creation fails, return an error
  if (!newSnapshot) {
    return NextResponse.json(
      { error: 'Snapshot not created or access denied creating snapshot' },
      {
        status: 400,
      },
    );
  }

  // 6. Return the text content of the note
  return NextResponse.json({
    snapshot: { textContent: newSnapshot.textContent },
  });
}
