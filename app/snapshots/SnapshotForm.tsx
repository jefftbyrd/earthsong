'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import type { User } from '../../migrations/00000-createTableUsers';
import type { Snapshot } from '../../migrations/00002-createTableSnapshots';
import type { CreateSnapshotResponseBodyPost } from '../api/snapshots/route';
import SnapshotItem from '../components/SnapshotItem';
import styles from '../components/ui.module.scss';

// import ErrorMessage from '../ErrorMessage';
// import styles from './SnapshotsForm.module.scss';

type Props = {
  user: User;
  snapshots: Snapshot[];
};

export default function SnapshotsForm(props: Props) {
  // const [title, setTitle] = useState('');
  // const [textContent, setTextContent] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  // const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <p>Welcome, {props.user.username}.</p>
        <h1>Return to a saved place</h1>
        <div className={styles.snapshots}>
          {props.snapshots.length === 0 ? (
            'No snapshots yet'
          ) : (
            <ul>
              {props.snapshots.map((snapshot) => (
                <li key={`snapshots-${snapshot.id}`}>
                  <SnapshotItem snapshot={snapshot} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <LogoutButton />
        <button className={styles.uiButton} onClick={() => {}}>
          About Earth Song
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
