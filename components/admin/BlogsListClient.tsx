'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBlogs } from '@/hooks/useBlogs';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit3, Trash2, Globe, RefreshCw, AlertTriangle } from 'lucide-react';

interface BlogsListClientProps {
  token: string;
}

export const BlogsListClient: React.FC<BlogsListClientProps> = ({ token }) => {
  const { blogs, loading, error, fetchAdminBlogs, removeBlog } = useBlogs(token);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  // Deletion state
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAdminBlogs();
  }, [fetchAdminBlogs]);

  // Client-side filtering for dashboard latency reduction
  const filteredBlogs = blogs.filter((blog) => {
    if (statusFilter === 'published') return blog.status === 'published';
    if (statusFilter === 'draft') return blog.status === 'draft';
    return true;
  });

  const handleDeleteOpen = (id: string) => {
    setDeleteBlogId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteBlogId) return;
    setIsDeleting(true);
    try {
      await removeBlog(deleteBlogId);
      setDeleteBlogId(null);
    } catch {
      alert('Failed to delete blog post.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left font-admin">
      
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Blog Articles</h1>
          <p className="text-sm text-slate-400 mt-1">Write, localize, and schedule public articles</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button
            variant="primary"
            className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-900 border-0 font-admin text-sm px-4 py-2"
          >
            <Plus className="h-4 w-4" />
            Write New Blog
          </Button>
        </Link>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex gap-4">
          {(['all', 'published', 'draft'] as const).map((tab) => {
            const isSelected = statusFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`pb-2.5 px-2 font-admin text-sm font-semibold border-b-2 capitalize transition-all focus:outline-none ${
                  isSelected
                    ? 'border-slate-800 text-slate-800'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
        
        <Button
          onClick={fetchAdminBlogs}
          variant="ghost"
          disabled={loading}
          className="p-1 rounded text-slate-400 hover:text-slate-600 min-w-0"
          title="Reload articles"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="overflow-x-auto min-w-full">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold text-xs tracking-wider uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Article</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Languages</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Last Updated</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => {
                  const imageSrc = blog.featured_image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=100&auto=format&fit=crop';
                  return (
                    <tr key={blog.id} className="hover:bg-slate-50/40 transition-colors">
                      {/* Image & Title */}
                      <td className="px-6 py-4 max-w-sm">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                            <Image
                              src={imageSrc}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="truncate">
                            <span className="font-bold text-slate-800 block truncate leading-tight">
                              {blog.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono block truncate mt-1">
                              /{blog.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">
                        {blog.category}
                      </td>

                      {/* Languages */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold">
                          <Globe className="h-3.5 w-3.5 text-slate-400" />
                          {blog.available_languages?.map((lang) => (
                            <span 
                              key={lang} 
                              className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                            >
                              {lang}
                            </span>
                          )) || <span className="text-slate-400">None</span>}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={blog.status === 'published' ? 'success' : 'warning'}
                          className="capitalize"
                        >
                          {blog.status}
                        </Badge>
                      </td>

                      {/* Last Updated */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400 font-mono">
                        {formatDate(blog.updated_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/admin/blogs/${blog.id}/edit`}>
                            <button
                              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors border border-transparent hover:border-slate-200"
                              title="Edit Article"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDeleteOpen(blog.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-200"
                            title="Delete Article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400 font-medium">
                    {loading ? (
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="h-6 w-6 animate-spin text-slate-400" />
                        <span>Loading articles...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-lg font-bold">No articles found</span>
                        <span>Create your first draft by clicking &quot;Write New Blog&quot;.</span>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Deletion Confirmation Modal */}
      <Modal
        isOpen={deleteBlogId !== null}
        onClose={() => setDeleteBlogId(null)}
        title="Confirm Article Deletion"
        footer={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteBlogId(null)}
              disabled={isDeleting}
              className="text-slate-600 hover:bg-slate-100 font-admin"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDeleteConfirm}
              isLoading={isDeleting}
              className="bg-red-600 hover:bg-red-700 border-0 rounded-xl text-white font-admin"
            >
              Confirm Delete
            </Button>
          </>
        }
      >
        <div className="flex gap-4 items-start font-admin text-slate-700">
          <div className="p-2 bg-red-50 rounded-xl text-red-600 flex-shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-sm text-slate-800">Are you absolutely sure?</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              This action cannot be undone. This will permanently delete the article draft and remove it from all public category indexes.
            </p>
          </div>
        </div>
      </Modal>

    </div>
  );
};
