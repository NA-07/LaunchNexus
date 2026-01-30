import React from 'react';
import { Heart, Plus, X } from 'lucide-react';

const CharacterSection = ({ character, onUpdate }) => {
  const availableTraits = [
    'Leadership', 'Empathy', 'Perseverance', 'Integrity', 'Creativity',
    'Teamwork', 'Resilience', 'Communication', 'Dedication', 'Compassion',
    'Initiative', 'Humility', 'Curiosity', 'Passion', 'Responsibility'
  ];

  const handleAddObservation = () => {
    onUpdate({
      ...character,
      teacherObservations: [
        ...(character?.teacherObservations || []),
        { teacher: '', observation: '' }
      ]
    });
  };

  const handleUpdateObservation = (index, field, value) => {
    const updated = [...(character?.teacherObservations || [])];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate({ ...character, teacherObservations: updated });
  };

  const handleRemoveObservation = (index) => {
    const updated = (character?.teacherObservations || []).filter((_, i) => i !== index);
    onUpdate({ ...character, teacherObservations: updated });
  };

  const handleAddPeerFeedback = () => {
    onUpdate({
      ...character,
      peerFeedback: [
        ...(character?.peerFeedback || []),
        { context: '', feedback: '' }
      ]
    });
  };

  const handleUpdatePeerFeedback = (index, field, value) => {
    const updated = [...(character?.peerFeedback || [])];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate({ ...character, peerFeedback: updated });
  };

  const handleRemovePeerFeedback = (index) => {
    const updated = (character?.peerFeedback || []).filter((_, i) => i !== index);
    onUpdate({ ...character, peerFeedback: updated });
  };

  const handleToggleTrait = (trait) => {
    const currentTraits = character?.traits || [];
    const updated = currentTraits.includes(trait)
      ? currentTraits.filter(t => t !== trait)
      : [...currentTraits, trait];
    onUpdate({ ...character, traits: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
          <Heart className="w-5 h-5 text-pink-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Character & Soft Skills</h3>
          <p className="text-sm text-gray-600">Teacher observations and peer feedback</p>
        </div>
      </div>

      {/* Character Traits */}
      <div>
        <label className="label">Character Traits</label>
        <div className="flex flex-wrap gap-2">
          {availableTraits.map(trait => (
            <button
              key={trait}
              onClick={() => handleToggleTrait(trait)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                (character?.traits || []).includes(trait)
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {trait}
            </button>
          ))}
        </div>
      </div>

      {/* Teacher Observations */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="label mb-0">Teacher Observations</label>
          <button onClick={handleAddObservation} className="btn-secondary text-sm py-2 px-4">
            + Add Observation
          </button>
        </div>

        <div className="space-y-4">
          {(character?.teacherObservations || []).map((obs, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 relative bg-white">
              <button
                onClick={() => handleRemoveObservation(index)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-3">
                <label className="label">Teacher Name & Subject</label>
                <input
                  type="text"
                  value={obs.teacher}
                  onChange={(e) => handleUpdateObservation(index, 'teacher', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Ms. Johnson (Physics)"
                />
              </div>

              <div>
                <label className="label">Observation</label>
                <textarea
                  value={obs.observation}
                  onChange={(e) => handleUpdateObservation(index, 'observation', e.target.value)}
                  className="input-field resize-none"
                  rows="3"
                  placeholder="Brief description of student's character, work ethic, or soft skills..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Peer Feedback */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="label mb-0">Peer Feedback (Optional)</label>
          <button onClick={handleAddPeerFeedback} className="btn-secondary text-sm py-2 px-4">
            + Add Feedback
          </button>
        </div>

        <div className="space-y-4">
          {(character?.peerFeedback || []).map((feedback, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 relative bg-white">
              <button
                onClick={() => handleRemovePeerFeedback(index)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-3">
                <label className="label">Context</label>
                <input
                  type="text"
                  value={feedback.context}
                  onChange={(e) => handleUpdatePeerFeedback(index, 'context', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Group Project, Team Activity"
                />
              </div>

              <div>
                <label className="label">Feedback</label>
                <textarea
                  value={feedback.feedback}
                  onChange={(e) => handleUpdatePeerFeedback(index, 'feedback', e.target.value)}
                  className="input-field resize-none"
                  rows="2"
                  placeholder="What peers said about working with this student..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterSection;
