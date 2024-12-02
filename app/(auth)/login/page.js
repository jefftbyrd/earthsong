import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getValidSessionToken } from '../../../database/sessions';
import { getSafeReturnToPath } from '../../../util/validation';
import LoginForm from './LoginForm';

// type Props = {
//   searchParams: Promise<{
//     returnTo?: string | string[];
//   }>;
// };

export default async function LoginPage(props) {
  const { returnTo } = await props.searchParams;
  // Task: Add redirect to home if user is logged in

  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  // 3. If the sessionToken cookie is valid, redirect to home
  if (session) {
    redirect(getSafeReturnToPath(returnTo) || '/');
  }

  // 4. If the sessionToken cookie is invalid or doesn't exist, show the login form
  return (
    <div>
      <LoginForm returnTo={returnTo} />
    </div>
  );
}
