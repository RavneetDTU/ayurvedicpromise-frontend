import { Lead, Blog, LeadFormData, AdminUser, LoginResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ayurvedicpromise.com';

/**
 * Base fetch wrapper for the backend API
 */
async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  cache?: RequestCache
): Promise<T> {
  const headers: Record<string, string> = { ...options.headers } as Record<string, string>;

  // Only set application/json content-type if we aren't sending FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    cache: cache ?? options.cache ?? (options.next?.revalidate !== undefined ? undefined : 'no-store'),
    headers,
  });

  if (!res.ok) {
    let errMsg = `API error: ${res.status}`;
    try {
      const data = await res.json();
      errMsg = data.detail?.[0]?.msg || data.detail || data.message || errMsg;
      if (Array.isArray(data.detail)) {
        errMsg = data.detail.map((err: { loc: (string | number)[]; msg: string }) => `${err.loc.join('.')}: ${err.msg}`).join(', ');
      }
    } catch {
      // ignore
    }
    throw new Error(errMsg);
  }

  // Handle empty responses (like 204 or delete responses that might be empty or raw strings)
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }
  return {} as T;
}

/**
 * Public: Get list of published blogs
 */
export async function getPublishedBlogs(
  category?: string,
  page = 1,
  limit = 12,
  options: RequestInit = {}
): Promise<Blog[]> {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const queryString = params.toString() ? `?${params.toString()}` : '';
  // The endpoint has a trailing slash: /api/blogs/
  return apiFetch<Blog[]>(`/api/blogs/${queryString}`, { method: 'GET', ...options });
}

/**
 * Public: Get a single published blog by slug
 */
export async function getBlogBySlug(slug: string, options: RequestInit = {}): Promise<Blog> {
  return apiFetch<Blog>(`/api/blogs/${slug}`, { method: 'GET', ...options });
}


/**
 * Public: Submit lead form
 */
export async function submitLead(data: LeadFormData): Promise<Lead> {
  // Backend expects LeadCreate: name, phone, symptom, message, source
  // We join symptoms array with comma before sending to API
  return apiFetch<Lead>(`/api/leads/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Public/Admin: Authenticate and get JWT
 */
export async function adminLogin(email: string, pass: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>(`/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password: pass }),
  });
}

/**
 * Admin: Retrieve current logged-in user profile
 */
export async function getMe(token: string): Promise<AdminUser> {
  return apiFetch<AdminUser>(`/api/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Admin: Get list of all leads with search and pagination
 */
export async function getAllLeads(
  token: string,
  filters?: { status?: string; page?: number; limit?: number; search?: string }
): Promise<Lead[]> {
  const params = new URLSearchParams();
  if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());
  if (filters?.search) params.append('search', filters.search);

  const queryString = params.toString() ? `?${params.toString()}` : '';
  return apiFetch<Lead[]>(`/api/leads/${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Admin: Get a single lead details by UUID
 */
export async function getLeadById(id: string, token: string): Promise<Lead> {
  return apiFetch<Lead>(`/api/leads/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Admin: Update status of a lead
 */
export async function updateLeadStatus(
  id: string,
  status: 'new' | 'called' | 'follow_up' | 'booked' | 'not_interested',
  token: string
): Promise<Lead> {
  return apiFetch<Lead>(`/api/leads/${id}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
}

/**
 * Admin: Update internal notes for a lead
 */
export async function updateLeadNotes(
  id: string,
  notes: string,
  token: string
): Promise<Lead> {
  return apiFetch<Lead>(`/api/leads/${id}/notes`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ notes }),
  });
}

/**
 * Admin: Get list of all blogs (including drafts)
 */
export async function getAllBlogsAdmin(token: string): Promise<Blog[]> {
  return apiFetch<Blog[]>(`/api/blogs/admin/all`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Admin: Get blog by ID for editing
 */
export async function getAdminBlogById(id: string, token: string): Promise<Blog> {
  return apiFetch<Blog>(`/api/blogs/admin/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Admin: Create a new blog post
 */
export async function createBlog(
  data: {
    title: string;
    category: string;
    slug?: string;
    content_en?: string;
    content_hi?: string;
    content_hinglish?: string;
    excerpt?: string;
    tags?: string;
    featured_image_url?: string;
    meta_title?: string;
    meta_description?: string;
    status: 'draft' | 'published';
  },
  token: string
): Promise<Blog> {
  return apiFetch<Blog>(`/api/blogs/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

/**
 * Admin: Update an existing blog post
 */
export async function updateBlog(
  id: string,
  data: {
    title?: string;
    category?: string;
    slug?: string;
    content_en?: string;
    content_hi?: string;
    content_hinglish?: string;
    excerpt?: string;
    tags?: string;
    featured_image_url?: string;
    meta_title?: string;
    meta_description?: string;
    status?: 'draft' | 'published';
  },
  token: string
): Promise<Blog> {
  return apiFetch<Blog>(`/api/blogs/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

/**
 * Admin: Hard delete a blog post
 */
export async function deleteBlog(id: string, token: string): Promise<unknown> {
  return apiFetch<unknown>(`/api/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Admin: Upload image file to Cloudinary and get URL
 */
export async function uploadImage(file: File, token: string): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  return apiFetch<{ url: string }>(`/api/blogs/upload-image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}
