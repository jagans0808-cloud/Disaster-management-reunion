import {
  AlertTriangle,
  Compass,
  ShieldCheck,
  HeartPulse,
  Home,
  Truck,
  Users
} from 'lucide-react';

export const STATUS_CONFIG = {
  MISSING: {
    key: 'MISSING',
    label: 'Missing',
    icon: AlertTriangle,
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    badgeClass: 'status-missing',
    description: 'Reported missing; active ground and aerial search underway.'
  },
  LOCATED: {
    key: 'LOCATED',
    label: 'Located',
    icon: Compass,
    color: '#ea580c',
    bgColor: '#fff7ed',
    borderColor: '#ffedd5',
    badgeClass: 'status-located',
    description: 'Located by rescue personnel; undergoing transit or safety triage.'
  },
  SAFE: {
    key: 'SAFE',
    label: 'Safe',
    icon: ShieldCheck,
    color: '#16a34a',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    badgeClass: 'status-safe',
    description: 'Verified safe, unharmed, and resting at an authorized facility.'
  },
  HOSPITALIZED: {
    key: 'HOSPITALIZED',
    label: 'Hospitalized',
    icon: HeartPulse,
    color: '#e11d48',
    bgColor: '#fff1f2',
    borderColor: '#ffe4e6',
    badgeClass: 'status-hospitalized',
    description: 'Admitted for medical attention, trauma care, or stabilization.'
  },
  AT_SHELTER: {
    key: 'AT_SHELTER',
    label: 'At Shelter',
    icon: Home,
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    badgeClass: 'status-shelter',
    description: 'Sheltered at an official emergency relief camp with provisions.'
  },
  TRANSFERRED: {
    key: 'TRANSFERRED',
    label: 'Transferred',
    icon: Truck,
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    badgeClass: 'status-transferred',
    description: 'Transferred to higher-tier regional medical facility or safe zone.'
  },
  REUNITED: {
    key: 'REUNITED',
    label: 'Reunited',
    icon: Users,
    color: '#0d9488',
    bgColor: '#f0fdfa',
    borderColor: '#99f6e4',
    badgeClass: 'status-reunited',
    description: 'Confirmed safely reunited with family members or guardian.'
  }
};

export const ALL_STATUSES = Object.keys(STATUS_CONFIG);

export const getStatusConfig = (status) => {
  const normalized = (status || '').toUpperCase().trim();
  return STATUS_CONFIG[normalized] || {
    key: normalized || 'UNKNOWN',
    label: status || 'Unknown',
    icon: ShieldCheck,
    color: '#64748b',
    bgColor: '#f8fafc',
    borderColor: '#e2e8f0',
    badgeClass: 'status-unknown',
    description: 'Status update pending field verification.'
  };
};

