'use client';

import React from 'react';
import Link from 'next/link';
import { Lead } from '@/types';
import { LeadStatusBadge } from './LeadStatusBadge';
import { formatDate } from '@/lib/utils';
import { PhoneCall, Eye, RefreshCw } from 'lucide-react';

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onWhatsAppClick: (e: React.MouseEvent, phone: string, name: string) => void;
  onRowClick: (id: string) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  loading,
  onWhatsAppClick,
  onRowClick,
}) => {
  return (
    <div className="overflow-x-auto min-w-full">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-slate-600 font-semibold text-xs tracking-wider uppercase">
          <tr>
            <th className="px-6 py-4 text-left">Date</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Phone</th>
            <th className="px-6 py-4 text-left">Symptom Summary</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {leads.length > 0 ? (
            leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onRowClick(lead.id)}
                className="hover:bg-slate-50/70 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400 font-mono">
                  {formatDate(lead.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800">
                  {lead.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                  {lead.phone}
                </td>
                <td className="px-6 py-4 max-w-xs truncate text-slate-500">
                  {lead.symptom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <LeadStatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-3">
                    {/* WhatsApp CTA Button */}
                    <button
                      onClick={(e) => onWhatsAppClick(e, lead.phone, lead.name)}
                      className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200"
                      title="Open in WhatsApp"
                    >
                      <PhoneCall className="h-4 w-4" />
                    </button>
                    
                    {/* Details View Button */}
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-16 text-center text-slate-400 font-medium">
                {loading ? (
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="h-6 w-6 animate-spin text-slate-400" />
                    <span>Loading leads...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg font-bold">No leads found</span>
                    <span>Leads from public form submissions will appear here.</span>
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
