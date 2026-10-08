import React from 'react';
import { X, Phone, MapPin, UserCheck, Shield, Clock, AlertCircle } from 'lucide-react';

export const ContactAuthorizedModal = ({ person, isOpen, onClose }) => {
  if (!isOpen || !person) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Shield className="text-primary" size={22} />
            <div>
              <h3 className="modal-title">Contact Authorized Team</h3>
              <p className="modal-subtitle">Official Response Desk for {person.name} ({person.id})</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="authorized-contact-card">
            <div className="contact-detail-row">
              <span className="contact-icon"><MapPin size={18} /></span>
              <div>
                <span className="contact-label">Current Verified Location</span>
                <strong className="contact-val">{person.currentLocation || 'Designated Relief Facility'}</strong>
                <span className="contact-subval">{person.facilityDetails || 'Sector Operations Post'}</span>
              </div>
            </div>

            <div className="contact-detail-row">
              <span className="contact-icon"><UserCheck size={18} /></span>
              <div>
                <span className="contact-label">Field Coordinator / Officer</span>
                <strong className="contact-val">{person.coordinatorName || person.verifiedBy || 'NDRF Camp Liaison'}</strong>
                <span className="contact-subval">ID: AUTH-DESK-{person.familyId || 'DISPATCH'}</span>
              </div>
            </div>

            <div className="contact-detail-row">
              <span className="contact-icon"><Phone size={18} /></span>
              <div>
                <span className="contact-label">Official Hotline Number</span>
                <strong className="contact-val highlight-phone">{person.coordinatorContact || '+91 94421 00001'}</strong>
                <span className="contact-subval">Priority line for family tracing inquiries</span>
              </div>
            </div>

            <div className="contact-detail-row">
              <span className="contact-icon"><Clock size={18} /></span>
              <div>
                <span className="contact-label">Desk Operating Hours</span>
                <strong className="contact-val">24/7 Continuous Emergency Operations</strong>
              </div>
            </div>
          </div>

          <div className="modal-notice">
            <AlertCircle size={16} className="text-amber" />
            <p>
              Please keep the <strong>Person ID ({person.id})</strong> and <strong>Family ID ({person.familyId})</strong> ready when speaking with the desk officer to verify civilian identification.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <a
            href={`tel:${(person.coordinatorContact || '1078').replace(/[^0-9+]/g, '')}`}
            className="btn btn-primary btn-icon-gap"
          >
            <Phone size={16} /> Call Authorized Desk
          </a>
        </div>
      </div>
    </div>
  );
};

