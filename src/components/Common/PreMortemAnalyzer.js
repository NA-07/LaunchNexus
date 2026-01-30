import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, Shield, Lightbulb, Clock, DollarSign, Brain, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { analyzeDecision, quickPreMortem } from '../../utils/preMortemAnalysis';

const PreMortemAnalyzer = ({ student }) => {
  const [decision, setDecision] = useState({
    type: '',
    description: '',
    estimatedCost: 0,
    hasDeadline: false,
    timeUntilDeadline: null,
    researchDone: false,
    visitedCampus: false,
    consultedExperts: false,
    financiallyViable: true,
    alignsWithGoals: true,
    significantDebt: false,
    familyOpposed: false
  });

  const [analysis, setAnalysis] = useState(null);
  const [showQuickPreMortem, setShowQuickPreMortem] = useState(true);

  const handleAnalyze = () => {
    if (!decision.description || !decision.type) {
      alert('Please fill in decision type and description');
      return;
    }

    const result = analyzeDecision(student, decision);
    setAnalysis(result);
    setShowQuickPreMortem(false);
  };

  const handleQuickScenario = (scenarioType) => {
    const quick = quickPreMortem(scenarioType);
    if (quick) {
      // Show quick result
      alert(`Risk: ${quick.risk}%\n\nTop Failure: ${quick.topFailure}\n\nKey Question: ${quick.keyQuestion}`);
    }
  };

  const getRiskColor = (risk) => {
    if (risk < 30) return 'green';
    if (risk < 50) return 'yellow';
    if (risk < 70) return 'orange';
    return 'red';
  };

  const getVerdictColor = (verdict) => {
    if (verdict.includes('Green')) return 'green';
    if (verdict.includes('Yellow')) return 'yellow';
    return 'red';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Pre-Mortem Decision Analyzer</h3>
            <p className="text-sm text-gray-600">Simulate future failures to avoid costly mistakes</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-700">
            <strong>How it works:</strong> Imagine your decision failed spectacularly. What went wrong? 
            This tool simulates potential failures <em>before</em> you make the choice, helping you avoid regrets.
          </p>
        </div>
      </div>

      {/* Quick Scenarios */}
      {showQuickPreMortem && (
        <div className="card">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Quick Pre-Mortem Scenarios
          </h4>
          <p className="text-sm text-gray-600 mb-4">Click for instant analysis of common college decisions:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickScenario('expensive-dream-school')}
              className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all"
            >
              <div className="font-semibold text-gray-900 mb-1">💸 Expensive Dream School</div>
              <div className="text-xs text-gray-600">"Should I take $150k in loans for my dream university?"</div>
            </button>

            <button
              onClick={() => handleQuickScenario('safe-but-boring')}
              className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all"
            >
              <div className="font-semibold text-gray-900 mb-1">😐 Safe But Uninspiring</div>
              <div className="text-xs text-gray-600">"Should I choose the safe option over my reach school?"</div>
            </button>

            <button
              onClick={() => handleQuickScenario('following-parents')}
              className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all"
            >
              <div className="font-semibold text-gray-900 mb-1">👨‍👩‍👧 Following Parents' Wishes</div>
              <div className="text-xs text-gray-600">"Should I major in what my parents want vs. what I want?"</div>
            </button>

            <button
              onClick={() => handleQuickScenario('chasing-prestige')}
              className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all"
            >
              <div className="font-semibold text-gray-900 mb-1">🏆 Chasing Prestige</div>
              <div className="text-xs text-gray-600">"Should I choose the prestigious school where I'll struggle?"</div>
            </button>
          </div>
        </div>
      )}

      {/* Decision Input Form */}
      <div className="card">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Your Pending Decision</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Decision Type</label>
            <select
              value={decision.type}
              onChange={(e) => setDecision({...decision, type: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select type...</option>
              <option value="college-choice">Which College to Attend</option>
              <option value="major-selection">Major Selection</option>
              <option value="financial">Financial/Loan Decision</option>
              <option value="career-path">Career Path</option>
              <option value="activity-choice">Extracurricular Choice</option>
              <option value="general">Other Important Decision</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Describe Your Decision
            </label>
            <textarea
              value={decision.description}
              onChange={(e) => setDecision({...decision, description: e.target.value})}
              placeholder="e.g., Should I attend Stanford with $120k in loans or UC Berkeley with only $20k in loans?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estimated Cost (if applicable)
              </label>
              <input
                type="number"
                value={decision.estimatedCost}
                onChange={(e) => setDecision({...decision, estimatedCost: parseInt(e.target.value) || 0})}
                placeholder="e.g., 50000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Days Until Deadline
              </label>
              <input
                type="number"
                value={decision.timeUntilDeadline || ''}
                onChange={(e) => setDecision({
                  ...decision, 
                  hasDeadline: true, 
                  timeUntilDeadline: parseInt(e.target.value) || null
                })}
                placeholder="e.g., 30"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-lg">
            {[
              { key: 'researchDone', label: 'Done thorough research' },
              { key: 'visitedCampus', label: 'Visited campus/location' },
              { key: 'consultedExperts', label: 'Consulted experts/mentors' },
              { key: 'financiallyViable', label: 'Financially viable' },
              { key: 'alignsWithGoals', label: 'Aligns with goals' },
              { key: 'significantDebt', label: 'Will require debt' },
              { key: 'familyOpposed', label: 'Family opposed' }
            ].map(item => (
              <label key={item.key} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={decision[item.key]}
                  onChange={(e) => setDecision({...decision, [item.key]: e.target.checked})}
                  className="w-4 h-4 text-red-600 focus:ring-red-500 rounded"
                />
                <span className="text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full btn-primary bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-5 h-5" />
            Run Pre-Mortem Analysis
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Overall Assessment */}
          <div className={`card border-2 border-${getRiskColor(analysis.overallRisk)}-400 bg-${getRiskColor(analysis.overallRisk)}-50`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900">Overall Risk Assessment</h4>
                <p className="text-sm text-gray-600 mt-1">{decision.description}</p>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold text-${getRiskColor(analysis.overallRisk)}-600`}>
                  {analysis.overallRisk}%
                </div>
                <div className="text-sm text-gray-600">Risk Score</div>
              </div>
            </div>

            <div className={`bg-white rounded-lg p-4 border-l-4 border-${getVerdictColor(analysis.recommendation.verdict)}-500`}>
              <div className="flex items-start gap-3">
                {analysis.recommendation.verdict.includes('Green') ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                ) : analysis.recommendation.verdict.includes('Yellow') ? (
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                )}
                <div>
                  <h5 className="font-bold text-gray-900 text-lg mb-2">{analysis.recommendation.verdict}</h5>
                  <p className="text-sm text-gray-700 mb-2">{analysis.recommendation.explanation}</p>
                  <p className="text-sm font-semibold text-gray-900">
                    <strong>Action:</strong> {analysis.recommendation.action}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Failure Scenarios */}
          <div className="card">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              Potential Failure Scenarios (Ranked by Risk)
            </h4>
            <div className="space-y-4">
              {analysis.failureScenarios.map((scenario, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-bold text-gray-900">{scenario.scenario}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          scenario.severity === 'Very High' ? 'bg-red-200 text-red-800' :
                          scenario.severity === 'High' ? 'bg-orange-200 text-orange-800' :
                          'bg-yellow-200 text-yellow-800'
                        }`}>
                          {scenario.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 italic mb-2">"{scenario.description}"</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-red-600">{scenario.probability}%</div>
                      <div className="text-xs text-gray-600">Probability</div>
                    </div>
                  </div>

                  <div className="bg-white rounded p-3 mb-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">💥 Consequences:</p>
                    <ul className="space-y-1">
                      {scenario.consequences.map((consequence, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span>{consequence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {scenario.timeframe}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warning Signs */}
          <div className="card bg-yellow-50 border-2 border-yellow-300">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Early Warning Signs to Watch For
            </h4>
            <div className="space-y-3">
              {analysis.warningsSigns.map((warning, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                  <h5 className="font-semibold text-gray-900 mb-1">🚨 {warning.sign}</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Meaning:</strong> {warning.meaning}
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>✓ Action:</strong> {warning.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Factors */}
          <div className="card">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-600" />
              Your Specific Risk Factors
            </h4>
            <div className="space-y-3">
              {analysis.riskFactors.map((factor, index) => (
                <div key={index} className={`rounded-lg p-4 border-l-4 ${
                  factor.level === 'Very High' ? 'bg-red-50 border-red-500' :
                  factor.level === 'High' ? 'bg-orange-50 border-orange-500' :
                  'bg-yellow-50 border-yellow-500'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-gray-900">{factor.category}</h5>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      factor.level === 'Very High' ? 'bg-red-200 text-red-800' :
                      factor.level === 'High' ? 'bg-orange-200 text-orange-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {factor.level} Risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{factor.risk}</p>
                  <p className="text-xs text-gray-600 italic">Impact: {factor.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mitigation Strategies */}
          <div className="card bg-green-50 border-2 border-green-300">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-green-600" />
              Mitigation Strategies
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              If you proceed with this decision, these strategies can reduce risk:
            </p>
            <div className="space-y-4">
              {analysis.mitigationStrategies.map((strategy, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                  <h5 className="font-bold text-gray-900 mb-2">💡 {strategy.strategy}</h5>
                  <p className="text-sm text-gray-700 mb-3">{strategy.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="bg-green-50 rounded p-2">
                      <p className="text-xs font-semibold text-green-700 mb-1">✓ Pros:</p>
                      <ul className="space-y-0.5">
                        {strategy.pros.map((pro, idx) => (
                          <li key={idx} className="text-xs text-gray-600">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 rounded p-2">
                      <p className="text-xs font-semibold text-red-700 mb-1">✗ Cons:</p>
                      <ul className="space-y-0.5">
                        {strategy.cons.map((con, idx) => (
                          <li key={idx} className="text-xs text-gray-600">• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600">
                    <strong>Effectiveness:</strong> {strategy.effectiveness}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Alternatives */}
          {analysis.alternativeOptions.length > 0 && (
            <div className="card bg-blue-50 border-2 border-blue-300">
              <h4 className="text-lg font-bold text-gray-900 mb-4">🔄 Alternative Options to Consider</h4>
              <div className="space-y-3">
                {analysis.alternativeOptions.map((alt, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <h5 className="font-semibold text-gray-900 mb-2">{alt.alternative}</h5>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Why consider:</strong> {alt.reason}
                    </p>
                    <p className="text-sm text-blue-700">
                      <strong>Best if:</strong> {alt.considerIf}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="card">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              Failure Timeline (If Things Go Wrong)
            </h4>
            <div className="space-y-3">
              {analysis.timeline.map((phase, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-24 text-sm font-semibold text-gray-700 flex-shrink-0">
                    {phase.phase}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded p-3 text-sm text-gray-700">
                    {phase.event}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="card bg-gradient-to-br from-gray-800 to-gray-900 text-white">
            <h4 className="text-xl font-bold mb-3">What Now?</h4>
            <p className="text-gray-200 mb-4">
              You've seen the potential failures. Now make an informed choice:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-semibold transition-all">
                Proceed with Confidence
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-3 rounded-lg font-semibold transition-all">
                Mitigate Risks First
              </button>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg font-semibold transition-all">
                Reconsider Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreMortemAnalyzer;
