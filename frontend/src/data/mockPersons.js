export const initialPersons = [
  {
    id: "PERSON-0001",
    familyId: "FAM1001",
    name: "Arun Kumar",
    age: 24,
    gender: "Male",
    relationship: "Son",
    emergencyContact: "+91 98765 43210",
    homeLocation: "Gandhipuram Sector 4, Coimbatore",
    status: "SAFE",
    currentLocation: "Relief Camp A",
    facilityDetails: "St. Mary's Higher Secondary School, Block B, Coimbatore",
    lastKnownLocation: "Gandhipuram Bus Stand, Coimbatore",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 4:20 PM",
    verifiedBy: "Rescue Team Alpha (NDRF)",
    verificationStatus: "Verified",
    coordinatorName: "Insp. S. Murugan (NDRF)",
    coordinatorContact: "+91 94421 00001",
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
        description: "Biometric and credential cross-check completed with district emergency register."
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
    emergencyContact: "+91 98765 43210",
    homeLocation: "Gandhipuram Sector 4, Coimbatore",
    status: "HOSPITALIZED",
    currentLocation: "City Hospital",
    facilityDetails: "Coimbatore Medical College Hospital, Emergency Ward 3B, Bed 14",
    lastKnownLocation: "Gandhipuram Main Street",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 3:10 PM",
    verifiedBy: "Hospital In-charge Dr. R. Menaka",
    verificationStatus: "Verified",
    coordinatorName: "Dr. R. Menaka (Chief Medical Officer)",
    coordinatorContact: "+91 94421 00002",
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
    name: "Kumar Sundaram",
    age: 52,
    gender: "Male",
    relationship: "Father",
    emergencyContact: "+91 98765 43210",
    homeLocation: "Gandhipuram Sector 4, Coimbatore",
    status: "MISSING",
    currentLocation: "Unknown (Active Search Zone)",
    facilityDetails: "Sector 4 Flood Plain - Ground Patrol Assigned",
    lastKnownLocation: "Main Road near Central Bus Stand, Coimbatore",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 1:40 PM",
    verifiedBy: "Pending Field Verification",
    verificationStatus: "Pending",
    coordinatorName: "District Search Commander Rao",
    coordinatorContact: "+91 94421 00010",
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
    emergencyContact: "+91 98123 45678",
    homeLocation: "Riverside Enclave, Aluva",
    status: "LOCATED",
    currentLocation: "Transit Rescue Post #4",
    facilityDetails: "Riverbank Staging Post #4, Aluva Bridge North",
    lastKnownLocation: "Riverside Enclave, Aluva",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 2:45 PM",
    verifiedBy: "Disaster Response Unit 2",
    verificationStatus: "Verified",
    coordinatorName: "Sub-Inspector P. Varma",
    coordinatorContact: "+91 94421 00005",
    notes: "Found safe with neighborhood volunteer team. Awaiting transport to Relief Camp B.",
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
    emergencyContact: "+91 98123 45678",
    homeLocation: "Riverside Enclave, Aluva",
    status: "AT_SHELTER",
    currentLocation: "Relief Camp B",
    facilityDetails: "Community Hall Relief Camp B, Aluva West",
    lastKnownLocation: "Riverside Enclave, Aluva",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 11:20 AM",
    verifiedBy: "District Camp Officer",
    verificationStatus: "Verified",
    coordinatorName: "K. Radhakrishnan (Tahsildar)",
    coordinatorContact: "+91 94421 00003",
    notes: "Accommodated in Family Wing 2. Registered search request for daughter Ananya.",
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
    emergencyContact: "+91 94440 12345",
    homeLocation: "Hilltop Colony, Wayanad",
    status: "TRANSFERRED",
    currentLocation: "South Zonal Triage & Medical Center",
    facilityDetails: "Wayanad Sector 2 Regional Specialty Center",
    lastKnownLocation: "Hilltop Colony, Wayanad",
    reportedDate: "2026-10-07",
    lastUpdated: "Yesterday, 6:00 PM",
    verifiedBy: "Red Cross Medical Transport",
    verificationStatus: "Verified",
    coordinatorName: "Dr. Deepa Nair",
    coordinatorContact: "+91 94421 00004",
    notes: "Airlifted from landslide perimeter for continuous cardiac monitoring and mobility support.",
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
    emergencyContact: "+91 94440 12345",
    homeLocation: "Hilltop Colony, Wayanad",
    status: "REUNITED",
    currentLocation: "Safe Family Residence",
    facilityDetails: "Transit Rest House, Kalpetta, Wayanad",
    lastKnownLocation: "Hilltop Road Bridge, Wayanad",
    reportedDate: "2026-10-07",
    lastUpdated: "Today, 5:30 PM",
    verifiedBy: "Camp Magistrate & Family Liaison",
    verificationStatus: "Verified",
    coordinatorName: "M. Haridas (Magistrate)",
    coordinatorContact: "+91 94421 00007",
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
  },
  {
    id: "PERSON-0008",
    familyId: "FAM1004",
    name: "Kavita Patel",
    age: 31,
    gender: "Female",
    relationship: "Self",
    emergencyContact: "+91 97234 56789",
    homeLocation: "Meppadi Village, Wayanad",
    status: "SAFE",
    currentLocation: "Relief Camp C",
    facilityDetails: "Govt Girls High School Shelter, Wayanad",
    lastKnownLocation: "Meppadi Village Market",
    reportedDate: "2026-10-08",
    lastUpdated: "Today, 10:15 AM",
    verifiedBy: "Camp Volunteers Lead",
    verificationStatus: "Verified",
    coordinatorName: "Sarita Roy (Camp Lead)",
    coordinatorContact: "+91 94421 00008",
    notes: "Sheltered safely. Registering requests for extended relatives.",
    timeline: [
      {
        id: "T801",
        time: "10:15 AM",
        date: "Today",
        title: "Sheltered & Verified",
        location: "Govt Girls High School Shelter",
        type: "SAFE",
        actor: "Camp Volunteers Lead",
        description: "Arrived safely with group of 14 villagers."
      }
    ]
  }
];

export const initialReports = [
  {
    id: "REPORT-0001",
    personId: "PERSON-0003",
    name: "Kumar Sundaram",
    age: 52,
    gender: "Male",
    lastKnownLocation: "Central Bus Stand Main Road, Coimbatore",
    date: "2026-10-08",
    time: "1:40 PM",
    isUrgent: true,
    reporterName: "Arun Kumar",
    reporterRelationship: "Son",
    reporterContact: "+91 98765 43210",
    additionalInfo: "Dark blue shirt, grey trousers, spectacles. Last seen directing neighbors to safety.",
    status: "MISSING",
    createdAt: "2026-10-08T13:40:00.000Z"
  },
  {
    id: "REPORT-0002",
    personId: "PERSON-0004",
    name: "Ananya Sharma",
    age: 8,
    gender: "Female",
    lastKnownLocation: "Riverside Enclave, Aluva",
    date: "2026-10-08",
    time: "9:15 AM",
    isUrgent: true,
    reporterName: "Rajesh Sharma",
    reporterRelationship: "Father",
    reporterContact: "+91 98123 45678",
    additionalInfo: "Yellow raincoat, red sneakers. Separated during sudden water influx.",
    status: "LOCATED",
    createdAt: "2026-10-08T09:15:00.000Z"
  }
];

export const initialActivities = [
  {
    id: "ACT-001",
    timestamp: "Today, 5:30 PM",
    type: "REUNION",
    personId: "PERSON-0007",
    personName: "Deepak Nair",
    description: "Deepak Nair safely reunited with family at Kalpetta Transit Center."
  },
  {
    id: "ACT-002",
    timestamp: "Today, 4:20 PM",
    type: "STATUS_UPDATE",
    personId: "PERSON-0001",
    personName: "Arun Kumar",
    description: "Arun Kumar status verified and updated to SAFE at Relief Camp A."
  },
  {
    id: "ACT-003",
    timestamp: "Today, 3:10 PM",
    type: "HOSPITAL",
    personId: "PERSON-0002",
    personName: "Priya Kumar",
    description: "Priya Kumar admitted to City Hospital (Ward 3B). Vitals reported stable."
  },
  {
    id: "ACT-004",
    timestamp: "Today, 2:45 PM",
    type: "LOCATED",
    personId: "PERSON-0004",
    personName: "Ananya Sharma",
    description: "Ananya Sharma located by Disaster Response Unit 2 at Transit Post #4."
  },
  {
    id: "ACT-005",
    timestamp: "Today, 1:40 PM",
    type: "REPORT",
    personId: "PERSON-0003",
    personName: "Kumar Sundaram",
    description: "New urgent missing person report filed (REPORT-0001) for Kumar Sundaram."
  }
];

export const initialFacilities = [
  {
    id: "FAC-001",
    name: "Relief Camp A",
    fullName: "St. Mary's Higher Secondary School Relief Shelter",
    location: "Coimbatore East",
    type: "Shelter Camp",
    capacity: 450,
    currentCount: 312,
    coordinator: "Insp. S. Murugan (NDRF)",
    phone: "+91 94421 00001",
    medicalAvailable: true,
    foodAvailable: true
  },
  {
    id: "FAC-002",
    name: "City Hospital",
    fullName: "Coimbatore Medical College Hospital",
    location: "Trichy Road, Coimbatore",
    type: "Emergency Hospital",
    capacity: 120,
    currentCount: 78,
    coordinator: "Dr. R. Menaka (Chief MO)",
    phone: "+91 94421 00002",
    medicalAvailable: true,
    foodAvailable: true
  },
  {
    id: "FAC-003",
    name: "Relief Camp B",
    fullName: "Community Hall Relief Camp B",
    location: "Aluva West",
    type: "Shelter Camp",
    capacity: 300,
    currentCount: 184,
    coordinator: "K. Radhakrishnan (Tahsildar)",
    phone: "+91 94421 00003",
    medicalAvailable: true,
    foodAvailable: true
  },
  {
    id: "FAC-004",
    name: "South Zonal Triage",
    fullName: "South Zonal Triage & Medical Center",
    location: "Wayanad Sector 2",
    type: "Triage & Medical Post",
    capacity: 200,
    currentCount: 95,
    coordinator: "Dr. Deepa Nair",
    phone: "+91 94421 00004",
    medicalAvailable: true,
    foodAvailable: true
  }
];

