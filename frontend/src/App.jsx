import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { SearchPerson } from './pages/SearchPerson';
import { RegisterPerson } from './pages/RegisterPerson';
import { ReportMissing } from './pages/ReportMissing';
import { RescueDashboard } from './pages/RescueDashboard';
import { PersonDetails } from './pages/PersonDetails';
import { FamilyDashboard } from './pages/FamilyDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPerson />} />
          <Route path="/register" element={<RegisterPerson />} />
          <Route path="/report-missing" element={<ReportMissing />} />
          <Route path="/rescue" element={<RescueDashboard />} />
          <Route path="/person/:id" element={<PersonDetails />} />
          <Route path="/family" element={<FamilyDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
