import React, { useState, useMemo } from 'react';
import { Plus, Users, TrendingUp, Award, Sparkles, Brain } from 'lucide-react';
import { Header } from '../Common/Header';
import StudentCard from './StudentCard';
import SearchBar from '../Common/SearchBar';
import { 
  mockStudents, 
  calculateCompletion, 
  getLeadershipScore, 
  getCommunityServiceScore, 
  getAcademicScore 
} from '../../data/mockData';
import { generateAIInsights } from '../../utils/aiInsights';

const Dashboard = ({ onSelectStudent, onAddStudent, onLogoClick, onNavigateLanding }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = mockStudents.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toString().includes(searchTerm)
    );

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'completion':
          return calculateCompletion(b) - calculateCompletion(a);
        case 'leadership':
          return getLeadershipScore(b) - getLeadershipScore(a);
        case 'communityService':
          return getCommunityServiceScore(b) - getCommunityServiceScore(a);
        case 'academic':
          return getAcademicScore(b) - getAcademicScore(a);
        case 'grade':
          return b.grade - a.grade;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchTerm, sortBy]);

  const stats = useMemo(() => {
    const totalStudents = mockStudents.length;
    const avgCompletion = Math.round(
      mockStudents.reduce((sum, s) => sum + calculateCompletion(s), 0) / totalStudents
    );
    const completeProfiles = mockStudents.filter(s => calculateCompletion(s) >= 80).length;
    
    // AI-powered insights
    const studentsWithInsights = mockStudents.map(s => ({
      ...s,
      aiInsights: generateAIInsights(s)
    }));
    
    const avgAIScore = Math.round(
      studentsWithInsights.reduce((sum, s) => sum + s.aiInsights.overallScore, 0) / totalStudents
    );
    
    const topPerformers = studentsWithInsights.filter(s => s.aiInsights.overallScore >= 80).length;
    
    const needsAttention = studentsWithInsights.filter(s => 
      s.aiInsights.growthOpportunities.filter(opp => opp.priority === 'high').length >= 2
    ).length;
    
    return { totalStudents, avgCompletion, completeProfiles, avgAIScore, topPerformers, needsAttention };
  }, []);

  return (
    <>
      <Header onLogoClick={onLogoClick} onNavigateLanding={onNavigateLanding} />
      <div className="min-h-screen bg-gray-50 p-6 pt-24">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Growth & Impact Tracker</h1>
          <p className="text-gray-600">Monitor student progress and prepare college-ready profiles</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Completion</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgCompletion}%</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Complete Profiles</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completeProfiles}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>

        {/* AI-Powered Insights Cards */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                AI-Powered Analytics
                <Sparkles className="w-4 h-4 text-purple-600" />
              </h3>
              <p className="text-sm text-gray-600">Real-time intelligence on student cohort</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Avg. AI Score</p>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-600">{stats.avgAIScore}</p>
              <p className="text-xs text-gray-500 mt-1">Out of 100</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Top Performers</p>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600">{stats.topPerformers}</p>
              <p className="text-xs text-gray-500 mt-1">Score 80+</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Need Support</p>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-orange-600">{stats.needsAttention}</p>
              <p className="text-xs text-gray-500 mt-1">High-priority gaps</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Add New Student Button */}
        <div className="mb-6">
          <button onClick={onAddStudent} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Student
          </button>
        </div>

        {/* Student Grid */}
        {filteredAndSortedStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedStudents.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                completion={calculateCompletion(student)}
                onSelect={onSelectStudent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
