import React, { useState, useEffect } from 'react';
import { School, DollarSign, TrendingUp, Award, MapPin, Users, ChevronDown, ChevronUp, ExternalLink, Filter, Star, Check } from 'lucide-react';
import { matchStudentToColleges } from '../../utils/collegeMatching';

const CollegeScholarshipFinder = ({ student }) => {
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCollege, setExpandedCollege] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all, public, private

  useEffect(() => {
    if (student) {
      setLoading(true);
      // Simulate processing time for better UX
      setTimeout(() => {
        const collegeMatches = matchStudentToColleges(student);
        setMatches(collegeMatches);
        setLoading(false);
      }, 800);
    }
  }, [student]);

  if (loading || !matches) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">Analyzing {student?.name}'s profile...</p>
            <p className="text-sm text-gray-500 mt-2">Matching with 15 colleges and 50+ scholarships</p>
          </div>
        </div>
      </div>
    );
  }

  const getFilteredSchools = () => {
    let schools = [];
    
    if (activeCategory === 'all') {
      schools = [...matches.reach, ...matches.target, ...matches.safety];
    } else if (activeCategory === 'reach') {
      schools = matches.reach;
    } else if (activeCategory === 'target') {
      schools = matches.target;
    } else {
      schools = matches.safety;
    }

    if (filterType !== 'all') {
      schools = schools.filter(s => s.type.toLowerCase() === filterType);
    }

    return schools;
  };

  const toggleCollege = (collegeId) => {
    setExpandedCollege(expandedCollege === collegeId ? null : collegeId);
  };

  const getCategoryColor = (category) => {
    if (category === 'Reach') return 'purple';
    if (category === 'Target') return 'blue';
    return 'green';
  };

  const formatCurrency = (amount) => {
    // Format in Indian Rupees with lakhs notation
    if (amount >= 100000) {
      const lakhs = (amount / 100000).toFixed(2);
      return `₹${lakhs} L`;
    }
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <School className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">College & Scholarship Finder</h3>
            <p className="text-sm text-gray-600">Personalized matches with financial aid opportunities</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <School className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-600">Total Matches</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{matches.summary.totalMatches}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-600">Scholarships</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{matches.scholarships.total}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-orange-600" />
              <span className="text-xs text-gray-600">Avg. Net Cost</span>
            </div>
            <p className="text-lg font-bold text-orange-600">{formatCurrency(matches.summary.averageNetCost)}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-gray-600">Auto Awards</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{matches.scholarships.automatic.length}</p>
          </div>
        </div>
      </div>

      {/* Top Recommendations */}
      <div className="card">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Top 5 Recommendations for {student.name}
        </h4>
        <div className="space-y-3">
          {matches.summary.topRecommendations.map((rec, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-gray-900">{rec.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold bg-${getCategoryColor(rec.category)}-100 text-${getCategoryColor(rec.category)}-700`}>
                      {rec.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.location} • {rec.type}</p>
                  <p className="text-sm text-gray-700 italic">"{rec.reason}"</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Match Score</div>
                  <div className="text-2xl font-bold text-blue-600">{rec.matchScore}</div>
                  <div className="text-xs text-gray-500 mt-1">{rec.admissionProbability}% chance</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({matches.summary.totalMatches})
          </button>
          <button
            onClick={() => setActiveCategory('reach')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeCategory === 'reach'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎯 Reach ({matches.summary.reachCount})
          </button>
          <button
            onClick={() => setActiveCategory('target')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeCategory === 'target'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ✅ Target ({matches.summary.targetCount})
          </button>
          <button
            onClick={() => setActiveCategory('safety')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeCategory === 'safety'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🛡️ Safety ({matches.summary.safetyCount})
          </button>
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All Types</option>
          <option value="public">Public Only</option>
          <option value="private">Private Only</option>
        </select>
      </div>

      {/* College List */}
      <div className="space-y-4">
        {getFilteredSchools().map((college) => (
          <div key={college.id} className="card border-2 hover:border-blue-300 transition-all">
            {/* College Header */}
            <div
              className="cursor-pointer"
              onClick={() => toggleCollege(college.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xl font-bold text-gray-900">{college.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${getCategoryColor(college.category)}-100 text-${getCategoryColor(college.category)}-700`}>
                      {college.category}
                    </span>
                    {college.scholarships.some(s => s.automatic) && (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Auto $
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {college.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {college.size}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-semibold">
                      {college.type}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <div>
                      <div className="text-sm text-gray-600">Match</div>
                      <div className="text-2xl font-bold text-blue-600">{college.matchScore}</div>
                    </div>
                    <div className="border-l pl-3">
                      <div className="text-sm text-gray-600">Odds</div>
                      <div className="text-2xl font-bold text-green-600">{college.admissionProbability}%</div>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    {expandedCollege === college.id ? (
                      <>Less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Details <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-3 mb-3">
                <div className="bg-blue-50 rounded p-2">
                  <div className="text-xs text-gray-600">Tuition</div>
                  <div className="font-bold text-blue-700 text-sm">{formatCurrency(college.netCost.tuition)}</div>
                </div>
                <div className="bg-green-50 rounded p-2">
                  <div className="text-xs text-gray-600">Est. Aid</div>
                  <div className="font-bold text-green-700 text-sm">{formatCurrency(college.estimatedAid)}</div>
                </div>
                <div className="bg-orange-50 rounded p-2">
                  <div className="text-xs text-gray-600">Net Cost</div>
                  <div className="font-bold text-orange-700 text-sm">{formatCurrency(college.netCost.netCost)}</div>
                </div>
                <div className="bg-purple-50 rounded p-2">
                  <div className="text-xs text-gray-600">Scholarships</div>
                  <div className="font-bold text-purple-700 text-sm">{college.scholarships.length} available</div>
                </div>
              </div>

              {/* Why Good Fit */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-700 mb-1">Why This is a Good Fit:</p>
                <div className="flex flex-wrap gap-2">
                  {college.whyGoodFit.map((reason, idx) => (
                    <span key={idx} className="text-xs bg-white px-2 py-1 rounded border border-gray-200 flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-600" />
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedCollege === college.id && (
              <div className="mt-4 pt-4 border-t space-y-4">
                {/* Requirements */}
                <div>
                  <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    Admission Requirements
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600">Board % Range</div>
                      <div className="font-semibold text-gray-900">{college.requirements.boardPercentageMin}% - {college.requirements.boardPercentageAvg}%</div>
                      <div className="text-xs text-green-600 mt-1">
                        {(student.academic?.boardPercentage || student.academic?.cgpa * 9.5) >= college.requirements.boardPercentageAvg ? '✓ You exceed avg' :
                         (student.academic?.boardPercentage || student.academic?.cgpa * 9.5) >= college.requirements.boardPercentageMin ? '✓ You qualify' :
                         '⚠ Below minimum'}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600">
                        {college.tier === 'IIT' ? 'JEE Advanced Rank' :
                         college.tier === 'NIT' ? 'JEE Main %ile' :
                         college.tier === 'Medical Premier' || college.tier === 'Medical Elite' ? 'NEET %ile' :
                         'Entrance Exam'}
                      </div>
                      <div className="font-semibold text-gray-900">
                        {college.requirements.jeeAdvancedRankMax ? `< ${college.requirements.jeeAdvancedRankMax}` :
                         college.requirements.jeeMainPercentileMin ? `${college.requirements.jeeMainPercentileMin}%+` :
                         college.requirements.neetPercentileMin ? `${college.requirements.neetPercentileMin}%+` :
                         college.requirements.bitsatScoreMin ? `${college.requirements.bitsatScoreMin}+` :
                         'Board-based'}
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        {college.tier === 'IIT' && student.academic?.testScores?.jeeAdvanced?.rank ? 
                          (student.academic.testScores.jeeAdvanced.rank <= college.requirements.jeeAdvancedRankMax ? '✓ You qualify' : 'Keep preparing') :
                         college.tier === 'NIT' && student.academic?.testScores?.jeeMain?.percentile ?
                          (student.academic.testScores.jeeMain.percentile >= college.requirements.jeeMainPercentileMin ? '✓ You qualify' : 'Keep preparing') :
                         'Check eligibility'}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600">Acceptance Rate</div>
                      <div className="font-semibold text-gray-900">{college.admissionRate}%</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {college.admissionRate < 5 ? 'Highly Competitive' :
                         college.admissionRate < 15 ? 'Very Selective' :
                         college.admissionRate < 30 ? 'Selective' : 'Moderate'}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-600">College Tier</div>
                      <div className="font-semibold text-gray-900">{college.tier}</div>
                      <div className="text-xs text-blue-600 mt-1">
                        {college.type}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths/Programs */}
                <div>
                  <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-600" />
                    Top Programs
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {college.strengths.map((strength, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scholarships */}
                <div>
                  <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    Available Scholarships ({college.scholarships.length})
                  </h5>
                  <div className="space-y-3">
                    {college.scholarships.map((scholarship, idx) => (
                      <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h6 className="font-bold text-gray-900">{scholarship.name}</h6>
                              {scholarship.automatic && (
                                <span className="px-2 py-0.5 bg-yellow-200 text-yellow-800 rounded text-xs font-semibold">
                                  AUTOMATIC
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mb-1">{scholarship.amount}</p>
                            <p className="text-xs text-gray-600">📋 {scholarship.requirements}</p>
                            <p className="text-xs text-gray-600 mt-1">📊 Coverage: {scholarship.coverage}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-600">Likelihood</div>
                            <div className="text-lg font-bold text-green-600">{scholarship.likelihood}%</div>
                          </div>
                        </div>
                        <div className="text-xs text-green-700 bg-green-100 rounded px-2 py-1 inline-block">
                          {scholarship.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
                  <h5 className="font-bold text-gray-900 mb-3">💰 Estimated Cost Breakdown (Annual)</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Tuition & Fees</span>
                      <span className="font-semibold">{formatCurrency(college.netCost.tuition)}</span>
                    </div>
                    <div className="flex justify-between text-green-700">
                      <span className="text-sm">- Estimated Scholarships/Aid</span>
                      <span className="font-semibold">-{formatCurrency(college.estimatedAid)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-bold">Net Tuition</span>
                      <span className="font-bold text-orange-600">{formatCurrency(college.netCost.netCost)}/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">+ Hostel & Mess (est.)</span>
                      <span className="text-gray-600">{formatCurrency(college.hostelFees || 50000)}/year</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Total Est. Cost/Year</span>
                      <span className="font-bold text-blue-600">{formatCurrency(college.netCost.totalCost)}</span>
                    </div>
                    <div className="flex justify-between text-lg border-t-2 pt-2">
                      <span className="font-bold">4-Year Total</span>
                      <span className="font-bold text-purple-600">{formatCurrency(college.netCost.totalCost * 4)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {getFilteredSchools().length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Filter className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No colleges match the current filters</p>
        </div>
      )}
    </div>
  );
};

export default CollegeScholarshipFinder;
