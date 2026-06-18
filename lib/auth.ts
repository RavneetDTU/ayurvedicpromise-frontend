'use server';

import { cookies } from 'next/headers';

/**
 * Sets the httpOnly 'ap_token' cookie on the server.
 */
export async function setAuthToken(token: string) {
  cookies().set('ap_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Retrieves the 'ap_token' cookie from the server.
 */
export async function getAuthToken() {
  return cookies().get('ap_token')?.value || null;
}

/**
 * Deletes the 'ap_token' cookie by setting its maxAge to 0.
 */
export async function deleteAuthToken() {
  cookies().set('ap_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
