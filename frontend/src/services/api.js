/**
 * REUNITE Frontend REST API Client
 * Configured via VITE_API_URL environment variable.
 * Netlify production will inject VITE_API_URL pointing to the Render backend service.
 */

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, error.message);
    throw error;
  }
}

/**
 * Check backend health
 * GET /api/health
 */
export async function checkHealth() {
  return request('/health');
}

/**
 * Fetch all persons (with optional query filters: status, familyId, search)
 * GET /api/persons
 */
export async function getPersons(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.status && params.status !== 'ALL') searchParams.append('status', params.status);
  if (params.familyId) searchParams.append('familyId', params.familyId);
  if (params.search) searchParams.append('search', params.search);

  const query = searchParams.toString();
  const endpoint = query ? `/persons?${query}` : '/persons';
  return request(endpoint);
}

/**
 * Fetch a person by unique Person ID (e.g. PERSON-0001)
 * GET /api/persons/:id
 */
export async function getPersonById(id) {
  if (!id) throw new Error('Person ID is required');
  const cleanId = encodeURIComponent(id.trim());
  return request(`/persons/${cleanId}`);
}

/**
 * Register a new person
 * POST /api/persons
 */
export async function createPerson(personData) {
  return request('/persons', {
    method: 'POST',
    body: JSON.stringify(personData)
  });
}

/**
 * Update general person details
 * PUT /api/persons/:id
 */
export async function updatePerson(id, updateData) {
  if (!id) throw new Error('Person ID is required');
  const cleanId = encodeURIComponent(id.trim());
  return request(`/persons/${cleanId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData)
  });
}

/**
 * Update operational status, location, and verification details
 * PUT /api/persons/:id/status
 */
export async function updatePersonStatus(id, statusData) {
  if (!id) throw new Error('Person ID is required');
  const cleanId = encodeURIComponent(id.trim());
  return request(`/persons/${cleanId}/status`, {
    method: 'PUT',
    body: JSON.stringify(statusData)
  });
}

/**
 * Mark person as safely reunited
 * PUT /api/persons/:id/reunite
 */
export async function reunitePerson(id, reunionData = {}) {
  if (!id) throw new Error('Person ID is required');
  const cleanId = encodeURIComponent(id.trim());
  return request(`/persons/${cleanId}/reunite`, {
    method: 'PUT',
    body: JSON.stringify(reunionData)
  });
}

/**
 * Delete a person record
 * DELETE /api/persons/:id
 */
export async function deletePerson(id) {
  if (!id) throw new Error('Person ID is required');
  const cleanId = encodeURIComponent(id.trim());
  return request(`/persons/${cleanId}`, {
    method: 'DELETE'
  });
}

/**
 * Fetch all missing reports
 * GET /api/reports
 */
export async function getReports() {
  return request('/reports');
}

/**
 * Fetch a missing report by Report ID
 * GET /api/reports/:id
 */
export async function getReportById(id) {
  if (!id) throw new Error('Report ID is required');
  const cleanId = encodeURIComponent(id.trim());
  return request(`/reports/${cleanId}`);
}

/**
 * Submit an urgent or standard missing person report
 * POST /api/reports
 */
export async function createMissingReport(reportData) {
  return request('/reports', {
    method: 'POST',
    body: JSON.stringify(reportData)
  });
}

export default {
  checkHealth,
  getPersons,
  getPersonById,
  createPerson,
  updatePerson,
  updatePersonStatus,
  reunitePerson,
  deletePerson,
  getReports,
  getReportById,
  createMissingReport
};

