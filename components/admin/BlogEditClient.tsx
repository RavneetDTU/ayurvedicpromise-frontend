'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBlogs } from '@/hooks/useBlogs';
import { BlogEditor } from '@/components/admin/BlogEditor';
import { updateBlog } from '@/lib/api';
import { RefreshCw } from 'lucide-react';

interface BlogEditClientProps {
  token: string;
  blogId: string;
}

type BlogUpdateData = Parameters<typeof updateBlog>[1];

export const BlogEditClient: React.FC<BlogEditClientProps> = ({ token, blogId }) => {
  const router = useRouter();
  const { currentBlog, loading: initialLoading, error, fetchAdminBlogById, editBlog } = useBlogs(token);
  const [saveLoading, setSaveLoading] = useState(false);

  // Load article details
  useEffect(() => {
    fetchAdminBlogById(blogId);
  }, [blogId, fetchAdminBlogById]);

  const handleSave = async (data: BlogUpdateData) => {
    setSaveLoading(true);
    try {
      await editBlog(blogId, data);
      router.push('/admin/blogs');
      router.refresh();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Failed to update blog post.';
      alert(errMsg);
    } finally {
      setSaveLoading(false);
    }
  };

  if (initialLoading && !currentBlog) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-2 text-slate-500 font-admin">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span>Loading article workspace...</span>
      </div>
    );
  }

  if (error && !currentBlog) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm text-left max-w-lg mx-auto font-admin">
        <h3 className="font-bold mb-1">Failed to load Blog Article</h3>
        <p>{error}</p>
        <button 
          onClick={() => router.push('/admin/blogs')}
          className="inline-block mt-4 text-xs font-semibold underline hover:text-red-900"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <BlogEditor 
        initialBlog={currentBlog} 
        token={token} 
        onSave={handleSave} 
        loading={saveLoading} 
      />
    </div>
  );
};
