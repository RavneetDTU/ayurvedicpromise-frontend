import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BlogsListClient } from '@/components/admin/BlogsListClient';

export const metadata = {
  title: 'Blog Articles Management | Admin Dashboard',
};

export default async function AdminBlogsPage() {
  const token = cookies().get('ap_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  return <BlogsListClient token={token} />;
}
