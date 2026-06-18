import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BlogCreateClient } from '@/components/admin/BlogCreateClient';

export const metadata = {
  title: 'Write New Blog Post | Admin Dashboard',
};

export default async function AdminNewBlogPage() {
  const token = cookies().get('ap_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  return <BlogCreateClient token={token} />;
}
