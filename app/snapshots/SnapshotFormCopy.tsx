'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { User } from '../../migrations/00000-createTableUsers';
import type { Snapshot } from '../../migrations/00002-createTableSnapshots';
import type { CreateSnapshotResponseBodyPost } from '../api/snapshots/route';
import ErrorMessage from '../ErrorMessage';
import styles from './SnapshotsForm.module.scss';

type Props = {
  user: User;
  snapshots: Snapshot[];
};

export default function SnapshotsForm(props: Props) {
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <>
      {console.log('snapshots on snapshotForm', props.snapshots)}
      <h1>Snapshots for {props.user.username}</h1>

      <div className={styles.snapshots}>
        <div>
          {props.snapshots.length === 0 ? (
            'No snapshots yet'
          ) : (
            <ul>
              {props.snapshots.map((snapshot) => (
                <li key={`snapshots-${snapshot.id}`}>
                  <Link href={`/snapshots/${snapshot.id}`}>
                    {snapshot.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* <div className={styles.snapshotsForm}>
          <div>
            <h2>Create Snapshot</h2>

            <form
              onSubmit={async (event) => {
                event.preventDefault();

                const response = await fetch('/api/snapshots', {
                  method: 'POST',
                  body: JSON.stringify({
                    title,
                    textContent,
                  }),
                });

                setErrorMessage('');

                if (!response.ok) {
                  const responseBody: CreateSnapshotResponseBodyPost =
                    await response.json();

                  if ('error' in responseBody) {
                    // TODO: Use toast instead of showing
                    // this below creation / update form
                    setErrorMessage(responseBody.error);
                    return;
                  }
                }

                setTitle('');
                setTextContent('');

                router.refresh();
              }}
            >
              <label>
                Title
                <input
                  value={title}
                  onChange={(event) => setTitle(event.currentTarget.value)}
                />
              </label>

              <label>
                Snapshot
                <input
                  value={textContent}
                  onChange={(event) =>
                    setTextContent(event.currentTarget.value)
                  }
                />
              </label>

              <button>Add Snapshot</button>
            </form>

            <ErrorMessage>{errorMessage}</ErrorMessage>
          </div>
        </div> */}
      </div>
    </>
  );
}
