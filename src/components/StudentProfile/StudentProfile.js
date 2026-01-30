import React, { useState } from 'react';
import { ArrowLeft, Save, FileDown, User, Sparkles } from 'lucide-react';
import { Header } from '../Common/Header';
import AcademicSection from './AcademicSection';
import ExtracurricularSection from './ExtracurricularSection';
import CharacterSection from './CharacterSection';
import MilestonesSection from './MilestonesSection';
import ProgressBar from '../Common/ProgressBar';
import AIAssistant from '../Common/AIAssistant';
import AIInsightsPanel from '../Common/AIInsightsPanel';
import CollegeScholarshipFinder from '../Common/CollegeScholarshipFinder';
import PreMortemAnalyzer from '../Common/PreMortemAnalyzer';
import { calculateCompletion } from '../../data/mockData';

const StudentProfile = ({ student: initialStudent, onBack, onSave, onExport, onLogoClick, onNavigateLanding }) => {
  const [student, setStudent] = useState(initialStudent || {
    name: '',
    grade: 9,
    email: '',
    academic: {},
    extracurricular: [],
    character: {},
    milestones: []
  });

  const [activeTab, setActiveTab] = useState('academic');
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleUpdate = (field, value) => {
    setStudent(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(student);
  };

  const completion = calculateCompletion(student);

  const tabs = [
    { id: 'academic', label: 'Academic Evolution', icon: '📚' },
    { id: 'extracurricular', label: 'Extracurricular Impact', icon: '⭐' },
    { id: 'character', label: 'Character & Skills', icon: '❤️' },
    { id: 'milestones', label: 'Milestones', icon: '🏆' },
    { id: 'ai-insights', label: 'AI Insights', icon: '🤖' },
    { id: 'college-finder', label: 'College & Scholarships', icon: '🎓' },
    { id: 'pre-mortem', label: 'Decision Autopsy', icon: '⚠️' }
  ];

  return (
    <>
      <Header onLogoClick={onLogoClick} onNavigateLanding={onNavigateLanding} />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="btn-secondary flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAIAssistant(true)} 
                className="btn-secondary flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4" />
                AI Advisor Chat
              </button>
              <button onClick={() => onExport(student)} className="btn-secondary flex items-center gap-2">
                <FileDown className="w-4 h-4" />
                Export PDF
              </button>
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Profile
              </button>
            </div>
          </div>

          {/* Student Info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl">
              {student.name ? student.name.split(' ').map(n => n[0]).join('') : <User className="w-8 h-8" />}
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Student Name</label>
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => handleUpdate('name', e.target.value)}
                    className="input-field mt-1"
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Grade</label>
                  <select
                    value={student.grade}
                    onChange={(e) => handleUpdate('grade', parseInt(e.target.value))}
                    className="input-field mt-1"
                  >
                    <option value={9}>Grade 9</option>
                    <option value={10}>Grade 10</option>
                    <option value={11}>Grade 11</option>
                    <option value={12}>Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Email</label>
                  <input
                    type="email"
                    value={student.email}
                    onChange={(e) => handleUpdate('email', e.target.value)}
                    className="input-field mt-1"
                    placeholder="student@school.edu"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md">
            <ProgressBar percentage={completion} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {activeTab === 'ai-insights' && (
            <AIInsightsPanel student={student} />
          )}
          {activeTab === 'college-finder' && (
            <CollegeScholarshipFinder student={student} />
          )}
          {activeTab === 'pre-mortem' && (
            <PreMortemAnalyzer student={student} />
          )}
          {activeTab === 'academic' && (
            <AcademicSection
              academic={student.academic}
              onUpdate={(value) => handleUpdate('academic', value)}
            />
          )}
          {activeTab === 'extracurricular' && (
            <ExtracurricularSection
              extracurricular={student.extracurricular}
              onUpdate={(value) => handleUpdate('extracurricular', value)}
            />
          )}
          {activeTab === 'character' && (
            <CharacterSection
              character={student.character}
              onUpdate={(value) => handleUpdate('character', value)}
            />
          )}
          {activeTab === 'milestones' && (
            <MilestonesSection
              milestones={student.milestones}
              onUpdate={(value) => handleUpdate('milestones', value)}
            />
          )}
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistant 
        student={student} 
        isOpen={showAIAssistant} 
        onClose={() => setShowAIAssistant(false)} 
      />
      </div>
    </>
  );
};

export default StudentProfile;
