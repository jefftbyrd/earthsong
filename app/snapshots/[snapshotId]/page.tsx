import Link from 'next/link';
import { getSnapshot } from '../../../database/snapshots';
import { getCookie } from '../../../util/cookies';

type Props = {
  params: Promise<{
    snapshotId: string;
  }>;
};
export default async function SnapshotPage({ params }: Props) {
  // Task: Restrict access to the snapshot page only to the user who created the snapshot
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = await getCookie('sessionToken');

  // 2. Query the snapshots with the session token and snapshotId
  const snapshot =
    sessionTokenCookie &&
    (await getSnapshot(sessionTokenCookie, Number((await params).snapshotId)));

  // 3. If there is no snapshot for the current user, show restricted access message
  if (!snapshot) {
    return (
      <div>
        <h1>Access Denied</h1>
        <div>You do not have permission to access this snapshot</div>
        <Link href="/snapshots">Back to snapshots</Link>
      </div>
    );
  }

  // 4. Finally display the snapshots created by the current user
  return (
    <div>
      <h1>{snapshot.title}</h1>

      <div>
        <h2>Sounds included in this snapshot</h2>
        {snapshot.sounds.length === 0 ? (
          'No snapshots yet'
        ) : (
          <ol>
            {snapshot.sounds.map((sound) => (
              <li key={`sounds-${sound.id}`}>{sound.name}</li>
            ))}
          </ol>
        )}
      </div>
      {/* {console.log('snapshot sounds on snapshotId', snapshot.sounds)} */}
      <Link href="/snapshots">Back to snapshots</Link>
    </div>
  );
}
