'use client';
// import { cookies } from 'next/headers';
// import Link from 'next/link';
// import { redirect } from 'next/navigation';
import { useState } from 'react';
// import ProfileScreen from './ProfileScreen';
import LoginForm from '../(auth)/login/LoginForm';
// import LogoutButton from '../(auth)/logout/LogoutButton';
// import { getSnapshots } from '../../database/snapshots';
// import { getUser } from '../../database/users';
import Star from '../../public/Star.js';
import SnapshotForm from '../snapshots/SnapshotForm';
// import SnapshotsComponent from '../snapshots/SnapshotsComponent';
// import { getCookie } from '../../util/cookies';
import styles from './portal.module.scss';

export default function Profile(props) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      {console.log('snapshots on profile', props.snapshots)}
      {/* <LoginForm /> */}
      <button
        onClick={() => {
          setProfileOpen(!profileOpen);
        }}
      >
        <Star height="6vw" width="6vw" />
      </button>
      {profileOpen ? (
        <SnapshotForm user={props.user} snapshots={props.snapshots} />
      ) : null}
      {/* <SnapshotsComponent user={props.user} /> */}
    </>
  );
}
