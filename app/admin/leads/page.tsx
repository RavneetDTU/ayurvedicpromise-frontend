import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LeadsListClient } from '@/components/admin/LeadsListClient';

export const metadata = {
  title: 'Leads Inbox | Admin Dashboard',
};

export default async function AdminLeadsPage() {
  const token = cookies().get('ap_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  return <LeadsListClient token={token} />;
}
