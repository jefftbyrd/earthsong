'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import type { User } from '../../../migrations/00000-createTableUsers';
// import type { Snapshot } from '../../migrations/00002-createTableSnapshots';
// import type { CreateSnapshotResponseBodyPost } from '../api/snapshots/route';
import ErrorMessage from '../../ErrorMessage';

// import styles from './SnapshotsForm.module.scss';

// type Props = {
//   user: User;
//   snapshots: Snapshot[];
// };

export default function SaveSnapshot(props) {
  // const [title, setTitle] = useState('title use state 3');
  const [sounds, setSounds] = useState(props.sounds);
  // const [textContent, setTextContent] = useState('content use state 2');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  // console.log('sounds at save snapshot', sounds);
  // console.log('sounds stringify', JSON.stringify(sounds));

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/snapshots', {
            method: 'POST',
            body: JSON.stringify(sounds),
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

          // setTitle('');
          // setTextContent('');
          setSounds();

          router.refresh();
        }}
      >
        <button>Add Snapshot</button>
      </form>

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </>
  );
}
