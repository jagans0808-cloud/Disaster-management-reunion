import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { storageService } from '../services/storageService';
import api from '../services/api';

const DisasterContext = createContext(null);

export const DisasterProvider = ({ children }) => {
  // Initialize with local cache for instantaneous rendering
  const [persons, setPersons] = useState(() => storageService.getPersons());
  const [reports, setReports] = useState(() => storageService.getReports());
  const [activities, setActivities] = useState(() => storageService.getActivities());
  const [facilities, setFacilities] = useState(() => storageService.getFacilities());
  const [backendAvailable, setBackendAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state to localStorage cache whenever changed
  useEffect(() => {
    storageService.savePersons(persons);
  }, [persons]);

  useEffect(() => {
    storageService.saveReports(reports);
  }, [reports]);

  useEffect(() => {
    storageService.saveActivities(activities);
  }, [activities]);

  useEffect(() => {
    storageService.saveFacilities(facilities);
  }, [facilities]);

  // Initial fetch from backend REST API on load
  const syncWithBackend = useCallback(async () => {
    setIsLoading(true);
    try {
      await api.checkHealth();
      setBackendAvailable(true);

      const [personsRes, reportsRes] = await Promise.all([
        api.getPersons(),
        api.getReports()
      ]);

      if (personsRes?.success && Array.isArray(personsRes.data)) {
        setPersons(personsRes.data);
      }
      if (reportsRes?.success && Array.isArray(reportsRes.data)) {
        setReports(reportsRes.data);
      }
    } catch (err) {
      console.warn('Backend currently unreachable, operating in offline/localStorage fallback mode:', err.message);
      setBackendAvailable(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    syncWithBackend();
  }, [syncWithBackend]);

  const formatCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `Today, ${hours}:${minutes} ${ampm}`;
  };

  /**
   * Look up a person by ID.
   * Checks local state immediately, and queries GET /api/persons/:id
   */
  const getPersonById = (id) => {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    return persons.find(p => p.id?.toUpperCase() === cleanId) || null;
  };

  /**
   * Asynchronously fetch person by ID directly from REST API
   * GET /api/persons/:id
   */
  const fetchPersonById = async (id) => {
    if (!id) return null;
    try {
      const res = await api.getPersonById(id);
      if (res?.success && res.data) {
        // Update in state if modified
        setPersons(prev => {
          const exists = prev.some(p => p.id === res.data.id);
          return exists ? prev.map(p => (p.id === res.data.id ? res.data : p)) : [res.data, ...prev];
        });
        return res.data;
      }
    } catch (e) {
      console.warn(`API lookup failed for ${id}, falling back to local records:`, e.message);
    }
    return getPersonById(id);
  };

  const getFamilyMembers = (familyId) => {
    if (!familyId) return [];
    const clean = familyId.trim().toUpperCase();
    return persons.filter(p => p.familyId?.toUpperCase() === clean);
  };

  /**
   * Register a new person
   * POST /api/persons
   */
  const registerPerson = async (personData) => {
    const nowFormatted = formatCurrentTime();
    let createdPerson = null;

    try {
      // Attempt REST API registration
      const response = await api.createPerson(personData);
      if (response?.success && response.data) {
        createdPerson = response.data;
      }
    } catch (err) {
      console.warn('REST API unavailable for registration, using local store:', err.message);
    }

    // Fallback if API did not return person
    if (!createdPerson) {
      const newId = storageService.generatePersonId(persons);
      const familyId = (personData.familyId || 'FAM1001').trim().toUpperCase();

      createdPerson = {
        id: newId,
        familyId,
        name: personData.name?.trim() || 'Unnamed Person',
        age: Number(personData.age) || 0,
        gender: personData.gender || 'Not Specified',
        relationship: personData.relationship || 'Member',
        emergencyContact: personData.emergencyContact?.trim() || 'N/A',
        homeLocation: personData.homeLocation?.trim() || 'Not specified',
        status: personData.status || 'SAFE',
        currentLocation: personData.currentLocation?.trim() || personData.homeLocation || 'Relief Camp A',
        facilityDetails: personData.facilityDetails || 'Intake Center Shelter',
        lastKnownLocation: personData.homeLocation?.trim() || 'Last recorded residence',
        reportedDate: new Date().toISOString().split('T')[0],
        lastUpdated: nowFormatted,
        verified: true,
        verifiedBy: 'Registration Desk & Family Liaison',
        verificationStatus: 'Verified',
        coordinatorName: 'District Camp Registry',
        coordinatorContact: '+91 94421 00000',
        notes: personData.notes || 'Registered into disaster family reunification platform.',
        timeline: [
          {
            id: `T-${Date.now()}`,
            time: nowFormatted.replace('Today, ', ''),
            date: 'Today',
            title: 'Registered in Reunification Platform',
            location: personData.currentLocation || 'Registration Center',
            type: personData.status || 'SAFE',
            actor: 'Registration Desk',
            description: `Person profile registered with Family ID ${familyId}.`
          }
        ]
      };
    }

    setPersons(prev => [createdPerson, ...prev.filter(p => p.id !== createdPerson.id)]);

    // Log activity
    const newActivity = {
      id: `ACT-${Date.now()}`,
      timestamp: nowFormatted,
      type: 'REGISTRATION',
      personId: createdPerson.id,
      personName: createdPerson.name,
      description: `New person registered: ${createdPerson.name} (${createdPerson.id}) under Family ID ${createdPerson.familyId}.`
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 24)]);

    return createdPerson;
  };

  /**
   * Report a missing person
   * POST /api/reports
   */
  const reportMissing = async (reportData) => {
    const nowFormatted = formatCurrentTime();
    let resultingReport = null;
    let resultingPersonId = reportData.personId?.trim().toUpperCase();

    try {
      const response = await api.createMissingReport(reportData);
      if (response?.success && response.data) {
        resultingReport = response.data;
        resultingPersonId = response.personId || response.data.personId;
        // Refresh persons from API to capture updated status
        const pRes = await api.getPersons();
        if (pRes?.success && Array.isArray(pRes.data)) {
          setPersons(pRes.data);
        }
      }
    } catch (err) {
      console.warn('REST API unavailable for report, using local store:', err.message);
    }

    // Fallback if API did not return
    if (!resultingReport) {
      const newReportId = storageService.generateReportId(reports);
      let targetPerson = null;

      if (resultingPersonId) {
        targetPerson = persons.find(p => p.id.toUpperCase() === resultingPersonId);
      }
      if (!targetPerson && reportData.name) {
        targetPerson = persons.find(
          p => p.name.toLowerCase() === reportData.name.toLowerCase().trim()
        );
      }

      if (targetPerson) {
        resultingPersonId = targetPerson.id;
        const updatedTimeline = [
          ...targetPerson.timeline,
          {
            id: `T-${Date.now()}`,
            time: reportData.time || nowFormatted.replace('Today, ', ''),
            date: reportData.date || 'Today',
            title: reportData.isUrgent ? 'URGENT: Missing Person Report Filed' : 'Missing Person Report Filed',
            location: reportData.lastKnownLocation || targetPerson.lastKnownLocation,
            type: 'MISSING',
            actor: `${reportData.reporterName || 'Family'} (${reportData.reporterRelationship || 'Reporter'})`,
            description: reportData.additionalInfo || 'Reported missing during disaster event.'
          }
        ];

        setPersons(prev =>
          prev.map(p =>
            p.id === targetPerson.id
              ? {
                  ...p,
                  status: 'MISSING',
                  lastKnownLocation: reportData.lastKnownLocation || p.lastKnownLocation,
                  currentLocation: 'Unknown (Active Search Zone)',
                  lastUpdated: nowFormatted,
                  verified: false,
                  verificationStatus: 'Pending',
                  verifiedBy: 'Pending Field Verification',
                  notes: reportData.additionalInfo ? `${p.notes ? p.notes + ' | ' : ''}${reportData.additionalInfo}` : p.notes,
                  timeline: updatedTimeline
                }
              : p
          )
        );
      } else {
        resultingPersonId = storageService.generatePersonId(persons);
        const newPerson = {
          id: resultingPersonId,
          familyId: reportData.familyId?.trim().toUpperCase() || 'FAM1005',
          name: reportData.name?.trim() || 'Missing Individual',
          age: Number(reportData.age) || 0,
          gender: reportData.gender || 'Not Specified',
          relationship: reportData.reporterRelationship || 'Family Member',
          emergencyContact: reportData.reporterContact || 'N/A',
          homeLocation: reportData.lastKnownLocation || 'Disaster Impact Zone',
          status: 'MISSING',
          currentLocation: 'Unknown (Active Search Zone)',
          facilityDetails: 'Active Search Grid Assigned',
          lastKnownLocation: reportData.lastKnownLocation || 'Disaster Zone',
          reportedDate: reportData.date || new Date().toISOString().split('T')[0],
          lastUpdated: nowFormatted,
          verified: false,
          verifiedBy: 'Pending Field Verification',
          verificationStatus: 'Pending',
          coordinatorName: 'Search & Rescue Coordinator',
          coordinatorContact: '+91 94421 00010',
          notes: reportData.additionalInfo || 'Urgent missing person report filed.',
          timeline: [
            {
              id: `T-${Date.now()}`,
              time: reportData.time || nowFormatted.replace('Today, ', ''),
              date: reportData.date || 'Today',
              title: reportData.isUrgent ? 'URGENT: Missing Report Logged' : 'Missing Report Logged',
              location: reportData.lastKnownLocation || 'Disaster Zone',
              type: 'MISSING',
              actor: `${reportData.reporterName || 'Reporter'} (${reportData.reporterRelationship || 'Family'})`,
              description: reportData.additionalInfo || 'Logged by rescue dispatch desk.'
            }
          ]
        };
        setPersons(prev => [newPerson, ...prev]);
      }

      resultingReport = {
        id: newReportId,
        reportId: newReportId,
        personId: resultingPersonId,
        name: reportData.name,
        age: Number(reportData.age) || 0,
        gender: reportData.gender || 'Not Specified',
        lastKnownLocation: reportData.lastKnownLocation,
        date: reportData.date || new Date().toISOString().split('T')[0],
        time: reportData.time || 'Immediate',
        description: reportData.additionalInfo || '',
        urgent: Boolean(reportData.isUrgent),
        reporterName: reportData.reporterName || 'Family Reporter',
        reporterRelationship: reportData.reporterRelationship || 'Relative',
        reporterContact: reportData.reporterContact || 'N/A',
        status: 'MISSING',
        createdAt: new Date().toISOString()
      };
    }

    setReports(prev => [resultingReport, ...prev.filter(r => (r.id || r.reportId) !== (resultingReport.id || resultingReport.reportId))]);

    // Activity
    const newActivity = {
      id: `ACT-${Date.now()}`,
      timestamp: nowFormatted,
      type: 'REPORT',
      personId: resultingPersonId,
      personName: reportData.name,
      description: `New missing person report (${resultingReport.id || resultingReport.reportId}) filed for ${reportData.name} at ${reportData.lastKnownLocation}.`
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 24)]);

    return { report: resultingReport, personId: resultingPersonId };
  };

  /**
   * Update person status from Rescue Operations / Details
   * PUT /api/persons/:id/status
   */
  const updatePersonStatus = async (personId, { newStatus, currentLocation, facilityDetails, notes, verifiedBy }) => {
    const nowFormatted = formatCurrentTime();
    let updatedPerson = null;

    try {
      const response = await api.updatePersonStatus(personId, {
        status: newStatus,
        location: currentLocation,
        facilityDetails,
        notes,
        verified: true,
        verifiedBy: verifiedBy || 'Rescue Team Lead'
      });
      if (response?.success && response.data) {
        updatedPerson = response.data;
      }
    } catch (err) {
      console.warn('REST API status update failed, saving locally:', err.message);
    }

    // Local fallback update
    setPersons(prev =>
      prev.map(p => {
        if (p.id.toUpperCase() === personId.toUpperCase()) {
          const newTimelineItem = {
            id: `T-${Date.now()}`,
            time: nowFormatted.replace('Today, ', ''),
            date: 'Today',
            title: `Status Updated to ${newStatus}`,
            location: currentLocation || p.currentLocation,
            type: newStatus,
            actor: verifiedBy || 'Rescue Team Lead',
            description: notes || `Field operations updated status to ${newStatus}.`
          };

          const pUpdated = {
            ...p,
            status: newStatus,
            currentLocation: currentLocation || p.currentLocation,
            facilityDetails: facilityDetails || p.facilityDetails,
            verified: true,
            verificationStatus: 'Verified',
            verifiedBy: verifiedBy || p.verifiedBy || 'Rescue Team Lead',
            notes: notes ? `${notes} (${nowFormatted})` : p.notes,
            lastUpdated: nowFormatted,
            timeline: [...p.timeline, newTimelineItem]
          };
          if (!updatedPerson) updatedPerson = pUpdated;
          return updatedPerson;
        }
        return p;
      })
    );

    // Update missing reports
    if (['LOCATED', 'SAFE', 'HOSPITALIZED', 'AT_SHELTER', 'REUNITED'].includes(newStatus)) {
      setReports(prev =>
        prev.map(r => (r.personId?.toUpperCase() === personId.toUpperCase() ? { ...r, status: newStatus } : r))
      );
    }

    const personName = updatedPerson?.name || personId;
    const newActivity = {
      id: `ACT-${Date.now()}`,
      timestamp: nowFormatted,
      type: 'STATUS_UPDATE',
      personId,
      personName,
      description: `${personName} status updated to ${newStatus}${currentLocation ? ` at ${currentLocation}` : ''}.`
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 24)]);

    return updatedPerson;
  };

  /**
   * Mark person as safely reunited
   * PUT /api/persons/:id/reunite
   */
  const markReunited = async (personId, { notes, reunitedWith, coordinatorName }) => {
    const nowFormatted = formatCurrentTime();
    let reunitedPerson = null;

    try {
      const response = await api.reunitePerson(personId, {
        notes,
        reunitedWith,
        coordinatorName: coordinatorName || 'Camp Magistrate & Family Liaison'
      });
      if (response?.success && response.data) {
        reunitedPerson = response.data;
      }
    } catch (err) {
      console.warn('REST API reunite failed, saving locally:', err.message);
    }

    // Local fallback update
    setPersons(prev =>
      prev.map(p => {
        if (p.id.toUpperCase() === personId.toUpperCase()) {
          const newTimelineItem = {
            id: `T-${Date.now()}`,
            time: nowFormatted.replace('Today, ', ''),
            date: 'Today',
            title: 'Reunification Confirmed & Closed',
            location: 'Family Reunion Handover Desk',
            type: 'REUNITED',
            actor: coordinatorName || 'Camp Magistrate & Family Liaison',
            description: notes || `Successfully reunited with ${reunitedWith || 'registered family members'}.`
          };

          const pReunited = {
            ...p,
            status: 'REUNITED',
            reunitedAt: new Date().toISOString(),
            currentLocation: 'Safe with Family',
            facilityDetails: 'Reunification Completed & Verified',
            lastUpdated: nowFormatted,
            verified: true,
            verificationStatus: 'Verified',
            verifiedBy: coordinatorName || 'Family Reunification Officer',
            notes: `REUNITED: ${notes || 'Family confirmed safe reunion.'}`,
            timeline: [...p.timeline, newTimelineItem]
          };
          if (!reunitedPerson) reunitedPerson = pReunited;
          return reunitedPerson;
        }
        return p;
      })
    );

    // Update missing reports
    setReports(prev =>
      prev.map(r => (r.personId?.toUpperCase() === personId.toUpperCase() ? { ...r, status: 'REUNITED' } : r))
    );

    const personName = reunitedPerson?.name || personId;
    const newActivity = {
      id: `ACT-${Date.now()}`,
      timestamp: nowFormatted,
      type: 'REUNION',
      personId,
      personName,
      description: `Successful safe reunification! ${personName} reunited with ${reunitedWith || 'family'}.`
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 24)]);

    return reunitedPerson;
  };

  /**
   * Add custom timeline milestone
   */
  const addTimelineEvent = (personId, event) => {
    const nowFormatted = formatCurrentTime();
    setPersons(prev =>
      prev.map(p => {
        if (p.id.toUpperCase() === personId.toUpperCase()) {
          const newEntry = {
            id: `T-${Date.now()}`,
            time: event.time || nowFormatted.replace('Today, ', ''),
            date: event.date || 'Today',
            title: event.title || 'Operational Note',
            location: event.location || p.currentLocation,
            type: event.type || p.status,
            actor: event.actor || 'Operations Desk',
            description: event.description || ''
          };
          return {
            ...p,
            lastUpdated: nowFormatted,
            timeline: [...p.timeline, newEntry]
          };
        }
        return p;
      })
    );
  };

  /**
   * Reset to default demonstration dataset
   */
  const resetToDefaultData = () => {
    const defaults = storageService.resetAllData();
    setPersons(defaults.persons);
    setReports(defaults.reports);
    setActivities(defaults.activities);
    setFacilities(defaults.facilities);
    syncWithBackend();
  };

  // Real-time computed KPI stats
  const stats = useMemo(() => {
    const total = persons.length;
    const missing = persons.filter(p => p.status === 'MISSING').length;
    const located = persons.filter(p => p.status === 'LOCATED').length;
    const safe = persons.filter(p => p.status === 'SAFE').length;
    const hospitalized = persons.filter(p => p.status === 'HOSPITALIZED').length;
    const atShelter = persons.filter(p => p.status === 'AT_SHELTER').length;
    const transferred = persons.filter(p => p.status === 'TRANSFERRED').length;
    const reunited = persons.filter(p => p.status === 'REUNITED').length;

    return {
      totalRegistered: total,
      missingCount: missing,
      locatedCount: located,
      safeCount: safe,
      hospitalizedCount: hospitalized,
      shelterCount: atShelter,
      transferredCount: transferred,
      reunitedCount: reunited
    };
  }, [persons]);

  const value = {
    persons,
    reports,
    activities,
    facilities,
    stats,
    backendAvailable,
    isLoading,
    getPersonById,
    fetchPersonById,
    getFamilyMembers,
    registerPerson,
    reportMissing,
    updatePersonStatus,
    markReunited,
    addTimelineEvent,
    resetToDefaultData,
    syncWithBackend
  };

  return <DisasterContext.Provider value={value}>{children}</DisasterContext.Provider>;
};

export const useDisaster = () => {
  const context = useContext(DisasterContext);
  if (!context) {
    throw new Error('useDisaster must be used within a DisasterProvider');
  }
  return context;
};
