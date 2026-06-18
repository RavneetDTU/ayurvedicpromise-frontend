export interface Lead {
  id: string; // UUID
  name: string;
  phone: string;
  symptom: string; // comma-separated symptoms or single symptom
  message?: string | null;
  source?: string | null;
  status: 'new' | 'called' | 'follow_up' | 'booked' | 'not_interested';
  notes?: string | null;
  assigned_to?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string; // UUID
  title: string;
  title_hi?: string | null;
  title_hinglish?: string | null;
  slug: string;
  content_en: string | null; // TipTap JSON string
  content_hi?: string | null;
  content_hinglish?: string | null;
  excerpt?: string | null;
  category: string;
  tags?: string | null;
  featured_image_url?: string | null; // Cloudinary URL
  available_languages: string[];
  status: 'draft' | 'published';
  author_id: string; // UUID
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  symptom: string;
  message?: string;
  source?: string;
}

export interface AdminUser {
  id: string; // UUID
  email: string;
  name: string;
  role: 'admin' | 'salesman';
  is_active: boolean;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  role: 'admin' | 'salesman';
}
