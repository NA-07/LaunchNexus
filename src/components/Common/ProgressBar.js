import React from 'react';

const ProgressBar = ({ percentage, showLabel = true, size = 'md' }) => {
  const getColor = () => {
    if (percentage >= 80) return 'from-success-500 to-success-600';
    if (percentage >= 50) return 'from-primary-500 to-primary-600';
    if (percentage >= 25) return 'from-warning-500 to-warning-600';
    return 'from-red-500 to-red-600';
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Profile Completion</span>
          <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
        </div>
      )}
      <div className={`${heights[size]} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
