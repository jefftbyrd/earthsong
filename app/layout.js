import './globals.css';
import '@fontsource/noto-sans-linear-a';
import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
import Head from 'next/head';
import { cookies } from 'next/headers';
// import Link from 'next/link';
import { getSnapshots } from '../database/snapshots';
import { getUser } from '../database/users';
import AppWrapper from './context';

const basteleurMoonlight = localFont({
  src: './fonts/Basteleur-Moonlight.woff2',
  variable: '--font-basteleurM',
  weight: '300',
});

const basteleurBold = localFont({
  src: './fonts/Basteleur-Bold.woff2',
  variable: '--font-basteleurB',
  weight: '900',
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
        className={`${basteleurBold.variable} ${basteleurMoonlight.variable}`}
      >
        <AppWrapper user={user} snapshots={snapshots}>
          {children}
        </AppWrapper>
        <Analytics />
      </body>
    </html>
  );
}
