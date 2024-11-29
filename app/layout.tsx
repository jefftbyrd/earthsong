import './globals.css';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
// import Image from 'next/image';
import Link from 'next/link';
import { getSnapshots } from '../database/snapshots';
// import type { ReactNode } from 'react';
// import React, { useState } from 'react';
import { getUser } from '../database/users';
import Logo from '../public/Logo.js';
import LoginForm from './(auth)/login/LoginForm';
// import Star from '../public/Star.js';
// import logo from '../public/earthsongLogo.svg';
import LogoutButton from './(auth)/logout/LogoutButton';
import Button from './components/Button';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileScreen from './components/ProfileScreen';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });
// const avara = localFont({
//   src: './fonts/Avara-Bold.woff',
//   variable: '--font-avara',
//   weight: '500',
// });
// const sligoil = localFont({
//   src: './fonts/SligoilMicro.woff',
//   variable: '--font-sligoil',
//   weight: '500',
// });

const basteleurMoonlight = localFont({
  src: './fonts/Basteleur-Moonlight.woff2',
  variable: '--font-basteleurM',
  weight: '300',
});

export const metadata = {
  title: 'Earthsong',
  description: 'Earthsong',
};

// type Props = {
//   children: ReactNode;
// };

export default async function RootLayout({ children }) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  const snapshots = user && (await getSnapshots(sessionTokenCookie.value));

  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} ${sligoil.variable}`}
        className={basteleurMoonlight.variable}
      >
        {children}
        <footer>
          <nav>
            <Link href="/">
              <Logo height="6vw" width="6vw" />
            </Link>

            {user ? <Profile user={user} snapshots={snapshots} /> : <Login />}
          </nav>
        </footer>
      </body>
    </html>
  );
}
