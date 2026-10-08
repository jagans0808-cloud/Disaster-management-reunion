import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LifeBuoy,
  Search,
  UserPlus,
  AlertOctagon,
  Users,
  Activity,
  Shield,
  Menu,
  X,
  PhoneCall
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home', icon: LifeBuoy },
    { to: '/search', label: 'Search Person', icon: Search },
    { to: '/report-missing', label: 'Report Missing', icon: AlertOctagon, alertBadge: true },
    { to: '/register', label: 'Register Person', icon: UserPlus },
    { to: '/family', label: 'My Family', icon: Users },
    { to: '/rescue', label: 'Rescue Ops', icon: Activity },
    { to: '/admin', label: 'Admin Hub', icon: Shield }
  ];

  return (
    <header className="site-header">
      {/* Emergency Top Banner */}
      <div className="emergency-ticker">
        <div className="container emergency-ticker-content">
          <div className="ticker-badge">
            <span className="ticker-pulse"></span>
            ACTIVE DISASTER RESPONSE
          </div>
          <p className="ticker-text">
            Centralized Family Tracing System • Emergency Helplines: <strong>NDRF 1078</strong> | <strong>Control Room 1070</strong> | <strong>Medical 108</strong>
          </p>
          <a href="tel:1078" className="ticker-call-btn">
            <PhoneCall size={12} /> Call NDRF 1078
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-nav">
        <div className="container nav-container">
          {/* Logo & Brand */}
          <NavLink to="/" className="brand-logo" aria-label="REUNITE Home">
            <div className="brand-icon-wrapper">
              <LifeBuoy className="brand-icon" size={24} />
            </div>
            <div className="brand-titles">
              <span className="brand-name">REUNITE</span>
              <span className="brand-tagline">Disaster Family Reunification</span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <ul className="desktop-nav-links">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'nav-link-active' : ''} ${link.alertBadge ? 'nav-link-alert' : ''}`
                    }
                  >
                    <Icon size={16} className="nav-icon" />
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-out Drawer */}
      <div className={`mobile-nav-backdrop ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="brand-titles">
            <span className="brand-name">REUNITE</span>
            <span className="brand-tagline">Disaster Family Reunification</span>
          </div>
          <button
            type="button"
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-nav-body">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? 'active' : ''} ${link.alertBadge ? 'alert-highlight' : ''}`
                    }
                  >
                    <Icon size={18} className="mobile-nav-icon" />
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="mobile-drawer-footer">
            <div className="drawer-emergency-info">
              <strong>Emergency Helplines</strong>
              <div className="drawer-numbers">
                <div>National Emergency: <span>112</span></div>
                <div>Disaster Control: <span>1070</span></div>
                <div>NDRF Rescue: <span>1078</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

