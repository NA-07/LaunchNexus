import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Target, AlertCircle, ArrowRight, Brain, Lightbulb } from 'lucide-react';
import { generateAIInsights } from '../../utils/aiInsights';

const AIInsightsPanel = ({ student }) => {
  const [insights, setInsights] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (student) {
      const aiInsights = generateAIInsights(student);
      setInsights(aiInsights);
    }
  }, [student]);

  if (!insights) {
    return (
      <div className="card bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600">Analyzing profile with AI...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              AI-Powered Insights
              <Sparkles className="w-5 h-5 text-purple-600" />
            </h3>
            <p className="text-sm text-gray-600">Personalized analysis & recommendations</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-purple-600">{insights.overallScore}</div>
          <div className="text-xs text-gray-600">Overall Score</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('strengths')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'strengths'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Strengths
        </button>
        <button
          onClick={() => setActiveTab('growth')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'growth'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Growth
        </button>
        <button
          onClick={() => setActiveTab('colleges')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'colleges'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Colleges
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* AI Narrative */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="text-gray-800 leading-relaxed">{insights.narrative}</p>
            </div>

            {/* Competitiveness Analysis */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Competitiveness Analysis
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-700">Overall Percentile</span>
                  <span className="text-2xl font-bold text-purple-600">{insights.competitivenessAnalysis.percentile}th</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Top Tier Universities</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      insights.competitivenessAnalysis.compared.topTier === 'Competitive' 
                        ? 'bg-green-100 text-green-700' 
                        : insights.competitivenessAnalysis.compared.topTier === 'Developing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {insights.competitivenessAnalysis.compared.topTier}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Selective Universities</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      insights.competitivenessAnalysis.compared.selective === 'Strong' 
                        ? 'bg-green-100 text-green-700' 
                        : insights.competitivenessAnalysis.compared.selective === 'Competitive'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {insights.competitivenessAnalysis.compared.selective}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">State Universities</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      insights.competitivenessAnalysis.compared.state === 'Excellent' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {insights.competitivenessAnalysis.compared.state}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">{insights.competitivenessAnalysis.summary}</p>
              </div>
            </div>

            {/* Action Steps */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Next Action Steps
              </h4>
              <div className="space-y-2">
                {insights.actionableSteps.slice(0, 3).map((step, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {step.priority}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{step.action}</p>
                      <p className="text-xs text-gray-600 mt-1">{step.timeline}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strengths' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              These are your standout qualities that will impress college admissions officers:
            </p>
            {insights.strengths.map((strength, index) => (
              <div
                key={index}
                className={`border-l-4 rounded-lg p-4 ${
                  strength.impact === 'high' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{strength.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-gray-900">{strength.category}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        strength.impact === 'high'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-blue-200 text-blue-800'
                      }`}>
                        {strength.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{strength.description}</p>
                  </div>
                </div>
              </div>
            ))}
            {insights.strengths.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>Keep building your profile to unlock strengths!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Focus on these areas to maximize your college competitiveness:
            </p>
            {insights.growthOpportunities.map((opp, index) => (
              <div
                key={index}
                className={`border-l-4 rounded-lg p-4 ${
                  opp.priority === 'high' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-yellow-500 bg-yellow-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    opp.priority === 'high' ? 'text-orange-600' : 'text-yellow-600'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-gray-900">{opp.category}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        opp.priority === 'high'
                          ? 'bg-orange-200 text-orange-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {opp.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">{opp.suggestion}</p>
                    <p className="text-xs text-gray-600 italic">💡 {opp.expectedImpact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'colleges' && (
          <div className="space-y-6">
            {/* Admission Predictions */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Estimated Admission Chances
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">Ivy League / Top 10</span>
                    <span className="text-sm font-bold text-purple-600">{Math.round(insights.admissionPredictions.ivy)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all"
                      style={{ width: `${insights.admissionPredictions.ivy}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">Top Public Universities</span>
                    <span className="text-sm font-bold text-blue-600">{Math.round(insights.admissionPredictions.topPublic)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all"
                      style={{ width: `${insights.admissionPredictions.topPublic}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">Competitive Universities</span>
                    <span className="text-sm font-bold text-green-600">{Math.round(insights.admissionPredictions.competitive)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-600 to-green-400 h-2 rounded-full transition-all"
                      style={{ width: `${insights.admissionPredictions.competitive}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">State Universities</span>
                    <span className="text-sm font-bold text-teal-600">{Math.round(insights.admissionPredictions.state)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-600 to-teal-400 h-2 rounded-full transition-all"
                      style={{ width: `${insights.admissionPredictions.state}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3 italic">{insights.admissionPredictions.explanation}</p>
            </div>

            {/* College Recommendations */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">🎯 Reach Schools</h4>
              <div className="space-y-2">
                {insights.collegeRecommendations.reach.map((college, index) => (
                  <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{college.name}</span>
                      <span className="text-sm font-bold text-purple-600">{college.match}% match</span>
                    </div>
                    <p className="text-xs text-gray-600">{college.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3">✅ Target Schools</h4>
              <div className="space-y-2">
                {insights.collegeRecommendations.target.map((college, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{college.name}</span>
                      <span className="text-sm font-bold text-green-600">{college.match}% match</span>
                    </div>
                    <p className="text-xs text-gray-600">{college.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3">🛡️ Safety Schools</h4>
              <div className="space-y-2">
                {insights.collegeRecommendations.safety.map((college, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{college.name}</span>
                      <span className="text-sm font-bold text-blue-600">{college.match}% match</span>
                    </div>
                    <p className="text-xs text-gray-600">{college.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;
