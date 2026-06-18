import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface LeadStatusBadgeProps {
  status: 'new' | 'called' | 'follow_up' | 'booked' | 'not_interested';
  className?: string;
}

export const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status, className = '' }) => {
  const badgeMap = {
    new: { label: 'New', variant: 'info' as const },
    called: { label: 'Contacted', variant: 'warning' as const },
    follow_up: { label: 'Qualified', variant: 'primary' as const }, // primary is terracotta
    booked: { label: 'Booked', variant: 'success' as const },
    not_interested: { label: 'Lost', variant: 'danger' as const },
  };

  const current = badgeMap[status] || { label: status, variant: 'primary' as const };

  return (
    <Badge variant={current.variant} className={className}>
      {current.label}
    </Badge>
  );
};
