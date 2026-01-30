// AI-Powered Insights Engine for Indian Student Profiles
// This provides intelligent analysis and personalized recommendations for Indian education system

/**
 * Analyzes a student's complete profile and generates AI-powered insights
 * @param {Object} student - The student object
 * @returns {Object} Comprehensive AI insights
 */
export const generateAIInsights = (student) => {
  const insights = {
    overallScore: calculateOverallScore(student),
    strengths: identifyStrengths(student),
    growthOpportunities: identifyGrowthOpportunities(student),
    collegeRecommendations: generateCollegeRecommendations(student),
    admissionPredictions: predictAdmissionChances(student),
    actionableSteps: generateActionableSteps(student),
    narrative: generatePersonalizedNarrative(student),
    timelineRecommendations: generateTimelineRecommendations(student),
    competitivenessAnalysis: analyzeCompetitiveness(student)
  };

  return insights;
};

/**
 * Calculate overall student score (0-100)
 */
const calculateOverallScore = (student) => {
  const academicScore = calculateAcademicScore(student) * 0.40; // Higher weight for Indian system
  const extracurricularScore = calculateExtracurricularScore(student) * 0.25;
  const characterScore = calculateCharacterScore(student) * 0.20;
  const milestonesScore = calculateMilestonesScore(student) * 0.15;

  return Math.round(academicScore + extracurricularScore + characterScore + milestonesScore);
};

const calculateAcademicScore = (student) => {
  if (!student.academic) return 0;
  
  let score = 0;
  
  // CGPA/Board percentage scoring (0-40 points)
  if (student.academic.cgpa) {
    score += (student.academic.cgpa / 10) * 35;
  } else if (student.academic.boardPercentage) {
    score += (student.academic.boardPercentage / 100) * 35;
  }
  
  // Entrance exam scores (0-35 points)
  if (student.academic.testScores) {
    // JEE Main
    if (student.academic.testScores.jeeMain?.percentile) {
      score += (student.academic.testScores.jeeMain.percentile / 100) * 20;
    }
    // JEE Advanced
    if (student.academic.testScores.jeeAdvanced?.rank) {
      const rankScore = Math.max(0, 15 - (student.academic.testScores.jeeAdvanced.rank / 500));
      score += Math.min(rankScore, 15);
    }
    // NEET
    if (student.academic.testScores.neet?.percentile) {
      score += (student.academic.testScores.neet.percentile / 100) * 20;
    }
  }
  
  // Course rigor - Science stream (0-10 points)
  if (student.academic.courses) {
    const scienceSubjects = student.academic.courses.filter(c => 
      c.rigor === 'Science Stream' || c.name.toLowerCase().includes('physics') ||
      c.name.toLowerCase().includes('chemistry') || c.name.toLowerCase().includes('mathematics')
    ).length;
    score += Math.min(scienceSubjects * 2, 10);
  }
  
  // Olympiad performance (0-15 points)
  if (student.academic.testScores?.olympiads) {
    const olympiadScore = student.academic.testScores.olympiads.reduce((sum, o) => {
      if (o.level === 'National') return sum + 5;
      if (o.level === 'State') return sum + 3;
      return sum + 1;
    }, 0);
    score += Math.min(olympiadScore, 15);
  }
  
  return Math.min(score, 100);
};

const calculateExtracurricularScore = (student) => {
  if (!student.extracurricular || student.extracurricular.length === 0) return 0;
  
  let score = 0;
  
  // Depth (years involved) - 0-30 points
  const avgYears = student.extracurricular.reduce((sum, ec) => sum + ec.yearsInvolved, 0) / 
                   student.extracurricular.length;
  score += Math.min(avgYears * 7.5, 30);
  
  // Leadership roles - 0-35 points
  const leadershipRoles = student.extracurricular.filter(ec => 
    ec.role.toLowerCase().includes('captain') ||
    ec.role.toLowerCase().includes('president') ||
    ec.role.toLowerCase().includes('founder') ||
    ec.role.toLowerCase().includes('lead') ||
    ec.role.toLowerCase().includes('secretary')
  ).length;
  score += Math.min(leadershipRoles * 12, 35);
  
  // Impact - 0-35 points (based on impact description quality)
  const hasQuantifiableImpact = student.extracurricular.filter(ec => 
    /₹?\d+|लाख|\d+\+/.test(ec.impact)
  ).length;
  score += Math.min(hasQuantifiableImpact * 11, 35);
  
  return Math.min(score, 100);
};

const calculateCharacterScore = (student) => {
  if (!student.character) return 0;
  
  let score = 0;
  
  // Teacher observations (0-40 points)
  if (student.character.teacherObservations) {
    score += Math.min(student.character.teacherObservations.length * 20, 40);
  }
  
  // Peer feedback (0-30 points)
  if (student.character.peerFeedback) {
    score += Math.min(student.character.peerFeedback.length * 15, 30);
  }
  
  // Character traits (0-30 points)
  if (student.character.traits) {
    score += Math.min(student.character.traits.length * 6, 30);
  }
  
  return Math.min(score, 100);
};

const calculateMilestonesScore = (student) => {
  if (!student.milestones || student.milestones.length === 0) return 0;
  
  let score = 0;
  
  // Awards (25 points each, max 50)
  const awards = student.milestones.filter(m => m.type === 'Award').length;
  score += Math.min(awards * 25, 50);
  
  // Projects (20 points each, max 30)
  const projects = student.milestones.filter(m => m.type === 'Project').length;
  score += Math.min(projects * 20, 30);
  
  // Certifications (15 points each, max 20)
  const certs = student.milestones.filter(m => m.type === 'Certification').length;
  score += Math.min(certs * 15, 20);
  
  return Math.min(score, 100);
};

/**
 * Identify student's key strengths
 */
const identifyStrengths = (student) => {
  const strengths = [];
  
  // Academic strengths
  if (student.academic?.cgpa >= 9.0 || student.academic?.boardPercentage >= 90) {
    strengths.push({
      category: 'Academic Excellence',
      description: `Outstanding ${student.academic?.cgpa ? 'CGPA of ' + student.academic.cgpa.toFixed(1) : 'board percentage of ' + student.academic.boardPercentage + '%'} demonstrates strong academic performance`,
      icon: '📚',
      impact: 'high'
    });
  }
  
  // JEE/NEET performance
  if (student.academic?.testScores?.jeeMain?.percentile >= 98 || 
      student.academic?.testScores?.jeeAdvanced?.rank <= 2000 ||
      student.academic?.testScores?.neet?.percentile >= 99) {
    strengths.push({
      category: 'Competitive Exam Performance',
      description: 'Exceptional entrance exam scores place you among top performers nationally',
      icon: '🎯',
      impact: 'high'
    });
  }
  
  // Olympiad achievements
  if (student.academic?.testScores?.olympiads?.length >= 1) {
    const nationalOlympiads = student.academic.testScores.olympiads.filter(o => o.level === 'National').length;
    if (nationalOlympiads >= 1) {
      strengths.push({
        category: 'Olympiad Excellence',
        description: `National-level olympiad qualification demonstrates exceptional subject expertise`,
        icon: '🏅',
        impact: 'high'
      });
    }
  }
  
  // Leadership strengths
  const leadershipCount = student.extracurricular?.filter(ec => 
    ec.role.toLowerCase().includes('captain') ||
    ec.role.toLowerCase().includes('president') ||
    ec.role.toLowerCase().includes('founder')
  ).length || 0;
  
  if (leadershipCount >= 2) {
    strengths.push({
      category: 'Leadership',
      description: `Multiple leadership positions (${leadershipCount}) show exceptional leadership capability`,
      icon: '👑',
      impact: 'high'
    });
  }
  
  // Long-term commitment
  const longTermActivities = student.extracurricular?.filter(ec => ec.yearsInvolved >= 3).length || 0;
  if (longTermActivities >= 2) {
    strengths.push({
      category: 'Commitment & Dedication',
      description: `${longTermActivities} activities with 3+ years involvement shows remarkable dedication`,
      icon: '⏳',
      impact: 'medium'
    });
  }
  
  // Quantifiable impact
  const impactfulActivities = student.extracurricular?.filter(ec => 
    /₹[\d,]+|raised.*\d+|served \d+|improved .* by \d+%|won|finalist|champion/i.test(ec.impact)
  ).length || 0;
  
  if (impactfulActivities >= 2) {
    strengths.push({
      category: 'Measurable Impact',
      description: 'You have quantifiable achievements that demonstrate real-world impact',
      icon: '📊',
      impact: 'high'
    });
  }
  
  // Science stream rigor
  const scienceSubjects = student.academic?.courses?.filter(c => 
    c.rigor === 'Science Stream' || c.name.toLowerCase().includes('physics')
  ).length || 0;
  if (scienceSubjects >= 3) {
    strengths.push({
      category: 'Academic Rigor',
      description: `Taking rigorous science stream subjects demonstrates willingness to challenge yourself`,
      icon: '🔥',
      impact: 'medium'
    });
  }
  
  return strengths;
};

/**
 * Identify areas for growth and improvement
 */
const identifyGrowthOpportunities = (student) => {
  const opportunities = [];
  
  // Academic opportunities
  if (!student.academic?.cgpa || student.academic.cgpa < 8.5) {
    opportunities.push({
      category: 'Academic Performance',
      suggestion: 'Focus on improving CGPA - aim for 9.0+ for competitive colleges. Consider extra coaching or study groups.',
      priority: 'high',
      expectedImpact: 'Improving CGPA to 9.0+ significantly boosts IIT/NIT competitiveness'
    });
  }
  
  // Entrance exam preparation
  if (!student.academic?.testScores?.jeeMain && !student.academic?.testScores?.neet) {
    opportunities.push({
      category: 'Entrance Exam Preparation',
      suggestion: 'Start JEE/NEET preparation with coaching institutes like Allen, FIITJEE, or Aakash. Practice previous year papers daily.',
      priority: 'high',
      expectedImpact: 'Strong JEE/NEET scores are essential for top engineering/medical colleges'
    });
  }
  
  // Olympiad participation
  if (!student.academic?.testScores?.olympiads || student.academic.testScores.olympiads.length === 0) {
    opportunities.push({
      category: 'Olympiad Participation',
      suggestion: 'Participate in NSEP/NSEC/NSEB/RMO. Olympiad achievements provide direct entry to interview stages for IISc, IISC, etc.',
      priority: 'medium',
      expectedImpact: 'National-level olympiad qualification adds significant weight to your profile'
    });
  }
  
  // Leadership development
  const leadershipCount = student.extracurricular?.filter(ec => 
    ec.role.toLowerCase().includes('captain') ||
    ec.role.toLowerCase().includes('president') ||
    ec.role.toLowerCase().includes('founder')
  ).length || 0;
  
  if (leadershipCount === 0) {
    opportunities.push({
      category: 'Leadership Development',
      suggestion: 'Seek leadership roles - become class representative, club president, or start a new initiative at school',
      priority: 'high',
      expectedImpact: 'Leadership experience is valued by institutes like BITS, private universities for interviews'
    });
  }
  
  // Community service
  const communityServiceActivities = student.extracurricular?.filter(ec => 
    ec.activity.toLowerCase().includes('volunteer') ||
    ec.activity.toLowerCase().includes('nss') ||
    ec.activity.toLowerCase().includes('ngo') ||
    ec.activity.toLowerCase().includes('community')
  ).length || 0;
  
  if (communityServiceActivities === 0) {
    opportunities.push({
      category: 'Community Service',
      suggestion: 'Join NSS/NCC or volunteer with local NGOs. Teaching underprivileged children or village adoption programs are impactful.',
      priority: 'medium',
      expectedImpact: 'Demonstrates social awareness and responsibility - valued for scholarships and interviews'
    });
  }
  
  // Depth vs breadth
  if (student.extracurricular && student.extracurricular.length > 5) {
    const shallowActivities = student.extracurricular.filter(ec => ec.yearsInvolved < 2).length;
    if (shallowActivities >= 3) {
      opportunities.push({
        category: 'Activity Focus',
        suggestion: 'Consider narrowing focus to 3-4 core activities for deeper involvement rather than many superficial ones',
        priority: 'medium',
        expectedImpact: 'Depth and impact matter more than a long list of activities'
      });
    }
  }
  
  // Awards and recognition
  const awards = student.milestones?.filter(m => m.type === 'Award').length || 0;
  if (awards < 2) {
    opportunities.push({
      category: 'Recognition & Awards',
      suggestion: 'Participate in science exhibitions (INSPIRE, NCSC), coding competitions (INOI, ZIO), or sports at district/state level',
      priority: 'medium',
      expectedImpact: 'Awards validate your skills and stand out in scholarship applications'
    });
  }
  
  // Character development
  if (!student.character?.teacherObservations || student.character.teacherObservations.length < 2) {
    opportunities.push({
      category: 'Recommendation Letters',
      suggestion: 'Build strong relationships with subject teachers who can write detailed recommendation letters for university applications',
      priority: 'medium',
      expectedImpact: 'Strong recommendations can make a difference for private university admissions'
    });
  }
  
  return opportunities;
};

/**
 * Generate personalized college recommendations for Indian system
 */
const generateCollegeRecommendations = (student) => {
  const score = calculateOverallScore(student);
  const cgpa = student.academic?.cgpa || 0;
  const jeeMainPercentile = student.academic?.testScores?.jeeMain?.percentile || 0;
  const jeeAdvancedRank = student.academic?.testScores?.jeeAdvanced?.rank || 0;
  const neetPercentile = student.academic?.testScores?.neet?.percentile || 0;
  
  const colleges = {
    reach: [],
    target: [],
    safety: []
  };
  
  // Engineering track
  if (jeeAdvancedRank > 0 || jeeMainPercentile > 0) {
    if (score >= 85 && jeeAdvancedRank > 0 && jeeAdvancedRank <= 1500) {
      colleges.reach = [
        { name: 'IIT Bombay', match: 78, reason: 'Strong JEE Advanced rank with excellent academics' },
        { name: 'IIT Delhi', match: 75, reason: 'Your profile matches their selection criteria' },
        { name: 'IIT Madras', match: 72, reason: 'Good fit for your technical interests' }
      ];
    } else if (score >= 75 && jeeMainPercentile >= 98) {
      colleges.reach = [
        { name: 'NIT Trichy', match: 82, reason: 'JEE Main percentile is competitive' },
        { name: 'NIT Surathkal', match: 80, reason: 'Strong academic profile matches requirements' },
        { name: 'BITS Pilani', match: 78, reason: 'Excellent fit based on your scores' }
      ];
    }
    
    // Target schools for engineering
    if (score >= 70) {
      colleges.target = [
        { name: 'NIT Warangal', match: 85, reason: 'Good match based on your JEE score' },
        { name: 'BITS Goa', match: 84, reason: 'Strong programs in your areas of interest' },
        { name: 'Manipal Institute of Technology', match: 82, reason: 'Great fit based on profile' }
      ];
    } else {
      colleges.target = [
        { name: 'Anna University', match: 88, reason: 'Good academic match with state programs' },
        { name: 'Jadavpur University', match: 86, reason: 'Strong engineering programs' },
        { name: 'Manipal Institute of Technology', match: 84, reason: 'Suitable for your profile' }
      ];
    }
  }
  
  // Medical track
  if (neetPercentile > 0) {
    if (neetPercentile >= 99.9) {
      colleges.reach = [
        { name: 'AIIMS Delhi', match: 70, reason: 'Top NEET score required - you are competitive' },
        { name: 'CMC Vellore', match: 75, reason: 'Your NEET score meets their cutoff' }
      ];
    }
    colleges.target = [
      { name: 'Government Medical College (State)', match: 85, reason: 'State quota gives good chances' },
      { name: 'Private Medical College', match: 88, reason: 'Management quota option available' }
    ];
  }
  
  // Safety schools for all
  colleges.safety = [
    { name: 'State Engineering/Medical College', match: 95, reason: 'Excellent safety option with state quota' },
    { name: 'Private University in State', match: 93, reason: 'High acceptance probability with good outcomes' }
  ];
  
  return colleges;
};

/**
 * Predict admission chances for different college tiers
 */
const predictAdmissionChances = (student) => {
  const score = calculateOverallScore(student);
  const jeeMainPercentile = student.academic?.testScores?.jeeMain?.percentile || 0;
  const jeeAdvancedRank = student.academic?.testScores?.jeeAdvanced?.rank || 0;
  
  let iitChance = 5;
  let nitChance = 15;
  
  if (jeeAdvancedRank > 0 && jeeAdvancedRank <= 10000) {
    iitChance = Math.max(10, 60 - (jeeAdvancedRank / 200));
  }
  
  if (jeeMainPercentile >= 95) {
    nitChance = Math.min(85, jeeMainPercentile - 10);
  }
  
  return {
    iit: Math.min(iitChance, 50),
    nit: Math.min(nitChance, 80),
    bits: Math.max(Math.min((score - 50) * 2, 70), 20),
    stateCollege: Math.max(Math.min((score - 30) * 3, 95), 60),
    explanation: generateChanceExplanation(score, jeeAdvancedRank, jeeMainPercentile)
  };
};

const generateChanceExplanation = (score, jeeAdvancedRank, jeeMainPercentile) => {
  if (jeeAdvancedRank > 0 && jeeAdvancedRank <= 2000) {
    return 'Your JEE Advanced rank puts you in excellent position for top IITs. Focus on counselling preparation.';
  } else if (jeeMainPercentile >= 99) {
    return 'Excellent JEE Main percentile! Top NITs are within reach. Consider attempting JEE Advanced for IITs.';
  } else if (score >= 80) {
    return 'You have a strong profile. Focus on improving entrance exam scores to maximize options.';
  } else if (score >= 70) {
    return 'Your profile is solid. Dedicated JEE/NEET preparation can significantly improve your chances.';
  } else if (score >= 60) {
    return 'You have potential. Consider intensive coaching and mock tests to improve entrance scores.';
  } else {
    return 'Focus on building strong academics and preparing for entrance exams with proper guidance.';
  }
};

/**
 * Generate actionable next steps
 */
const generateActionableSteps = (student) => {
  const steps = [];
  const opportunities = identifyGrowthOpportunities(student);
  
  // Add immediate actions based on opportunities
  opportunities.slice(0, 3).forEach((opp, index) => {
    steps.push({
      priority: index + 1,
      action: opp.suggestion,
      timeline: opp.priority === 'high' ? 'Next 1-2 months' : 'Next 3-6 months',
      category: opp.category
    });
  });
  
  // Add standard important steps based on grade
  if (student.grade === 11) {
    steps.push({
      priority: steps.length + 1,
      action: 'Begin intensive JEE/NEET coaching and complete Class 11 syllabus thoroughly',
      timeline: 'Ongoing',
      category: 'Entrance Preparation'
    });
  }
  
  if (student.grade === 12) {
    steps.push({
      priority: steps.length + 1,
      action: 'Complete JEE Main/NEET registration. Focus on revision and mock tests.',
      timeline: 'Before December',
      category: 'Application Preparation'
    });
  }
  
  return steps;
};

/**
 * Generate personalized narrative
 */
const generatePersonalizedNarrative = (student) => {
  const score = calculateOverallScore(student);
  const strengths = identifyStrengths(student);
  
  let narrative = `${student.name} demonstrates `;
  
  if (score >= 85) {
    narrative += 'exceptional promise for top Indian institutions like IITs/AIIMS. ';
  } else if (score >= 75) {
    narrative += 'strong potential for competitive colleges like NITs/BITS. ';
  } else {
    narrative += 'developing potential with room for strategic growth. ';
  }
  
  if (strengths.length > 0) {
    const topStrengths = strengths.slice(0, 2).map(s => s.category.toLowerCase()).join(' and ');
    narrative += `Key differentiators include ${topStrengths}. `;
  }
  
  // Add specific insights
  const jeeMainPercentile = student.academic?.testScores?.jeeMain?.percentile || 0;
  if (jeeMainPercentile >= 98) {
    narrative += 'The strong JEE Main percentile opens doors to top NITs and IIITs. ';
  }
  
  const leadershipCount = student.extracurricular?.filter(ec => 
    ec.role.toLowerCase().includes('captain') ||
    ec.role.toLowerCase().includes('president') ||
    ec.role.toLowerCase().includes('founder')
  ).length || 0;
  
  if (leadershipCount >= 2) {
    narrative += 'The multiple leadership positions showcase initiative and responsibility. ';
  }
  
  if (student.academic?.cgpa >= 9.0) {
    narrative += 'Academic excellence provides a strong foundation for scholarships. ';
  }
  
  narrative += 'Continued focus on the recommended growth areas will significantly enhance college competitiveness.';
  
  return narrative;
};

/**
 * Generate timeline recommendations based on Indian academic calendar
 */
const generateTimelineRecommendations = (student) => {
  const grade = student.grade;
  const recommendations = [];
  
  if (grade === 9) {
    recommendations.push(
      { period: 'Now', focus: 'Build strong foundation in PCM/PCB subjects' },
      { period: 'This Year', focus: 'Explore various activities and identify core interests' },
      { period: 'Summer', focus: 'Start basic aptitude preparation for Olympiads (RMO/NSEP)' }
    );
  } else if (grade === 10) {
    recommendations.push(
      { period: 'Now', focus: 'Prepare thoroughly for Class 10 boards - aim for 95%+' },
      { period: 'Post-Boards', focus: 'Start JEE/NEET foundation course with a good coaching institute' },
      { period: 'Summer', focus: 'Complete Class 11 syllabus ahead with coaching' }
    );
  } else if (grade === 11) {
    recommendations.push(
      { period: 'Now', focus: 'Intensive JEE/NEET preparation alongside school. Maintain 85%+ in school exams.' },
      { period: 'Winter', focus: 'Attempt KVPY/Olympiads (NSEP/NSEC/NSEB) for additional credentials' },
      { period: 'March-April', focus: 'Complete Class 11 portion revision. Focus on weak areas.' },
      { period: 'Summer', focus: 'Start Class 12 syllabus early. Solve previous year JEE/NEET papers.' }
    );
  } else if (grade === 12) {
    recommendations.push(
      { period: 'Apr-Aug', focus: 'Complete Class 12 syllabus. Balance board preparation with entrance exams.' },
      { period: 'Sept-Nov', focus: 'Register for JEE Main/NEET/CUET. Complete first revision.' },
      { period: 'Dec-Jan', focus: 'JEE Main January session. Intensive mock test practice.' },
      { period: 'Feb-Mar', focus: 'Class 12 Board exams. Final preparation for JEE Main April session.' },
      { period: 'April-May', focus: 'JEE Main April session. JEE Advanced preparation.' },
      { period: 'May-June', focus: 'JEE Advanced exam. Start preparing for counselling.' },
      { period: 'June-July', focus: 'JoSAA/CSAB counselling for IITs/NITs. Secure admission!' }
    );
  }
  
  return recommendations;
};

/**
 * Analyze competitiveness compared to typical admitted students
 */
const analyzeCompetitiveness = (student) => {
  const score = calculateOverallScore(student);
  const jeeAdvancedRank = student.academic?.testScores?.jeeAdvanced?.rank || 0;
  const jeeMainPercentile = student.academic?.testScores?.jeeMain?.percentile || 0;
  
  let iitStatus = 'Needs Growth';
  let nitStatus = 'Developing';
  
  if (jeeAdvancedRank > 0 && jeeAdvancedRank <= 5000) {
    iitStatus = 'Competitive';
  } else if (jeeAdvancedRank > 0 && jeeAdvancedRank <= 10000) {
    iitStatus = 'Possible';
  }
  
  if (jeeMainPercentile >= 99) {
    nitStatus = 'Excellent';
  } else if (jeeMainPercentile >= 97) {
    nitStatus = 'Strong';
  } else if (jeeMainPercentile >= 95) {
    nitStatus = 'Competitive';
  }
  
  return {
    percentile: Math.min(score, 99),
    compared: {
      iit: iitStatus,
      nit: nitStatus,
      bits: score >= 75 ? 'Competitive' : score >= 65 ? 'Developing' : 'Needs Growth',
      stateCollege: score >= 60 ? 'Excellent' : score >= 50 ? 'Strong' : 'Good'
    },
    summary: `Based on your profile, you rank in the ${Math.min(score, 99)}th percentile overall. ${
      jeeAdvancedRank > 0 && jeeAdvancedRank <= 5000 ? 'Your JEE Advanced rank makes you competitive for top IITs.' :
      jeeMainPercentile >= 98 ? 'Your JEE Main percentile positions you well for top NITs.' :
      score >= 75 ? 'You are a strong candidate for competitive engineering colleges.' :
      'Focus on entrance exam preparation to maximize your college options.'
    }`
  };
};

/**
 * AI Chat - Answer questions about the student
 */
export const answerStudentQuestion = (student, question) => {
  const lowerQ = question.toLowerCase();
  
  // CGPA/Percentage related
  if (lowerQ.includes('cgpa') || lowerQ.includes('percentage') || lowerQ.includes('marks') || lowerQ.includes('grade')) {
    const cgpa = student.academic?.cgpa;
    const boardPct = student.academic?.boardPercentage;
    return {
      answer: `${student.name} has ${cgpa ? 'a CGPA of ' + cgpa.toFixed(1) : 'board percentage of ' + boardPct + '%'}. ${
        (cgpa >= 9.0 || boardPct >= 90) ? 'This is excellent and highly competitive for top colleges!' :
        (cgpa >= 8.5 || boardPct >= 85) ? 'This is good - maintaining or improving this will help competitiveness.' :
        'There is room for improvement to increase college competitiveness.'
      }`,
      confidence: 0.95
    };
  }
  
  // JEE/NEET related
  if (lowerQ.includes('jee') || lowerQ.includes('neet') || lowerQ.includes('entrance') || lowerQ.includes('exam')) {
    const jeeMain = student.academic?.testScores?.jeeMain;
    const jeeAdvanced = student.academic?.testScores?.jeeAdvanced;
    const neet = student.academic?.testScores?.neet;
    
    if (jeeAdvanced?.rank) {
      return {
        answer: `${student.name} has JEE Advanced Rank ${jeeAdvanced.rank}. ${
          jeeAdvanced.rank <= 2000 ? 'This is excellent for top IITs!' :
          jeeAdvanced.rank <= 5000 ? 'This is competitive for good IIT branches.' :
          'Consider NITs and other options alongside IITs.'
        }`,
        confidence: 0.92
      };
    } else if (jeeMain?.percentile) {
      return {
        answer: `${student.name} has JEE Main percentile of ${jeeMain.percentile}. ${
          jeeMain.percentile >= 99 ? 'Excellent! Top NITs are within reach.' :
          jeeMain.percentile >= 97 ? 'Good score - competitive for NITs.' :
          'Continue preparation to improve for next attempt.'
        }`,
        confidence: 0.92
      };
    } else if (neet?.score) {
      return {
        answer: `${student.name} has NEET score of ${neet.score} (${neet.percentile}%ile). ${
          neet.percentile >= 99.5 ? 'Excellent! Government medical colleges are achievable.' :
          neet.percentile >= 98 ? 'Good score - consider state quota options.' :
          'Continue preparation for improvement.'
        }`,
        confidence: 0.92
      };
    }
    return {
      answer: `${student.name} hasn't appeared for JEE/NEET yet or scores are not recorded. Regular practice and mock tests are recommended.`,
      confidence: 0.85
    };
  }
  
  // College recommendations
  if (lowerQ.includes('college') && (lowerQ.includes('recommend') || lowerQ.includes('suggest') || lowerQ.includes('where') || lowerQ.includes('which'))) {
    const recs = generateCollegeRecommendations(student);
    return {
      answer: `Based on ${student.name}'s profile, I recommend targeting: ${
        recs.target.slice(0, 3).map(c => c.name).join(', ')
      }. These are excellent matches with good admission probability based on current scores.`,
      confidence: 0.88
    };
  }
  
  // Strengths
  if (lowerQ.includes('strength') || lowerQ.includes('good at') || lowerQ.includes('best')) {
    const strengths = identifyStrengths(student);
    if (strengths.length > 0) {
      return {
        answer: `${student.name}'s top strengths are: ${strengths.slice(0, 3).map(s => s.category).join(', ')}. ${strengths[0].description}`,
        confidence: 0.92
      };
    }
  }
  
  // Improvement areas
  if (lowerQ.includes('improve') || lowerQ.includes('work on') || lowerQ.includes('weakness') || lowerQ.includes('better')) {
    const opportunities = identifyGrowthOpportunities(student);
    if (opportunities.length > 0) {
      return {
        answer: `Key areas for growth: ${opportunities[0].suggestion}. ${opportunities[0].expectedImpact}`,
        confidence: 0.90
      };
    }
  }
  
  // Admission chances
  if (lowerQ.includes('chance') || lowerQ.includes('probability') || lowerQ.includes('get in') || lowerQ.includes('admission')) {
    const chances = predictAdmissionChances(student);
    return {
      answer: `${chances.explanation} Estimated chances: NITs (~${Math.round(chances.nit)}%), BITS/Top Private (~${Math.round(chances.bits)}%). Focus on entrance exam preparation for best results.`,
      confidence: 0.85
    };
  }
  
  // Activities
  if (lowerQ.includes('activity') || lowerQ.includes('activities') || lowerQ.includes('extracurricular')) {
    const count = student.extracurricular?.length || 0;
    return {
      answer: `${student.name} is involved in ${count} activities${count > 0 ? ': ' + student.extracurricular.slice(0, 3).map(a => a.activity).join(', ') : ''}. ${
        count >= 3 ? 'Good involvement - focus on deepening impact!' : 'Consider adding meaningful activities like NSS/NCC or technical clubs.'
      }`,
      confidence: 0.93
    };
  }
  
  // Scholarship queries
  if (lowerQ.includes('scholarship') || lowerQ.includes('financial') || lowerQ.includes('fee')) {
    return {
      answer: `Based on ${student.name}'s profile, potential scholarships include: MCM (Merit-cum-Means) at IITs/NITs, INSPIRE/KVPY for science students, and state-specific scholarships. Government colleges have significantly lower fees (₹2-3 lakhs total) compared to private ones.`,
      confidence: 0.88
    };
  }
  
  // Default response
  return {
    answer: `I can help you with questions about ${student.name}'s CGPA, JEE/NEET scores, college recommendations, strengths, areas for improvement, admission chances, activities, and scholarships. What would you like to know?`,
    confidence: 0.60
  };
};
