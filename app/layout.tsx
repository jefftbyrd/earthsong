import './globals.css';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getSnapshots } from '../database/snapshots';
import { getUser } from '../database/users';
import Login from './components/Login';
import Profile from './components/Profile';

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
        {user ? <Profile user={user} snapshots={snapshots} /> : <Login />}
        {children}
      </body>
    </html>
  );
}
