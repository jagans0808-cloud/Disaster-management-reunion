import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Edit3,
  HeartHandshake,
  AlertTriangle,
  Building2,
  Calendar,
  Share2,
  Printer,
  PlusCircle,
  X
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { StatusBadge } from '../components/StatusBadge';
import { UpdateStatusModal } from '../components/UpdateStatusModal';
import { ReuniteModal } from '../components/ReuniteModal';
import { ContactAuthorizedModal } from '../components/ContactAuthorizedModal';

export const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getPersonById,
    fetchPersonById,
    updatePersonStatus,
    markReunited,
    addTimelineEvent,
    getFamilyMembers,
    isLoading
  } = useDisaster();

  const [loadingDirect, setLoadingDirect] = useState(false);
  const person = getPersonById(id);

  React.useEffect(() => {
    if (!person && id && fetchPersonById) {
      setLoadingDirect(true);
      fetchPersonById(id).finally(() => setLoadingDirect(false));
    }
  }, [id, person, fetchPersonById]);

  // Modals state
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReuniteModalOpen, setIsReuniteModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAddTimelineOpen, setIsAddTimelineOpen] = useState(false);

  // New timeline entry form
  const [newTimelineTitle, setNewTimelineTitle] = useState('');
  const [newTimelineLocation, setNewTimelineLocation] = useState('');
  const [newTimelineNotes, setNewTimelineNotes] = useState('');

  if (loadingDirect || (isLoading && !person)) {
    return (
      <div className="page-wrapper">
        <div className="container not-found-wrapper">
          <div className="not-found-card">
            <h2>Retrieving Person Record...</h2>
            <p>Fetching official verification details for {id} from the central registry.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="page-wrapper">
        <div className="container not-found-wrapper">
          <div className="not-found-card">
            <AlertTriangle size={42} className="text-danger" />
            <h2>Person Record Not Found</h2>
            <p>No civilian profile with ID "{id}" could be retrieved from the disaster database.</p>
            <div className="not-found-actions">
              <Link to="/search" className="btn btn-primary">
                Return to Search Registry
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register New Civilian
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isReunited = person.status === 'REUNITED';
  const isMissing = person.status === 'MISSING';
  const familyMembers = getFamilyMembers(person.familyId).filter(p => p.id !== person.id);

  const handleAddTimelineSubmit = (e) => {
    e.preventDefault();
    if (!newTimelineTitle.trim()) return;

    addTimelineEvent(person.id, {
      title: newTimelineTitle.trim(),
      location: newTimelineLocation.trim() || person.currentLocation,
      description: newTimelineNotes.trim(),
      type: person.status,
      actor: 'Authorized Officer Desk'
    });

    setNewTimelineTitle('');
    setNewTimelineLocation('');
    setNewTimelineNotes('');
    setIsAddTimelineOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-wrapper person-details-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="details-nav-bar no-print">
          <button type="button" className="btn-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="details-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/search">Registry</Link>
            <span>/</span>
            <span className="current-crumb">{person.id}</span>
          </div>

          <div className="details-header-quick-actions">
            <button type="button" className="btn btn-secondary btn-sm" onClick={handlePrint}>
              <Printer size={15} /> Print Card
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm btn-icon-gap"
              onClick={() => setIsContactModalOpen(true)}
            >
              <Phone size={15} /> Contact Desk
            </button>
          </div>
        </div>

        {/* Hero Card Header */}
        <div className="details-hero-card">
          <div className="details-hero-top">
            <div className="details-id-row">
              <span className="details-id-badge">CIVILIAN REGISTRY RECORD</span>
              <span className="details-id-code">{person.id}</span>
              <Link to={`/family?id=${person.familyId}`} className="details-family-badge">
                <Users size={14} /> Family ID: {person.familyId}
              </Link>
            </div>

            <div className="details-status-badges">
              <StatusBadge status={person.status} size="lg" pulse={isMissing} />
              {person.verificationStatus === 'Verified' ? (
                <span className="verified-status-tag">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>VERIFIED RECORD</span>
                </span>
              ) : (
                <span className="pending-status-tag">
                  <Clock size={16} className="text-amber" />
                  <span>PENDING VERIFICATION</span>
                </span>
              )}
            </div>
          </div>

          <div className="details-hero-main">
            <div>
              <h1 className="details-person-name">{person.name}</h1>
              <div className="details-meta-line">
                <span>{person.age} years old</span>
                <span className="meta-sep">•</span>
                <span>{person.gender}</span>
                <span className="meta-sep">•</span>
                <span>Role: {person.relationship || 'Family Member'}</span>
                <span className="meta-sep">•</span>
                <span>Reported: {person.reportedDate}</span>
              </div>
            </div>

            {/* Action Bar for Rescue Teams */}
            <div className="details-action-toolbar no-print">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setIsUpdateModalOpen(true)}
              >
                <Edit3 size={15} /> Update Status & Location
              </button>

              {!isReunited && (
                <button
                  type="button"
                  className="btn btn-emerald btn-icon-gap"
                  onClick={() => setIsReuniteModalOpen(true)}
                >
                  <HeartHandshake size={16} /> Mark as Reunited
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="details-layout-grid">
          {/* Left Column: Personal, Disaster, Verification, Family */}
          <div className="details-col-left">
            {/* 1. Personal Information */}
            <div className="info-card">
              <div className="info-card-header">
                <Users size={18} className="text-primary" />
                <h3 className="info-card-title">Personal Information</h3>
              </div>
              <div className="info-data-list">
                <div className="info-row">
                  <span className="info-label">Full Legal Name</span>
                  <strong className="info-value">{person.name}</strong>
                </div>
                <div className="info-row">
                  <span className="info-label">Age</span>
                  <span className="info-value">{person.age} years</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Gender</span>
                  <span className="info-value">{person.gender}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Family Group ID</span>
                  <span className="info-value font-mono highlight-family">{person.familyId}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Family Relationship</span>
                  <span className="info-value">{person.relationship || 'Member'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Emergency Contact</span>
                  <span className="info-value phone-val">{person.emergencyContact}</span>
                </div>
              </div>
            </div>

            {/* 2. Disaster Information */}
            <div className="info-card">
              <div className="info-card-header">
                <MapPin size={18} className="text-danger" />
                <h3 className="info-card-title">Disaster Information</h3>
              </div>
              <div className="info-data-list">
                <div className="info-row">
                  <span className="info-label">Operational Status</span>
                  <span className="info-value">
                    <StatusBadge status={person.status} size="sm" />
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Last Known Location</span>
                  <span className="info-value">{person.lastKnownLocation || 'Disaster Zone'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Current Safe Location</span>
                  <strong className="info-value text-emerald">{person.currentLocation || 'Unknown'}</strong>
                </div>
                {person.facilityDetails && (
                  <div className="info-row">
                    <span className="info-label">Facility Details</span>
                    <span className="info-value">{person.facilityDetails}</span>
                  </div>
                )}
                <div className="info-row">
                  <span className="info-label">Last Updated</span>
                  <span className="info-value">{person.lastUpdated}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Reported Date</span>
                  <span className="info-value">{person.reportedDate}</span>
                </div>
              </div>

              {person.notes && (
                <div className="person-notes-block">
                  <span className="notes-label">Condition & Field Notes:</span>
                  <p className="notes-content">{person.notes}</p>
                </div>
              )}
            </div>

            {/* 3. Verification Details */}
            <div className="info-card">
              <div className="info-card-header">
                <ShieldCheck size={18} className="text-emerald" />
                <h3 className="info-card-title">Official Verification</h3>
              </div>
              <div className="info-data-list">
                <div className="info-row">
                  <span className="info-label">Verification Status</span>
                  <span className={`info-value ${person.verificationStatus === 'Verified' ? 'text-emerald' : 'text-amber'}`}>
                    {person.verificationStatus === 'Verified' ? '✓ Official Verified' : 'Pending Verification'}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Verified By</span>
                  <strong className="info-value">{person.verifiedBy || 'Rescue Team Alpha'}</strong>
                </div>
                <div className="info-row">
                  <span className="info-label">Field Coordinator</span>
                  <span className="info-value">{person.coordinatorName || 'Camp Registry Lead'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Desk Contact</span>
                  <span className="info-value phone-val">{person.coordinatorContact || '+91 94421 00001'}</span>
                </div>
              </div>
            </div>

            {/* Linked Family Members */}
            {familyMembers.length > 0 && (
              <div className="info-card">
                <div className="info-card-header">
                  <Users size={18} className="text-blue" />
                  <h3 className="info-card-title">Linked Family Members ({familyMembers.length})</h3>
                </div>
                <div className="linked-family-list">
                  {familyMembers.map(fm => (
                    <Link key={fm.id} to={`/person/${fm.id}`} className="linked-family-item">
                      <div>
                        <strong>{fm.name}</strong>
                        <span className="linked-role">({fm.relationship || 'Relative'}, {fm.age} yrs)</span>
                      </div>
                      <StatusBadge status={fm.status} size="sm" />
                    </Link>
                  ))}
                </div>
                <div className="view-family-link-box">
                  <Link to={`/family?id=${person.familyId}`} className="btn-text-link">
                    Open Full Family Dashboard ({person.familyId}) →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Timeline & Reunification Section */}
          <div className="details-col-right">
            {/* 4. Reunification Status & Action Card */}
            <div className={`reunification-banner-card ${isReunited ? 'reunited-complete' : 'ready-reunite'}`}>
              <div className="reunion-badge-icon">
                <HeartHandshake size={28} />
              </div>
              <div>
                <span className="reunion-kicker">Reunification Status</span>
                <h3 className="reunion-title">
                  {isReunited ? 'SAFE REUNIFICATION COMPLETED' : 'READY FOR REUNIFICATION'}
                </h3>
                <p className="reunion-desc">
                  {isReunited
                    ? 'Official custody handover completed. Person safely reunited with their family.'
                    : 'The person is in a designated relief shelter. Families can proceed to the verified reception desk.'}
                </p>
              </div>

              {!isReunited && (
                <div className="reunion-banner-actions no-print">
                  <button
                    type="button"
                    className="btn btn-emerald btn-lg btn-icon-gap"
                    onClick={() => setIsReuniteModalOpen(true)}
                  >
                    <HeartHandshake size={18} /> Mark as Reunited
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-icon-gap"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    <Phone size={18} /> Contact Camp Desk
                  </button>
                </div>
              )}
            </div>

            {/* 5. Location History & Timeline */}
            <div className="timeline-card">
              <div className="timeline-card-header">
                <div>
                  <h3 className="timeline-card-title">Location History & Timeline</h3>
                  <p className="timeline-card-subtitle">Verified chronological milestones logged by field responders.</p>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-primary btn-xs btn-icon-gap no-print"
                  onClick={() => setIsAddTimelineOpen(!isAddTimelineOpen)}
                >
                  <PlusCircle size={14} /> Add Event
                </button>
              </div>

              {/* Collapsible Add Event Form */}
              {isAddTimelineOpen && (
                <form onSubmit={handleAddTimelineSubmit} className="add-event-form no-print">
                  <div className="add-event-header">
                    <strong>Log Operational Field Event</strong>
                    <button type="button" className="close-mini-btn" onClick={() => setIsAddTimelineOpen(false)}>
                      <X size={15} />
                    </button>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Event Headline</label>
                    <input
                      type="text"
                      className="form-input form-input-sm"
                      placeholder="e.g. Identity verified by Camp Magistrate"
                      value={newTimelineTitle}
                      onChange={(e) => setNewTimelineTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location / Checkpoint</label>
                    <input
                      type="text"
                      className="form-input form-input-sm"
                      placeholder="e.g. Relief Camp A Reception Gate"
                      value={newTimelineLocation}
                      onChange={(e) => setNewTimelineLocation(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Notes / Description</label>
                    <textarea
                      className="form-textarea form-textarea-sm"
                      rows="2"
                      placeholder="Details on physical condition, family arrival, or medical triage..."
                      value={newTimelineNotes}
                      onChange={(e) => setNewTimelineNotes(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="add-event-actions">
                    <button type="submit" className="btn btn-primary btn-xs">
                      Post Event to Timeline
                    </button>
                  </div>
                </form>
              )}

              {/* Timeline Items */}
              <div className="chronological-timeline">
                {person.timeline && person.timeline.length > 0 ? (
                  person.timeline.map((entry, index) => (
                    <div key={entry.id || index} className="timeline-item">
                      <div className="timeline-marker">
                        <span className="timeline-marker-dot"></span>
                        {index < person.timeline.length - 1 && <span className="timeline-line"></span>}
                      </div>

                      <div className="timeline-content-card">
                        <div className="timeline-time-row">
                          <span className="timeline-time-tag">
                            <Clock size={12} /> {entry.time} • {entry.date}
                          </span>
                          <span className="timeline-actor-tag">{entry.actor || 'Operations'}</span>
                        </div>

                        <h4 className="timeline-entry-title">{entry.title}</h4>

                        {entry.location && (
                          <div className="timeline-loc-row">
                            <MapPin size={13} className="text-danger" />
                            <span>Location: <strong>{entry.location}</strong></span>
                          </div>
                        )}

                        {entry.description && (
                          <p className="timeline-entry-desc">{entry.description}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-events-text">No timeline milestones recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpdateStatusModal
        person={person}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdate={updatePersonStatus}
      />

      <ReuniteModal
        person={person}
        isOpen={isReuniteModalOpen}
        onClose={() => setIsReuniteModalOpen(false)}
        onReunite={markReunited}
      />

      <ContactAuthorizedModal
        person={person}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

