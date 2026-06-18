import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LeadDetailClient } from '@/components/admin/LeadDetailClient';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: 'Lead Profile Details | Admin Dashboard',
};

export default async function LeadDetailPage({ params }: PageProps) {
  const token = cookies().get('ap_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  return <LeadDetailClient token={token} leadId={params.id} />;
}
