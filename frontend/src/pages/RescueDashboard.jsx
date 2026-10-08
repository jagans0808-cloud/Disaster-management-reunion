import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  AlertTriangle,
  HeartPulse,
  Home,
  Users,
  Eye,
  Edit3,
  Check,
  ChevronRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { StatusBadge } from '../components/StatusBadge';
import { UpdateStatusModal } from '../components/UpdateStatusModal';
import { ReuniteModal } from '../components/ReuniteModal';

export const RescueDashboard = () => {
  const {
    persons,
    stats,
    updatePersonStatus,
    markReunited
  } = useDisaster();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [selectedVerificationFilter, setSelectedVerificationFilter] = useState('ALL');

  // Modals state
  const [statusModalPerson, setStatusModalPerson] = useState(null);
  const [reuniteModalPerson, setReuniteModalPerson] = useState(null);

  // Quick verify feedback
  const [quickVerifiedId, setQuickVerifiedId] = useState(null);

  // Filtered persons
  const filteredPersons = useMemo(() => {
    return persons.filter(p => {
      // Search query (id, name, location, familyId)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          p.id?.toLowerCase().includes(q) ||
          p.name?.toLowerCase().includes(q) ||
          p.currentLocation?.toLowerCase().includes(q) ||
          p.lastKnownLocation?.toLowerCase().includes(q) ||
          p.familyId?.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Status filter
      if (selectedStatusFilter !== 'ALL') {
        if (p.status !== selectedStatusFilter) return false;
      }

      // Verification filter
      if (selectedVerificationFilter !== 'ALL') {
        if (selectedVerificationFilter === 'VERIFIED' && p.verificationStatus !== 'Verified') return false;
        if (selectedVerificationFilter === 'PENDING' && p.verificationStatus === 'Verified') return false;
      }

      return true;
    });
  }, [persons, searchQuery, selectedStatusFilter, selectedVerificationFilter]);

  const handleQuickVerify = (person) => {
    updatePersonStatus(person.id, {
      newStatus: person.status,
      currentLocation: person.currentLocation,
      facilityDetails: person.facilityDetails,
      verifiedBy: 'Field Operations Commander',
      notes: 'Quick identity verification confirmed by Field Ops.'
    });
    setQuickVerifiedId(person.id);
    setTimeout(() => setQuickVerifiedId(null), 2000);
  };

  return (
    <div className="page-wrapper rescue-dashboard-page">
      <div className="container">
        {/* Operations Header */}
        <div className="rescue-header-row">
          <div>
            <div className="ops-live-tag">
              <span className="live-dot-pulse"></span> FIELD OPERATIONS DISPATCH
            </div>
            <h1 className="page-title">Rescue Operations</h1>
            <p className="page-subtitle">
              Operational coordination desk for rescue teams, evacuation boats, and relief camp registries.
            </p>
          </div>

          <div className="rescue-header-actions">
            <Link to="/report-missing" className="btn btn-danger btn-sm">
              <AlertTriangle size={15} /> Emergency Missing Report
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              <Users size={15} /> Register Field Evacuee
            </Link>
          </div>
        </div>

        {/* Top 6 KPI Statistics */}
        <div className="rescue-stats-grid">
          <div
            className={`rescue-stat-card ${selectedStatusFilter === 'ALL' ? 'active-filter-card' : ''}`}
            onClick={() => setSelectedStatusFilter('ALL')}
          >
            <div className="rstat-label">Total Registered</div>
            <div className="rstat-val">{stats.totalRegistered}</div>
            <div className="rstat-sub">Central registry count</div>
          </div>

          <div
            className={`rescue-stat-card rstat-danger ${selectedStatusFilter === 'MISSING' ? 'active-filter-card' : ''}`}
            onClick={() => setSelectedStatusFilter('MISSING')}
          >
            <div className="rstat-label">Missing</div>
            <div className="rstat-val text-danger">{stats.missingCount}</div>
            <div className="rstat-sub">Active search grids</div>
          </div>

          <div
            className={`rescue-stat-card rstat-orange ${selectedStatusFilter === 'LOCATED' ? 'active-filter-card' : ''}`}
            onClick={() => setSelectedStatusFilter('LOCATED')}
          >
            <div className="rstat-label">Located</div>
            <div className="rstat-val text-orange">{stats.locatedCount}</div>
            <div className="rstat-sub">Under transit / triage</div>
          </div>

          <div
            className={`rescue-stat-card rstat-green ${selectedStatusFilter === 'SAFE' ? 'active-filter-card' : ''}`}
            onClick={() => setSelectedStatusFilter('SAFE')}
          >
            <div className="rstat-label">Safe</div>
            <div className="rstat-val text-emerald">{stats.safeCount}</div>
            <div className="rstat-sub">Verified unharmed</div>
          </div>

          <div
            className={`rescue-stat-card rstat-crimson ${selectedStatusFilter === 'HOSPITALIZED' ? 'active-filter-card' : ''}`}
            onClick={() => setSelectedStatusFilter('HOSPITALIZED')}
          >
            <div className="rstat-label">Hospitalized</div>
            <div className="rstat-val text-crimson">{stats.hospitalizedCount}</div>
            <div className="rstat-sub">Medical admission</div>
          </div>

          <div
            className={`rescue-stat-card rstat-blue ${selectedStatusFilter === 'AT_SHELTER' ? 'active-filter-card' : ''}`}
            onClick={() => setSelectedStatusFilter('AT_SHELTER')}
          >
            <div className="rstat-label">At Relief Camps</div>
            <div className="rstat-val text-blue">{stats.shelterCount}</div>
            <div className="rstat-sub">Sheltered with provisions</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="ops-filter-bar">
          <div className="ops-search-box">
            <Search size={18} className="ops-search-icon" />
            <input
              type="text"
              className="ops-search-input"
              placeholder="Search Person ID / Name / Location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
              >
                ×
              </button>
            )}
          </div>

          <div className="ops-filter-dropdowns">
            <select
              className="ops-select"
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="MISSING">Missing Only</option>
              <option value="LOCATED">Located Only</option>
              <option value="SAFE">Safe Only</option>
              <option value="HOSPITALIZED">Hospitalized Only</option>
              <option value="AT_SHELTER">At Relief Camps Only</option>
              <option value="TRANSFERRED">Transferred Only</option>
              <option value="REUNITED">Reunited Only</option>
            </select>

            <select
              className="ops-select"
              value={selectedVerificationFilter}
              onChange={(e) => setSelectedVerificationFilter(e.target.value)}
            >
              <option value="ALL">All Verification</option>
              <option value="VERIFIED">Verified Only</option>
              <option value="PENDING">Pending Only</option>
            </select>
          </div>
        </div>

        {/* Operational Records Table */}
        <div className="table-responsive-wrapper">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Person ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Location</th>
                <th>Last Updated</th>
                <th>Verification</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPersons.length > 0 ? (
                filteredPersons.map((person) => {
                  const isVerified = person.verificationStatus === 'Verified';
                  return (
                    <tr key={person.id} className={person.status === 'MISSING' ? 'row-missing-highlight' : ''}>
                      {/* Person ID */}
                      <td className="cell-id">
                        <Link to={`/person/${person.id}`} className="person-id-link">
                          {person.id}
                        </Link>
                        <span className="cell-family-tag">{person.familyId}</span>
                      </td>

                      {/* Name & Age */}
                      <td className="cell-name">
                        <strong className="person-row-name">{person.name}</strong>
                        <div className="person-row-sub">
                          {person.age} yrs • {person.gender} • {person.relationship || 'Member'}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="cell-status">
                        <StatusBadge status={person.status} size="sm" pulse={person.status === 'MISSING'} />
                      </td>

                      {/* Location */}
                      <td className="cell-location">
                        <div className="location-name-row">
                          <MapPin size={13} className="text-muted" />
                          <span>{person.currentLocation || 'Unknown'}</span>
                        </div>
                        {person.facilityDetails && (
                          <div className="location-details-sub">{person.facilityDetails}</div>
                        )}
                      </td>

                      {/* Last Updated */}
                      <td className="cell-time">
                        <div className="time-row">
                          <Clock size={13} className="text-muted" />
                          <span>{person.lastUpdated}</span>
                        </div>
                      </td>

                      {/* Verification */}
                      <td className="cell-verification">
                        {isVerified ? (
                          <span className="verify-pill verified-pill" title={`Verified by ${person.verifiedBy}`}>
                            <CheckCircle2 size={13} className="text-emerald" /> Verified
                          </span>
                        ) : (
                          <span className="verify-pill pending-pill">
                            <Clock size={13} className="text-amber" /> Pending
                          </span>
                        )}
                        <span className="verify-actor-name">{person.verifiedBy || 'Field Unit'}</span>
                      </td>

                      {/* Actions */}
                      <td className="cell-actions text-right">
                        <div className="action-buttons-group">
                          {/* Quick Update Modal */}
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-xs"
                            onClick={() => setStatusModalPerson(person)}
                            title="Update status, location, notes"
                          >
                            <Edit3 size={13} /> Update Status
                          </button>

                          {/* Quick Verify Button if pending */}
                          {!isVerified && (
                            <button
                              type="button"
                              className="btn btn-outline-success btn-xs"
                              onClick={() => handleQuickVerify(person)}
                              title="Mark identity as verified"
                            >
                              {quickVerifiedId === person.id ? <Check size={13} /> : <CheckCircle2 size={13} />}
                              <span>{quickVerifiedId === person.id ? 'Verified!' : 'Verify'}</span>
                            </button>
                          )}

                          {/* Reunited Quick Button if safe and not yet marked */}
                          {person.status !== 'REUNITED' && (
                            <button
                              type="button"
                              className="btn btn-outline-emerald btn-xs"
                              onClick={() => setReuniteModalPerson(person)}
                              title="Mark family physical reunion"
                            >
                              <Users size={13} /> Reunite
                            </button>
                          )}

                          {/* View details */}
                          <Link
                            to={`/person/${person.id}`}
                            className="btn btn-ghost btn-xs"
                            title="View comprehensive profile and timeline"
                          >
                            <Eye size={13} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="empty-table-cell">
                    <div className="empty-table-state">
                      <AlertTriangle size={32} className="text-muted" />
                      <h4>No matching person records found</h4>
                      <p>Try clearing or modifying your search and status filter selections.</p>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedStatusFilter('ALL');
                          setSelectedVerificationFilter('ALL');
                        }}
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info Banner */}
        <div className="ops-footer-banner">
          <ShieldCheck size={18} className="text-primary" />
          <span>
            Authorized Field Dispatch Desk • All state modifications are immediately synchronized with the public search and family dashboards.
          </span>
        </div>
      </div>

      {/* Modals */}
      <UpdateStatusModal
        person={statusModalPerson}
        isOpen={Boolean(statusModalPerson)}
        onClose={() => setStatusModalPerson(null)}
        onUpdate={updatePersonStatus}
      />

      <ReuniteModal
        person={reuniteModalPerson}
        isOpen={Boolean(reuniteModalPerson)}
        onClose={() => setReuniteModalPerson(null)}
        onReunite={markReunited}
      />
    </div>
  );
};

