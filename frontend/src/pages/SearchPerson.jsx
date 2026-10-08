import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { StatusBadge } from '../components/StatusBadge';
import { ContactAuthorizedModal } from '../components/ContactAuthorizedModal';

export const SearchPerson = () => {
  const { persons, fetchPersonById } = useDisaster();
  const [searchParams] = useSearchParams();

  // Search States
  const [personIdQuery, setPersonIdQuery] = useState(() => searchParams.get('id') || '');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advName, setAdvName] = useState('');
  const [advAge, setAdvAge] = useState('');
  const [advFamilyId, setAdvFamilyId] = useState('');
  const [advLocation, setAdvLocation] = useState('');

  // Results State
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedResults, setMatchedResults] = useState([]);
  const [selectedPersonForContact, setSelectedPersonForContact] = useState(null);

  const handleIdSearch = async (e) => {
    e?.preventDefault();
    const query = personIdQuery.trim().toUpperCase();
    if (!query) return;

    let found = persons.filter(p => p.id?.toUpperCase() === query);
    if (found.length === 0 && fetchPersonById) {
      try {
        const directPerson = await fetchPersonById(query);
        if (directPerson) {
          found = [directPerson];
        }
      } catch (err) {
        console.warn('Backend person lookup error:', err);
      }
    }
    setMatchedResults(found);
    setHasSearched(true);
  };

  const handleAdvancedSearch = (e) => {
    e?.preventDefault();
    const filtered = persons.filter(p => {
      let match = true;
      if (advName.trim()) {
        match = match && p.name.toLowerCase().includes(advName.trim().toLowerCase());
      }
      if (advAge.trim()) {
        const ageNum = parseInt(advAge.trim(), 10);
        match = match && Math.abs(p.age - ageNum) <= 3; // within 3 years tolerance
      }
      if (advFamilyId.trim()) {
        match = match && p.familyId?.toUpperCase().includes(advFamilyId.trim().toUpperCase());
      }
      if (advLocation.trim()) {
        const locLower = advLocation.trim().toLowerCase();
        match = match && (
          (p.currentLocation && p.currentLocation.toLowerCase().includes(locLower)) ||
          (p.lastKnownLocation && p.lastKnownLocation.toLowerCase().includes(locLower)) ||
          (p.homeLocation && p.homeLocation.toLowerCase().includes(locLower))
        );
      }
      return match;
    });

    setMatchedResults(filtered);
    setHasSearched(true);
  };

  const handleQuickChipClick = async (id) => {
    setPersonIdQuery(id);
    let found = persons.filter(p => p.id?.toUpperCase() === id.toUpperCase());
    if (found.length === 0 && fetchPersonById) {
      try {
        const directPerson = await fetchPersonById(id);
        if (directPerson) found = [directPerson];
      } catch (err) {}
    }
    setMatchedResults(found);
    setHasSearched(true);
  };

  const handleResetSearch = () => {
    setPersonIdQuery('');
    setAdvName('');
    setAdvAge('');
    setAdvFamilyId('');
    setAdvLocation('');
    setHasSearched(false);
    setMatchedResults([]);
  };

  return (
    <div className="page-wrapper search-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header text-center">
          <span className="page-badge">Reunification Registry</span>
          <h1 className="page-title">Find a Family Member</h1>
          <p className="page-subtitle">
            Search using a unique Person ID assigned during rescue registration.
          </p>
        </div>

        {/* Primary Search Card */}
        <div className="search-box-card">
          <form onSubmit={handleIdSearch} className="primary-search-form">
            <div className="search-input-wrap">
              <Search className="search-input-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Enter Person ID e.g. PERSON-0001"
                value={personIdQuery}
                onChange={(e) => setPersonIdQuery(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary btn-search">
              Search Person
            </button>
          </form>

          {/* Quick Demo Chips */}
          <div className="quick-chips-row">
            <span className="quick-chips-label">Try Demo IDs:</span>
            {['PERSON-0001', 'PERSON-0002', 'PERSON-0003', 'PERSON-0004'].map((demoId) => (
              <button
                key={demoId}
                type="button"
                className={`quick-chip ${personIdQuery === demoId ? 'chip-active' : ''}`}
                onClick={() => handleQuickChipClick(demoId)}
              >
                {demoId}
              </button>
            ))}
          </div>

          {/* Advanced Search Accordion Toggle */}
          <div className="advanced-toggle-bar">
            <button
              type="button"
              className="advanced-toggle-btn"
              onClick={() => setAdvancedOpen(!advancedOpen)}
              aria-expanded={advancedOpen}
            >
              <Filter size={16} />
              <span>Optional Advanced Search</span>
              {advancedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Advanced Search Panel */}
          {advancedOpen && (
            <form onSubmit={handleAdvancedSearch} className="advanced-search-panel">
              <div className="advanced-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="advName">Full Name</label>
                  <input
                    id="advName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Arun Kumar"
                    value={advName}
                    onChange={(e) => setAdvName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="advAge">Approximate Age</label>
                  <input
                    id="advAge"
                    type="number"
                    className="form-input"
                    placeholder="e.g. 24"
                    value={advAge}
                    onChange={(e) => setAdvAge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="advFamilyId">Family ID</label>
                  <input
                    id="advFamilyId"
                    type="text"
                    className="form-input"
                    placeholder="e.g. FAM1001"
                    value={advFamilyId}
                    onChange={(e) => setAdvFamilyId(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="advLocation">Last Known Location</label>
                  <input
                    id="advLocation"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Gandhipuram / Aluva"
                    value={advLocation}
                    onChange={(e) => setAdvLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="advanced-actions">
                <button type="button" className="btn btn-secondary" onClick={handleResetSearch}>
                  Clear Filters
                </button>
                <button type="submit" className="btn btn-primary">
                  Filter Registry Records
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Search Results Display */}
        <div className="search-results-container">
          {hasSearched && matchedResults.length > 0 && (
            <div className="search-results-list">
              <div className="results-count-bar">
                <span>Found <strong>{matchedResults.length}</strong> matching record(s)</span>
                <button type="button" className="btn-text-link" onClick={handleResetSearch}>
                  <RefreshCw size={14} /> Reset Search
                </button>
              </div>

              <div className="results-grid">
                {matchedResults.map((person) => (
                  <div key={person.id} className="person-result-card">
                    {/* Header: ID & Status */}
                    <div className="result-card-header">
                      <div className="result-id-pill">
                        <span className="result-id-tag">PERSON ID</span>
                        <strong className="result-id-val">{person.id}</strong>
                      </div>
                      <StatusBadge status={person.status} size="md" />
                    </div>

                    {/* Person Primary Information */}
                    <div className="result-body">
                      <h2 className="result-name">{person.name}</h2>

                      <div className="result-meta-grid">
                        <div className="result-meta-item">
                          <span className="meta-label">Age</span>
                          <span className="meta-value">{person.age} yrs</span>
                        </div>
                        <div className="result-meta-item">
                          <span className="meta-label">Family ID</span>
                          <span className="meta-value highlight-family">{person.familyId}</span>
                        </div>
                        <div className="result-meta-item">
                          <span className="meta-label">Relationship</span>
                          <span className="meta-value">{person.relationship || 'Member'}</span>
                        </div>
                      </div>

                      {/* Location Card */}
                      <div className="safe-location-box">
                        <div className="location-box-header">
                          <MapPin size={16} className="text-emerald" />
                          <span className="location-box-title">
                            {person.status === 'MISSING' ? 'Last Reported Location' : 'Safe Location'}
                          </span>
                        </div>
                        <div className="location-box-main">{person.currentLocation || 'Relief Camp A'}</div>
                        <div className="location-box-sub">
                          {person.facilityDetails || 'Sector Relief Zone • Verified Facility'}
                        </div>
                      </div>

                      {/* Verification & Timestamps */}
                      <div className="result-timestamps">
                        <div className="timestamp-item">
                          <Clock size={14} className="text-muted" />
                          <span>Last Updated: <strong>{person.lastUpdated}</strong></span>
                        </div>
                        <div className="verification-item">
                          <CheckCircle2 size={15} className={person.verificationStatus === 'Verified' ? 'text-emerald' : 'text-amber'} />
                          <span>
                            {person.verificationStatus === 'Verified'
                              ? `✓ Verified by ${person.verifiedBy || 'Rescue Team'}`
                              : 'Pending Verification'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Result Actions */}
                    <div className="result-card-actions">
                      <button
                        type="button"
                        className="btn btn-primary btn-full btn-icon-gap"
                        onClick={() => setSelectedPersonForContact(person)}
                      >
                        <Phone size={16} /> Contact Authorized Team
                      </button>
                      <Link to={`/person/${person.id}`} className="btn btn-outline-primary btn-full">
                        View Full Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Not Found State */}
          {hasSearched && matchedResults.length === 0 && (
            <div className="not-found-card">
              <div className="not-found-icon-wrap">
                <AlertCircle size={36} className="text-danger" />
              </div>
              <h2 className="not-found-title">Person Not Found</h2>
              <p className="not-found-desc">
                No active registration matching <strong>"{personIdQuery || 'your criteria'}"</strong> was located in the centralized disaster registry.
              </p>
              <div className="not-found-tips">
                <div className="tip-header">
                  <HelpCircle size={16} className="text-primary" />
                  <strong>Recommended Next Steps:</strong>
                </div>
                <ul>
                  <li>Double-check the format of the Person ID (e.g., <code>PERSON-0001</code>).</li>
                  <li>Try our Optional Advanced Search using first name, approximate age, or last known landmark.</li>
                  <li>If your loved one has not yet been registered by field teams, immediately file an urgent missing report.</li>
                </ul>
              </div>

              <div className="not-found-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setPersonIdQuery('');
                    setHasSearched(false);
                  }}
                >
                  Try Another ID
                </button>
                <Link to="/report-missing" className="btn btn-danger btn-icon-gap">
                  <AlertCircle size={16} /> Report Missing Person
                </Link>
              </div>
            </div>
          )}

          {/* Initial Search Guide Banner (When not searched yet) */}
          {!hasSearched && (
            <div className="search-guide-panel">
              <div className="guide-card">
                <div className="guide-icon">
                  <ShieldCheck size={28} className="text-emerald" />
                </div>
                <div className="guide-content">
                  <h3 className="guide-title">How Search Operates During Disasters</h3>
                  <p className="guide-text">
                    Every rescued individual admitted into relief shelters, hospital triage wards, and transit boat points receives a standardized ID formatted like <code>PERSON-0001</code>. Relatives can instantly query this identifier without public disclosure of private phone numbers or government documents.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Authorized Team Modal */}
      <ContactAuthorizedModal
        person={selectedPersonForContact}
        isOpen={Boolean(selectedPersonForContact)}
        onClose={() => setSelectedPersonForContact(null)}
      />
    </div>
  );
};

