import React, { useState } from 'react';
import { X, Users, HeartHandshake, CheckCheck, AlertCircle } from 'lucide-react';

export const ReuniteModal = ({ person, isOpen, onClose, onReunite }) => {
  const [reunitedWith, setReunitedWith] = useState('');
  const [coordinatorName, setCoordinatorName] = useState('Camp Magistrate & Family Liaison');
  const [notes, setNotes] = useState('');

  if (!isOpen || !person) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onReunite(person.id, {
      reunitedWith: reunitedWith.trim() || 'Registered Family Members',
      coordinatorName: coordinatorName.trim(),
      notes: notes.trim() || 'Verified physical handover completed.'
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header reunion-header">
          <div className="modal-title-wrap">
            <div className="reunion-icon-bubble">
              <HeartHandshake className="text-emerald" size={24} />
            </div>
            <div>
              <h3 className="modal-title">Confirm Safe Reunification</h3>
              <p className="modal-subtitle">Official closure for {person.name} ({person.id})</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body form-stacked">
            <div className="reunion-summary-box">
              <div className="reunion-summary-row">
                <span>Person Name:</span>
                <strong>{person.name}</strong>
              </div>
              <div className="reunion-summary-row">
                <span>Person ID:</span>
                <span className="badge-tag">{person.id}</span>
              </div>
              <div className="reunion-summary-row">
                <span>Family ID:</span>
                <span className="badge-tag">{person.familyId}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reunitedWith">
                Reunited With (Name & Relationship) <span className="text-danger">*</span>
              </label>
              <input
                id="reunitedWith"
                type="text"
                className="form-input"
                placeholder="e.g. Arun Kumar (Son) & Priya Kumar (Mother)"
                value={reunitedWith}
                onChange={(e) => setReunitedWith(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="officer">
                Authorized Handover Officer / Magistrate <span className="text-danger">*</span>
              </label>
              <input
                id="officer"
                type="text"
                className="form-input"
                placeholder="e.g. Camp Magistrate M. Haridas"
                value={coordinatorName}
                onChange={(e) => setCoordinatorName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reunionNotes">
                Handover Verification Notes
              </label>
              <textarea
                id="reunionNotes"
                className="form-textarea"
                rows="3"
                placeholder="Confirmation of physical reunion, mutual identity verification, and safe transport destination..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <div className="form-notice success-notice">
              <AlertCircle size={15} />
              <span>Marking this record as <strong>Reunited</strong> will update official statistics and archive active missing alerts.</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-emerald btn-icon-gap">
              <CheckCheck size={16} /> Mark as Safely Reunited
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

