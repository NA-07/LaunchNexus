import React from 'react';
import { User, Mail, GraduationCap, ArrowRight, Trash2 } from 'lucide-react';
import ProgressBar from '../Common/ProgressBar';

const StudentCard = ({ student, completion, onSelect, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering onSelect
    if (onDelete) {
      onDelete(student._id || student.id);
    }
  };

  return (
    <div className="card cursor-pointer group relative" onClick={() => onSelect(student)}>
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          title="Delete student"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-lg">
            {student.name ? student.name.split(' ').map(n => n[0]).join('') : '?'}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {student.name || 'Unnamed Student'}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <GraduationCap className="w-4 h-4" />
              <span>Grade {student.grade || 'N/A'}</span>
            </div>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all mr-8" />
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Mail className="w-4 h-4" />
        <span>{student.email || 'No email'}</span>
      </div>

      <ProgressBar percentage={completion} size="md" />

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500">CGPA</p>
            <p className="text-sm font-semibold text-gray-900">{student.academic?.cgpa?.toFixed(1) || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Activities</p>
            <p className="text-sm font-semibold text-gray-900">{student.extracurricular?.length || 0}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Milestones</p>
            <p className="text-sm font-semibold text-gray-900">{student.milestones?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
