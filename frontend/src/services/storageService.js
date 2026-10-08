import {
  initialPersons,
  initialReports,
  initialActivities,
  initialFacilities
} from '../data/mockPersons';

const STORAGE_KEYS = {
  PERSONS: 'reunite_persons_v1',
  REPORTS: 'reunite_reports_v1',
  ACTIVITIES: 'reunite_activities_v1',
  FACILITIES: 'reunite_facilities_v1'
};

export const storageService = {
  getPersons() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PERSONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading persons from localStorage', e);
    }
    // Set initial
    this.savePersons(initialPersons);
    return initialPersons;
  },

  savePersons(persons) {
    try {
      localStorage.setItem(STORAGE_KEYS.PERSONS, JSON.stringify(persons));
    } catch (e) {
      console.error('Error saving persons to localStorage', e);
    }
  },

  getReports() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading reports from localStorage', e);
    }
    this.saveReports(initialReports);
    return initialReports;
  },

  saveReports(reports) {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.error('Error saving reports to localStorage', e);
    }
  },

  getActivities() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading activities from localStorage', e);
    }
    this.saveActivities(initialActivities);
    return initialActivities;
  },

  saveActivities(activities) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    } catch (e) {
      console.error('Error saving activities to localStorage', e);
    }
  },

  getFacilities() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading facilities from localStorage', e);
    }
    this.saveFacilities(initialFacilities);
    return initialFacilities;
  },

  saveFacilities(facilities) {
    try {
      localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities));
    } catch (e) {
      console.error('Error saving facilities to localStorage', e);
    }
  },

  generatePersonId(existingPersons = []) {
    let maxNum = 0;
    existingPersons.forEach(p => {
      const match = (p.id || '').match(/PERSON-(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });
    const nextNum = maxNum + 1;
    return `PERSON-${String(nextNum).padStart(4, '0')}`;
  },

  generateReportId(existingReports = []) {
    let maxNum = 0;
    existingReports.forEach(r => {
      const match = (r.id || '').match(/REPORT-(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });
    const nextNum = maxNum + 1;
    return `REPORT-${String(nextNum).padStart(4, '0')}`;
  },

  resetAllData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.PERSONS);
      localStorage.removeItem(STORAGE_KEYS.REPORTS);
      localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
      localStorage.removeItem(STORAGE_KEYS.FACILITIES);
    } catch (e) {
      console.error('Error resetting data', e);
    }
    return {
      persons: initialPersons,
      reports: initialReports,
      activities: initialActivities,
      facilities: initialFacilities
    };
  },

  exportBackup() {
    return {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      persons: this.getPersons(),
      reports: this.getReports(),
      activities: this.getActivities(),
      facilities: this.getFacilities()
    };
  },

  importBackup(parsedData) {
    if (!parsedData || !Array.isArray(parsedData.persons)) {
      throw new Error('Invalid backup data format');
    }
    this.savePersons(parsedData.persons);
    if (Array.isArray(parsedData.reports)) this.saveReports(parsedData.reports);
    if (Array.isArray(parsedData.activities)) this.saveActivities(parsedData.activities);
    if (Array.isArray(parsedData.facilities)) this.saveFacilities(parsedData.facilities);
    return true;
  }
};

