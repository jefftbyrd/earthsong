'use server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
// import { useState } from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getSnapshots } from '../../database/snapshots';
import { getUser } from '../../database/users';
import Star from '../../public/Star.js';
import { getCookie } from '../../util/cookies';
import styles from './portal.module.scss';

export default async function ProfileScreen() {
  // const [profileOpen, setProfileOpen] = useState(false);
  // const { username } = await props.params;

  // Task: Add redirect to login page if user is not logged in
  // 1. Check if the sessionToken cookie exists
  // 2. Query the current user with the sessionToken
  // 3. If user doesn't exist, redirect to login page
  // 4. If user exists, render the page

  // 1. Check if the sessionToken cookie exists
  // const sessionTokenCookie = (await cookies()).get('sessionToken');

  const sessionTokenCookie = await getCookie('sessionToken');

  const user = sessionTokenCookie && (await getUser(sessionTokenCookie));
  // 2. Query the current user with the sessionToken
  // const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }

  const snapshots = await getSnapshots(sessionTokenCookie);

  console.log('snapshots', snapshots);

  return (
    <>
      {/* <button>
        <Star height="6vw" width="6vw" />
      </button> */}
      <div className={styles.profileDialog}>
        <p>
          Welcome,
          <br /> {user.username}
        </p>
        <h1>Saved Places</h1>
        <div>
          {snapshots.length === 0 ? (
            'No snapshots yet'
          ) : (
            <ul>
              {snapshots.map((snapshot) => (
                <li key={`snapshots-${snapshot.id}`}>
                  <Link href={`/snapshots/${snapshot.id}`}>
                    {snapshot.title}
                  </Link>
                  <button>Summon</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* <LogoutButton /> */}
      </div>
    </>
  );
}
