import { useState, useCallback } from 'react';
import { Lead } from '@/types';
import { getAllLeads, getLeadById, updateLeadStatus, updateLeadNotes } from '@/lib/api';

export function useLeads(token: string | null) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(
    async (filters?: { status?: string; page?: number; limit?: number; search?: string }) => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getAllLeads(token, filters);
        setLeads(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch leads');
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const fetchLeadById = useCallback(
    async (id: string) => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getLeadById(id, token);
        setCurrentLead(data);
        return data;
      } catch (err: any) {
        setError(err.message || 'Failed to fetch lead details');
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const changeLeadStatus = useCallback(
    async (id: string, status: 'new' | 'called' | 'follow_up' | 'booked' | 'not_interested') => {
      if (!token) return;
      setError(null);
      try {
        const updated = await updateLeadStatus(id, status, token);
        setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
        if (currentLead?.id === id) {
          setCurrentLead(updated);
        }
        return updated;
      } catch (err: any) {
        setError(err.message || 'Failed to update lead status');
        throw err;
      }
    },
    [token, currentLead]
  );

  const changeLeadNotes = useCallback(
    async (id: string, notes: string) => {
      if (!token) return;
      setError(null);
      try {
        const updated = await updateLeadNotes(id, notes, token);
        setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
        if (currentLead?.id === id) {
          setCurrentLead(updated);
        }
        return updated;
      } catch (err: any) {
        setError(err.message || 'Failed to update lead notes');
        throw err;
      }
    },
    [token, currentLead]
  );

  return {
    leads,
    currentLead,
    loading,
    error,
    fetchLeads,
    fetchLeadById,
    changeLeadStatus,
    changeLeadNotes,
  };
}
