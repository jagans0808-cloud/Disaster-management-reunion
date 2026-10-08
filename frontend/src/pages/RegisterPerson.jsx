import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserPlus,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  AlertTriangle,
  ArrowRight,
  Info,
  Building,
  Heart
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';

export const RegisterPerson = () => {
  const { registerPerson } = useDisaster();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    familyId: 'FAM1001',
    relationship: 'Son',
    emergencyContact: '',
    homeLocation: '',
    currentLocation: 'Relief Camp A',
    facilityDetails: "St. Mary's Higher Secondary School, Block B",
    notes: '',
    confirmed: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredPerson, setRegisteredPerson] = useState(null);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.age || formData.age < 0 || formData.age > 120) errs.age = 'Valid age is required';
    if (!formData.emergencyContact.trim()) errs.emergencyContact = 'Emergency phone or contact is required';
    if (!formData.homeLocation.trim()) errs.homeLocation = 'Home or last known location is required';
    if (!formData.confirmed) errs.confirmed = 'You must confirm the humanitarian declaration';
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
      const newPerson = await registerPerson({
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        familyId: formData.familyId || 'FAM1001',
        relationship: formData.relationship,
        emergencyContact: formData.emergencyContact,
        homeLocation: formData.homeLocation,
        currentLocation: formData.currentLocation,
        facilityDetails: formData.facilityDetails,
        notes: formData.notes,
        status: 'SAFE'
      });

      setRegisteredPerson(newPerson);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (!registeredPerson) return;
    navigator.clipboard.writeText(registeredPerson.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetForNew = () => {
    setRegisteredPerson(null);
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      familyId: 'FAM1001',
      relationship: 'Member',
      emergencyContact: '',
      homeLocation: '',
      currentLocation: 'Relief Camp A',
      facilityDetails: '',
      notes: '',
      confirmed: false
    });
  };

  return (
    <div className="page-wrapper register-page">
      <div className="container form-page-container">
        {/* Header */}
        <div className="page-header text-center">
          <span className="page-badge">Civilian Intake Desk</span>
          <h1 className="page-title">Register a Person</h1>
          <p className="page-subtitle">
            Record details of a displaced or sheltered individual into the disaster reunification network.
          </p>
        </div>

        {/* Form Container */}
        <div className="form-card">
          <div className="privacy-banner">
            <ShieldCheck size={20} className="text-emerald flex-shrink-0" />
            <div>
              <strong>Privacy Protection Standard:</strong>
              <p>
                Do <strong>NOT</strong> provide Aadhaar numbers, biometric IDs, or bank records. This platform only collects humanitarian data strictly necessary for family tracing.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-sections">
              {/* Section 1: Personal Details */}
              <div className="form-section-block">
                <h3 className="form-section-title">1. Individual Information</h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      placeholder="e.g. Arun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-grid-2 nested-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="age">
                        Age <span className="text-danger">*</span>
                      </label>
                      <input
                        id="age"
                        type="number"
                        className={`form-input ${errors.age ? 'input-error' : ''}`}
                        placeholder="e.g. 24"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        min="0"
                        max="120"
                        required
                      />
                      {errors.age && <span className="error-text">{errors.age}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="gender">
                        Gender <span className="text-danger">*</span>
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
                        <option value="Child/Infant">Child / Infant</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Family & Relationship */}
              <div className="form-section-block">
                <h3 className="form-section-title">2. Family & Contact Binding</h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="familyId">
                      Family ID <span className="text-muted">(Groups relatives together)</span>
                    </label>
                    <input
                      id="familyId"
                      type="text"
                      className="form-input font-mono"
                      placeholder="e.g. FAM1001"
                      value={formData.familyId}
                      onChange={(e) => setFormData({ ...formData, familyId: e.target.value.toUpperCase() })}
                    />
                    <span className="field-hint">Use a shared Family ID (e.g. FAM1001) to link related profiles.</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="relationship">
                      Family Relationship
                    </label>
                    <input
                      id="relationship"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Son, Mother, Father, Self"
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="emergencyContact">
                    Emergency Contact Phone / Liaison <span className="text-danger">*</span>
                  </label>
                  <input
                    id="emergencyContact"
                    type="tel"
                    className={`form-input ${errors.emergencyContact ? 'input-error' : ''}`}
                    placeholder="e.g. +91 98765 43210 (Relative or camp coordinator)"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    required
                  />
                  {errors.emergencyContact && <span className="error-text">{errors.emergencyContact}</span>}
                </div>
              </div>

              {/* Section 3: Disaster Location & Shelter */}
              <div className="form-section-block">
                <h3 className="form-section-title">3. Disaster Location & Shelter</h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="homeLocation">
                      Home / Last Known Residence <span className="text-danger">*</span>
                    </label>
                    <input
                      id="homeLocation"
                      type="text"
                      className={`form-input ${errors.homeLocation ? 'input-error' : ''}`}
                      placeholder="e.g. Gandhipuram Sector 4, Coimbatore"
                      value={formData.homeLocation}
                      onChange={(e) => setFormData({ ...formData, homeLocation: e.target.value })}
                      required
                    />
                    {errors.homeLocation && <span className="error-text">{errors.homeLocation}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="currentLocation">
                      Current Shelter / Location
                    </label>
                    <input
                      id="currentLocation"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Relief Camp A (St. Mary's School)"
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="notes">
                    Physical Description / Health Notes
                  </label>
                  <textarea
                    id="notes"
                    className="form-textarea"
                    rows="3"
                    placeholder="e.g. Distinct clothing, medical requirements, eyeglasses, language spoken..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="confirmation-checkbox-wrap">
                <label className="custom-checkbox-label">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={formData.confirmed}
                    onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                  />
                  <span className="checkbox-text">
                    I confirm that the information provided is for disaster-response/reunification purposes.
                  </span>
                </label>
                {errors.confirmed && <span className="error-text block-error">{errors.confirmed}</span>}
              </div>

              {/* Submit Button */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-full"
                  disabled={isSubmitting}
                >
                  <UserPlus size={18} />
                  <span>{isSubmitting ? 'Registering...' : 'Register Person'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {registeredPerson && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-md success-registration-modal">
            <div className="registration-success-badge">
              <CheckCircle size={40} className="text-emerald" />
            </div>

            <h2 className="modal-title text-center">Person Registered Successfully</h2>
            <p className="modal-subtitle text-center">
              The individual has been officially recorded in the centralized disaster reunification registry.
            </p>

            <div className="id-highlight-box">
              <span className="id-highlight-label">OFFICIAL PERSON ID</span>
              <div className="id-highlight-code">{registeredPerson.id}</div>
              <p className="id-highlight-warning">
                <strong>IMPORTANT:</strong> Save, write down, or take a screenshot of this Person ID. Share it with family members and rescue desk personnel to trace updates.
              </p>
            </div>

            <div className="registered-meta-summary">
              <div>Name: <strong>{registeredPerson.name}</strong></div>
              <div>Family ID: <strong>{registeredPerson.familyId}</strong></div>
              <div>Current Location: <strong>{registeredPerson.currentLocation}</strong></div>
            </div>

            <div className="modal-actions-stacked">
              <button
                type="button"
                className="btn btn-secondary btn-full btn-icon-gap"
                onClick={handleCopyId}
              >
                {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                <span>{copied ? 'Person ID Copied to Clipboard!' : 'Copy Person ID'}</span>
              </button>

              <button
                type="button"
                className="btn btn-primary btn-full btn-icon-gap"
                onClick={() => navigate(`/person/${registeredPerson.id}`)}
              >
                <span>Go to Person Details</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn btn-ghost btn-full"
                onClick={handleResetForNew}
              >
                Register Another Person
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

