import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AlertTriangle,
  AlertOctagon,
  CheckCircle,
  Copy,
  Check,
  MapPin,
  Clock,
  Calendar,
  FileText,
  Phone,
  User,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { StatusBadge } from '../components/StatusBadge';

export const ReportMissing = () => {
  const { reportMissing, persons } = useDisaster();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    personId: '',
    name: '',
    age: '',
    gender: 'Male',
    familyId: 'FAM1001',
    lastKnownLocation: '',
    date: new Date().toISOString().split('T')[0],
    time: '1:40 PM',
    additionalInfo: '',
    isUrgent: true,
    reporterName: '',
    reporterRelationship: 'Son',
    reporterContact: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdReportData, setCreatedReportData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Auto-fill if personId entered matches existing person
  const handlePersonIdBlur = () => {
    if (formData.personId.trim()) {
      const match = persons.find(p => p.id.toUpperCase() === formData.personId.trim().toUpperCase());
      if (match) {
        setFormData(prev => ({
          ...prev,
          name: match.name || prev.name,
          age: match.age || prev.age,
          gender: match.gender || prev.gender,
          familyId: match.familyId || prev.familyId,
          lastKnownLocation: match.lastKnownLocation || prev.lastKnownLocation
        }));
      }
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Missing person name is required';
    if (!formData.lastKnownLocation.trim()) errs.lastKnownLocation = 'Last known location is required';
    if (!formData.date) errs.date = 'Date last seen is required';
    if (!formData.reporterContact.trim()) errs.reporterContact = 'Reporter contact number is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await reportMissing({
        personId: formData.personId,
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        familyId: formData.familyId,
        lastKnownLocation: formData.lastKnownLocation,
        date: formData.date,
        time: formData.time,
        additionalInfo: formData.additionalInfo,
        isUrgent: formData.isUrgent,
        reporterName: formData.reporterName,
        reporterRelationship: formData.reporterRelationship,
        reporterContact: formData.reporterContact
      });

      setCreatedReportData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReportId = () => {
    const repId = createdReportData?.report?.id || createdReportData?.report?.reportId;
    if (!repId) return;
    navigator.clipboard.writeText(repId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetForNew = () => {
    setCreatedReportData(null);
    setFormData({
      personId: '',
      name: '',
      age: '',
      gender: 'Male',
      familyId: 'FAM1001',
      lastKnownLocation: '',
      date: new Date().toISOString().split('T')[0],
      time: '1:40 PM',
      additionalInfo: '',
      isUrgent: true,
      reporterName: '',
      reporterRelationship: 'Family',
      reporterContact: ''
    });
  };

  return (
    <div className="page-wrapper report-missing-page">
      <div className="container form-page-container">
        {/* Header */}
        <div className="page-header text-center">
          <div className="emergency-badge-top">
            <AlertOctagon size={16} /> Urgent Emergency Reporting
          </div>
          <h1 className="page-title">Report a Missing Person</h1>
          <p className="page-subtitle">
            Instantly alert search boat units, relief camp administrators, and triage hospitals.
          </p>
        </div>

        {/* Form Card */}
        <div className="form-card report-missing-card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-sections">
              {/* Optional Existing Person ID */}
              <div className="form-section-block">
                <div className="form-group">
                  <label className="form-label" htmlFor="personId">
                    Person ID <span className="text-muted">(Optional — if already registered)</span>
                  </label>
                  <input
                    id="personId"
                    type="text"
                    className="form-input font-mono"
                    placeholder="e.g. PERSON-0003 (leave blank to auto-create)"
                    value={formData.personId}
                    onChange={(e) => setFormData({ ...formData, personId: e.target.value.toUpperCase() })}
                    onBlur={handlePersonIdBlur}
                  />
                  <span className="field-hint">If this person is already registered in the system, enter their ID to link this alert.</span>
                </div>
              </div>

              {/* Missing Individual Details */}
              <div className="form-section-block">
                <h3 className="form-section-title">1. Missing Person Details</h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      placeholder="e.g. Kumar Sundaram"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-grid-2 nested-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="age">
                        Approximate Age
                      </label>
                      <input
                        id="age"
                        type="number"
                        className="form-input"
                        placeholder="e.g. 52"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        min="0"
                        max="120"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="gender">
                        Gender
                      </label>
                      <select
                        id="gender"
                        className="form-select"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Child/Infant">Child / Minor</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separation Circumstances */}
              <div className="form-section-block">
                <h3 className="form-section-title">2. Separation Circumstances & Last Known Location</h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastKnownLocation">
                    Last Known Location / Landmark <span className="text-danger">*</span>
                  </label>
                  <input
                    id="lastKnownLocation"
                    type="text"
                    className={`form-input ${errors.lastKnownLocation ? 'input-error' : ''}`}
                    placeholder="e.g. Main Road near Central Bus Stand, Coimbatore"
                    value={formData.lastKnownLocation}
                    onChange={(e) => setFormData({ ...formData, lastKnownLocation: e.target.value })}
                    required
                  />
                  {errors.lastKnownLocation && <span className="error-text">{errors.lastKnownLocation}</span>}
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="date">
                      Date Last Seen <span className="text-danger">*</span>
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="form-input"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="time">
                      Approximate Time
                    </label>
                    <input
                      id="time"
                      type="text"
                      className="form-input"
                      placeholder="e.g. 1:40 PM / Morning"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="additionalInfo">
                    Additional Information (Clothing, Physical Markers, Medical Needs)
                  </label>
                  <textarea
                    id="additionalInfo"
                    className="form-textarea"
                    rows="3"
                    placeholder="e.g. Wearing dark blue collared shirt and grey trousers. Wears wireframe spectacles. Diabetic medication needed..."
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  ></textarea>
                </div>
              </div>

              {/* Reporter Contact */}
              <div className="form-section-block">
                <h3 className="form-section-title">3. Reporting Party Information</h3>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reporterName">
                      Your Name
                    </label>
                    <input
                      id="reporterName"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Arun Kumar"
                      value={formData.reporterName}
                      onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reporterRelationship">
                      Relationship
                    </label>
                    <input
                      id="reporterRelationship"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Son, Sister, Neighbor"
                      value={formData.reporterRelationship}
                      onChange={(e) => setFormData({ ...formData, reporterRelationship: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reporterContact">
                      Your Phone / Contact <span className="text-danger">*</span>
                    </label>
                    <input
                      id="reporterContact"
                      type="tel"
                      className={`form-input ${errors.reporterContact ? 'input-error' : ''}`}
                      placeholder="e.g. +91 98765 43210"
                      value={formData.reporterContact}
                      onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
                      required
                    />
                    {errors.reporterContact && <span className="error-text">{errors.reporterContact}</span>}
                  </div>
                </div>
              </div>

              {/* Emergency Checkbox */}
              <div className="urgent-checkbox-card">
                <label className="custom-checkbox-label">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={formData.isUrgent}
                    onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                  />
                  <div>
                    <strong className="text-danger">This is an urgent missing-person report</strong>
                    <p className="urgent-subtext">
                      Flagging this will immediately beam coordinates to ground rescue boats and priority shelter intake registers.
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  className="btn btn-danger btn-lg btn-full btn-icon-gap"
                  disabled={isSubmitting}
                >
                  <AlertTriangle size={18} />
                  <span>{isSubmitting ? 'Submitting Urgent Report...' : 'Submit Missing Report'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Missing Report Created Success Modal */}
      {createdReportData && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-md success-report-modal">
            <div className="report-success-icon-badge">
              <ShieldAlert size={40} className="text-danger" />
            </div>

            <h2 className="modal-title text-center">Missing Person Report Created</h2>
            <p className="modal-subtitle text-center">
              The high-priority missing report has been broadcast to active rescue channels and search grids.
            </p>

            <div className="status-banner-row">
              <span className="status-label-bold">Assigned Status:</span>
              <StatusBadge status="MISSING" size="md" pulse={true} />
            </div>

            <div className="report-id-box">
              <span className="report-box-label">REPORT REFERENCE ID</span>
              <div className="report-box-code">{createdReportData.report.id}</div>
              <p className="report-box-hint">
                Linked Person ID: <strong>{createdReportData.personId}</strong>
              </p>
            </div>

            <div className="report-summary-meta">
              <div>Person: <strong>{createdReportData.report.name}</strong></div>
              <div>Last Known Location: <strong>{createdReportData.report.lastKnownLocation}</strong></div>
              <div>Urgency Level: <strong className="text-danger">{createdReportData.report.isUrgent ? 'HIGH EMERGENCY' : 'Standard'}</strong></div>
            </div>

            <div className="modal-actions-stacked">
              <button
                type="button"
                className="btn btn-secondary btn-full btn-icon-gap"
                onClick={handleCopyReportId}
              >
                {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                <span>{copied ? 'Report ID Copied!' : 'Copy Report ID'}</span>
              </button>

              <button
                type="button"
                className="btn btn-primary btn-full btn-icon-gap"
                onClick={() => navigate(`/person/${createdReportData.personId}`)}
              >
                <span>View Person Live Profile</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn btn-outline-danger btn-full btn-icon-gap"
                onClick={() => navigate('/rescue')}
              >
                <span>Track in Rescue Operations Desk</span>
              </button>

              <button
                type="button"
                className="btn btn-ghost btn-full"
                onClick={handleResetForNew}
              >
                File Another Missing Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

