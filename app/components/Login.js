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
import StarInverted from '../../public/StarInverted';
// import { getCookie } from '../../util/cookies';
import styles from './portal.module.scss';

export default function Login() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setLoginOpen(!loginOpen);
        }}
      >
        <StarInverted height="6vw" width="6vw" />
      </button>
      {loginOpen ? <LoginForm /> : null}
    </>
  );
}
