// 'use client';

// import {
//   Description,
//   Dialog,
//   DialogPanel,
//   DialogTitle,
// } from '@headlessui/react';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useState } from 'react';
import React, { useState } from 'react';
// import type { User } from '../../../migrations/00000-createTableUsers';
// import type { Snapshot } from '../../migrations/00002-createTableSnapshots';
// import type { CreateSnapshotResponseBodyPost } from '../api/snapshots/route';
import ErrorMessage from '../ErrorMessage';
import styles from './portal.module.scss';

// import styles from './SnapshotsForm.module.scss';

// type Props = {
//   user: User;
//   snapshots: Snapshot[];
// };

export default function Save({ sounds, setSaveIsOpen }) {
  // console.log('closeMe', closeMe);
  // const [sounds, setSounds] = useState(props.sounds);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');

  const router = useRouter();

  return (
    <div className={styles.saveDialog}>
      <h2>Save this projection</h2>
      <p>Save this journey so you can revisit it later.</p>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          // setSaveIsOpen(false);

          const response = await fetch('/api/snapshots', {
            method: 'POST',
            body: JSON.stringify({
              title,
              sounds,
            }),
          });

          setErrorMessage('');

          if (!response.ok) {
            const responseBody = await response.json();

            if ('error' in responseBody) {
              // TODO: Use toast instead of showing
              // this below creation / update form
              setErrorMessage(responseBody.error);
              return;
            }
          }

          setTitle('');
          // setTextContent('');
          // setSounds();
          setSaveIsOpen(false);
          // setManualClose(!manualClose);
          // closeMe();
          // setSaveIsOpen(!saveIsOpen);

          router.refresh();
        }}
      >
        <label>
          Title
          <input
            autoFocus={true}
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </label>
        <button>Save</button>
      </form>

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
