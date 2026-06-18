'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLeads } from '@/hooks/useLeads';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { LeadStatusBadge } from './LeadStatusBadge';
import { ChevronLeft, MessageCircle, RefreshCw, Save } from 'lucide-react';
import { Lead } from '@/types';

interface LeadDetailClientProps {
  token: string;
  leadId: string;
}

export const LeadDetailClient: React.FC<LeadDetailClientProps> = ({ token, leadId }) => {
  const { currentLead, loading, error, fetchLeadById, changeLeadStatus, changeLeadNotes } = useLeads(token);
  
  const [status, setStatus] = useState<Lead['status']>('new');
  const [notes, setNotes] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Load Lead details
  useEffect(() => {
    fetchLeadById(leadId).then((lead) => {
      if (lead) {
        setStatus(lead.status);
        setNotes(lead.notes || '');
      }
    });
  }, [leadId, fetchLeadById]);

  // Handle Status Update
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = e.target.value as Lead['status'];
    setStatus(nextStatus);
    try {
      await changeLeadStatus(leadId, nextStatus);
    } catch {
      alert('Failed to update lead status. Please try again.');
    }
  };

  // Handle Auto-Save on Blur (focus loss)
  const handleNotesBlur = async () => {
    // Only save if notes have changed or are different
    if (notes === (currentLead?.notes || '')) return;

    setSaveStatus('saving');
    try {
      await changeLeadNotes(leadId, notes);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 4000);
    }
  };

  // WhatsApp click handler
  const handleWhatsAppClick = () => {
    if (!currentLead) return;
    let cleanPhone = currentLead.phone.replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }
    const msg = encodeURIComponent(`Hi ${currentLead.name}, this is the team at Ayurvedic Promise. We received your symptoms list. Would you like to schedule your doctor call now?`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  if (loading && !currentLead) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-2 text-slate-500 font-admin">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span>Loading lead profile...</span>
      </div>
    );
  }

  if (error && !currentLead) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm text-left max-w-lg mx-auto font-admin">
        <h3 className="font-bold mb-1">Failed to load Lead</h3>
        <p>{error}</p>
        <Link href="/admin/leads" className="inline-block mt-4 text-xs font-semibold underline hover:text-red-900">
          Back to Leads
        </Link>
      </div>
    );
  }

  if (!currentLead) return null;

  // Extract optional details from combined message field if structured
  let age = 'Not specified';
  let city = 'Not specified';
  if (currentLead.message && currentLead.message.includes('|')) {
    const parts = currentLead.message.split('|');
    parts.forEach((p) => {
      if (p.includes('Age:')) age = p.replace('Age:', '').trim();
      if (p.includes('City:')) city = p.replace('City:', '').trim();
    });
  } else if (currentLead.message) {
    // Check if message contains age/city details in raw form
    const ageMatch = currentLead.message.match(/Age:\s*(\d+)/i);
    const cityMatch = currentLead.message.match(/City:\s*([a-zA-Z\s]+)/i);
    if (ageMatch) age = ageMatch[1];
    if (cityMatch) city = cityMatch[1].trim();
  }

  return (
    <div className="flex flex-col gap-6 text-left font-admin max-w-4xl">
      
      {/* Navigation Header */}
      <div>
        <Link 
          href="/admin/leads" 
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider mb-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Leads List
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{currentLead.name}</h1>
            <p className="text-xs text-slate-400 mt-1">Lead ID: {currentLead.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleWhatsAppClick}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 px-4 py-2"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Lead Profile Fields */}
        <div className="md:col-span-7 flex flex-col gap-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          
          <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
            Customer Profile Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <span className="text-xs text-slate-400 font-semibold block mb-1">Mobile Number</span>
              <span className="text-slate-800 font-semibold">{currentLead.phone}</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold block mb-1">Date Ingested</span>
              <span className="text-slate-800 font-medium">{formatDate(currentLead.created_at)}</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold block mb-1">Age</span>
              <span className="text-slate-800 font-medium">{age}</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold block mb-1">City</span>
              <span className="text-slate-800 font-medium">{city}</span>
            </div>

            <div className="sm:col-span-2">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Source URL</span>
              <span className="text-slate-500 font-mono text-xs bg-slate-50 border border-slate-100 px-2 py-1 rounded">
                {currentLead.source || '/'}
              </span>
            </div>

            <div className="sm:col-span-2">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Symptoms Checklist</span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {currentLead.symptom.split(',').map((sym) => (
                  <span 
                    key={sym} 
                    className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-lg border border-slate-200"
                  >
                    {sym.trim()}
                  </span>
                ))}
              </div>
            </div>

            {currentLead.message && !currentLead.message.includes('|') && (
              <div className="sm:col-span-2">
                <span className="text-xs text-slate-400 font-semibold block mb-1">Message Detail</span>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed text-xs">
                  {currentLead.message}
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Workflow Action & Notes */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Status Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              Sales Pipeline Status
            </h3>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="lead-pipeline-status" className="text-xs text-slate-400 font-semibold">
                Update pipeline state:
              </label>
              <select
                id="lead-pipeline-status"
                value={status}
                onChange={handleStatusChange}
                className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
              >
                <option value="new">New</option>
                <option value="called">Contacted</option>
                <option value="follow_up">Qualified</option>
                <option value="booked">Booked</option>
                <option value="not_interested">Lost</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between text-xs pt-2 text-slate-400">
              <span>Current badge state:</span>
              <LeadStatusBadge status={status} />
            </div>
          </div>

          {/* Notes Panel (Auto-saves on blur) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-800">
                Internal Sales Notes
              </h3>
              
              {/* Auto-save status indicators */}
              <div className="text-xs">
                {saveStatus === 'saving' && (
                  <span className="text-blue-500 font-semibold flex items-center gap-1 animate-pulse">
                    <RefreshCw className="h-3 w-3 animate-spin" /> Saving...
                  </span>
                )}
                {saveStatus === 'saved' && (
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    ✓ Saved
                  </span>
                )}
                {saveStatus === 'error' && (
                  <span className="text-red-500 font-semibold">
                    ⚠ Save Failed
                  </span>
                )}
              </div>
            </div>

            <textarea
              placeholder="Type customer logs, call updates, or appointment details here. Auto-saves when you click away."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              className="w-full min-h-[160px] p-3 text-sm text-slate-700 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 resize-y"
            />
            
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>Automatic cloud backup on blur</span>
              <Save className="h-3.5 w-3.5 text-slate-300" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
