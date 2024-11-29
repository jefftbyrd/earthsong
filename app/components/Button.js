'use client';
// import { cookies } from 'next/headers';
// import Link from 'next/link';
// import { redirect } from 'next/navigation';
// import { useState } from 'react';
// import LogoutButton from '../(auth)/logout/LogoutButton';
// import { getSnapshots } from '../../database/snapshots';
// import { getUser } from '../../database/users';
import Star from '../../public/Star.js';

// // import { getCookie } from '../../util/cookies';
// import styles from './portal.module.scss';
// import ProfileScreen from './ProfileScreen';

export default function Button({ showProfile }) {
  return (
    <button
      onClick={() => {
        console.log('clicked');
        showProfile();
      }}
    >
      <Star height="6vw" width="6vw" />
    </button>
  );
}
