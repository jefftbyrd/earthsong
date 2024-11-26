import './globals.css';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { getUser } from '../database/users';
import logo from '../public/earthsongLogo.svg';
import LogoutButton from './(auth)/logout/LogoutButton';

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
const sligoil = localFont({
  src: './fonts/SligoilMicro.woff',
  variable: '--font-sligoil',
  weight: '500',
});

const basteleurMoonlight = localFont({
  src: './fonts/Basteleur-Moonlight.woff2',
  variable: '--font-basteleurM',
  weight: '300',
});

export const metadata = {
  title: 'Earthsong',
  description: 'Earthsong',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  console.log('User: ', user);

  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} ${sligoil.variable}`}
        className={basteleurMoonlight.variable}
      >
        <header>
          <nav>
            <Link href="/">Home</Link>

            {user ? (
              <>
                <Link href={`/profile/${user.username}`}>{user.username}</Link>
                <Link href="/snapshots">View Snapshots</Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/register">Register</Link>
                <Link href="/login">Login</Link>
              </>
            )}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
