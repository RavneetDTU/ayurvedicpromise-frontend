import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BlogEditClient } from '@/components/admin/BlogEditClient';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: 'Edit Blog Article | Admin Dashboard',
};

export default async function AdminEditBlogPage({ params }: PageProps) {
  const token = cookies().get('ap_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  return <BlogEditClient token={token} blogId={params.id} />;
}
