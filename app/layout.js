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
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Earthsong" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
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
