'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLeads } from '@/hooks/useLeads';
import { LeadsTable } from './LeadsTable';
import { Button } from '@/components/ui/Button';
import { RefreshCw, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface LeadsListClientProps {
  token: string;
}

export const LeadsListClient: React.FC<LeadsListClientProps> = ({ token }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { leads, loading, error, fetchLeads } = useLeads(token);

  // Debounce search query to optimize API request frequency
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on search
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Trigger data fetch when dependencies change
  const loadLeads = useCallback(() => {
    fetchLeads({
      status: status === 'all' ? undefined : status,
      page,
      limit: 25,
      search: debouncedSearch || undefined,
    });
  }, [status, page, debouncedSearch, fetchLeads]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const handleRefresh = () => {
    loadLeads();
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleRowClick = (leadId: string) => {
    router.push(`/admin/leads/${leadId}`);
  };

  // WhatsApp click handler that prevents row routing navigation
  const handleWhatsAppClick = (e: React.MouseEvent, phone: string, name: string) => {
    e.stopPropagation();
    // Normalize phone number (strip spaces/symbols, prepend 91 if needed)
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }
    const msg = encodeURIComponent(`Hi ${name}, this is the team at Ayurvedic Promise. We received your symptoms list. Would you like to schedule your doctor call now?`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-6 text-left font-admin">
      
      {/* Page Title & Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Leads Inbox</h1>
          <p className="text-sm text-slate-400 mt-1">Manage consultation requests from incoming web traffic</p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          disabled={loading}
          className="flex items-center gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <label htmlFor="filter-status" className="text-sm font-semibold text-slate-500 whitespace-nowrap">
            Filter Status:
          </label>
          <select
            id="filter-status"
            value={status}
            onChange={handleStatusChange}
            className="border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="called">Contacted</option>
            <option value="follow_up">Qualified</option>
            <option value="booked">Booked</option>
            <option value="not_interested">Lost</option>
          </select>
        </div>

      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <LeadsTable
          leads={leads}
          loading={loading}
          onWhatsAppClick={handleWhatsAppClick}
          onRowClick={handleRowClick}
        />

        {/* Pagination controls */}
        {leads.length > 0 && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Showing Page {page} (25 entries max)</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1 || loading}
                className="p-2 border-slate-200 flex items-center justify-center rounded-lg min-w-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-slate-700 px-1">{page}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(prev => prev + 1)}
                disabled={leads.length < 25 || loading}
                className="p-2 border-slate-200 flex items-center justify-center rounded-lg min-w-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
