import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  AlertTriangle,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  Activity,
  HeartHandshake,
  Lock,
  ArrowRight,
  Radio,
  FileCheck,
  MapPin,
  Clock,
  PhoneCall
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { StatusBadge } from '../components/StatusBadge';

export const Home = () => {
  const { stats, persons, activities } = useDisaster();

  // Highlight person for the hero card (Arun Kumar)
  const heroPerson = persons.find(p => p.id === 'PERSON-0001') || persons[0];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-pill-tag">
              <span className="pulse-dot"></span>
              Humanitarian Disaster Response Network
            </div>
            <h1 className="hero-headline">
              Find. Verify. <span className="hero-highlight">Reunite.</span>
            </h1>
            <p className="hero-subheading">
              A centralized platform helping families locate loved ones separated during disasters such as floods, cyclones, earthquakes, and landslides.
            </p>

            <div className="hero-actions">
              <Link to="/search" className="btn btn-primary btn-lg">
                <Search size={18} /> Search a Person
              </Link>
              <Link to="/report-missing" className="btn btn-danger btn-lg">
                <AlertTriangle size={18} /> Report Missing
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                <UserPlus size={18} /> Register Person
              </Link>
            </div>

            <div className="hero-trust-indicators">
              <div className="trust-item">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Zero Aadhaar Requirement</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-primary" />
                <span>Rescue Team Verified</span>
              </div>
              <div className="trust-item">
                <Radio size={16} className="text-amber" />
                <span>Multi-Agency Coordination</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Humanitarian CSS Dashboard Card */}
          <div className="hero-visual">
            <div className="hero-card-stack">
              {/* Primary Mock Person Card */}
              <div className="dashboard-mock-card main-mock-card">
                <div className="mock-card-header">
                  <div className="mock-id-pill">
                    <span className="mock-id-label">PERSON ID</span>
                    <strong className="mock-id-value">{heroPerson?.id || 'PERSON-0001'}</strong>
                  </div>
                  <StatusBadge status={heroPerson?.status || 'SAFE'} size="md" pulse={false} />
                </div>

                <div className="mock-card-body">
                  <div className="mock-person-info">
                    <h3 className="mock-person-name">{heroPerson?.name || 'Arun Kumar'}</h3>
                    <div className="mock-meta-row">
                      <span className="mock-meta-item">Age: <strong>{heroPerson?.age || 24}</strong></span>
                      <span className="mock-meta-dot">•</span>
                      <span className="mock-meta-item">Gender: <strong>{heroPerson?.gender || 'Male'}</strong></span>
                      <span className="mock-meta-dot">•</span>
                      <span className="mock-meta-item">Family ID: <strong>{heroPerson?.familyId || 'FAM1001'}</strong></span>
                    </div>
                  </div>

                  <div className="mock-location-box">
                    <div className="mock-loc-header">
                      <MapPin size={15} className="text-emerald" />
                      <span className="mock-loc-label">Safe Location</span>
                    </div>
                    <div className="mock-loc-val">{heroPerson?.currentLocation || 'Relief Camp A'}</div>
                    <div className="mock-loc-sub">Coimbatore East • Verified Facility</div>
                  </div>

                  <div className="mock-verification-row">
                    <div className="mock-verified-badge">
                      <CheckCircle2 size={14} className="text-emerald" />
                      <span>Verified by Rescue Team (NDRF)</span>
                    </div>
                    <div className="mock-time-stamp">
                      <Clock size={13} />
                      <span>{heroPerson?.lastUpdated || 'Today, 4:20 PM'}</span>
                    </div>
                  </div>
                </div>

                <div className="mock-card-footer">
                  <Link to={`/person/${heroPerson?.id || 'PERSON-0001'}`} className="mock-btn-link">
                    View Live Profile <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Secondary Floating Mini Card (Live Ticker) */}
              <div className="floating-stat-card">
                <div className="floating-icon">
                  <Activity size={20} className="text-primary" />
                </div>
                <div>
                  <div className="floating-title">Live Triage Status</div>
                  <div className="floating-desc">Real-time shelter registry sync</div>
                </div>
                <span className="live-status-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrap stat-icon-blue">
                <Users size={24} />
              </div>
              <div className="stat-data">
                <span className="stat-number">{stats.totalRegistered + 1240}</span>
                <span className="stat-label">Registered People</span>
              </div>
              <div className="stat-growth">Across 14 emergency relief zones</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap stat-icon-red">
                <AlertTriangle size={24} />
              </div>
              <div className="stat-data">
                <span className="stat-number">{stats.missingCount + 42}</span>
                <span className="stat-label">Missing Reports</span>
              </div>
              <div className="stat-growth alert-growth">Active search underway</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap stat-icon-orange">
                <Activity size={24} />
              </div>
              <div className="stat-data">
                <span className="stat-number">{stats.locatedCount + stats.shelterCount + 380}</span>
                <span className="stat-label">People Located</span>
              </div>
              <div className="stat-growth">Identified at camps & triage</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap stat-icon-green">
                <HeartHandshake size={24} />
              </div>
              <div className="stat-data">
                <span className="stat-number">{stats.reunitedCount + 295}</span>
                <span className="stat-label">Successful Reunifications</span>
              </div>
              <div className="stat-growth success-growth">Safely returned to family</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="workflow-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">Standard Operating Procedure</span>
            <h2 className="section-title">How Reunification Works</h2>
            <p className="section-subtitle">
              A transparent four-step humanitarian protocol designed for chaotic disaster environments.
            </p>
          </div>

          <div className="workflow-grid">
            <div className="workflow-step-card">
              <div className="step-number">01</div>
              <div className="step-icon-wrap">
                <UserPlus size={24} />
              </div>
              <h3 className="step-title">1. Register Person</h3>
              <p className="step-desc">
                Displaced civilians or family liaisons record basic descriptive information. System assigns a standardized demo Person ID (e.g., <code>PERSON-0001</code>).
              </p>
              <div className="step-tag">Zero Aadhaar required</div>
            </div>

            <div className="workflow-step-card">
              <div className="step-number">02</div>
              <div className="step-icon-wrap step-icon-danger">
                <AlertTriangle size={24} />
              </div>
              <h3 className="step-title">2. Report Missing</h3>
              <p className="step-desc">
                File an urgent missing-person alert with last-seen landmarks, clothing details, and family contact details for search team mobilization.
              </p>
              <div className="step-tag">Search grid priority</div>
            </div>

            <div className="workflow-step-card">
              <div className="step-number">03</div>
              <div className="step-icon-wrap step-icon-orange">
                <Activity size={24} />
              </div>
              <h3 className="step-title">3. Locate & Verify</h3>
              <p className="step-desc">
                Rescue teams (NDRF/SDRF), camp managers, and hospitals update location records, health status, and authorized verification badges.
              </p>
              <div className="step-tag">Officer validated</div>
            </div>

            <div className="workflow-step-card">
              <div className="step-number">04</div>
              <div className="step-icon-wrap step-icon-green">
                <HeartHandshake size={24} />
              </div>
              <h3 className="step-title">4. Safe Reunification</h3>
              <p className="step-desc">
                Families search by Person ID, verify designated shelter desk, contact verified coordinators, and complete safe physical handover.
              </p>
              <div className="step-tag">Official closure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: One Platform. Multiple Responders. */}
      <section className="responders-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">Inter-Agency Coordination</span>
            <h2 className="section-title">One Platform. Multiple Responders.</h2>
            <p className="section-subtitle">
              Bridging the communication gap between field emergency workers, hospitals, and frantic families.
            </p>
          </div>

          <div className="responders-grid">
            <div className="responder-card">
              <div className="responder-icon-box">
                <Users size={26} className="text-primary" />
              </div>
              <h3 className="responder-title">Families</h3>
              <p className="responder-desc">
                Search separated relatives instantly by Person ID or Family ID without needing sensitive identity cards. Track status changes with live timestamps.
              </p>
            </div>

            <div className="responder-card">
              <div className="responder-icon-box">
                <Activity size={26} className="text-amber" />
              </div>
              <h3 className="responder-title">Rescue Teams</h3>
              <p className="responder-desc">
                NDRF, SDRF, and civilian volunteers update real-time location tags from flood boats, rescue helicopters, and field transit staging posts.
              </p>
            </div>

            <div className="responder-card">
              <div className="responder-icon-box">
                <Building2 size={26} className="text-danger" />
              </div>
              <h3 className="responder-title">Hospitals</h3>
              <p className="responder-desc">
                Medical casualty wards log admitted and stabilized patients, updating vitals status and connecting family members to attending physicians.
              </p>
            </div>

            <div className="responder-card">
              <div className="responder-icon-box">
                <Building2 size={26} className="text-blue" />
              </div>
              <h3 className="responder-title">Relief Camps</h3>
              <p className="responder-desc">
                Camp intake officers register sheltered civilians, manage capacity rosters, and provide verified contact desk details for safe family reception.
              </p>
            </div>

            <div className="responder-card responder-card-wide">
              <div className="responder-icon-box">
                <ShieldCheck size={26} className="text-emerald" />
              </div>
              <h3 className="responder-title">District Authorities</h3>
              <p className="responder-desc">
                Disaster Management Authority (DMA) magistrates oversee verification logs, track status distribution charts, and supervise verified reunification handovers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Privacy Section */}
      <section className="safety-section">
        <div className="container">
          <div className="safety-card">
            <div className="safety-header">
              <div className="safety-icon-bubble">
                <Lock size={26} className="text-primary" />
              </div>
              <div>
                <span className="safety-kicker">Data Protection & Ethical AI Design</span>
                <h2 className="safety-title">Your Information Matters</h2>
              </div>
            </div>

            <p className="safety-lead">
              During humanitarian crises, vulnerable populations—especially lost children, seniors, and displaced families—must be protected from identity misuse, trafficking, and unauthorized tracking.
            </p>

            <div className="safety-points-grid">
              <div className="safety-point">
                <div className="safety-point-icon">
                  <ShieldCheck size={20} className="text-emerald" />
                </div>
                <div>
                  <h4 className="safety-point-title">Authorized Access</h4>
                  <p className="safety-point-desc">
                    Only verified field officers and camp leads can modify casualty classifications and transfer locations.
                  </p>
                </div>
              </div>

              <div className="safety-point">
                <div className="safety-point-icon">
                  <FileCheck size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="safety-point-title">Verified Updates</h4>
                  <p className="safety-point-desc">
                    Every location and medical triage update is timestamped with officer credentials and unit identifiers.
                  </p>
                </div>
              </div>

              <div className="safety-point">
                <div className="safety-point-icon">
                  <Lock size={20} className="text-amber" />
                </div>
                <div>
                  <h4 className="safety-point-title">Minimal Personal Information</h4>
                  <p className="safety-point-desc">
                    No Aadhaar numbers, biometric dumps, or banking details are ever solicited or stored. Only operational disaster data is maintained.
                  </p>
                </div>
              </div>

              <div className="safety-point">
                <div className="safety-point-icon">
                  <Building2 size={20} className="text-blue" />
                </div>
                <div>
                  <h4 className="safety-point-title">Secure Data Handling</h4>
                  <p className="safety-point-desc">
                    Encrypted client storage architecture engineered for offline sync and smooth migration to cloud and sovereign data servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action CTA Banner */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-text">
              <h3 className="cta-heading">Separated from a loved one or responding on the ground?</h3>
              <p className="cta-desc">
                Use our search portal to locate registered camp survivors or immediately notify active rescue boats.
              </p>
            </div>
            <div className="cta-buttons">
              <Link to="/search" className="btn btn-primary btn-lg">
                <Search size={18} /> Search Person ID
              </Link>
              <Link to="/report-missing" className="btn btn-danger btn-lg">
                <AlertTriangle size={18} /> File Missing Report
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

