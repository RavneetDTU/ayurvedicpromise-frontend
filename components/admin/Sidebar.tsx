'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, FileText, LogOut } from 'lucide-react';
import { BrandLogo } from '../public/BrandLogo';

interface SidebarProps {
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const pathname = usePathname() || '';

  const links = [
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 z-10">
      {/* Sidebar Header Logo */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <BrandLogo variant="icon" />
        <span className="font-admin font-bold text-sm tracking-wider uppercase">
          AP Admin
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 flex flex-col gap-1.5">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-admin text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-admin text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all focus:outline-none"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
