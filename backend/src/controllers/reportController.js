import { reports, persons, generateReportId, generatePersonId } from '../data/database.js';

const getFormattedTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `Today, ${hours}:${minutes} ${ampm}`;
};

/**
 * GET /api/reports
 * Return all missing reports
 */
export const getAllReports = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve missing reports',
      error: error.message
    });
  }
};

/**
 * GET /api/reports/:id
 * Return missing report by Report ID
 */
export const getReportById = (req, res) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim().toUpperCase();

    const report = reports.find(
      r => r.id?.toUpperCase() === cleanId || r.reportId?.toUpperCase() === cleanId
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: `Report not found with ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve report',
      error: error.message
    });
  }
};

/**
 * POST /api/reports
 * Create a new missing report
 */
export const createReport = (req, res) => {
  try {
    const {
      personId,
      name,
      age,
      gender,
      lastKnownLocation,
      date,
      time,
      description,
      additionalInfo,
      urgent,
      isUrgent,
      reporterName,
      reporterRelationship,
      reporterContact
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Missing person name is required'
      });
    }

    if (!lastKnownLocation || !lastKnownLocation.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Last known location is required'
      });
    }

    const newReportId = generateReportId();
    const nowTime = getFormattedTime();
    const finalDescription = description || additionalInfo || 'Reported missing during disaster event.';
    const finalUrgent = urgent !== undefined ? Boolean(urgent) : Boolean(isUrgent);

    // Link or create person
    let targetPerson = null;
    let finalPersonId = personId ? personId.trim().toUpperCase() : null;

    if (finalPersonId) {
      targetPerson = persons.find(p => p.id?.toUpperCase() === finalPersonId);
    }

    if (!targetPerson) {
      targetPerson = persons.find(
        p => p.name.toLowerCase() === name.trim().toLowerCase()
      );
      if (targetPerson) {
        finalPersonId = targetPerson.id;
      }
    }

    if (targetPerson) {
      // Update person to MISSING
      targetPerson.status = 'MISSING';
      targetPerson.lastKnownLocation = lastKnownLocation.trim();
      targetPerson.currentLocation = 'Unknown (Active Search Zone)';
      targetPerson.lastUpdated = nowTime;
      targetPerson.verified = false;
      targetPerson.verificationStatus = 'Pending';
      targetPerson.verifiedBy = 'Pending Field Verification';

      targetPerson.timeline.push({
        id: `T${Date.now()}`,
        time: time || nowTime.replace('Today, ', ''),
        date: date || 'Today',
        title: finalUrgent ? 'URGENT: Missing Person Report Filed' : 'Missing Person Report Filed',
        location: lastKnownLocation.trim(),
        type: 'MISSING',
        actor: `${reporterName || 'Family'} (${reporterRelationship || 'Reporter'})`,
        description: finalDescription
      });
    } else {
      // Create new person with status MISSING
      finalPersonId = generatePersonId();
      const newPerson = {
        id: finalPersonId,
        familyId: req.body.familyId || 'FAM1005',
        name: name.trim(),
        age: Number(age) || 0,
        gender: gender || 'Not Specified',
        relationship: reporterRelationship || 'Family Member',
        emergencyContact: reporterContact || 'N/A',
        homeLocation: lastKnownLocation.trim(),
        status: 'MISSING',
        currentLocation: 'Unknown (Active Search Zone)',
        facilityDetails: 'Active Search Grid Assigned',
        lastKnownLocation: lastKnownLocation.trim(),
        reportedDate: date || new Date().toISOString().split('T')[0],
        lastUpdated: nowTime,
        verified: false,
        verificationStatus: 'Pending',
        verifiedBy: 'Pending Field Verification',
        coordinatorName: 'Search & Rescue Coordinator',
        coordinatorContact: '+91 94421 00010',
        notes: finalDescription,
        timeline: [
          {
            id: `T${Date.now()}`,
            time: time || nowTime.replace('Today, ', ''),
            date: date || 'Today',
            title: finalUrgent ? 'URGENT: Missing Report Logged' : 'Missing Report Logged',
            location: lastKnownLocation.trim(),
            type: 'MISSING',
            actor: `${reporterName || 'Reporter'} (${reporterRelationship || 'Family'})`,
            description: finalDescription
          }
        ]
      };
      persons.unshift(newPerson);
    }

    const newReport = {
      id: newReportId,
      reportId: newReportId,
      personId: finalPersonId,
      name: name.trim(),
      age: Number(age) || 0,
      gender: gender || 'Not Specified',
      lastKnownLocation: lastKnownLocation.trim(),
      date: date || new Date().toISOString().split('T')[0],
      time: time || 'Immediate',
      description: finalDescription,
      urgent: finalUrgent,
      status: 'MISSING',
      reporterName: reporterName || 'Family Reporter',
      reporterRelationship: reporterRelationship || 'Relative',
      reporterContact: reporterContact || 'N/A',
      createdAt: new Date().toISOString()
    };

    reports.unshift(newReport);

    return res.status(201).json({
      success: true,
      message: 'Missing Person Report Created',
      reportId: newReportId,
      personId: finalPersonId,
      data: newReport
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create missing report',
      error: error.message
    });
  }
};

