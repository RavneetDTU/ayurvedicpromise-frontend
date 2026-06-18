'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { deleteAuthToken } from '@/lib/auth';
import { AdminUser } from '@/types';
import { User } from 'lucide-react';

interface AdminLayoutClientProps {
  user: AdminUser;
  children: React.ReactNode;
}

export const AdminLayoutClient: React.FC<AdminLayoutClientProps> = ({ user, children }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await deleteAuthToken();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar navigation */}
      <Sidebar onLogout={handleLogout} />

      {/* Main content body */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Header bar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-20">
          <h2 className="font-admin text-lg font-bold text-slate-800">
            Ayurvedic Promise Admin Panel
          </h2>
          <div className="flex items-center gap-4">
            {/* User credentials */}
            <div className="flex flex-col items-end">
              <span className="font-admin text-sm font-semibold text-slate-700">{user.name}</span>
              <span className="font-admin text-[11px] text-slate-400 font-medium">{user.email}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
              <User className="h-4 w-4" />
            </div>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
