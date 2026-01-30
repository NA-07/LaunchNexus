import React from 'react';
import { Trophy, Plus, X } from 'lucide-react';
import { format } from 'date-fns';

const MilestonesSection = ({ milestones, onUpdate }) => {
  const handleAdd = () => {
    onUpdate([
      ...(milestones || []),
      { date: '', type: 'Award', title: '', description: '' }
    ]);
  };

  const handleUpdateMilestone = (index, field, value) => {
    const updated = [...(milestones || [])];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const handleRemove = (index) => {
    const updated = (milestones || []).filter((_, i) => i !== index);
    onUpdate(updated);
  };

  const sortedMilestones = [...(milestones || [])].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const getTypeColor = (type) => {
    switch (type) {
      case 'Award': return 'bg-yellow-100 text-yellow-800';
      case 'Certification': return 'bg-blue-100 text-blue-800';
      case 'Project': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Trophy className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Milestones</h3>
          <p className="text-sm text-gray-600">Chronological timeline of awards, certifications, and projects</p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button onClick={handleAdd} className="btn-secondary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Milestone
        </button>
      </div>

      <div className="space-y-4">
        {sortedMilestones.map((milestone, index) => {
          const actualIndex = (milestones || []).findIndex(m => m === milestone);
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-5 relative bg-white">
              <button
                onClick={() => handleRemove(actualIndex)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Date</label>
                  <input
                    type="date"
                    value={milestone.date}
                    onChange={(e) => handleUpdateMilestone(actualIndex, 'date', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Type</label>
                  <select
                    value={milestone.type}
                    onChange={(e) => handleUpdateMilestone(actualIndex, 'type', e.target.value)}
                    className="input-field"
                  >
                    <option value="Award">Award</option>
                    <option value="Certification">Certification</option>
                    <option value="Project">Project</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="label">Title</label>
                <input
                  type="text"
                  value={milestone.title}
                  onChange={(e) => handleUpdateMilestone(actualIndex, 'title', e.target.value)}
                  className="input-field"
                  placeholder="e.g., National Merit Semifinalist"
                />
              </div>

              <div className="mt-4">
                <label className="label">Description</label>
                <textarea
                  value={milestone.description}
                  onChange={(e) => handleUpdateMilestone(actualIndex, 'description', e.target.value)}
                  className="input-field resize-none"
                  rows="2"
                  placeholder="Brief description of the achievement..."
                />
              </div>

              <div className="mt-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(milestone.type)}`}>
                  {milestone.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {(!milestones || milestones.length === 0) && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No milestones added yet.</p>
          <p className="text-sm text-gray-500">Click "Add Milestone" to begin.</p>
        </div>
      )}
    </div>
  );
};

export default MilestonesSection;
