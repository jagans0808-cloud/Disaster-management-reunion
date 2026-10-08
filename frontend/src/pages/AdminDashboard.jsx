import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Activity,
  AlertTriangle,
  Compass,
  ShieldCheck,
  HeartPulse,
  Users,
  Home,
  MapPin,
  Clock,
  Download,
  RotateCcw,
  CheckCircle2,
  Building2,
  FileText,
  TrendingUp,
  Radio
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { storageService } from '../services/storageService';
import { StatusBadge } from '../components/StatusBadge';

export const AdminDashboard = () => {
  const {
    persons,
    reports,
    activities,
    facilities,
    stats,
    resetToDefaultData
  } = useDisaster();

  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState(false);

  // Status Distribution Calculations for CSS-based Bar / Percentage Chart
  const total = stats.totalRegistered || 1;
  const statusPercentages = [
    { label: 'Safe', count: stats.safeCount, color: '#16a34a', bg: '#f0fdf4', pct: Math.round((stats.safeCount / total) * 100) },
    { label: 'At Shelter', count: stats.shelterCount, color: '#2563eb', bg: '#eff6ff', pct: Math.round((stats.shelterCount / total) * 100) },
    { label: 'Hospitalized', count: stats.hospitalizedCount, color: '#e11d48', bg: '#fff1f2', pct: Math.round((stats.hospitalizedCount / total) * 100) },
    { label: 'Located / In Transit', count: stats.locatedCount, color: '#ea580c', bg: '#fff7ed', pct: Math.round((stats.locatedCount / total) * 100) },
    { label: 'Missing Alerts', count: stats.missingCount, color: '#dc2626', bg: '#fef2f2', pct: Math.round((stats.missingCount / total) * 100) },
    { label: 'Reunited', count: stats.reunitedCount, color: '#0d9488', bg: '#f0fdfa', pct: Math.round((stats.reunitedCount / total) * 100) }
  ];

  const handleExportData = () => {
    const backup = storageService.exportBackup();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `reunite_disaster_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetData = () => {
    resetToDefaultData();
    setResetConfirmOpen(false);
    setResetSuccessMessage(true);
    setTimeout(() => setResetSuccessMessage(false), 3000);
  };

  return (
    <div className="page-wrapper admin-dashboard-page">
      <div className="container">
        {/* Page Header */}
        <div className="admin-header-row">
          <div>
            <div className="admin-badge-top">
              <Shield size={15} /> Emergency Management Oversight
            </div>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">
              Macro situational awareness, disaster registry analytics, shelter loads, and field audit trails.
            </p>
          </div>

          <div className="admin-top-actions">
            <button type="button" className="btn btn-secondary btn-sm btn-icon-gap" onClick={handleExportData}>
              <Download size={15} /> Export Registry (JSON)
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm btn-icon-gap"
              onClick={() => setResetConfirmOpen(true)}
            >
              <RotateCcw size={15} /> Reset Demo Data
            </button>
          </div>
        </div>

        {/* Reset Feedback Notification */}
        {resetSuccessMessage && (
          <div className="alert-banner-success">
            <CheckCircle2 size={18} />
            <span>Successfully restored database to default disaster demo dataset.</span>
          </div>
        )}

        {/* Top 6 KPI Administrative Cards */}
        <div className="admin-kpi-grid">
          <div className="admin-kpi-card">
            <div className="kpi-icon-wrap kpi-icon-blue">
              <Users size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-title">Total People</span>
              <strong className="kpi-number">{stats.totalRegistered}</strong>
              <span className="kpi-sub">Registered across all sectors</span>
            </div>
          </div>

          <div className="admin-kpi-card kpi-danger-border">
            <div className="kpi-icon-wrap kpi-icon-red">
              <AlertTriangle size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-title">Missing</span>
              <strong className="kpi-number text-danger">{stats.missingCount}</strong>
              <span className="kpi-sub">{reports.length} total missing reports filed</span>
            </div>
          </div>

          <div className="admin-kpi-card">
            <div className="kpi-icon-wrap kpi-icon-orange">
              <Compass size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-title">Located</span>
              <strong className="kpi-number text-orange">{stats.locatedCount}</strong>
              <span className="kpi-sub">Under evacuation transit</span>
            </div>
          </div>

          <div className="admin-kpi-card">
            <div className="kpi-icon-wrap kpi-icon-green">
              <ShieldCheck size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-title">Safe</span>
              <strong className="kpi-number text-emerald">{stats.safeCount}</strong>
              <span className="kpi-sub">Verified unharmed status</span>
            </div>
          </div>

          <div className="admin-kpi-card">
            <div className="kpi-icon-wrap kpi-icon-crimson">
              <HeartPulse size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-title">Hospitalized</span>
              <strong className="kpi-number text-crimson">{stats.hospitalizedCount}</strong>
              <span className="kpi-sub">Admitted in emergency wards</span>
            </div>
          </div>

          <div className="admin-kpi-card">
            <div className="kpi-icon-wrap kpi-icon-teal">
              <Users size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-title">Reunited</span>
              <strong className="kpi-number text-emerald">{stats.reunitedCount}</strong>
              <span className="kpi-sub">Confirmed family handovers</span>
            </div>
          </div>
        </div>

        {/* 2-Column Analytics Layout */}
        <div className="admin-main-grid">
          {/* Left Column: Status Distribution Chart & Recent Locations */}
          <div className="admin-col">
            {/* Status Distribution (Lightweight CSS-based Chart) */}
            <div className="admin-card">
              <div className="admin-card-header">
                <div className="admin-card-title-wrap">
                  <TrendingUp size={20} className="text-primary" />
                  <div>
                    <h3 className="admin-card-title">Status Distribution</h3>
                    <p className="admin-card-subtitle">Real-time breakdown of current casualty status</p>
                  </div>
                </div>
              </div>

              <div className="admin-card-body">
                {/* CSS Segmented Progress Bar */}
                <div className="segmented-bar">
                  {statusPercentages.map((item) => (
                    <div
                      key={item.label}
                      className="segment-slice"
                      style={{
                        width: `${Math.max(item.pct, item.count > 0 ? 5 : 0)}%`,
                        backgroundColor: item.color
                      }}
                      title={`${item.label}: ${item.count} (${item.pct}%)`}
                    />
                  ))}
                </div>

                {/* Status Breakdown Legend & Percentage Rows */}
                <div className="distribution-rows-list">
                  {statusPercentages.map((item) => (
                    <div key={item.label} className="dist-item-row">
                      <div className="dist-item-left">
                        <span className="dist-color-swatch" style={{ backgroundColor: item.color }} />
                        <span className="dist-item-name">{item.label}</span>
                      </div>
                      <div className="dist-item-right">
                        <span className="dist-item-count"><strong>{item.count}</strong> people</span>
                        <div className="dist-bar-track">
                          <div
                            className="dist-bar-fill"
                            style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                          />
                        </div>
                        <span className="dist-item-pct">{item.pct}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Locations & Relief Facilities */}
            <div className="admin-card">
              <div className="admin-card-header">
                <div className="admin-card-title-wrap">
                  <Building2 size={20} className="text-blue" />
                  <div>
                    <h3 className="admin-card-title">Active Emergency Facilities</h3>
                    <p className="admin-card-subtitle">Operational status, capacity and relief camp coordinators</p>
                  </div>
                </div>
              </div>

              <div className="admin-card-body">
                <div className="facilities-list">
                  {facilities.map((fac) => {
                    const occPct = Math.round((fac.currentCount / fac.capacity) * 100);
                    return (
                      <div key={fac.id} className="facility-item-card">
                        <div className="facility-top-row">
                          <div>
                            <h4 className="facility-name">{fac.name}</h4>
                            <span className="facility-sub">{fac.fullName}</span>
                          </div>
                          <span className="facility-type-badge">{fac.type}</span>
                        </div>

                        <div className="facility-occupancy-bar-wrap">
                          <div className="facility-occ-labels">
                            <span>Occupancy: <strong>{fac.currentCount}</strong> / {fac.capacity}</span>
                            <span>{occPct}%</span>
                          </div>
                          <div className="facility-occ-track">
                            <div
                              className="facility-occ-fill"
                              style={{
                                width: `${occPct}%`,
                                backgroundColor: occPct > 80 ? '#dc2626' : occPct > 60 ? '#ea580c' : '#16a34a'
                              }}
                            />
                          </div>
                        </div>

                        <div className="facility-footer-row">
                          <div className="facility-coord">
                            <Users size={13} className="text-muted" />
                            <span>Lead: {fac.coordinator}</span>
                          </div>
                          <div className="facility-phone font-mono">
                            {fac.phone}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Recent Activity Feed */}
          <div className="admin-col">
            <div className="admin-card">
              <div className="admin-card-header">
                <div className="admin-card-title-wrap">
                  <Activity size={20} className="text-emerald" />
                  <div>
                    <h3 className="admin-card-title">Recent Activity</h3>
                    <p className="admin-card-subtitle">Live system audit logs and field registry updates</p>
                  </div>
                </div>
                <div className="live-audit-pill">
                  <span className="live-dot-pulse"></span> LIVE AUDIT
                </div>
              </div>

              <div className="admin-card-body">
                <div className="activity-feed-list">
                  {activities && activities.length > 0 ? (
                    activities.map((act) => (
                      <div key={act.id} className="activity-item-card">
                        <div className="activity-icon-col">
                          {act.type === 'REUNION' && <span className="act-bubble bubble-emerald">🤝</span>}
                          {act.type === 'REPORT' && <span className="act-bubble bubble-red">⚠️</span>}
                          {act.type === 'HOSPITAL' && <span className="act-bubble bubble-crimson">🏥</span>}
                          {act.type === 'STATUS_UPDATE' && <span className="act-bubble bubble-blue">🔄</span>}
                          {act.type === 'LOCATED' && <span className="act-bubble bubble-orange">📍</span>}
                          {act.type === 'REGISTRATION' && <span className="act-bubble bubble-purple">📝</span>}
                          {!['REUNION', 'REPORT', 'HOSPITAL', 'STATUS_UPDATE', 'LOCATED', 'REGISTRATION'].includes(act.type) && (
                            <span className="act-bubble bubble-gray">ℹ️</span>
                          )}
                        </div>

                        <div className="activity-content-col">
                          <div className="activity-top-line">
                            <span className="activity-time">
                              <Clock size={12} /> {act.timestamp}
                            </span>
                            {act.personId && (
                              <Link to={`/person/${act.personId}`} className="activity-id-link font-mono">
                                {act.personId}
                              </Link>
                            )}
                          </div>
                          <p className="activity-desc">{act.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-activity-text">No activity records recorded yet.</p>
                  )}
                </div>
              </div>

              <div className="admin-card-footer text-center">
                <Link to="/rescue" className="btn btn-outline-primary btn-sm">
                  Go to Rescue Operations Dispatch →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-sm">
            <div className="modal-header">
              <h3 className="modal-title text-danger">Reset to Default Data?</h3>
            </div>
            <div className="modal-body">
              <p>
                This will overwrite your browser's local storage and restore the platform to the initial set of 8 realistic demo persons, reports, and activities.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setResetConfirmOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleResetData}>
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

