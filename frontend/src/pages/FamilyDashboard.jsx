import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Phone,
  ArrowRight,
  Heart,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { StatusBadge } from '../components/StatusBadge';
import { ContactAuthorizedModal } from '../components/ContactAuthorizedModal';

export const FamilyDashboard = () => {
  const { persons, getFamilyMembers } = useDisaster();
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected Family ID
  const initialFamilyId = searchParams.get('id') || 'FAM1001';
  const [selectedFamilyId, setSelectedFamilyId] = useState(initialFamilyId);
  const [familySearchInput, setFamilySearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [contactModalPerson, setContactModalPerson] = useState(null);

  // Available unique family IDs in database
  const availableFamilies = useMemo(() => {
    const ids = new Set();
    persons.forEach(p => {
      if (p.familyId) ids.add(p.familyId.toUpperCase());
    });
    return Array.from(ids).sort();
  }, [persons]);

  // Members of current family
  const familyMembers = useMemo(() => {
    return getFamilyMembers(selectedFamilyId);
  }, [getFamilyMembers, selectedFamilyId, persons]);

  // Filtered members by search or status
  const displayedMembers = useMemo(() => {
    return familyMembers.filter(m => {
      if (statusFilter !== 'ALL' && m.status !== statusFilter) return false;
      if (familySearchInput.trim()) {
        const q = familySearchInput.toLowerCase().trim();
        return (
          m.name.toLowerCase().includes(q) ||
          m.relationship?.toLowerCase().includes(q) ||
          m.currentLocation?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [familyMembers, statusFilter, familySearchInput]);

  // Family safety metrics
  const familyStats = useMemo(() => {
    const total = familyMembers.length;
    const safeCount = familyMembers.filter(m => ['SAFE', 'AT_SHELTER', 'REUNITED'].includes(m.status)).length;
    const missingCount = familyMembers.filter(m => m.status === 'MISSING').length;
    const hospCount = familyMembers.filter(m => m.status === 'HOSPITALIZED').length;
    const locatedCount = familyMembers.filter(m => m.status === 'LOCATED').length;

    return { total, safeCount, missingCount, hospCount, locatedCount };
  }, [familyMembers]);

  const handleSelectFamily = (id) => {
    setSelectedFamilyId(id);
    setSearchParams({ id });
  };

  const handleCustomFamilySubmit = (e) => {
    e.preventDefault();
    if (familySearchInput.trim()) {
      const formatted = familySearchInput.trim().toUpperCase();
      setSelectedFamilyId(formatted);
      setSearchParams({ id: formatted });
      setFamilySearchInput('');
    }
  };

  return (
    <div className="page-wrapper family-dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="family-header-row">
          <div>
            <span className="page-badge">Household Welfare Portal</span>
            <h1 className="page-title">My Family</h1>
            <p className="page-subtitle">
              Monitor real-time shelter admissions, medical triage updates, and reunion checkpoints for your family unit.
            </p>
          </div>

          <div className="family-header-actions">
            <Link
              to={`/register?familyId=${selectedFamilyId}`}
              className="btn btn-primary btn-sm btn-icon-gap"
            >
              <UserPlus size={16} /> Register New Family Member
            </Link>
          </div>
        </div>

        {/* Family ID Switcher Bar */}
        <div className="family-selector-bar">
          <div className="family-pill-group">
            <span className="family-picker-label">Family Groups:</span>
            {availableFamilies.map(famId => (
              <button
                key={famId}
                type="button"
                className={`family-id-chip ${selectedFamilyId === famId ? 'active' : ''}`}
                onClick={() => handleSelectFamily(famId)}
              >
                <Users size={14} />
                <span>{famId}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomFamilySubmit} className="family-lookup-form">
            <input
              type="text"
              className="family-id-input font-mono"
              placeholder="Enter Family ID e.g. FAM1001"
              value={familySearchInput}
              onChange={(e) => setFamilySearchInput(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary btn-sm">
              Switch
            </button>
          </form>
        </div>

        {/* Family Summary Overview Banner */}
        <div className="family-summary-banner">
          <div className="family-id-display">
            <span className="fam-label">ACTIVE FAMILY ID</span>
            <h2 className="fam-code font-mono">{selectedFamilyId}</h2>
            <span className="fam-count-pill">{familyStats.total} Linked Members</span>
          </div>

          <div className="family-metrics-grid">
            <div className="fam-metric-item">
              <span className="fam-metric-val text-emerald">{familyStats.safeCount}</span>
              <span className="fam-metric-lbl">Safe / Sheltered</span>
            </div>

            <div className="fam-metric-item">
              <span className="fam-metric-val text-danger">{familyStats.missingCount}</span>
              <span className="fam-metric-lbl">Reported Missing</span>
            </div>

            <div className="fam-metric-item">
              <span className="fam-metric-val text-crimson">{familyStats.hospCount}</span>
              <span className="fam-metric-lbl">Hospitalized</span>
            </div>

            <div className="fam-metric-item">
              <span className="fam-metric-val text-orange">{familyStats.locatedCount}</span>
              <span className="fam-metric-lbl">Located / In Transit</span>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar within Family */}
        <div className="family-filter-bar">
          <div className="family-search-wrap">
            <Search size={16} className="text-muted" />
            <input
              type="text"
              className="family-member-search"
              placeholder="Filter by member name, role, or location..."
              value={familySearchInput}
              onChange={(e) => setFamilySearchInput(e.target.value)}
            />
          </div>

          <div className="family-status-filters">
            {['ALL', 'SAFE', 'HOSPITALIZED', 'MISSING', 'LOCATED', 'REUNITED'].map(st => (
              <button
                key={st}
                type="button"
                className={`filter-tab-btn ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {st === 'ALL' ? 'All Members' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Family Members Cards Grid */}
        <div className="family-cards-grid">
          {displayedMembers.length > 0 ? (
            displayedMembers.map(member => (
              <div
                key={member.id}
                className={`family-member-card ${member.status === 'MISSING' ? 'card-border-missing' : ''}`}
              >
                {/* Header */}
                <div className="fmember-header">
                  <div>
                    <div className="fmember-id-tag font-mono">{member.id}</div>
                    <h3 className="fmember-name">{member.name}</h3>
                    <div className="fmember-relation-tag">
                      {member.relationship || 'Family Member'} • {member.age} yrs • {member.gender}
                    </div>
                  </div>
                  <StatusBadge status={member.status} size="md" pulse={member.status === 'MISSING'} />
                </div>

                {/* Location & Status Info */}
                <div className="fmember-body">
                  <div className="fmember-location-row">
                    <MapPin size={16} className={member.status === 'MISSING' ? 'text-danger' : 'text-emerald'} />
                    <div>
                      <span className="fmember-loc-label">
                        {member.status === 'MISSING' ? 'Last Known Location' : 'Current Safe Location'}
                      </span>
                      <strong className="fmember-loc-val">{member.currentLocation || 'Unknown'}</strong>
                      {member.facilityDetails && (
                        <div className="fmember-loc-sub">{member.facilityDetails}</div>
                      )}
                    </div>
                  </div>

                  <div className="fmember-time-row">
                    <Clock size={13} className="text-muted" />
                    <span>Last Updated: <strong>{member.lastUpdated}</strong></span>
                  </div>

                  <div className="fmember-verified-row">
                    <CheckCircle2 size={13} className={member.verificationStatus === 'Verified' ? 'text-emerald' : 'text-amber'} />
                    <span>
                      {member.verificationStatus === 'Verified'
                        ? `Verified by ${member.verifiedBy || 'Rescue Team'}`
                        : 'Verification in progress'}
                    </span>
                  </div>

                  {member.notes && (
                    <div className="fmember-notes">
                      "{member.notes}"
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="fmember-footer">
                  <Link to={`/person/${member.id}`} className="btn btn-outline-primary btn-sm btn-full">
                    View Full Profile
                  </Link>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm btn-full btn-icon-gap"
                    onClick={() => setContactModalPerson(member)}
                  >
                    <Phone size={14} /> Contact Desk
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-family-members-card">
              <Users size={36} className="text-muted" />
              <h3>No family members found for {selectedFamilyId}</h3>
              <p>You can register a member under this Family ID or switch to another family unit.</p>
              <Link to={`/register?familyId=${selectedFamilyId}`} className="btn btn-primary">
                Register Member for {selectedFamilyId}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Contact Authorized Modal */}
      <ContactAuthorizedModal
        person={contactModalPerson}
        isOpen={Boolean(contactModalPerson)}
        onClose={() => setContactModalPerson(null)}
      />
    </div>
  );
};

