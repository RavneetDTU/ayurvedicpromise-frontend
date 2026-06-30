import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getMe } from '@/lib/api';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('ap_token')?.value;

  // Double check login state
  if (!token) {
    redirect('/admin/login');
  }

  let user = null;
  try {
    user = await getMe(token);
  } catch (error) {
    console.error('Admin layout auth verification failed:', error);
    // Invalidate session cookie and redirect if token is expired/invalid
    redirect('/admin/login');
  }

  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
}
