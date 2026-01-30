// Comprehensive Indian College Database with Admission Requirements and Scholarships

export const collegeDatabase = [
  // INDIAN INSTITUTES OF TECHNOLOGY (IITs) - Premier Engineering
  {
    id: 1,
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    type: "Government (Autonomous)",
    tier: "IIT",
    admissionRate: 1.5,
    requirements: {
      boardPercentageMin: 75,
      boardPercentageAvg: 95,
      jeeAdvancedRankMax: 500,
      jeeAdvancedRankAvg: 150,
      jeeMainPercentileMin: 99.5,
      jeeMainPercentileAvg: 99.9,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 225000, // Per year in INR
    hostelFees: 35000,
    scholarships: [
      {
        name: "MCM Scholarship",
        amount: "Full tuition fee waiver",
        type: "Merit-cum-Means",
        requirements: "Family income < ₹4.5 LPA",
        coverage: "100% tuition waiver for qualifying students"
      },
      {
        name: "Institute Free Studentship",
        amount: "Up to ₹2,25,000/year",
        type: "Need-based",
        requirements: "Family income < ₹1 LPA",
        coverage: "Full fee waiver + pocket allowance"
      },
      {
        name: "INSPIRE Scholarship",
        amount: "₹80,000/year",
        type: "Merit-based",
        requirements: "Top 1% in Class 12 boards",
        coverage: "5 years for BS/MS programs"
      }
    ],
    strengths: ["Computer Science", "Electrical Engineering", "Mechanical", "Chemical", "Research"],
    size: "Medium (10,000 students)",
    aceeptanceFactors: {
      jeeAdvanced: 0.70,
      class12: 0.15,
      counselling: 0.15
    }
  },
  {
    id: 2,
    name: "IIT Delhi",
    location: "New Delhi, Delhi",
    type: "Government (Autonomous)",
    tier: "IIT",
    admissionRate: 1.8,
    requirements: {
      boardPercentageMin: 75,
      boardPercentageAvg: 94,
      jeeAdvancedRankMax: 600,
      jeeAdvancedRankAvg: 200,
      jeeMainPercentileMin: 99.5,
      jeeMainPercentileAvg: 99.85,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 225000,
    hostelFees: 30000,
    scholarships: [
      {
        name: "MCM Scholarship",
        amount: "Full tuition waiver",
        type: "Merit-cum-Means",
        requirements: "Family income < ₹4.5 LPA",
        coverage: "100% tuition waiver"
      },
      {
        name: "SC/ST Fee Waiver",
        amount: "Full fee waiver",
        type: "Category-based",
        requirements: "SC/ST category students",
        coverage: "Complete fee exemption"
      },
      {
        name: "Alumni Scholarship",
        amount: "₹50,000-1,00,000/year",
        type: "Merit-based",
        requirements: "Outstanding academic performance",
        coverage: "Renewable annually"
      }
    ],
    strengths: ["Computer Science", "Electrical", "Mathematics", "Physics", "Design"],
    size: "Medium (9,500 students)",
    aceeptanceFactors: {
      jeeAdvanced: 0.70,
      class12: 0.15,
      counselling: 0.15
    }
  },
  {
    id: 3,
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    type: "Government (Autonomous)",
    tier: "IIT",
    admissionRate: 2.0,
    requirements: {
      boardPercentageMin: 75,
      boardPercentageAvg: 93,
      jeeAdvancedRankMax: 700,
      jeeAdvancedRankAvg: 250,
      jeeMainPercentileMin: 99.4,
      jeeMainPercentileAvg: 99.8,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 225000,
    hostelFees: 28000,
    scholarships: [
      {
        name: "MCM Scholarship",
        amount: "Full tuition waiver",
        type: "Merit-cum-Means",
        requirements: "Family income < ₹4.5 LPA",
        coverage: "100% tuition waiver"
      },
      {
        name: "KVPY Scholarship",
        amount: "₹5,000-7,000/month",
        type: "Merit-based",
        requirements: "KVPY fellows pursuing science",
        coverage: "Monthly stipend + contingency"
      }
    ],
    strengths: ["Computer Science", "Data Science", "Mechanical", "Aerospace", "Research"],
    size: "Large (10,500 students)",
    aceeptanceFactors: {
      jeeAdvanced: 0.70,
      class12: 0.15,
      counselling: 0.15
    }
  },

  // NATIONAL INSTITUTES OF TECHNOLOGY (NITs)
  {
    id: 4,
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    type: "Government",
    tier: "NIT",
    admissionRate: 8.0,
    requirements: {
      boardPercentageMin: 75,
      boardPercentageAvg: 90,
      jeeMainRankMax: 8000,
      jeeMainRankAvg: 3000,
      jeeMainPercentileMin: 97.5,
      jeeMainPercentileAvg: 99.0,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 156000,
    tuitionStateQuota: 75000,
    hostelFees: 42000,
    scholarships: [
      {
        name: "Merit Scholarship",
        amount: "₹12,500/semester",
        type: "Merit-based",
        requirements: "Top 7% students in department",
        coverage: "Renewable based on performance"
      },
      {
        name: "Free Studentship",
        amount: "Full fee waiver",
        type: "Need-based",
        requirements: "Family income < ₹1 LPA",
        coverage: "Complete fee exemption"
      },
      {
        name: "Central Sector Scheme",
        amount: "₹10,000-20,000/year",
        type: "Merit-based",
        requirements: "Top 20% in Class 12, family income < ₹8 LPA",
        coverage: "4 years for technical courses"
      }
    ],
    strengths: ["Computer Science", "Electronics", "Mechanical", "Civil", "Architecture"],
    size: "Large (7,000 students)",
    aceeptanceFactors: {
      jeeMain: 0.70,
      class12: 0.15,
      stateQuota: 0.15
    }
  },
  {
    id: 5,
    name: "NIT Surathkal",
    location: "Mangalore, Karnataka",
    type: "Government",
    tier: "NIT",
    admissionRate: 9.0,
    requirements: {
      boardPercentageMin: 75,
      boardPercentageAvg: 89,
      jeeMainRankMax: 10000,
      jeeMainRankAvg: 4000,
      jeeMainPercentileMin: 97.0,
      jeeMainPercentileAvg: 98.8,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 156000,
    tuitionStateQuota: 75000,
    hostelFees: 38000,
    scholarships: [
      {
        name: "Institute Merit Scholarship",
        amount: "₹3,000-5,000/month",
        type: "Merit-based",
        requirements: "CGPA > 8.5",
        coverage: "Semester-wise renewal"
      },
      {
        name: "SC/ST/OBC Scholarship",
        amount: "Full fee waiver + stipend",
        type: "Category-based",
        requirements: "Reserved category students",
        coverage: "As per government norms"
      }
    ],
    strengths: ["Computer Science", "Information Technology", "Mechanical", "Chemical"],
    size: "Medium (6,500 students)",
    aceeptanceFactors: {
      jeeMain: 0.70,
      class12: 0.15,
      stateQuota: 0.15
    }
  },
  {
    id: 6,
    name: "NIT Warangal",
    location: "Warangal, Telangana",
    type: "Government",
    tier: "NIT",
    admissionRate: 10.0,
    requirements: {
      boardPercentageMin: 75,
      boardPercentageAvg: 88,
      jeeMainRankMax: 12000,
      jeeMainRankAvg: 5000,
      jeeMainPercentileMin: 96.5,
      jeeMainPercentileAvg: 98.5,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 156000,
    tuitionStateQuota: 75000,
    hostelFees: 35000,
    scholarships: [
      {
        name: "Institute Merit-cum-Means",
        amount: "Partial to full fee waiver",
        type: "Merit-cum-Means",
        requirements: "Good academics + financial need",
        coverage: "Based on family income"
      },
      {
        name: "Telangana State Scholarship",
        amount: "Full tuition for state students",
        type: "State-based",
        requirements: "Telangana domicile + income criteria",
        coverage: "100% tuition fee"
      }
    ],
    strengths: ["Computer Science", "Electronics", "Electrical", "Civil", "Metallurgy"],
    size: "Medium (6,000 students)",
    aceeptanceFactors: {
      jeeMain: 0.70,
      class12: 0.15,
      stateQuota: 0.15
    }
  },

  // BITS PILANI (Private Elite)
  {
    id: 7,
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    type: "Private (Deemed University)",
    tier: "Private Elite",
    admissionRate: 5.0,
    requirements: {
      boardPercentageMin: 75,
      boardPercentageAvg: 92,
      bitsatScoreMin: 280,
      bitsatScoreAvg: 340,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 500000, // Per year
    hostelFees: 150000,
    scholarships: [
      {
        name: "Merit Scholarship",
        amount: "Up to 80% fee waiver",
        type: "Merit-based",
        requirements: "Based on BITSAT score and board marks",
        coverage: "Automatic based on admission score"
      },
      {
        name: "Merit-cum-Need Scholarship",
        amount: "25-80% fee waiver",
        type: "Merit-cum-Means",
        requirements: "Family income < ₹8 LPA",
        coverage: "Renewable annually"
      },
      {
        name: "Board Merit Scholarship",
        amount: "₹50,000-2,00,000/year",
        type: "Merit-based",
        requirements: "State/CBSE board toppers",
        coverage: "One-time or renewable"
      }
    ],
    strengths: ["Computer Science", "Electronics", "Engineering", "Pharmacy", "Economics"],
    size: "Medium (4,500 students)",
    aceeptanceFactors: {
      bitsat: 0.85,
      class12: 0.15
    }
  },
  {
    id: 8,
    name: "BITS Goa",
    location: "Zuarinagar, Goa",
    type: "Private (Deemed University)",
    tier: "Private Elite",
    admissionRate: 6.5,
    requirements: {
      boardPercentageMin: 75,
      boardPercentageAvg: 90,
      bitsatScoreMin: 260,
      bitsatScoreAvg: 310,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 500000,
    hostelFees: 160000,
    scholarships: [
      {
        name: "Merit Scholarship",
        amount: "Up to 80% fee waiver",
        type: "Merit-based",
        requirements: "Based on BITSAT score",
        coverage: "Automatic with admission"
      },
      {
        name: "Alumni Scholarship",
        amount: "₹1,00,000-3,00,000/year",
        type: "Need-based",
        requirements: "Financial need + good academics",
        coverage: "Renewable annually"
      }
    ],
    strengths: ["Computer Science", "Electronics", "Mechanical", "Chemical"],
    size: "Medium (3,000 students)",
    aceeptanceFactors: {
      bitsat: 0.85,
      class12: 0.15
    }
  },

  // CENTRAL UNIVERSITIES
  {
    id: 9,
    name: "Delhi University",
    location: "New Delhi, Delhi",
    type: "Central University",
    tier: "Central University",
    admissionRate: 15.0,
    requirements: {
      boardPercentageMin: 85,
      boardPercentageAvg: 97,
      cuetPercentileMin: 90,
      cuetPercentileAvg: 98,
      class12SubjectsRequired: ["Relevant subject combination"]
    },
    tuition: 25000, // Per year
    hostelFees: 40000,
    scholarships: [
      {
        name: "University Merit Scholarship",
        amount: "₹10,000-25,000/year",
        type: "Merit-based",
        requirements: "Top performers in previous year",
        coverage: "Renewable annually"
      },
      {
        name: "SC/ST Scholarship",
        amount: "Full fee waiver + stipend",
        type: "Category-based",
        requirements: "SC/ST students",
        coverage: "Complete support"
      },
      {
        name: "Dr. Ambedkar Scholarship",
        amount: "₹10,000-15,000/year",
        type: "Merit-cum-Means",
        requirements: "Economically weaker sections",
        coverage: "3 years for undergraduate"
      }
    ],
    strengths: ["Arts", "Commerce", "Science", "Law", "Economics"],
    size: "Very Large (1,32,000 students)",
    aceeptanceFactors: {
      cuet: 0.70,
      class12: 0.30
    }
  },
  {
    id: 10,
    name: "Jawaharlal Nehru University",
    location: "New Delhi, Delhi",
    type: "Central University",
    tier: "Central University",
    admissionRate: 8.0,
    requirements: {
      boardPercentageMin: 55,
      boardPercentageAvg: 75,
      jnueeRankRequired: true,
      cuetRequired: true,
      class12SubjectsRequired: ["Relevant subjects"]
    },
    tuition: 18000,
    hostelFees: 35000,
    scholarships: [
      {
        name: "JNU Merit Scholarship",
        amount: "₹2,000-5,000/month",
        type: "Merit-based",
        requirements: "Top 10% in entrance exam",
        coverage: "Duration of program"
      },
      {
        name: "Non-NET Fellowship",
        amount: "₹5,000-8,000/month",
        type: "Research",
        requirements: "Research scholars",
        coverage: "2 years for M.Phil/PhD"
      }
    ],
    strengths: ["Social Sciences", "Languages", "International Relations", "Life Sciences", "Research"],
    size: "Medium (8,500 students)",
    aceeptanceFactors: {
      entranceExam: 0.80,
      class12: 0.20
    }
  },

  // MEDICAL COLLEGES
  {
    id: 11,
    name: "AIIMS Delhi",
    location: "New Delhi, Delhi",
    type: "Government Institute of National Importance",
    tier: "Medical Premier",
    admissionRate: 0.5,
    requirements: {
      boardPercentageMin: 60,
      boardPercentageAvg: 95,
      neetScoreMin: 700,
      neetPercentileMin: 99.9,
      neetPercentileAvg: 99.99,
      class12SubjectsRequired: ["Physics", "Chemistry", "Biology", "English"]
    },
    tuition: 5000, // Highly subsidized
    hostelFees: 15000,
    scholarships: [
      {
        name: "Institute Scholarship",
        amount: "Full fee + ₹5,000/month stipend",
        type: "Merit-based",
        requirements: "All admitted students receive support",
        coverage: "Full duration of MBBS"
      },
      {
        name: "Government Health Scholarship",
        amount: "₹10,000-25,000/year",
        type: "Need-based",
        requirements: "Family income < ₹4 LPA",
        coverage: "5.5 years MBBS"
      }
    ],
    strengths: ["Medicine", "Surgery", "Research", "Specializations", "Healthcare"],
    size: "Small (4,500 students)",
    aceeptanceFactors: {
      neet: 0.85,
      class12: 0.15
    }
  },
  {
    id: 12,
    name: "Christian Medical College Vellore",
    location: "Vellore, Tamil Nadu",
    type: "Private Christian Minority",
    tier: "Medical Elite",
    admissionRate: 3.0,
    requirements: {
      boardPercentageMin: 60,
      boardPercentageAvg: 90,
      neetScoreMin: 650,
      neetPercentileMin: 99.5,
      neetPercentileAvg: 99.8,
      class12SubjectsRequired: ["Physics", "Chemistry", "Biology", "English"]
    },
    tuition: 250000,
    hostelFees: 80000,
    scholarships: [
      {
        name: "CMC Need-based Aid",
        amount: "Partial to full fee waiver",
        type: "Need-based",
        requirements: "Demonstrated financial need",
        coverage: "Based on family income"
      },
      {
        name: "Church Sponsorship",
        amount: "Varies",
        type: "Institution-specific",
        requirements: "Church member sponsorship",
        coverage: "Partial to full support"
      }
    ],
    strengths: ["Medicine", "Nursing", "Allied Health", "Research", "Community Health"],
    size: "Medium (2,000 students)",
    aceeptanceFactors: {
      neet: 0.80,
      interview: 0.20
    }
  },

  // STATE UNIVERSITIES
  {
    id: 13,
    name: "Anna University",
    location: "Chennai, Tamil Nadu",
    type: "State University",
    tier: "State Premier",
    admissionRate: 25.0,
    requirements: {
      boardPercentageMin: 50,
      boardPercentageAvg: 80,
      tneaRankRequired: true,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 50000,
    hostelFees: 25000,
    scholarships: [
      {
        name: "Tamil Nadu Government Scholarship",
        amount: "Full fee waiver",
        type: "Need-based",
        requirements: "BC/MBC/SC/ST students, income < ₹2.5 LPA",
        coverage: "Full tuition + maintenance"
      },
      {
        name: "First Graduate Scholarship",
        amount: "₹5,000-15,000/year",
        type: "Special Category",
        requirements: "First in family to pursue higher education",
        coverage: "4 years"
      },
      {
        name: "Merit Scholarship",
        amount: "₹10,000-20,000/year",
        type: "Merit-based",
        requirements: "Top 5% of batch",
        coverage: "Renewable annually"
      }
    ],
    strengths: ["Engineering", "Architecture", "Technology", "Applied Sciences"],
    size: "Very Large (70,000 students across colleges)",
    aceeptanceFactors: {
      boardMarks: 0.70,
      counselling: 0.30
    }
  },
  {
    id: 14,
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    type: "State University",
    tier: "State Premier",
    admissionRate: 12.0,
    requirements: {
      boardPercentageMin: 60,
      boardPercentageAvg: 85,
      wbjeeRankRequired: true,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 15000,
    hostelFees: 20000,
    scholarships: [
      {
        name: "State Merit Scholarship",
        amount: "₹10,000-30,000/year",
        type: "Merit-based",
        requirements: "Top performers in WBJEE",
        coverage: "4 years"
      },
      {
        name: "Kanyashree Scholarship",
        amount: "₹25,000 one-time",
        type: "Girls-specific",
        requirements: "Female students from economically weaker sections",
        coverage: "One-time grant"
      },
      {
        name: "Free Studentship",
        amount: "Full fee waiver",
        type: "Need-based",
        requirements: "Family income < ₹1 LPA",
        coverage: "Full duration"
      }
    ],
    strengths: ["Engineering", "Arts", "Science", "Architecture", "Pharmacy"],
    size: "Large (12,000 students)",
    aceeptanceFactors: {
      wbjee: 0.70,
      class12: 0.30
    }
  },
  {
    id: 15,
    name: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    type: "Private Deemed University",
    tier: "Private Reputed",
    admissionRate: 20.0,
    requirements: {
      boardPercentageMin: 50,
      boardPercentageAvg: 80,
      metScoreMin: 80,
      metScoreAvg: 120,
      jeeMainAlternate: true,
      class12SubjectsRequired: ["Physics", "Chemistry", "Mathematics"]
    },
    tuition: 450000,
    hostelFees: 180000,
    scholarships: [
      {
        name: "Dr. TMA Pai Merit Scholarship",
        amount: "25-100% tuition waiver",
        type: "Merit-based",
        requirements: "Based on MET/JEE score and board marks",
        coverage: "4 years renewable"
      },
      {
        name: "Need-based Financial Aid",
        amount: "Up to 50% fee waiver",
        type: "Need-based",
        requirements: "Family income < ₹6 LPA",
        coverage: "Annual renewal"
      },
      {
        name: "Alumni Scholarship",
        amount: "₹1,00,000-3,00,000",
        type: "Merit-cum-Means",
        requirements: "Outstanding performance + need",
        coverage: "One-time or renewable"
      }
    ],
    strengths: ["Computer Science", "Electronics", "Mechanical", "Biotech", "Information Technology"],
    size: "Large (10,000 students)",
    aceeptanceFactors: {
      met: 0.60,
      jeeMain: 0.25,
      class12: 0.15
    }
  }
];

// Helper function to filter colleges by tier
export const getCollegesByTier = (tier) => {
  return collegeDatabase.filter(college => college.tier === tier);
};

// Helper function to search colleges by name
export const searchColleges = (searchTerm) => {
  return collegeDatabase.filter(college => 
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.strengths.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};

// Get all unique college tiers
export const getUniqueTiers = () => {
  return [...new Set(collegeDatabase.map(c => c.tier))];
};

// Get total scholarship opportunities
export const getTotalScholarships = () => {
  return collegeDatabase.reduce((total, college) => total + college.scholarships.length, 0);
};

// Get colleges by entrance exam type
export const getCollegesByExam = (examType) => {
  const examMapping = {
    'JEE Advanced': ['IIT'],
    'JEE Main': ['NIT', 'Private Elite', 'State Premier'],
    'BITSAT': ['Private Elite'],
    'NEET': ['Medical Premier', 'Medical Elite'],
    'CUET': ['Central University']
  };
  
  const tiers = examMapping[examType] || [];
  return collegeDatabase.filter(college => tiers.includes(college.tier));
};
