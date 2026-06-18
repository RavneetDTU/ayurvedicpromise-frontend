import { useState, useCallback } from 'react';
import { Blog } from '@/types';
import {
  getAllBlogsAdmin,
  getAdminBlogById,
  getPublishedBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from '@/lib/api';

export function useBlogs(token?: string | null) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminBlogs = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBlogsAdmin(token);
      setBlogs(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch admin blogs');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchAdminBlogById = useCallback(async (id: string) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminBlogById(id, token);
      setCurrentBlog(data);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchPublicBlogs = useCallback(async (category?: string, page?: number, limit?: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPublishedBlogs(category, page, limit);
      setBlogs(data);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBlog = useCallback(async (data: Parameters<typeof createBlog>[0]) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const created = await createBlog(data, token);
      setBlogs((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err.message || 'Failed to create blog');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const editBlog = useCallback(async (id: string, data: Parameters<typeof updateBlog>[1]) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await updateBlog(id, data, token);
      setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
      if (currentBlog?.id === id) {
        setCurrentBlog(updated);
      }
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update blog');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, currentBlog]);

  const removeBlog = useCallback(async (id: string) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      await deleteBlog(id, token);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete blog');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  return {
    blogs,
    currentBlog,
    loading,
    error,
    fetchAdminBlogs,
    fetchAdminBlogById,
    fetchPublicBlogs,
    addBlog,
    editBlog,
    removeBlog,
  };
}
