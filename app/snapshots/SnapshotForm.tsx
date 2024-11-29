'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import type { User } from '../../migrations/00000-createTableUsers';
import type { Snapshot } from '../../migrations/00002-createTableSnapshots';
import type { CreateSnapshotResponseBodyPost } from '../api/snapshots/route';
import styles from '../components/portal.module.scss';

// import ErrorMessage from '../ErrorMessage';
// import styles from './SnapshotsForm.module.scss';

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
    <div className={styles.modal}>
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
      </div>
      <LogoutButton />
    </div>
  );
}
