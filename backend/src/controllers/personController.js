import { persons, generatePersonId, reports } from '../data/database.js';

const SUPPORTED_STATUSES = [
  'MISSING',
  'LOCATED',
  'SAFE',
  'HOSPITALIZED',
  'AT_SHELTER',
  'TRANSFERRED',
  'REUNITED'
];

const getFormattedTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `Today, ${hours}:${minutes} ${ampm}`;
};

/**
 * GET /api/persons
 * Return all registered persons
 */
export const getAllPersons = (req, res) => {
  try {
    const { status, familyId, search } = req.query;
    let result = [...persons];

    if (status && status !== 'ALL') {
      result = result.filter(p => p.status?.toUpperCase() === status.toUpperCase());
    }

    if (familyId) {
      result = result.filter(p => p.familyId?.toUpperCase() === familyId.toUpperCase());
    }

    if (search) {
      const q = search.toLowerCase().trim();
      result = result.filter(p =>
        p.id?.toLowerCase().includes(q) ||
        p.name?.toLowerCase().includes(q) ||
        p.currentLocation?.toLowerCase().includes(q) ||
        p.lastKnownLocation?.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve persons',
      error: error.message
    });
  }
};

/**
 * GET /api/persons/:id
 * Return a person by Person ID
 */
export const getPersonById = (req, res) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim().toUpperCase();

    const person = persons.find(p => p.id?.toUpperCase() === cleanId);

    if (!person) {
      return res.status(404).json({
        success: false,
        message: `Person not found with ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      data: person
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve person details',
      error: error.message
    });
  }
};

/**
 * POST /api/persons
 * Register a new person
 */
export const createPerson = (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      familyId,
      relationship,
      emergencyContact,
      homeLocation,
      currentLocation,
      facilityDetails,
      status,
      notes
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Full name is required'
      });
    }

    const newId = generatePersonId();
    const nowTime = getFormattedTime();
    const finalFamilyId = (familyId || 'FAM1001').trim().toUpperCase();
    const initialStatus = (status || 'SAFE').toUpperCase();

    const newPerson = {
      id: newId,
      familyId: finalFamilyId,
      name: name.trim(),
      age: Number(age) || 0,
      gender: gender || 'Not Specified',
      relationship: relationship || 'Member',
      emergencyContact: emergencyContact?.trim() || 'N/A',
      homeLocation: homeLocation?.trim() || 'Disaster Zone',
      status: initialStatus,
      currentLocation: currentLocation?.trim() || homeLocation?.trim() || 'Relief Camp A',
      facilityDetails: facilityDetails?.trim() || 'Intake Shelter Post',
      lastKnownLocation: homeLocation?.trim() || 'Disaster Zone',
      verified: true,
      verificationStatus: 'Verified',
      verifiedBy: 'Registration Desk & Family Liaison',
      coordinatorName: 'District Camp Registry',
      coordinatorContact: '+91 94421 00000',
      reportedDate: new Date().toISOString().split('T')[0],
      lastUpdated: nowTime,
      notes: notes?.trim() || 'Registered into disaster family reunification platform.',
      timeline: [
        {
          id: `T${Date.now()}`,
          time: nowTime.replace('Today, ', ''),
          date: 'Today',
          title: 'Registered in Reunification Platform',
          location: currentLocation || 'Registration Center',
          type: initialStatus,
          actor: 'Registration Desk',
          description: `Person profile registered with Family ID ${finalFamilyId}.`
        }
      ]
    };

    persons.unshift(newPerson);

    return res.status(201).json({
      success: true,
      message: 'Person Registered Successfully',
      personId: newId,
      data: newPerson
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create person record',
      error: error.message
    });
  }
};

/**
 * PUT /api/persons/:id
 * Update person details
 */
export const updatePerson = (req, res) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim().toUpperCase();
    const index = persons.findIndex(p => p.id?.toUpperCase() === cleanId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Person not found with ID: ${id}`
      });
    }

    const nowTime = getFormattedTime();
    const current = persons[index];
    const updated = {
      ...current,
      ...req.body,
      id: current.id, // ID must never change
      lastUpdated: nowTime
    };

    persons[index] = updated;

    return res.status(200).json({
      success: true,
      message: 'Person updated successfully',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update person record',
      error: error.message
    });
  }
};

/**
 * PUT /api/persons/:id/status
 * Update status, location, and verification details
 */
export const updatePersonStatus = (req, res) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim().toUpperCase();
    const person = persons.find(p => p.id?.toUpperCase() === cleanId);

    if (!person) {
      return res.status(404).json({
        success: false,
        message: `Person not found with ID: ${id}`
      });
    }

    const { status, location, facilityDetails, verified, verifiedBy, notes } = req.body;

    if (status && !SUPPORTED_STATUSES.includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Supported: ${SUPPORTED_STATUSES.join(', ')}`
      });
    }

    const newStatus = (status || person.status).toUpperCase();
    const newLocation = location || person.currentLocation;
    const nowTime = getFormattedTime();

    person.status = newStatus;
    if (location) person.currentLocation = location;
    if (facilityDetails) person.facilityDetails = facilityDetails;
    if (verified !== undefined) {
      person.verified = Boolean(verified);
      person.verificationStatus = verified ? 'Verified' : 'Pending';
    }
    if (verifiedBy) person.verifiedBy = verifiedBy;
    if (notes) person.notes = `${notes} (${nowTime})`;
    person.lastUpdated = nowTime;

    // Append timeline milestone
    person.timeline.push({
      id: `T${Date.now()}`,
      time: nowTime.replace('Today, ', ''),
      date: 'Today',
      title: `Status Updated to ${newStatus}`,
      location: newLocation,
      type: newStatus,
      actor: verifiedBy || 'Rescue Team Lead',
      description: notes || `Field operations updated status to ${newStatus}.`
    });

    // Also update any linked missing reports
    for (const report of reports) {
      if (report.personId?.toUpperCase() === cleanId) {
        report.status = newStatus;
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: person
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update person status',
      error: error.message
    });
  }
};

/**
 * PUT /api/persons/:id/reunite
 * Mark person as safely reunited with family
 */
export const reunitePerson = (req, res) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim().toUpperCase();
    const person = persons.find(p => p.id?.toUpperCase() === cleanId);

    if (!person) {
      return res.status(404).json({
        success: false,
        message: `Person not found with ID: ${id}`
      });
    }

    const { notes, reunitedWith, coordinatorName } = req.body;
    const nowTime = getFormattedTime();
    const reunitedAt = new Date().toISOString();

    person.status = 'REUNITED';
    person.reunitedAt = reunitedAt;
    person.currentLocation = 'Safe with Family';
    person.facilityDetails = 'Reunification Completed & Verified';
    person.verificationStatus = 'Verified';
    person.verified = true;
    person.verifiedBy = coordinatorName || 'Camp Magistrate & Family Liaison';
    person.lastUpdated = nowTime;
    if (notes) person.notes = `REUNITED: ${notes}`;

    person.timeline.push({
      id: `T${Date.now()}`,
      time: nowTime.replace('Today, ', ''),
      date: 'Today',
      title: 'Reunification Confirmed & Closed',
      location: 'Family Reunion Handover Desk',
      type: 'REUNITED',
      actor: coordinatorName || 'Camp Magistrate & Family Liaison',
      description: notes || `Successfully reunited with ${reunitedWith || 'registered family members'}.`
    });

    for (const report of reports) {
      if (report.personId?.toUpperCase() === cleanId) {
        report.status = 'REUNITED';
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Person safely reunited',
      data: person
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to record reunification',
      error: error.message
    });
  }
};

/**
 * DELETE /api/persons/:id
 * Delete a person record
 */
export const deletePerson = (req, res) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim().toUpperCase();
    const index = persons.findIndex(p => p.id?.toUpperCase() === cleanId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Person not found with ID: ${id}`
      });
    }

    const deleted = persons.splice(index, 1)[0];

    return res.status(200).json({
      success: true,
      message: 'Person deleted successfully',
      data: deleted
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete person record',
      error: error.message
    });
  }
};

