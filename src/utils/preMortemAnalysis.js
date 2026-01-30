// Pre-Mortem Decision Analysis Engine
// Simulates "future failures" to help students avoid costly mistakes

/**
 * Analyzes a pending decision and generates a simulated failure report
 * Uses the pre-mortem technique: imagine the decision failed, then work backwards
 */
export const analyzeDecision = (student, decision) => {
  const analysis = {
    decision: decision,
    timestamp: new Date(),
    overallRisk: calculateOverallRisk(student, decision),
    failureScenarios: generateFailureScenarios(student, decision),
    warningsSigns: identifyWarningSigns(student, decision),
    riskFactors: analyzeRiskFactors(student, decision),
    mitigationStrategies: generateMitigationStrategies(student, decision),
    alternativeOptions: suggestAlternatives(student, decision),
    decisionConfidence: calculateDecisionConfidence(student, decision),
    timeline: generateFailureTimeline(decision),
    recommendation: generateRecommendation(student, decision)
  };

  return analysis;
};

/**
 * Calculate overall risk score (0-100, higher = more risky)
 */
const calculateOverallRisk = (student, decision) => {
  let risk = 30; // Base risk

  const decisionType = classifyDecision(decision.type);
  
  // Adjust based on decision type
  if (decisionType === 'college-choice') risk += 20;
  if (decisionType === 'major-selection') risk += 15;
  if (decisionType === 'financial') risk += 25;
  if (decisionType === 'career-path') risk += 20;

  // Adjust based on student preparedness
  if (student.academic?.cgpa < 7.5) risk += 10;
  if (!student.academic?.testScores?.jeeMain && !student.academic?.testScores?.neet) risk += 5;
  
  // Adjust based on research done
  if (decision.researchDone === false) risk += 15;
  if (decision.hasDeadline && decision.timeUntilDeadline < 7) risk += 10; // Less than a week

  return Math.min(Math.round(risk), 100);
};

/**
 * Classify the type of decision
 */
const classifyDecision = (decisionType) => {
  if (!decisionType) return 'general';
  
  const type = decisionType.toLowerCase();
  
  if (type.includes('college') || type.includes('university')) return 'college-choice';
  if (type.includes('major') || type.includes('study')) return 'major-selection';
  if (type.includes('money') || type.includes('financial') || type.includes('loan') || type.includes('scholarship')) return 'financial';
  if (type.includes('career') || type.includes('job') || type.includes('internship')) return 'career-path';
  if (type.includes('activity') || type.includes('extracurricular')) return 'activity-choice';
  
  return 'general';
};

/**
 * Generate realistic failure scenarios
 */
const generateFailureScenarios = (student, decision) => {
  const scenarios = [];
  const decisionType = classifyDecision(decision.type);

  if (decisionType === 'college-choice') {
    scenarios.push({
      scenario: "Academic Overwhelm",
      probability: calculateScenarioProbability(student, 'academic-overwhelm'),
      description: "You struggle to keep up with the academic rigor and your CGPA drops below 7.0 by second year.",
      consequences: [
        "Loss of merit scholarships worth ₹50,000+/year",
        "Stress and mental health challenges",
        "Potential year back or detention",
        "Limited placement opportunities due to low CGPA"
      ],
      timeframe: "6-12 months after enrollment",
      severity: "High"
    });

    scenarios.push({
      scenario: "Financial Crisis",
      probability: calculateScenarioProbability(student, 'financial-crisis'),
      description: "The actual cost far exceeds initial estimates, and you accumulate ₹20L+ in education loans.",
      consequences: [
        "Need to work part-time, impacting studies",
        "Miss out on unpaid internships",
        "7-10 years of loan repayment after graduation",
        "Delayed life milestones (buying home, higher studies abroad)"
      ],
      timeframe: "Ongoing throughout college",
      severity: "Very High"
    });

    scenarios.push({
      scenario: "Poor Cultural Fit",
      probability: calculateScenarioProbability(student, 'culture-mismatch'),
      description: "You feel isolated and struggle to find your community, affecting mental health and performance.",
      consequences: [
        "Reduced academic performance",
        "Consider transferring (losing credits and money)",
        "Missing networking opportunities",
        "Decreased overall college satisfaction"
      ],
      timeframe: "First semester",
      severity: "Medium"
    });

    scenarios.push({
      scenario: "Wrong Branch/Major Selection",
      probability: calculateScenarioProbability(student, 'wrong-major'),
      description: "The branch you chose doesn't align with your strengths or career goals.",
      consequences: [
        "Switching branches is nearly impossible in most Indian colleges",
        "Additional ₲5-10L if you need to restart at another college",
        "Wasted years in a field you dislike",
        "Delayed entry into preferred career field"
      ],
      timeframe: "End of second year",
      severity: "High"
    });
  }

  if (decisionType === 'major-selection') {
    scenarios.push({
      scenario: "Limited Job Market",
      probability: 60,
      description: "Your chosen branch has poor job prospects, and you struggle to find employment after graduation.",
      consequences: [
        "Unemployment or underemployment for 12+ months",
        "Taking jobs unrelated to degree",
        "Package 40% below expectations",
        "Difficulty repaying education loans"
      ],
      timeframe: "6-12 months post-graduation",
      severity: "Very High"
    });

    scenarios.push({
      scenario: "Passion vs. Practicality Conflict",
      probability: 55,
      description: "You chose passion over practicality, and struggle with low earning potential.",
      consequences: [
        "Starting package below ₹4 LPA",
        "Need to pursue additional degrees/certifications",
        "Financial stress and regret",
        "Difficulty achieving financial independence"
      ],
      timeframe: "First 2-3 years after graduation",
      severity: "High"
    });

    scenarios.push({
      scenario: "Skill Mismatch",
      probability: calculateScenarioProbability(student, 'skill-mismatch'),
      description: "The branch requires skills that don't align with your natural abilities.",
      consequences: [
        "Consistently low grades (6.0-7.0 CGPA)",
        "Increased stress and anxiety",
        "Reduced self-confidence",
        "Limited higher studies and placement options"
      ],
      timeframe: "Throughout college",
      severity: "Medium"
    });
  }

  if (decisionType === 'financial') {
    scenarios.push({
      scenario: "Debt Spiral",
      probability: 70,
      description: "You underestimate total costs and graduate with crushing education loan debt.",
      consequences: [
        "EMI exceeds 30% of income",
        "Cannot afford to live independently in metro cities",
        "Delay savings for 5-10+ years",
        "Consider loan moratorium or restructuring"
      ],
      timeframe: "Post-graduation, 7-15 years",
      severity: "Very High"
    });

    scenarios.push({
      scenario: "Lost Scholarship Opportunity",
      probability: 45,
      description: "You miss out on MCM or INSPIRE scholarships by not applying to certain institutions.",
      consequences: [
        "Pay ₲5-10L more over 4 years",
        "Unnecessary education loans",
        "Missed opportunity for better financial position",
        "Regret and resentment"
      ],
      timeframe: "Throughout college",
      severity: "High"
    });
  }

  if (decisionType === 'career-path') {
    scenarios.push({
      scenario: "Career Dead End",
      probability: 50,
      description: "The career path has limited growth potential and you plateau early.",
      consequences: [
        "Package caps at ₹12-15 LPA within 5 years",
        "Limited advancement opportunities",
        "Need to completely retrain or do MBA",
        "Unfulfilling work long-term"
      ],
      timeframe: "5-10 years into career",
      severity: "High"
    });

    scenarios.push({
      scenario: "Industry Decline",
      probability: 40,
      description: "Automation or industry changes make your chosen field obsolete.",
      consequences: [
        "Forced career change in 10-15 years",
        "Need expensive retraining",
        "Period of unemployment",
        "Earnings never recover to peak"
      ],
      timeframe: "10-20 years",
      severity: "Medium"
    });
  }

  // Sort by severity and probability
  return scenarios.sort((a, b) => {
    const severityScore = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    return (severityScore[b.severity] + b.probability/100) - (severityScore[a.severity] + a.probability/100);
  });
};

/**
 * Calculate probability of specific scenario (0-100%)
 */
const calculateScenarioProbability = (student, scenarioType) => {
  let probability = 30; // Base

  if (scenarioType === 'academic-overwhelm') {
    if (student.academic?.cgpa < 8.0) probability += 30;
    else if (student.academic?.cgpa < 9.0) probability += 15;
    
    const olympiads = student.academic?.testScores?.olympiads?.length || 0;
    if (olympiads < 1) probability += 20;
    
    return Math.min(probability, 85);
  }

  if (scenarioType === 'financial-crisis') {
    probability = 50; // Many students face this
    return probability;
  }

  if (scenarioType === 'culture-mismatch') {
    const activities = student.extracurricular?.length || 0;
    if (activities < 2) probability += 25;
    return Math.min(probability, 70);
  }

  if (scenarioType === 'wrong-major') {
    if (student.grade <= 10) probability += 20; // Younger students less sure
    return Math.min(probability, 65);
  }

  if (scenarioType === 'skill-mismatch') {
    if (student.academic?.cgpa < 8.5) probability += 20;
    return Math.min(probability, 60);
  }

  return 40;
};

/**
 * Identify early warning signs to watch for
 */
const identifyWarningSigns = (student, decision) => {
  const decisionType = classifyDecision(decision.type);
  const signs = [];

  if (decisionType === 'college-choice') {
    signs.push({
      sign: "Difficulty sleeping or constant stress about the decision",
      meaning: "Your subconscious may be warning you this isn't the right choice",
      action: "Take a week to step back and reassess without pressure"
    });

    signs.push({
      sign: "Having to justify the decision repeatedly to yourself or others",
      meaning: "You're not fully confident in this choice",
      action: "List pros and cons honestly without emotional attachment"
    });

    signs.push({
      sign: "Ignoring financial aid packages or avoiding cost discussions",
      meaning: "You're in denial about financial reality",
      action: "Create a detailed 4-year budget with all actual costs"
    });

    signs.push({
      sign: "Friends/family expressing serious concerns",
      meaning: "External perspective seeing red flags you're missing",
      action: "Schedule honest conversations to understand their concerns"
    });

    signs.push({
      sign: "Choosing prestige over fit",
      meaning: "You're making a decision based on external validation",
      action: "Reflect on what YOU need to thrive, not what impresses others"
    });
  }

  if (decisionType === 'major-selection') {
    signs.push({
      sign: "Choosing based solely on expected salary",
      meaning: "You're ignoring personal fit and satisfaction",
      action: "Research day-to-day job responsibilities and talk to professionals"
    });

    signs.push({
      sign: "Avoiding math/science because it's 'hard'",
      meaning: "You might regret limiting your options",
      action: "Assess actual abilities vs. fears; get tutoring if needed"
    });

    signs.push({
      sign: "Following parental pressure over personal interest",
      meaning: "Recipe for burnout and resentment",
      action: "Have honest conversation about your goals and concerns"
    });
  }

  if (decisionType === 'financial') {
    signs.push({
      sign: "Using vague terms like 'it will work out'",
      meaning: "You don't have a real plan",
      action: "Create specific financial projections with real numbers"
    });

    signs.push({
      sign: "Not comparing total 4-year costs across schools",
      meaning: "You're making emotional vs. analytical decision",
      action: "Build spreadsheet comparing all schools' true costs"
    });

    signs.push({
      sign: "Assuming you'll get outside scholarships",
      meaning: "Overestimating ability to reduce costs",
      action: "Only count guaranteed money in your calculations"
    });
  }

  return signs;
};

/**
 * Analyze student-specific risk factors
 */
const analyzeRiskFactors = (student, decision) => {
  const factors = [];

  // Academic risk factors
  if (student.academic?.cgpa < 8.5) {
    factors.push({
      category: "Academic Preparation",
      risk: "Your current CGPA suggests you may struggle with rigorous coursework at top institutions",
      level: "High",
      impact: "Could affect scholarship retention and higher studies options"
    });
  }

  const olympiads = student.academic?.testScores?.olympiads?.length || 0;
  if (olympiads < 1) {
    factors.push({
      category: "Competitive Preparation",
      risk: "No Olympiad experience may indicate lack of exposure to competitive problem-solving",
      level: "Medium",
      impact: "Steeper learning curve in competitive academic environments"
    });
  }

  // Financial risk factors
  if (decision.estimatedCost && decision.estimatedCost > 1000000) {
    factors.push({
      category: "Financial Burden",
      risk: "High cost of attendance (>₲10L/year) will likely require significant education loans",
      level: "Very High",
      impact: "Debt may limit career choices and delay financial independence"
    });
  }

  // Extracurricular risk factors
  const activities = student.extracurricular?.length || 0;
  if (activities < 2) {
    factors.push({
      category: "Social Integration",
      risk: "Limited extracurricular experience may make campus involvement harder",
      level: "Medium",
      impact: "Potential difficulty building community and networking"
    });
  }

  // Time pressure risk
  if (decision.hasDeadline && decision.timeUntilDeadline < 14) {
    factors.push({
      category: "Decision Timeline",
      risk: "You're making a major decision under time pressure",
      level: "High",
      impact: "May overlook important details or make emotional choice"
    });
  }

  // Research risk
  if (decision.researchDone === false || decision.visitedCampus === false) {
    factors.push({
      category: "Information Gap",
      risk: "Making decision without adequate research or campus visits",
      level: "High",
      impact: "Higher chance of poor fit and buyer's remorse"
    });
  }

  return factors.sort((a, b) => {
    const levelScore = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    return levelScore[b.level] - levelScore[a.level];
  });
};

/**
 * Generate mitigation strategies
 */
const generateMitigationStrategies = (student, decision) => {
  const strategies = [];
  const decisionType = classifyDecision(decision.type);

  if (decisionType === 'college-choice') {
    strategies.push({
      strategy: "Gap Year or Semester",
      description: "Consider deferring enrollment to prepare better for JEE/NEET, save money, and gain clarity",
      pros: ["Improve entrance exam rank, gain maturity, clearer goals"],
      cons: ["Delay graduation, lose momentum, social pressure"],
      effectiveness: "High for uncertain students"
    });

    strategies.push({
      strategy: "Choose State Government College",
      description: "Complete education at lower cost in good state engineering/medical colleges",
      pros: ["Save ₲10-15L+, quality education, smaller fees"],
      cons: ["Different placement opportunities, less brand value"],
      effectiveness: "Very High for financial concerns"
    });

    strategies.push({
      strategy: "Attend with Conditions",
      description: "Accept but with strict CGPA/performance requirements you set",
      pros: ["Chance to succeed, clear benchmarks"],
      cons: ["Pressure, may still struggle"],
      effectiveness: "Medium"
    });

    strategies.push({
      strategy: "Choose NIT Over Private",
      description: "Select NIT/IIIT where you're above cutoff instead of expensive private college",
      pros: ["Lower fees, good placements, government recognition, better peer group"],
      cons: ["May need to compromise on city preference"],
      effectiveness: "Very High for academic and financial success"
    });
  }

  if (decisionType === 'financial') {
    strategies.push({
      strategy: "Apply for All Scholarships",
      description: "Apply for MCM, INSPIRE, KVPY, Central Sector, and state scholarships",
      pros: ["Could gain ₲50,000-2L/year"],
      cons: ["Time intensive, competitive"],
      effectiveness: "Medium to High"
    });

    strategies.push({
      strategy: "Part-Time Work + Summer Internships",
      description: "Commit to tutoring 10-15 hrs/week + paid summer internships",
      pros: ["Earn ₲40,000-80,000/year, build experience"],
      cons: ["Less study time, possible impact on CGPA"],
      effectiveness: "High for manageable expenses"
    });

    strategies.push({
      strategy: "Focus on High-Paying Placements",
      description: "Target high-package companies through focused preparation",
      pros: ["Recover education costs faster, start saving early"],
      cons: ["Intense competition, may miss work-life balance"],
      effectiveness: "Very High for motivated students"
    });
  }

  if (decisionType === 'major-selection') {
    strategies.push({
      strategy: "Double Major or Minor",
      description: "Combine passion with practical skills",
      pros: ["Hedge your bets, broader opportunities"],
      cons: ["Heavier workload, may extend graduation"],
      effectiveness: "High for versatility"
    });

    strategies.push({
      strategy: "Delay Declaration",
      description: "Explore options for 1-2 semesters before committing",
      pros: ["Make informed choice, try different fields"],
      cons: ["May extend time to graduate"],
      effectiveness: "Very High for undecided students"
    });
  }

  return strategies;
};

/**
 * Suggest alternative options
 */
const suggestAlternatives = (student, decision) => {
  const alternatives = [];
  const decisionType = classifyDecision(decision.type);

  if (decisionType === 'college-choice') {
    alternatives.push({
      alternative: "NITs/IIITs in Your JEE Main Range",
      reason: "Excellent education at lower cost, good placements, government recognition",
      considerIf: "You're choosing expensive private college primarily for city location"
    });

    alternatives.push({
      alternative: "State Government Engineering College",
      reason: "Excellent ROI, affordable fees, good regional placements",
      considerIf: "Cost is a major concern or you plan to pursue higher studies later"
    });

    alternatives.push({
      alternative: "Drop Year + Better JEE/NEET Rank",
      reason: "Improve rank significantly, get into better institution",
      considerIf: "You're not satisfied with current options and have improvement potential"
    });
  }

  return alternatives;
};

/**
 * Calculate decision confidence score
 */
const calculateDecisionConfidence = (student, decision) => {
  let confidence = 50; // Start neutral

  // Increase confidence for positive factors
  if (decision.researchDone) confidence += 15;
  if (decision.visitedCampus) confidence += 10;
  if (decision.consultedExperts) confidence += 10;
  if (decision.financiallyViable) confidence += 15;
  if (decision.alignsWithGoals) confidence += 10;

  // Decrease confidence for red flags
  if (decision.hasDeadline && decision.timeUntilDeadline < 7) confidence -= 20;
  if (decision.significantDebt) confidence -= 15;
  if (decision.familyOpposed) confidence -= 10;
  if (!decision.visitedCampus) confidence -= 15;

  return Math.max(0, Math.min(100, confidence));
};

/**
 * Generate failure timeline
 */
const generateFailureTimeline = (decision) => {
  return [
    { phase: "0-3 months", event: "Initial excitement wears off, reality sets in" },
    { phase: "3-6 months", event: "First major challenges emerge" },
    { phase: "6-12 months", event: "Consider if made wrong choice" },
    { phase: "1-2 years", event: "Either adapt or transfer/change plans" },
    { phase: "2-4 years", event: "Live with consequences, graduation" },
    { phase: "Post-graduation", event: "Long-term impact becomes clear" }
  ];
};

/**
 * Generate final recommendation
 */
const generateRecommendation = (student, decision) => {
  const risk = calculateOverallRisk(student, decision);
  const confidence = calculateDecisionConfidence(student, decision);

  if (risk < 30 && confidence > 70) {
    return {
      verdict: "Green Light - Proceed with Confidence",
      explanation: "This appears to be a well-researched decision with manageable risks.",
      action: "Move forward, but stay aware of the warning signs identified above."
    };
  }

  if (risk < 50 && confidence > 50) {
    return {
      verdict: "Yellow Light - Proceed with Caution",
      explanation: "This decision has moderate risks that can be mitigated with proper planning.",
      action: "Implement the recommended mitigation strategies before committing."
    };
  }

  if (risk >= 50 || confidence < 40) {
    return {
      verdict: "Red Light - High Risk, Reconsider",
      explanation: "This decision carries significant risks that could have long-term negative consequences.",
      action: "Seriously consider the alternatives suggested. If you proceed, have a detailed backup plan."
    };
  }

  return {
    verdict: "Uncertain - Need More Information",
    explanation: "More research and reflection needed before making this decision.",
    action: "Address the information gaps identified in the risk factors section."
  };
};

/**
 * Quick pre-mortem for common college decisions
 */
export const quickPreMortem = (decisionType, params) => {
  const commonScenarios = {
    'expensive-dream-school': {
      risk: 75,
      topFailure: "Graduate with ₹25L+ debt from private college, regret for 10+ years",
      keyQuestion: "Is the private college brand worth sacrificing financial freedom?"
    },
    'safe-but-boring': {
      risk: 45,
      topFailure: "Always wonder 'what if' - regret not taking the drop year",
      keyQuestion: "Will you be proud of the safe choice in 10 years?"
    },
    'following-parents': {
      risk: 65,
      topFailure: "Burnout and resentment in engineering/medicine when you wanted arts/commerce",
      keyQuestion: "Whose life are you living - yours or theirs?"
    },
    'chasing-prestige': {
      risk: 60,
      topFailure: "Struggle to keep up at IIT, lose confidence and placement opportunities",
      keyQuestion: "Would you rather be top student at NIT or struggle at IIT?"
    }
  };

  return commonScenarios[decisionType] || null;
};
