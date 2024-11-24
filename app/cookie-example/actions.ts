'use server';

import { cookies } from 'next/headers';

export async function createCookie(cookieValue: string) {
  (await cookies()).set('testCookie', cookieValue);
}
