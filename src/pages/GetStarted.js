import React from 'react';
import { Header } from '../components/Common/Header';
import { Brain, Lightbulb, Target, Zap } from 'lucide-react';

export default function GetStarted({ onLogoClick, onNavigateLanding, onGoToDashboard }) {
  return (
    <>
      <Header onLogoClick={onLogoClick} onNavigateLanding={onNavigateLanding} />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              AI-Powered Career & Major Guidance
            </h1>
            <p className="text-xl text-gray-600">
              Discover how PathFinder uses advanced AI to help students find their perfect career path
            </p>
          </div>

          {/* Two Main Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Card 1: AI Suggestion */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI-Powered Career Matching</h2>
                  <p className="text-sm text-gray-600 mt-1">Intelligent recommendations based on student data</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our advanced AI engine analyzes each student's unique profile including:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Academic Performance:</strong> GPA, test scores, and subject strengths</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Interests & Passions:</strong> Declared interests and career aspirations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Extracurricular Engagement:</strong> Sports, clubs, leadership roles, and community service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Personal Characteristics:</strong> Work style preferences and personality traits</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed pt-4">
                  Based on this comprehensive analysis, PathFinder generates personalized career and major recommendations that align with each student's unique strengths and aspirations.
                </p>
              </div>
            </div>

            {/* Card 2: Discovery & Exposure */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-600">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Career Discovery & Exploration</h2>
                  <p className="text-sm text-gray-600 mt-1">Broaden horizons with career options they haven't considered</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Many students have limited exposure to the full range of career possibilities. PathFinder helps by:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Expanding Perspectives:</strong> Introducing careers that align with their profile but may not be on their radar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Breaking Stereotypes:</strong> Showing non-traditional paths and diverse career options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Detailed Insights:</strong> Providing information about job growth, salary ranges, and required education</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Skill Mapping:</strong> Showing how their current skills and interests transfer to new career fields</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed pt-4">
                  This exposure helps students make more informed decisions about their future and increases their confidence in pursuing their chosen path.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Benefits for Students</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Personalized Guidance</h4>
                <p className="text-gray-700">
                  Get career and major recommendations tailored to your unique profile, not generic suggestions.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Increased Confidence</h4>
                <p className="text-gray-700">
                  Make college and career decisions with confidence backed by comprehensive AI analysis.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Broader Horizons</h4>
                <p className="text-gray-700">
                  Discover career opportunities you may not have known existed, expanding your possibilities.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-8">
              Begin your journey of discovery with PathFinder's AI-powered guidance.
            </p>
            <button
              onClick={onGoToDashboard}
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Explore Student Profiles
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
