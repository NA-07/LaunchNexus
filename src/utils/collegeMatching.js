// College Matching Algorithm - Matches Indian students to best-fit colleges with scholarships

import { collegeDatabase } from '../data/collegeDatabase';

/**
 * Main function to match a student to Indian colleges across all tiers
 * Returns safety, target, and reach schools with scholarship opportunities
 */
export const matchStudentToColleges = (student) => {
  const studentProfile = analyzeStudentProfile(student);
  
  const matches = {
    reach: [],
    target: [],
    safety: [],
    scholarships: {
      total: 0,
      merit: [],
      need: [],
      automatic: []
    }
  };

  // Evaluate each college
  collegeDatabase.forEach(college => {
    const matchScore = calculateMatchScore(studentProfile, college);
    const admissionProbability = calculateAdmissionProbability(studentProfile, college);
    const scholarshipMatch = findMatchingScholarships(studentProfile, college);
    
    const collegeMatch = {
      ...college,
      matchScore: Math.round(matchScore),
      admissionProbability: Math.round(admissionProbability),
      category: categorizeMatch(admissionProbability),
      scholarships: scholarshipMatch.scholarships,
      estimatedAid: scholarshipMatch.estimatedAid,
      netCost: calculateNetCost(college, scholarshipMatch.estimatedAid, student),
      whyGoodFit: generateFitReasoning(studentProfile, college, matchScore),
      strengthsMatch: findMatchingStrengths(studentProfile, college)
    };

    // Categorize into reach/target/safety
    if (admissionProbability < 40) {
      matches.reach.push(collegeMatch);
    } else if (admissionProbability >= 40 && admissionProbability < 70) {
      matches.target.push(collegeMatch);
    } else {
      matches.safety.push(collegeMatch);
    }

    // Aggregate scholarship opportunities
    scholarshipMatch.scholarships.forEach(scholarship => {
      matches.scholarships.total++;
      if (scholarship.type.includes('Merit')) {
        matches.scholarships.merit.push({
          college: college.name,
          ...scholarship
        });
      }
      if (scholarship.type.includes('Need')) {
        matches.scholarships.need.push({
          college: college.name,
          ...scholarship
        });
      }
      if (scholarship.automatic) {
        matches.scholarships.automatic.push({
          college: college.name,
          ...scholarship
        });
      }
    });
  });

  // Sort each category by match score
  matches.reach.sort((a, b) => b.matchScore - a.matchScore);
  matches.target.sort((a, b) => b.matchScore - a.matchScore);
  matches.safety.sort((a, b) => b.matchScore - a.matchScore);

  // Add summary statistics
  matches.summary = {
    totalMatches: matches.reach.length + matches.target.length + matches.safety.length,
    reachCount: matches.reach.length,
    targetCount: matches.target.length,
    safetyCount: matches.safety.length,
    totalScholarships: matches.scholarships.total,
    averageNetCost: calculateAverageNetCost(matches),
    bestValue: findBestValueSchools(matches),
    topRecommendations: getTopRecommendations(matches, 5)
  };

  return matches;
};

/**
 * Analyze student profile to extract key metrics for Indian education system
 */
const analyzeStudentProfile = (student) => {
  return {
    cgpa: student.academic?.cgpa || 0,
    boardPercentage: student.academic?.boardPercentage || student.academic?.testScores?.boardPercentage || 0,
    boardType: student.academic?.boardType || 'CBSE',
    jeeMainPercentile: student.academic?.testScores?.jeeMain?.percentile || 0,
    jeeMainScore: student.academic?.testScores?.jeeMain?.score || 0,
    jeeAdvancedRank: student.academic?.testScores?.jeeAdvanced?.rank || 0,
    jeeAdvancedScore: student.academic?.testScores?.jeeAdvanced?.score || 0,
    neetScore: student.academic?.testScores?.neet?.score || 0,
    neetPercentile: student.academic?.testScores?.neet?.percentile || 0,
    bitsatScore: student.academic?.testScores?.bitsat?.score || 0,
    cuetPercentile: student.academic?.testScores?.cuet?.percentile || 0,
    olympiads: student.academic?.testScores?.olympiads || [],
    leadershipRoles: student.extracurricular?.filter(ec => 
      ec.role.toLowerCase().includes('captain') ||
      ec.role.toLowerCase().includes('president') ||
      ec.role.toLowerCase().includes('founder') ||
      ec.role.toLowerCase().includes('lead') ||
      ec.role.toLowerCase().includes('secretary')
    ).length || 0,
    totalActivities: student.extracurricular?.length || 0,
    communityService: student.extracurricular?.filter(ec => 
      ec.activity.toLowerCase().includes('volunteer') ||
      ec.activity.toLowerCase().includes('nss') ||
      ec.activity.toLowerCase().includes('ngo') ||
      ec.activity.toLowerCase().includes('community') ||
      ec.activity.toLowerCase().includes('service')
    ).length || 0,
    awards: student.milestones?.filter(m => m.type === 'Award').length || 0,
    specialInterests: extractInterests(student),
    grade: student.grade || 12
  };
};

/**
 * Extract student interests from activities and courses
 */
const extractInterests = (student) => {
  const interests = [];
  
  // From extracurriculars
  student.extracurricular?.forEach(ec => {
    if (ec.activity.toLowerCase().includes('robot') ||
        ec.activity.toLowerCase().includes('coding') ||
        ec.activity.toLowerCase().includes('tech') ||
        ec.activity.toLowerCase().includes('science') ||
        ec.activity.toLowerCase().includes('olympiad')) {
      interests.push('STEM');
    }
    if (ec.activity.toLowerCase().includes('art') || 
        ec.activity.toLowerCase().includes('music') ||
        ec.activity.toLowerCase().includes('theater') ||
        ec.activity.toLowerCase().includes('dance') ||
        ec.activity.toLowerCase().includes('drama')) {
      interests.push('Arts');
    }
    if (ec.activity.toLowerCase().includes('business') || 
        ec.activity.toLowerCase().includes('entrepreneur') ||
        ec.activity.toLowerCase().includes('commerce')) {
      interests.push('Business');
    }
    if (ec.activity.toLowerCase().includes('hospital') || 
        ec.activity.toLowerCase().includes('medical') ||
        ec.activity.toLowerCase().includes('health')) {
      interests.push('Medicine');
    }
  });

  // From courses
  student.academic?.courses?.forEach(course => {
    if (course.name.toLowerCase().includes('physics') || 
        course.name.toLowerCase().includes('mathematics') ||
        course.name.toLowerCase().includes('computer')) {
      interests.push('Engineering');
    }
    if (course.name.toLowerCase().includes('biology') || 
        course.name.toLowerCase().includes('chemistry')) {
      interests.push('Medicine');
    }
    if (course.name.toLowerCase().includes('economics') || 
        course.name.toLowerCase().includes('accountancy') ||
        course.name.toLowerCase().includes('business')) {
      interests.push('Commerce');
    }
  });

  return [...new Set(interests)]; // Remove duplicates
};

/**
 * Calculate overall match score (0-100)
 */
const calculateMatchScore = (profile, college) => {
  let score = 0;

  // Academic fit (50 points) - Higher weight for Indian system
  const academicFit = calculateAcademicFit(profile, college);
  score += academicFit * 50;

  // Entrance exam fit (25 points)
  const examFit = calculateEntranceExamFit(profile, college);
  score += examFit * 25;

  // Extracurricular fit (15 points)
  const leadershipScore = Math.min(profile.leadershipRoles * 5, 8);
  const activityScore = Math.min(profile.totalActivities * 1.5, 7);
  score += leadershipScore + activityScore;

  // Achievements/Olympiads (10 points)
  const olympiadScore = Math.min(profile.olympiads.length * 3, 6);
  const awardScore = Math.min(profile.awards * 2, 4);
  score += olympiadScore + awardScore;

  return Math.min(score, 100);
};

/**
 * Calculate academic fit based on board percentage and CGPA
 */
const calculateAcademicFit = (profile, college) => {
  const boardPct = profile.boardPercentage || (profile.cgpa * 9.5); // Convert CGPA to approx percentage
  const requirements = college.requirements;
  
  if (!requirements.boardPercentageAvg) return 0.5;
  
  if (boardPct >= requirements.boardPercentageAvg) return 1.0;
  if (boardPct >= requirements.boardPercentageMin) {
    return 0.5 + ((boardPct - requirements.boardPercentageMin) / 
           (requirements.boardPercentageAvg - requirements.boardPercentageMin)) * 0.5;
  }
  return Math.max(0, (boardPct / requirements.boardPercentageMin) * 0.5);
};

/**
 * Calculate entrance exam fit based on college tier
 */
const calculateEntranceExamFit = (profile, college) => {
  const tier = college.tier;
  
  // IIT - JEE Advanced
  if (tier === 'IIT') {
    if (!profile.jeeAdvancedRank || profile.jeeAdvancedRank === 0) return 0.3;
    const requirements = college.requirements;
    if (profile.jeeAdvancedRank <= requirements.jeeAdvancedRankAvg) return 1.0;
    if (profile.jeeAdvancedRank <= requirements.jeeAdvancedRankMax) return 0.7;
    return 0.3;
  }
  
  // NIT - JEE Main
  if (tier === 'NIT') {
    if (!profile.jeeMainPercentile || profile.jeeMainPercentile === 0) return 0.3;
    const requirements = college.requirements;
    if (profile.jeeMainPercentile >= requirements.jeeMainPercentileAvg) return 1.0;
    if (profile.jeeMainPercentile >= requirements.jeeMainPercentileMin) return 0.7;
    return 0.3;
  }
  
  // BITS - BITSAT
  if (tier === 'Private Elite' && college.name.includes('BITS')) {
    if (!profile.bitsatScore || profile.bitsatScore === 0) {
      // Use JEE Main as proxy if BITSAT not available
      if (profile.jeeMainPercentile >= 95) return 0.8;
      return 0.4;
    }
    const requirements = college.requirements;
    if (profile.bitsatScore >= requirements.bitsatScoreAvg) return 1.0;
    if (profile.bitsatScore >= requirements.bitsatScoreMin) return 0.7;
    return 0.4;
  }
  
  // Medical - NEET
  if (tier === 'Medical Premier' || tier === 'Medical Elite') {
    if (!profile.neetScore || profile.neetScore === 0) return 0.2;
    const requirements = college.requirements;
    if (profile.neetPercentile >= requirements.neetPercentileAvg) return 1.0;
    if (profile.neetPercentile >= requirements.neetPercentileMin) return 0.7;
    return 0.3;
  }
  
  // Central University - CUET
  if (tier === 'Central University') {
    if (!profile.cuetPercentile || profile.cuetPercentile === 0) {
      // Use board percentage as proxy
      if (profile.boardPercentage >= 90) return 0.8;
      return 0.5;
    }
    const requirements = college.requirements;
    if (profile.cuetPercentile >= requirements.cuetPercentileAvg) return 1.0;
    if (profile.cuetPercentile >= requirements.cuetPercentileMin) return 0.7;
    return 0.4;
  }
  
  // State/Private - Board marks based
  if (tier === 'State Premier' || tier === 'Private Reputed') {
    const boardPct = profile.boardPercentage || (profile.cgpa * 9.5);
    if (boardPct >= 90) return 1.0;
    if (boardPct >= 80) return 0.8;
    if (boardPct >= 70) return 0.6;
    return 0.4;
  }
  
  return 0.5;
};

/**
 * Calculate admission probability (0-100%)
 */
const calculateAdmissionProbability = (profile, college) => {
  let probability = 100 - (college.admissionRate * 2); // Base on acceptance rate
  const tier = college.tier;

  // Adjust based on entrance exam performance
  if (tier === 'IIT') {
    if (!profile.jeeAdvancedRank || profile.jeeAdvancedRank === 0) {
      probability = 5; // Cannot get into IIT without JEE Advanced
    } else if (profile.jeeAdvancedRank <= college.requirements.jeeAdvancedRankAvg) {
      probability += 25;
    } else if (profile.jeeAdvancedRank <= college.requirements.jeeAdvancedRankMax) {
      probability += 10;
    } else {
      probability -= 30;
    }
  }
  
  if (tier === 'NIT') {
    if (!profile.jeeMainPercentile || profile.jeeMainPercentile === 0) {
      probability = 10;
    } else if (profile.jeeMainPercentile >= college.requirements.jeeMainPercentileAvg) {
      probability += 20;
    } else if (profile.jeeMainPercentile >= college.requirements.jeeMainPercentileMin) {
      probability += 10;
    } else {
      probability -= 25;
    }
  }

  if (tier === 'Medical Premier' || tier === 'Medical Elite') {
    if (!profile.neetScore || profile.neetScore === 0) {
      probability = 5;
    } else if (profile.neetPercentile >= college.requirements.neetPercentileAvg) {
      probability += 25;
    } else if (profile.neetPercentile >= college.requirements.neetPercentileMin) {
      probability += 10;
    } else {
      probability -= 35;
    }
  }

  // Adjust based on board percentage
  const boardPct = profile.boardPercentage || (profile.cgpa * 9.5);
  if (boardPct >= college.requirements.boardPercentageAvg) {
    probability += 10;
  } else if (boardPct >= college.requirements.boardPercentageMin) {
    probability += 5;
  } else if (boardPct < college.requirements.boardPercentageMin) {
    probability -= 15;
  }

  // Adjust for olympiads/achievements
  if (profile.olympiads.length >= 2) {
    probability += 8;
  } else if (profile.olympiads.length === 1) {
    probability += 4;
  }

  // Adjust for leadership
  if (profile.leadershipRoles >= 2) {
    probability += 5;
  }

  // Cap between 0 and 95 (nothing is 100% certain)
  return Math.max(5, Math.min(probability, 95));
};

/**
 * Find matching scholarships for a student at an Indian college
 */
const findMatchingScholarships = (profile, college) => {
  const matchingScholarships = [];
  let estimatedAid = 0;

  college.scholarships.forEach(scholarship => {
    let qualifies = false;
    let automatic = false;

    // Check merit-based scholarships
    if (scholarship.type.includes('Merit')) {
      const boardPct = profile.boardPercentage || (profile.cgpa * 9.5);
      
      // High academic performers qualify
      if (scholarship.requirements.includes('Top 1%') && boardPct >= 97) {
        qualifies = true;
      } else if (scholarship.requirements.includes('Top 7%') && boardPct >= 93) {
        qualifies = true;
      } else if (scholarship.requirements.includes('CGPA > 8.5') && profile.cgpa >= 8.5) {
        qualifies = true;
      } else if (scholarship.requirements.includes('Top 10%') && boardPct >= 90) {
        qualifies = true;
      } else if (scholarship.requirements.includes('Top 20%') && boardPct >= 85) {
        qualifies = true;
      } else if (scholarship.requirements.includes('Top 5%') && boardPct >= 95) {
        qualifies = true;
      }

      // KVPY/INSPIRE scholars
      if (scholarship.name.includes('KVPY') || scholarship.name.includes('INSPIRE')) {
        if (profile.awards >= 2 && boardPct >= 90) {
          qualifies = true;
        }
      }

      // Board toppers
      if (scholarship.requirements.includes('topper') && boardPct >= 98) {
        qualifies = true;
        automatic = true;
      }
    }

    // Check need-based/MCM scholarships
    if (scholarship.type.includes('Need') || scholarship.type.includes('Means')) {
      qualifies = true; // Need-based always potentially qualify
    }

    // Category-based scholarships
    if (scholarship.type.includes('Category') || 
        scholarship.name.includes('SC/ST') ||
        scholarship.name.includes('OBC')) {
      qualifies = true;
    }

    // State-specific scholarships
    if (scholarship.type.includes('State')) {
      qualifies = true;
    }

    if (qualifies) {
      matchingScholarships.push({
        ...scholarship,
        automatic: automatic,
        likelihood: calculateScholarshipLikelihood(profile, scholarship, college)
      });

      // Estimate aid amount
      const amountStr = scholarship.amount;
      // Try to extract numeric value from Indian rupee format
      const amountMatch = amountStr.match(/₹?([\d,]+)/);
      if (amountMatch) {
        const amount = parseInt(amountMatch[1].replace(/,/g, ''));
        if (scholarship.type.includes('Merit')) {
          estimatedAid += amount * 0.5; // 50% of merit awards (conservative)
        } else {
          estimatedAid += amount * 0.4; // 40% of need-based (depends on need)
        }
      }
      
      // Handle percentage-based waivers
      if (amountStr.includes('%')) {
        const pctMatch = amountStr.match(/(\d+)%/);
        if (pctMatch) {
          const pct = parseInt(pctMatch[1]);
          estimatedAid += college.tuition * (pct / 100) * 0.5;
        }
      }
      
      // Handle full fee waiver
      if (amountStr.toLowerCase().includes('full') || amountStr.toLowerCase().includes('100%')) {
        estimatedAid += college.tuition * 0.4;
      }
    }
  });

  return {
    scholarships: matchingScholarships,
    estimatedAid: Math.round(estimatedAid)
  };
};

/**
 * Calculate likelihood of receiving a scholarship (0-100%)
 */
const calculateScholarshipLikelihood = (profile, scholarship, college) => {
  if (scholarship.automatic) return 95;
  
  let likelihood = 40; // Base

  if (scholarship.type.includes('Merit')) {
    const boardPct = profile.boardPercentage || (profile.cgpa * 9.5);
    
    // Higher marks = higher likelihood
    if (boardPct >= 95) likelihood += 35;
    else if (boardPct >= 90) likelihood += 25;
    else if (boardPct >= 85) likelihood += 15;

    // Olympiads boost
    if (profile.olympiads.length >= 2) likelihood += 15;
    else if (profile.olympiads.length === 1) likelihood += 8;

    // Leadership
    if (profile.leadershipRoles >= 2) likelihood += 5;
  }

  if (scholarship.type.includes('Need') || scholarship.type.includes('Means')) {
    likelihood = 60; // Most qualifying students get some need-based aid
  }

  if (scholarship.type.includes('Category')) {
    likelihood = 80; // Government category scholarships have high success rate
  }

  return Math.min(likelihood, 95);
};

/**
 * Calculate net cost after estimated aid
 */
const calculateNetCost = (college, estimatedAid, student) => {
  const baseTuition = college.tuition;
  const hostelFees = college.hostelFees || 50000; // Default hostel fees
  const netCost = Math.max(0, baseTuition - estimatedAid);
  
  return {
    tuition: baseTuition,
    estimatedAid: estimatedAid,
    netCost: netCost,
    hostelFees: hostelFees,
    totalCost: netCost + hostelFees
  };
};

/**
 * Calculate average net cost across all matches
 */
const calculateAverageNetCost = (matches) => {
  const allSchools = [...matches.reach, ...matches.target, ...matches.safety];
  if (allSchools.length === 0) return 0;
  
  const totalNet = allSchools.reduce((sum, school) => sum + school.netCost.netCost, 0);
  return Math.round(totalNet / allSchools.length);
};

/**
 * Find best value schools (high match score, low net cost)
 */
const findBestValueSchools = (matches) => {
  const allSchools = [...matches.reach, ...matches.target, ...matches.safety];
  
  // Calculate value score (match score / cost in lakhs)
  const withValueScore = allSchools.map(school => ({
    ...school,
    valueScore: school.matchScore / ((school.netCost.netCost / 100000) + 0.1)
  }));

  return withValueScore
    .sort((a, b) => b.valueScore - a.valueScore)
    .slice(0, 5)
    .map(school => ({
      name: school.name,
      matchScore: school.matchScore,
      netCost: school.netCost.netCost,
      valueScore: Math.round(school.valueScore)
    }));
};

/**
 * Get top recommendations across all categories
 */
const getTopRecommendations = (matches, count) => {
  const recommendations = [];

  // Add top reach if admission probability > 15%
  if (matches.reach.length > 0 && matches.reach[0].admissionProbability > 15) {
    recommendations.push({
      ...matches.reach[0],
      category: 'Reach',
      reason: 'Top reach college with realistic chance based on your exam scores'
    });
  }

  // Add top 2 targets
  recommendations.push(...matches.target.slice(0, 2).map(school => ({
    ...school,
    category: 'Target',
    reason: 'Strong match with good admission odds based on your profile'
  })));

  // Add top 2 safeties
  recommendations.push(...matches.safety.slice(0, 2).map(school => ({
    ...school,
    category: 'Safety',
    reason: 'Excellent safety option with high admission probability'
  })));

  return recommendations.slice(0, count);
};

/**
 * Generate reasoning for why a college is a good fit
 */
const generateFitReasoning = (profile, college, matchScore) => {
  const reasons = [];
  const boardPct = profile.boardPercentage || (profile.cgpa * 9.5);

  // Academic fit
  if (boardPct >= college.requirements.boardPercentageAvg) {
    reasons.push('Your board percentage exceeds their average');
  } else if (boardPct >= college.requirements.boardPercentageMin) {
    reasons.push('Your academic scores are within their range');
  }

  // Entrance exam specific
  if (college.tier === 'IIT' && profile.jeeAdvancedRank && profile.jeeAdvancedRank <= college.requirements.jeeAdvancedRankMax) {
    reasons.push('Your JEE Advanced rank is competitive');
  }
  
  if (college.tier === 'NIT' && profile.jeeMainPercentile >= college.requirements.jeeMainPercentileMin) {
    reasons.push('Your JEE Main percentile meets requirements');
  }

  if ((college.tier === 'Medical Premier' || college.tier === 'Medical Elite') && 
      profile.neetPercentile >= college.requirements.neetPercentileMin) {
    reasons.push('Your NEET score is competitive');
  }

  // Olympiads
  if (profile.olympiads.length >= 1) {
    reasons.push('Olympiad participation strengthens your profile');
  }

  // Leadership
  if (profile.leadershipRoles >= 2) {
    reasons.push('Multiple leadership roles demonstrate initiative');
  }

  // Interests
  const interestMatch = profile.specialInterests.filter(interest => 
    college.strengths.some(strength => strength.toLowerCase().includes(interest.toLowerCase()))
  );
  if (interestMatch.length > 0) {
    reasons.push(`Strong programs in ${interestMatch.join(', ')}`);
  }

  return reasons.slice(0, 3); // Top 3 reasons
};

/**
 * Find which of the student's strengths match the college's programs
 */
const findMatchingStrengths = (profile, college) => {
  const matches = [];

  profile.specialInterests.forEach(interest => {
    const matchingPrograms = college.strengths.filter(strength => 
      strength.toLowerCase().includes(interest.toLowerCase())
    );
    if (matchingPrograms.length > 0) {
      matches.push({
        interest: interest,
        programs: matchingPrograms
      });
    }
  });

  return matches;
};

/**
 * Categorize match type based on admission probability
 */
const categorizeMatch = (probability) => {
  if (probability < 40) return 'Reach';
  if (probability < 70) return 'Target';
  return 'Safety';
};
