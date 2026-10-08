// In-memory fictional database for REUNITE platform
// NOTE: Fictional demonstration data only - No real Aadhaar or PII collected.

export let persons = [
  {
    id: "PERSON-0001",
    familyId: "FAM1001",
    name: "Arun Kumar",
    age: 24,
    gender: "Male",
    relationship: "Son",
    status: "SAFE",
    currentLocation: "Relief Camp A",
    facilityDetails: "St. Mary's Higher Secondary School, Block B, Coimbatore",
    lastKnownLocation: "Gandhipuram Bus Stand, Coimbatore",
    verified: true,
    verificationStatus: "Verified",
    verifiedBy: "Rescue Team Alpha (NDRF)",
    coordinatorName: "Insp. S. Murugan (NDRF)",
    coordinatorContact: "+91 94421 00001",
    emergencyContact: "+91 98765 43210",
    homeLocation: "Gandhipuram Sector 4, Coimbatore",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 4:20 PM",
    notes: "Rescued during water surge evacuation. Minor abrasions dressed, in good spirits and safe.",
    timeline: [
      {
        id: "T101",
        time: "10:30 AM",
        date: "Today",
        title: "Reported Missing",
        location: "Central Bus Stand, Gandhipuram",
        type: "MISSING",
        actor: "Family Member (Priya Kumar)",
        description: "Separated during sudden water inundation at market square."
      },
      {
        id: "T102",
        time: "12:15 PM",
        date: "Today",
        title: "Located by Rescue Team",
        location: "Relief Camp A (St. Mary's)",
        type: "LOCATED",
        actor: "NDRF Unit 4",
        description: "Extracted via inflatable rescue boat and transferred to camp shelter."
      },
      {
        id: "T103",
        time: "1:00 PM",
        date: "Today",
        title: "Identity Verified",
        location: "Relief Camp A Reception",
        type: "VERIFIED",
        actor: "Rescue Team Alpha (NDRF)",
        description: "Credential cross-check completed with district emergency register."
      },
      {
        id: "T104",
        time: "4:20 PM",
        date: "Today",
        title: "Family Notified & Status Updated to Safe",
        location: "Relief Camp A",
        type: "SAFE",
        actor: "Camp Liaison Desk",
        description: "Contact established with registered family liaison. Ready for scheduled safe reunion."
      }
    ]
  },
  {
    id: "PERSON-0002",
    familyId: "FAM1001",
    name: "Priya Kumar",
    age: 48,
    gender: "Female",
    relationship: "Mother",
    status: "HOSPITALIZED",
    currentLocation: "City Hospital",
    facilityDetails: "Coimbatore Medical College Hospital, Emergency Ward 3B, Bed 14",
    lastKnownLocation: "Gandhipuram Main Street",
    verified: true,
    verificationStatus: "Verified",
    verifiedBy: "Hospital In-charge Dr. R. Menaka",
    coordinatorName: "Dr. R. Menaka (Chief Medical Officer)",
    coordinatorContact: "+91 94421 00002",
    emergencyContact: "+91 98765 43210",
    homeLocation: "Gandhipuram Sector 4, Coimbatore",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 3:10 PM",
    notes: "Treated for moderate dehydration and respiratory observation. Vitals stable.",
    timeline: [
      {
        id: "T201",
        time: "11:00 AM",
        date: "Today",
        title: "Emergency Evacuation",
        location: "Gandhipuram Main Street",
        type: "LOCATED",
        actor: "Fire & Rescue Dept",
        description: "Evacuated from flooded residential ground floor."
      },
      {
        id: "T202",
        time: "1:20 PM",
        date: "Today",
        title: "Transferred to Triage",
        location: "Coimbatore Medical College Hospital",
        type: "TRANSFERRED",
        actor: "108 Ambulance Corps",
        description: "Received at casualty triage with hypothermia symptoms."
      },
      {
        id: "T203",
        time: "3:10 PM",
        date: "Today",
        title: "Admitted & Status Hospitalized",
        location: "City Hospital, Ward 3B",
        type: "HOSPITALIZED",
        actor: "Dr. R. Menaka",
        description: "Stabilized and admitted. Family contact tagged for visitor clearance."
      }
    ]
  },
  {
    id: "PERSON-0003",
    familyId: "FAM1001",
    name: "Kumar",
    age: 52,
    gender: "Male",
    relationship: "Father",
    status: "MISSING",
    currentLocation: "Main Road",
    facilityDetails: "Sector 4 Flood Plain - Ground Patrol Assigned",
    lastKnownLocation: "Main Road near Central Bus Stand, Coimbatore",
    verified: false,
    verificationStatus: "Pending",
    verifiedBy: "Pending Field Verification",
    coordinatorName: "District Search Commander Rao",
    coordinatorContact: "+91 94421 00010",
    emergencyContact: "+91 98765 43210",
    homeLocation: "Gandhipuram Sector 4, Coimbatore",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 1:40 PM",
    notes: "Was wearing dark blue collared shirt and grey trousers. Was helping senior neighbors move towards flyover.",
    timeline: [
      {
        id: "T301",
        time: "1:40 PM",
        date: "Today",
        title: "Urgent Missing Person Report Filed",
        location: "Main Road near Central Bus Stand",
        type: "MISSING",
        actor: "Arun Kumar (Son)",
        description: "High-priority missing ticket generated (REPORT-0001). Search coordinates dispatched to SDRF boat unit."
      }
    ]
  },
  {
    id: "PERSON-0004",
    familyId: "FAM1002",
    name: "Ananya Sharma",
    age: 8,
    gender: "Female",
    relationship: "Daughter",
    status: "LOCATED",
    currentLocation: "Transit Rescue Post #4",
    facilityDetails: "Riverbank Staging Post #4, Aluva Bridge North",
    lastKnownLocation: "Riverside Enclave, Aluva",
    verified: true,
    verificationStatus: "Verified",
    verifiedBy: "Disaster Response Unit 2",
    coordinatorName: "Sub-Inspector P. Varma",
    coordinatorContact: "+91 94421 00005",
    emergencyContact: "+91 98123 45678",
    homeLocation: "Riverside Enclave, Aluva",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 2:45 PM",
    notes: "Found safe with neighborhood volunteer team. In transit to Relief Camp B.",
    timeline: [
      {
        id: "T401",
        time: "9:15 AM",
        date: "Today",
        title: "Reported Missing",
        location: "Riverside Enclave",
        type: "MISSING",
        actor: "Rajesh Sharma (Father)",
        description: "Separated during rapid river embankment overflow."
      },
      {
        id: "T402",
        time: "2:45 PM",
        date: "Today",
        title: "Located by Rescue Boat Team",
        location: "Transit Rescue Post #4",
        type: "LOCATED",
        actor: "Disaster Response Unit 2",
        description: "Safely sheltered with child-care volunteer. Father alerted via SMS."
      }
    ]
  },
  {
    id: "PERSON-0005",
    familyId: "FAM1002",
    name: "Rajesh Sharma",
    age: 36,
    gender: "Male",
    relationship: "Father",
    status: "AT_SHELTER",
    currentLocation: "Relief Camp B",
    facilityDetails: "Community Hall Relief Camp B, Aluva West",
    lastKnownLocation: "Riverside Enclave, Aluva",
    verified: true,
    verificationStatus: "Verified",
    verifiedBy: "District Camp Officer",
    coordinatorName: "K. Radhakrishnan (Tahsildar)",
    coordinatorContact: "+91 94421 00003",
    emergencyContact: "+91 98123 45678",
    homeLocation: "Riverside Enclave, Aluva",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 11:20 AM",
    notes: "Accommodated in Family Wing 2. Looking for daughter Ananya.",
    timeline: [
      {
        id: "T501",
        time: "11:20 AM",
        date: "Today",
        title: "Admitted to Relief Camp B",
        location: "Community Hall Relief Camp B",
        type: "AT_SHELTER",
        actor: "Camp Intake Officer",
        description: "Registered into disaster camp shelter database."
      }
    ]
  },
  {
    id: "PERSON-0006",
    familyId: "FAM1003",
    name: "Meera Nair",
    age: 68,
    gender: "Female",
    relationship: "Grandmother",
    status: "TRANSFERRED",
    currentLocation: "South Zonal Triage & Medical Center",
    facilityDetails: "Wayanad Sector 2 Regional Specialty Center",
    lastKnownLocation: "Hilltop Colony, Wayanad",
    verified: true,
    verificationStatus: "Verified",
    verifiedBy: "Red Cross Medical Transport",
    coordinatorName: "Dr. Deepa Nair",
    coordinatorContact: "+91 94421 00004",
    emergencyContact: "+91 94440 12345",
    homeLocation: "Hilltop Colony, Wayanad",
    reportedDate: "2026-10-07",
    lastUpdated: "Yesterday, 6:00 PM",
    notes: "Transferred from landslide zone for continuous cardiac monitoring and mobility support.",
    timeline: [
      {
        id: "T601",
        time: "Yesterday, 2:00 PM",
        date: "Yesterday",
        title: "Rescued from Isolation Pocket",
        location: "Hilltop Colony",
        type: "LOCATED",
        actor: "Air Force Helicopter Rescue Team",
        description: "Extracted via winch from landslide cutoff sector."
      },
      {
        id: "T602",
        time: "Yesterday, 6:00 PM",
        date: "Yesterday",
        title: "Transferred to Specialty Center",
        location: "South Zonal Triage & Medical Center",
        type: "TRANSFERRED",
        actor: "Red Cross Medical Transport",
        description: "Transferred for geriatric support and medical stabilization."
      }
    ]
  },
  {
    id: "PERSON-0007",
    familyId: "FAM1003",
    name: "Deepak Nair",
    age: 29,
    gender: "Male",
    relationship: "Grandson",
    status: "REUNITED",
    currentLocation: "Safe Family Residence",
    facilityDetails: "Transit Rest House, Kalpetta, Wayanad",
    lastKnownLocation: "Hilltop Road Bridge, Wayanad",
    verified: true,
    verificationStatus: "Verified",
    verifiedBy: "Camp Magistrate & Family Liaison",
    coordinatorName: "M. Haridas (Magistrate)",
    coordinatorContact: "+91 94421 00007",
    emergencyContact: "+91 94440 12345",
    homeLocation: "Hilltop Colony, Wayanad",
    reportedDate: "2026-10-07",
    lastUpdated: "Today, 5:30 PM",
    reunitedAt: "2026-10-08T17:30:00.000Z",
    notes: "Safely reunited with brother and grandmother Meera Nair at transit center.",
    timeline: [
      {
        id: "T701",
        time: "Yesterday, 4:00 PM",
        date: "Yesterday",
        title: "Reached Kalpetta Relief Center",
        location: "Kalpetta Relief Camp",
        type: "AT_SHELTER",
        actor: "District Relief Desk",
        description: "Registered after clearing landslide cutoff."
      },
      {
        id: "T702",
        time: "Today, 5:30 PM",
        date: "Today",
        title: "Family Reunification Completed",
        location: "Kalpetta Transit Center",
        type: "REUNITED",
        actor: "Camp Magistrate & Family Liaison",
        description: "Handover protocols completed. Confirmed safe reunion with family."
      }
    ]
  }
];

export let reports = [
  {
    id: "REPORT-0001",
    reportId: "REPORT-0001",
    personId: "PERSON-0003",
    name: "Kumar",
    age: 52,
    gender: "Male",
    lastKnownLocation: "Main Road near Central Bus Stand, Coimbatore",
    date: "2026-10-08",
    time: "1:40 PM",
    description: "Dark blue shirt, grey trousers, spectacles. Last seen directing neighbors to safety.",
    urgent: true,
    status: "MISSING",
    reporterName: "Arun Kumar",
    reporterRelationship: "Son",
    reporterContact: "+91 98765 43210",
    createdAt: "2026-10-08T13:40:00.000Z"
  },
  {
    id: "REPORT-0002",
    reportId: "REPORT-0002",
    personId: "PERSON-0004",
    name: "Ananya Sharma",
    age: 8,
    gender: "Female",
    lastKnownLocation: "Riverside Enclave, Aluva",
    date: "2026-10-08",
    time: "9:15 AM",
    description: "Yellow raincoat, red sneakers. Separated during sudden water influx.",
    urgent: true,
    status: "LOCATED",
    reporterName: "Rajesh Sharma",
    reporterRelationship: "Father",
    reporterContact: "+91 98123 45678",
    createdAt: "2026-10-08T09:15:00.000Z"
  }
];

/**
 * Generate unique, sequential Person ID (e.g. PERSON-0008)
 * Never duplicates existing IDs
 */
export function generatePersonId() {
  let maxId = 0;
  for (const p of persons) {
    const match = (p.id || "").match(/PERSON-(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxId) maxId = num;
    }
  }
  const nextNum = maxId + 1;
  return `PERSON-${String(nextNum).padStart(4, "0")}`;
}

/**
 * Generate unique, sequential Report ID (e.g. REPORT-0003)
 */
export function generateReportId() {
  let maxId = 0;
  for (const r of reports) {
    const idStr = r.reportId || r.id || "";
    const match = idStr.match(/REPORT-(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxId) maxId = num;
    }
  }
  const nextNum = maxId + 1;
  return `REPORT-${String(nextNum).padStart(4, "0")}`;
}

