'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogEditor } from '@/components/admin/BlogEditor';
import { createBlog } from '@/lib/api';

interface BlogCreateClientProps {
  token: string;
}

type BlogCreateData = Parameters<typeof createBlog>[0];

export const BlogCreateClient: React.FC<BlogCreateClientProps> = ({ token }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = async (data: BlogCreateData) => {
    setLoading(true);
    try {
      await createBlog(data, token);
      router.push('/admin/blogs');
      router.refresh();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Failed to create blog post.';
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <BlogCreateClientInner token={token} onSave={handleSave} loading={loading} />
    </div>
  );
};

interface InnerProps {
  token: string;
  onSave: (data: BlogCreateData) => Promise<void>;
  loading: boolean;
}

const BlogCreateClientInner: React.FC<InnerProps> = ({ token, onSave, loading }) => {
  return <BlogEditor token={token} onSave={onSave} loading={loading} />;
};
