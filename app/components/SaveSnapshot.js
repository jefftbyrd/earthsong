// 'use client';

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

export default function SaveSnapshot(props) {
  // const [title, setTitle] = useState('title use state 3');
  const [sounds, setSounds] = useState(props.sounds);
  // const [textContent, setTextContent] = useState('content use state 2');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [snapshotName, setSnapshotName] = useState('');

  const router = useRouter();

  return (
    <>
      {/* <form
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
        <button>Save</button>
      </form> */}
      <button onClick={() => setModalIsOpen(true)}>Open dialog</button>

      <button>Load</button>

      <ErrorMessage>{errorMessage}</ErrorMessage>

      <Dialog
        open={modalIsOpen}
        as="div"
        onClose={() => setModalIsOpen(false)}
        // className="relative z-50"
        className={styles.dialog}
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">
              Save this projection
            </DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>Save this journey to revisit it later.</p>
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
              <label>
                {/* Enter first name */}
                Give your snapshot a name:
                <input
                  autoFocus={true}
                  value={snapshotName}
                  onChange={(event) => {
                    setSnapshotName(event.currentTarget.value);
                    event.preventDefault();
                  }}
                />
              </label>
              <button>Save</button>
            </form>
            <input autoFocus={true} />
            <div className="flex gap-4">
              <button onClick={() => setModalIsOpen(false)}>Cancel</button>
              <button onClick={() => setModalIsOpen(false)}>Deactivate</button>
              <input />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
