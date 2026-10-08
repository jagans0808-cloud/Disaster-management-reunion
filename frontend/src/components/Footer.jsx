import React from 'react';
import { Link } from 'react-router-dom';
import { LifeBuoy, ShieldCheck, Phone, Heart, FileText, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="brand-logo footer-logo">
              <div className="brand-icon-wrapper">
                <LifeBuoy className="brand-icon" size={22} />
              </div>
              <div className="brand-titles">
                <span className="brand-name">REUNITE</span>
                <span className="brand-tagline">Disaster Family Reunification</span>
              </div>
            </div>
            <p className="footer-desc">
              A centralized humanitarian platform designed to coordinate rapid family tracing, official verification, and safe physical reunification during natural and humanitarian disasters.
            </p>
            <div className="footer-secure-tag">
              <ShieldCheck size={16} className="text-emerald" />
              <span>Zero Aadhaar requirement • Privacy-first verified protocol</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Platform Access</h4>
            <ul className="footer-links">
              <li><Link to="/search">Search Person by ID</Link></li>
              <li><Link to="/report-missing">Report Missing Person</Link></li>
              <li><Link to="/register">Register Separated Person</Link></li>
              <li><Link to="/family">My Family Dashboard</Link></li>
              <li><Link to="/rescue">Rescue Operations Desk</Link></li>
              <li><Link to="/admin">Admin Overview Hub</Link></li>
            </ul>
          </div>

          {/* Response Framework */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Humanitarian Protocol</h4>
            <ul className="footer-links">
              <li><span className="footer-text-link">NDRF / SDRF Field Triage</span></li>
              <li><span className="footer-text-link">District Relief Shelter Registry</span></li>
              <li><span className="footer-text-link">Hospital Casualty Liaison</span></li>
              <li><span className="footer-text-link">Biometric-Free Family Tracing</span></li>
              <li><span className="footer-text-link">Verified Handover Protocols</span></li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div className="footer-helpline-col">
            <h4 className="footer-heading">Emergency Helplines</h4>
            <div className="helpline-card">
              <div className="helpline-item">
                <span className="helpline-label">National Emergency</span>
                <strong className="helpline-number">112</strong>
              </div>
              <div className="helpline-item">
                <span className="helpline-label">NDRF Control Room</span>
                <strong className="helpline-number">1078</strong>
              </div>
              <div className="helpline-item">
                <span className="helpline-label">State Disaster Center</span>
                <strong className="helpline-number">1070</strong>
              </div>
              <div className="helpline-item">
                <span className="helpline-label">Emergency Medical (Ambulance)</span>
                <strong className="helpline-number">108</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-disclaimer">
            <strong>Humanitarian Prototype Notice:</strong> REUNITE operates as a rapid deployment framework for disaster response. All records displayed here use synthetic identifiers (e.g. <code>PERSON-0001</code>). Sensitive credentials and national identity cards are intentionally omitted to uphold child protection and displaced civilian privacy.
          </p>
          <div className="footer-copyright">
            © {new Date().getFullYear()} REUNITE Platform • Built for Rapid Humanitarian Response & Family Welfare
          </div>
        </div>
      </div>
    </footer>
  );
};

