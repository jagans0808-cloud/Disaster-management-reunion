import React, { useState, useEffect } from 'react';
import { X, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { ALL_STATUSES, getStatusConfig } from '../utils/statusConfig';

export const UpdateStatusModal = ({ person, isOpen, onClose, onUpdate }) => {
  const [newStatus, setNewStatus] = useState('SAFE');
  const [currentLocation, setCurrentLocation] = useState('');
  const [facilityDetails, setFacilityDetails] = useState('');
  const [verifiedBy, setVerifiedBy] = useState('NDRF Field Team Beta');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (person) {
      setNewStatus(person.status || 'SAFE');
      setCurrentLocation(person.currentLocation || '');
      setFacilityDetails(person.facilityDetails || '');
      setVerifiedBy(person.verifiedBy || 'NDRF Field Team Beta');
      setNotes('');
    }
  }, [person, isOpen]);

  if (!isOpen || !person) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(person.id, {
      newStatus,
      currentLocation,
      facilityDetails,
      verifiedBy,
      notes
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <RefreshCw className="text-primary spin-hover" size={22} />
            <div>
              <h3 className="modal-title">Update Status & Location</h3>
              <p className="modal-subtitle">Operational update for {person.name} ({person.id})</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body form-stacked">
            <div className="form-group">
              <label className="form-label" htmlFor="newStatus">
                New Operational Status <span className="text-danger">*</span>
              </label>
              <select
                id="newStatus"
                className="form-select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                required
              >
                {ALL_STATUSES.map((statusKey) => {
                  const cfg = getStatusConfig(statusKey);
                  return (
                    <option key={statusKey} value={statusKey}>
                      {cfg.label} — {cfg.description}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="currentLocation">
                Current Location / Facility <span className="text-danger">*</span>
              </label>
              <input
                id="currentLocation"
                type="text"
                className="form-input"
                placeholder="e.g. Relief Camp A, City Hospital, Ward 3B"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="facilityDetails">
                Specific Staging / Shelter Details
              </label>
              <input
                id="facilityDetails"
                type="text"
                className="form-input"
                placeholder="e.g. Main Hall, Bed 12, Medical Triage Bay"
                value={facilityDetails}
                onChange={(e) => setFacilityDetails(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="verifiedBy">
                Verified By (Officer / Unit Name) <span className="text-danger">*</span>
              </label>
              <input
                id="verifiedBy"
                type="text"
                className="form-input"
                placeholder="e.g. NDRF Unit 3 / Dr. S. Rao / Red Cross Liaison"
                value={verifiedBy}
                onChange={(e) => setVerifiedBy(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="notes">
                Operational Notes / Condition
              </label>
              <textarea
                id="notes"
                className="form-textarea"
                rows="3"
                placeholder="Add physical condition, hydration status, medical check notes, or family communication..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <div className="form-notice">
              <AlertCircle size={15} />
              <span>This update will append to the public timeline and notify registered family search queries.</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-icon-gap">
              <CheckCircle size={16} /> Save & Broadcast Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

