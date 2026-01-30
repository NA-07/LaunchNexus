import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search students by name, email, or grade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="text-gray-400 w-5 h-5" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field w-full sm:w-auto"
        >
          <option value="name">Sort by Name</option>
          <option value="completion">Sort by Completion</option>
          <option value="leadership">Sort by Leadership</option>
          <option value="communityService">Sort by Community Service</option>
          <option value="academic">Sort by Academic Excellence</option>
          <option value="grade">Sort by Grade</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
