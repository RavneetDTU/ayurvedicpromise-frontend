'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api';
import { setAuthToken } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BrandLogo } from '@/components/public/BrandLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await adminLogin(email, password);
      // Set the secure httpOnly cookie via server action
      await setAuthToken(res.access_token);
      router.push('/admin/leads');
      router.refresh();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Invalid email or password';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-lg p-8 flex flex-col gap-6 text-left">
        {/* Logo and header */}
        <div className="flex flex-col items-center text-center gap-2 mb-4">
          <BrandLogo variant="icon" />
          <h1 className="font-admin text-2xl font-bold text-slate-800">Admin Portal</h1>
          <p className="font-admin text-sm text-slate-500">Sign in to manage leads and publish blogs</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            id="admin-email"
            type="email"
            placeholder="admin@ayurvedicpromise.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="font-admin text-sm"
          />

          <Input
            label="Password"
            id="admin-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="font-admin text-sm"
          />

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-100 font-admin">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            className="w-full font-admin text-sm mt-2 rounded-xl bg-slate-800 hover:bg-slate-900 border-0"
          >
            Sign In to Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
