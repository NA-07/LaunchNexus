import React from 'react';
import { Sparkles, Plus, X } from 'lucide-react';

const ExtracurricularSection = ({ extracurricular, onUpdate }) => {
  const handleAdd = () => {
    onUpdate([
      ...(extracurricular || []),
      { activity: '', role: '', hours: 0, yearsInvolved: 1, impact: '' }
    ]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...(extracurricular || [])];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const handleRemove = (index) => {
    const updated = (extracurricular || []).filter((_, i) => i !== index);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Extracurricular Impact</h3>
          <p className="text-sm text-gray-600">Log roles, hours, and specific impact statements</p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button onClick={handleAdd} className="btn-secondary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Activity
        </button>
      </div>

      <div className="space-y-6">
        {(extracurricular || []).map((activity, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5 relative bg-white">
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Activity Name</label>
                <input
                  type="text"
                  value={activity.activity}
                  onChange={(e) => handleUpdate(index, 'activity', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Robotics Team"
                />
              </div>

              <div>
                <label className="label">Your Role</label>
                <input
                  type="text"
                  value={activity.role}
                  onChange={(e) => handleUpdate(index, 'role', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Team Captain"
                />
              </div>

              <div>
                <label className="label">Total Hours</label>
                <input
                  type="number"
                  min="0"
                  value={activity.hours}
                  onChange={(e) => handleUpdate(index, 'hours', parseInt(e.target.value) || 0)}
                  className="input-field"
                  placeholder="480"
                />
              </div>

              <div>
                <label className="label">Years Involved</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={activity.yearsInvolved}
                  onChange={(e) => handleUpdate(index, 'yearsInvolved', parseInt(e.target.value) || 1)}
                  className="input-field"
                  placeholder="3"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="label">Impact Statement</label>
              <textarea
                value={activity.impact}
                onChange={(e) => handleUpdate(index, 'impact', e.target.value)}
                className="input-field resize-none"
                rows="3"
                placeholder="Describe specific accomplishments and measurable impact (e.g., 'Raised $5,000 for charity' rather than just 'Member of club')"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Use numbers and specific achievements to make your impact stand out!
              </p>
            </div>
          </div>
        ))}
      </div>

      {(!extracurricular || extracurricular.length === 0) && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No extracurricular activities added yet.</p>
          <p className="text-sm text-gray-500">Click "Add Activity" to begin.</p>
        </div>
      )}
    </div>
  );
};

export default ExtracurricularSection;
