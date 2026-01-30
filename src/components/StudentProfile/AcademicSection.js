import React from 'react';
import { TrendingUp, BookOpen, Award } from 'lucide-react';

const AcademicSection = ({ academic, onUpdate }) => {
  const handleCGPAChange = (e) => {
    onUpdate({
      ...academic,
      cgpa: parseFloat(e.target.value) || 0
    });
  };

  const handleBoardPercentageChange = (e) => {
    onUpdate({
      ...academic,
      boardPercentage: parseFloat(e.target.value) || 0
    });
  };

  const handleCourseAdd = () => {
    onUpdate({
      ...academic,
      courses: [...(academic?.courses || []), { name: '', grade: '', rigor: 'Regular' }]
    });
  };

  const handleCourseUpdate = (index, field, value) => {
    const updatedCourses = [...(academic?.courses || [])];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    onUpdate({ ...academic, courses: updatedCourses });
  };

  const handleCourseRemove = (index) => {
    const updatedCourses = (academic?.courses || []).filter((_, i) => i !== index);
    onUpdate({ ...academic, courses: updatedCourses });
  };

  const handleTestScoreUpdate = (examType, field, value) => {
    onUpdate({
      ...academic,
      testScores: {
        ...(academic?.testScores || {}),
        [examType]: {
          ...(academic?.testScores?.[examType] || {}),
          [field]: value ? parseFloat(value) : null
        }
      }
    });
  };

  const handleOlympiadAdd = () => {
    const currentOlympiads = academic?.testScores?.olympiads || [];
    onUpdate({
      ...academic,
      testScores: {
        ...(academic?.testScores || {}),
        olympiads: [...currentOlympiads, { subject: '', level: 'School', rank: null, qualified: false }]
      }
    });
  };

  const handleOlympiadUpdate = (index, field, value) => {
    const updatedOlympiads = [...(academic?.testScores?.olympiads || [])];
    updatedOlympiads[index] = { ...updatedOlympiads[index], [field]: value };
    onUpdate({
      ...academic,
      testScores: {
        ...(academic?.testScores || {}),
        olympiads: updatedOlympiads
      }
    });
  };

  const handleOlympiadRemove = (index) => {
    const updatedOlympiads = (academic?.testScores?.olympiads || []).filter((_, i) => i !== index);
    onUpdate({
      ...academic,
      testScores: {
        ...(academic?.testScores || {}),
        olympiads: updatedOlympiads
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Academic Performance</h3>
          <p className="text-sm text-gray-600">Track CGPA, board marks, and entrance exam scores</p>
        </div>
      </div>

      {/* CGPA and Board Percentage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">Current CGPA (out of 10)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={academic?.cgpa || ''}
            onChange={handleCGPAChange}
            className="input-field"
            placeholder="9.5"
          />
        </div>
        <div>
          <label className="label">Board Percentage (%)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={academic?.boardPercentage || ''}
            onChange={handleBoardPercentageChange}
            className="input-field"
            placeholder="95.4"
          />
        </div>
        <div>
          <label className="label">Board Type</label>
          <select
            value={academic?.boardType || 'CBSE'}
            onChange={(e) => onUpdate({ ...academic, boardType: e.target.value })}
            className="input-field"
          >
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State Board">State Board</option>
            <option value="IB">IB</option>
            <option value="Cambridge">Cambridge (IGCSE)</option>
          </select>
        </div>
      </div>

      {/* Academic Standing Display */}
      {academic?.cgpa && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Academic Standing</span>
          </div>
          <p className="text-sm text-gray-700">
            CGPA of <span className="font-bold text-blue-600">{academic.cgpa}</span>
            {academic.cgpa >= 9.5 && <span className="text-green-600 ml-2">(Outstanding - Top Tier Eligible)</span>}
            {academic.cgpa >= 9.0 && academic.cgpa < 9.5 && <span className="text-green-600 ml-2">(Excellent - Competitive)</span>}
            {academic.cgpa >= 8.0 && academic.cgpa < 9.0 && <span className="text-blue-600 ml-2">(Very Good)</span>}
            {academic.cgpa < 8.0 && <span className="text-orange-600 ml-2">(Room for Improvement)</span>}
          </p>
        </div>
      )}

      {/* Entrance Exam Scores */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Entrance Exam Scores
        </h4>
        
        {/* JEE Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="col-span-2">
            <label className="label text-blue-700">JEE Main (for IITs/NITs/IIITs)</label>
          </div>
          <div>
            <label className="label text-sm">Percentile</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={academic?.testScores?.jeeMain?.percentile || ''}
              onChange={(e) => handleTestScoreUpdate('jeeMain', 'percentile', e.target.value)}
              className="input-field"
              placeholder="99.2"
            />
          </div>
          <div>
            <label className="label text-sm">Score (out of 300)</label>
            <input
              type="number"
              min="0"
              max="300"
              value={academic?.testScores?.jeeMain?.score || ''}
              onChange={(e) => handleTestScoreUpdate('jeeMain', 'score', e.target.value)}
              className="input-field"
              placeholder="285"
            />
          </div>
        </div>

        {/* JEE Advanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="col-span-2">
            <label className="label text-purple-700">JEE Advanced (for IITs only)</label>
          </div>
          <div>
            <label className="label text-sm">All India Rank</label>
            <input
              type="number"
              min="1"
              value={academic?.testScores?.jeeAdvanced?.rank || ''}
              onChange={(e) => handleTestScoreUpdate('jeeAdvanced', 'rank', e.target.value)}
              className="input-field"
              placeholder="850"
            />
          </div>
          <div>
            <label className="label text-sm">Score (out of 360)</label>
            <input
              type="number"
              min="0"
              max="360"
              value={academic?.testScores?.jeeAdvanced?.score || ''}
              onChange={(e) => handleTestScoreUpdate('jeeAdvanced', 'score', e.target.value)}
              className="input-field"
              placeholder="195"
            />
          </div>
        </div>

        {/* NEET */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="col-span-2">
            <label className="label text-green-700">NEET (for Medical Colleges)</label>
          </div>
          <div>
            <label className="label text-sm">Score (out of 720)</label>
            <input
              type="number"
              min="0"
              max="720"
              value={academic?.testScores?.neet?.score || ''}
              onChange={(e) => handleTestScoreUpdate('neet', 'score', e.target.value)}
              className="input-field"
              placeholder="695"
            />
          </div>
          <div>
            <label className="label text-sm">Percentile</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={academic?.testScores?.neet?.percentile || ''}
              onChange={(e) => handleTestScoreUpdate('neet', 'percentile', e.target.value)}
              className="input-field"
              placeholder="99.85"
            />
          </div>
        </div>
      </div>

      {/* Olympiads */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="label mb-0">Olympiad Participation</label>
          <button onClick={handleOlympiadAdd} className="btn-secondary text-sm py-2 px-4">
            + Add Olympiad
          </button>
        </div>

        <div className="space-y-3">
          {(academic?.testScores?.olympiads || []).map((olympiad, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-end bg-yellow-50 p-3 rounded-lg">
              <div className="col-span-4">
                <label className="label text-xs">Subject/Exam</label>
                <select
                  value={olympiad.subject}
                  onChange={(e) => handleOlympiadUpdate(index, 'subject', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Exam</option>
                  <option value="Mathematics (RMO)">Mathematics (RMO)</option>
                  <option value="Mathematics (INMO)">Mathematics (INMO)</option>
                  <option value="Physics (NSEP)">Physics (NSEP)</option>
                  <option value="Physics (INPhO)">Physics (INPhO)</option>
                  <option value="Chemistry (NSEC)">Chemistry (NSEC)</option>
                  <option value="Chemistry (INChO)">Chemistry (INChO)</option>
                  <option value="Biology (NSEB)">Biology (NSEB)</option>
                  <option value="Biology (INBO)">Biology (INBO)</option>
                  <option value="Astronomy (NSEA)">Astronomy (NSEA)</option>
                  <option value="Informatics (ZIO)">Informatics (ZIO)</option>
                  <option value="Informatics (INOI)">Informatics (INOI)</option>
                </select>
              </div>
              <div className="col-span-3">
                <label className="label text-xs">Level</label>
                <select
                  value={olympiad.level}
                  onChange={(e) => handleOlympiadUpdate(index, 'level', e.target.value)}
                  className="input-field"
                >
                  <option value="School">School</option>
                  <option value="Regional">Regional</option>
                  <option value="State">State</option>
                  <option value="National">National</option>
                  <option value="International">International</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="label text-xs">Rank</label>
                <input
                  type="number"
                  min="1"
                  value={olympiad.rank || ''}
                  onChange={(e) => handleOlympiadUpdate(index, 'rank', parseInt(e.target.value) || null)}
                  className="input-field"
                  placeholder="15"
                />
              </div>
              <div className="col-span-2 flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={olympiad.qualified || false}
                    onChange={(e) => handleOlympiadUpdate(index, 'qualified', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Qualified</span>
                </label>
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => handleOlympiadRemove(index)}
                  className="w-full h-10 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {(!academic?.testScores?.olympiads || academic.testScores.olympiads.length === 0) && (
          <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
            No olympiad participation added yet. Olympiad achievements strengthen your profile significantly!
          </p>
        )}
      </div>

      {/* Current Courses */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="label mb-0">Current Subjects</label>
          <button onClick={handleCourseAdd} className="btn-secondary text-sm py-2 px-4">
            + Add Subject
          </button>
        </div>

        <div className="space-y-3">
          {(academic?.courses || []).map((course, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-5">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => handleCourseUpdate(index, 'name', e.target.value)}
                  className="input-field"
                  placeholder="Subject Name (e.g., Physics)"
                />
              </div>
              <div className="col-span-3">
                <select
                  value={course.rigor}
                  onChange={(e) => handleCourseUpdate(index, 'rigor', e.target.value)}
                  className="input-field"
                >
                  <option value="Regular">Regular</option>
                  <option value="Science Stream">Science (PCM/PCB)</option>
                  <option value="Commerce Stream">Commerce</option>
                  <option value="Humanities">Humanities/Arts</option>
                  <option value="Core">Core Subject</option>
                </select>
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  value={course.grade}
                  onChange={(e) => handleCourseUpdate(index, 'grade', e.target.value)}
                  className="input-field"
                  placeholder="Grade (A+, A, B+)"
                />
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => handleCourseRemove(index)}
                  className="w-full h-10 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {(!academic?.courses || academic.courses.length === 0) && (
          <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
            No subjects added yet. Click "Add Subject" to begin.
          </p>
        )}
      </div>
    </div>
  );
};

export default AcademicSection;
