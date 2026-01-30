// Mock data for Indian students
export const mockStudents = [
  {
    id: 1,
    name: "Arjun Sharma",
    grade: 12,
    email: "arjun.sharma@school.edu.in",
    photo: null,
    academic: {
      cgpa: 9.6, // CGPA out of 10
      boardPercentage: 95.4,
      boardType: "CBSE",
      cgpaHistory: [
        { semester: "Class 9 Term 1", cgpa: 9.2 },
        { semester: "Class 9 Term 2", cgpa: 9.4 },
        { semester: "Class 10 Board", cgpa: 9.5 },
        { semester: "Class 11 Term 1", cgpa: 9.6 },
        { semester: "Class 11 Term 2", cgpa: 9.7 },
        { semester: "Class 12 Term 1", cgpa: 9.6 },
      ],
      courses: [
        { name: "Physics", grade: "A+", rigor: "Science Stream" },
        { name: "Chemistry", grade: "A", rigor: "Science Stream" },
        { name: "Mathematics", grade: "A+", rigor: "Science Stream" },
        { name: "Computer Science", grade: "A+", rigor: "Science Stream" },
        { name: "English Core", grade: "A", rigor: "Core" },
      ],
      testScores: {
        jeeMain: { percentile: 99.2, score: 285 },
        jeeAdvanced: { rank: 850, score: 195 },
        boardPercentage: 95.4,
        olympiads: [
          { subject: "Mathematics (RMO)", level: "State", rank: 15 },
          { subject: "Physics (NSEP)", level: "National", qualified: true },
        ]
      }
    },
    extracurricular: [
      {
        activity: "Robotics Club",
        role: "President & Team Lead",
        hours: 450,
        yearsInvolved: 4,
        impact: "Led team to IIT Bombay Techfest finals; won ₹50,000 prize; mentored 20 junior members"
      },
      {
        activity: "Math Olympiad Coaching",
        role: "Peer Tutor & Founder",
        hours: 200,
        yearsInvolved: 2,
        impact: "Started free coaching for underprivileged students; 8 students qualified for RMO"
      },
      {
        activity: "School Band",
        role: "Lead Guitarist",
        hours: 280,
        yearsInvolved: 4,
        impact: "Performed at 15 school events; organized charity concert raising ₹75,000 for NGO"
      }
    ],
    character: {
      teacherObservations: [
        {
          teacher: "Dr. Raghav (Physics)",
          observation: "Arjun has exceptional problem-solving abilities and a natural curiosity for understanding concepts deeply. He often helps classmates with difficult topics."
        },
        {
          teacher: "Ms. Priya (Mathematics)",
          observation: "Outstanding analytical skills. Arjun's approach to complex problems is methodical and creative. He is truly passionate about mathematics."
        }
      ],
      peerFeedback: [
        {
          context: "Robotics Project",
          feedback: "Arjun is an incredible leader who makes everyone feel included. He taught us complex coding without making us feel stupid."
        }
      ],
      traits: ["Leadership", "Analytical Thinking", "Perseverance", "Empathy", "Innovation"]
    },
    milestones: [
      {
        date: "2025-11-15",
        type: "Award",
        title: "KVPY Fellowship",
        description: "Selected for Kishore Vaigyanik Protsahan Yojana fellowship"
      },
      {
        date: "2025-08-20",
        type: "Certification",
        title: "NPTEL - Data Structures",
        description: "Completed IIT course on Data Structures with Elite certification"
      },
      {
        date: "2025-05-10",
        type: "Project",
        title: "Smart Farming IoT System",
        description: "Developed IoT-based irrigation system; won state-level science exhibition"
      },
      {
        date: "2025-03-22",
        type: "Award",
        title: "INSPIRE Award - MANAK",
        description: "Innovation in Science received INSPIRE award"
      }
    ]
  },
  {
    id: 2,
    name: "Priya Reddy",
    grade: 11,
    email: "priya.reddy@school.edu.in",
    photo: null,
    academic: {
      cgpa: 9.0,
      boardPercentage: 88.6,
      boardType: "State Board (Telangana)",
      cgpaHistory: [
        { semester: "Class 9 Term 1", cgpa: 8.5 },
        { semester: "Class 9 Term 2", cgpa: 8.8 },
        { semester: "Class 10 Board", cgpa: 8.9 },
        { semester: "Class 11 Term 1", cgpa: 9.0 },
        { semester: "Class 11 Term 2", cgpa: 9.2 },
      ],
      courses: [
        { name: "Physics", grade: "A", rigor: "Science Stream" },
        { name: "Chemistry", grade: "A", rigor: "Science Stream" },
        { name: "Biology", grade: "A+", rigor: "Science Stream" },
        { name: "English", grade: "A", rigor: "Core" },
      ],
      testScores: {
        neet: { score: null, percentile: null }, // Preparing
        boardPercentage: 88.6,
        olympiads: [
          { subject: "Biology (NSEB)", level: "State", qualified: true },
        ]
      }
    },
    extracurricular: [
      {
        activity: "Kabaddi Team",
        role: "Team Captain",
        hours: 400,
        yearsInvolved: 3,
        impact: "Led team to district championship; organized kabaddi camps for 100+ students"
      },
      {
        activity: "Student Council",
        role: "Health & Wellness Secretary",
        hours: 160,
        yearsInvolved: 2,
        impact: "Organized mental health awareness week; initiated yoga sessions for students"
      },
      {
        activity: "NSS Volunteer",
        role: "Active Volunteer",
        hours: 120,
        yearsInvolved: 2,
        impact: "Participated in village adoption program; taught hygiene practices to 200+ villagers"
      }
    ],
    character: {
      teacherObservations: [
        {
          teacher: "Mrs. Lakshmi (Biology)",
          observation: "Priya shows genuine passion for biology and healthcare. Her dedication to understanding complex topics is commendable."
        },
        {
          teacher: "Coach Ramesh",
          observation: "Natural leader on the field. Priya motivates her teammates and leads by example with her work ethic."
        }
      ],
      peerFeedback: [
        {
          context: "NSS Camp",
          feedback: "Priya connected so well with the villagers. She made learning about health fun for everyone."
        }
      ],
      traits: ["Leadership", "Compassion", "Discipline", "Team Spirit", "Social Awareness"]
    },
    milestones: [
      {
        date: "2025-12-05",
        type: "Award",
        title: "District Kabaddi Championship - Gold",
        description: "Team won gold medal in under-19 category"
      },
      {
        date: "2025-09-15",
        type: "Award",
        title: "Best NSS Volunteer",
        description: "Recognized for outstanding contribution to community service"
      },
      {
        date: "2025-06-20",
        type: "Project",
        title: "Health Awareness Campaign",
        description: "Led campaign on menstrual hygiene reaching 500+ girls in rural areas"
      }
    ]
  },
  {
    id: 3,
    name: "Aisha Khan",
    grade: 12,
    email: "aisha.khan@school.edu.in",
    photo: null,
    academic: {
      cgpa: 9.8,
      boardPercentage: 97.2,
      boardType: "CBSE",
      cgpaHistory: [
        { semester: "Class 9 Term 1", cgpa: 9.5 },
        { semester: "Class 9 Term 2", cgpa: 9.6 },
        { semester: "Class 10 Board", cgpa: 9.7 },
        { semester: "Class 11 Term 1", cgpa: 9.8 },
        { semester: "Class 11 Term 2", cgpa: 9.8 },
        { semester: "Class 12 Term 1", cgpa: 9.8 },
      ],
      courses: [
        { name: "Physics", grade: "A+", rigor: "Science Stream" },
        { name: "Chemistry", grade: "A+", rigor: "Science Stream" },
        { name: "Biology", grade: "A+", rigor: "Science Stream" },
        { name: "English Core", grade: "A+", rigor: "Core" },
      ],
      testScores: {
        neet: { score: 695, percentile: 99.85 },
        boardPercentage: 97.2,
        olympiads: [
          { subject: "Biology (NSEB)", level: "National", rank: 25 },
          { subject: "Chemistry (NSEC)", level: "State", qualified: true },
        ]
      }
    },
    extracurricular: [
      {
        activity: "Hospital Internship",
        role: "Medical Volunteer Intern",
        hours: 200,
        yearsInvolved: 1,
        impact: "Shadowed doctors at AIIMS; co-authored poster on pediatric care; presented at medical students' conference"
      },
      {
        activity: "Science Olympiad Team",
        role: "Team Captain",
        hours: 250,
        yearsInvolved: 4,
        impact: "Led team to NSEB nationals; won gold medals in Biology and Chemistry; mentored junior teams"
      },
      {
        activity: "NGO Teaching Volunteer",
        role: "Science Teacher",
        hours: 180,
        yearsInvolved: 2,
        impact: "Taught science to 50+ underprivileged children weekly; organized science fair with ₹30,000 sponsorship"
      }
    ],
    character: {
      teacherObservations: [
        {
          teacher: "Dr. Anand (Biology)",
          observation: "Aisha's dedication to medicine is evident in every discussion. She asks questions that even PhD students find challenging."
        },
        {
          teacher: "Mrs. Meera (Chemistry)",
          observation: "Exceptional talent combined with humility. Aisha always helps struggling students without being condescending."
        }
      ],
      peerFeedback: [
        {
          context: "Science Olympiad",
          feedback: "Aisha is the most patient teacher I've ever had. She explains concepts multiple times without getting frustrated."
        }
      ],
      traits: ["Dedication", "Compassion", "Excellence", "Humility", "Scientific Curiosity"]
    },
    milestones: [
      {
        date: "2025-11-30",
        type: "Award",
        title: "NTSE Scholar",
        description: "Selected for National Talent Search Examination scholarship"
      },
      {
        date: "2025-10-12",
        type: "Award",
        title: "NSEB National Rank 25",
        description: "Achieved top 30 rank in National Standard Examination in Biology"
      },
      {
        date: "2025-07-18",
        type: "Certification",
        title: "First Aid & CPR Certified",
        description: "Completed Red Cross emergency medical response training"
      },
      {
        date: "2025-04-05",
        type: "Award",
        title: "State Science Exhibition - 1st Prize",
        description: "Project on early cancer detection using AI won state-level recognition"
      }
    ]
  },
  {
    id: 4,
    name: "Vikram Patel",
    grade: 11,
    email: "vikram.patel@school.edu.in",
    photo: null,
    academic: {
      cgpa: 8.2,
      boardPercentage: 78.4,
      boardType: "Gujarat Board",
      cgpaHistory: [
        { semester: "Class 9 Term 1", cgpa: 7.8 },
        { semester: "Class 9 Term 2", cgpa: 8.0 },
        { semester: "Class 10 Board", cgpa: 8.1 },
        { semester: "Class 11 Term 1", cgpa: 8.3 },
        { semester: "Class 11 Term 2", cgpa: 8.4 },
      ],
      courses: [
        { name: "English", grade: "A", rigor: "Humanities" },
        { name: "Economics", grade: "A", rigor: "Commerce Stream" },
        { name: "Business Studies", grade: "A-", rigor: "Commerce Stream" },
        { name: "Accountancy", grade: "B+", rigor: "Commerce Stream" },
      ],
      testScores: {
        cuet: null, // Will appear
        boardPercentage: 78.4,
        olympiads: []
      }
    },
    extracurricular: [
      {
        activity: "Entrepreneurship Club",
        role: "Founder & President",
        hours: 300,
        yearsInvolved: 2,
        impact: "Started school-based startup incubator; 3 student businesses launched; raised ₹2,00,000 in seed funding"
      },
      {
        activity: "Street Play (Nukkad Natak) Team",
        role: "Lead Actor & Writer",
        hours: 250,
        yearsInvolved: 3,
        impact: "Performed 25+ street plays on social issues; reached 10,000+ audience; won inter-school drama competition"
      },
      {
        activity: "Beach Cleanup Drive",
        role: "Organizer",
        hours: 130,
        yearsInvolved: 3,
        impact: "Organized monthly cleanups at Diu beach; removed 2 tonnes of plastic; involved 500+ volunteers"
      }
    ],
    character: {
      teacherObservations: [
        {
          teacher: "Mr. Shah (Economics)",
          observation: "Vikram has a natural business acumen. His enthusiasm for entrepreneurship is infectious and inspires other students."
        },
        {
          teacher: "Mrs. Desai (Theatre)",
          observation: "Brilliant performer with a powerful voice for social causes. Vikram brings authenticity to every role."
        }
      ],
      peerFeedback: [
        {
          context: "Entrepreneurship Club",
          feedback: "Vikram believed in my business idea when no one else did. He helped me turn a dream into reality."
        }
      ],
      traits: ["Initiative", "Creativity", "Social Consciousness", "Risk-taking", "Communication"]
    },
    milestones: [
      {
        date: "2025-10-28",
        type: "Award",
        title: "Young Entrepreneur Award - Gujarat",
        description: "Recognized by state government for promoting student entrepreneurship"
      },
      {
        date: "2025-08-15",
        type: "Project",
        title: "EcoCart - Sustainable Shopping App",
        description: "Launched app connecting local vendors with eco-conscious consumers; 2,000+ downloads"
      },
      {
        date: "2025-05-20",
        type: "Award",
        title: "Best Street Play - National Youth Festival",
        description: "Play on farmer suicides won national recognition"
      }
    ]
  }
];

export const calculateCompletion = (student) => {
  let totalFields = 0;
  let completedFields = 0;

  // Academic (25%)
  if (student.academic?.cgpa) completedFields += 5;
  totalFields += 5;
  
  if (student.academic?.cgpaHistory?.length > 0) completedFields += 5;
  totalFields += 5;
  
  if (student.academic?.courses?.length > 0) completedFields += 5;
  totalFields += 5;

  if (student.academic?.testScores) completedFields += 5;
  totalFields += 5;

  // Extracurricular (25%)
  if (student.extracurricular?.length > 0) completedFields += 10;
  totalFields += 10;

  const hasImpactStatements = student.extracurricular?.every(ec => ec.impact);
  if (hasImpactStatements) completedFields += 10;
  totalFields += 10;

  // Character (25%)
  if (student.character?.teacherObservations?.length > 0) completedFields += 10;
  totalFields += 10;

  if (student.character?.traits?.length > 0) completedFields += 10;
  totalFields += 10;

  // Milestones (25%)
  if (student.milestones?.length >= 3) completedFields += 20;
  else if (student.milestones?.length > 0) completedFields += 10;
  totalFields += 20;

  return Math.round((completedFields / totalFields) * 100);
};

export const getLeadershipScore = (student) => {
  let score = 0;
  student.extracurricular?.forEach(ec => {
    if (ec.role?.toLowerCase().includes('captain') || 
        ec.role?.toLowerCase().includes('president') || 
        ec.role?.toLowerCase().includes('founder') ||
        ec.role?.toLowerCase().includes('lead') ||
        ec.role?.toLowerCase().includes('secretary')) {
      score += ec.hours || 0;
    }
  });
  return score;
};

export const getCommunityServiceScore = (student) => {
  let score = 0;
  const serviceKeywords = ['volunteer', 'nss', 'ncc', 'community', 'service', 'ngo', 'teaching', 'cleanup'];
  student.extracurricular?.forEach(ec => {
    const isService = serviceKeywords.some(keyword => 
      ec.activity?.toLowerCase().includes(keyword) || 
      ec.impact?.toLowerCase().includes(keyword)
    );
    if (isService) {
      score += ec.hours || 0;
    }
  });
  return score;
};

export const getAcademicScore = (student) => {
  // Convert CGPA to percentage scale (0-100)
  return (student.academic?.cgpa || 0) * 10;
};
