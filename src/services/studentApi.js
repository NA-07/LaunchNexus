// API service for student CRUD operations with Clerk authentication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Helper to get auth headers
const getAuthHeaders = async (getToken) => {
  const token = await getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Fetch all students for the authenticated user
export const fetchStudents = async (getToken) => {
  const headers = await getAuthHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/students`, { headers });
  
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  
  return response.json();
};

// Fetch a single student by ID
export const fetchStudentById = async (getToken, studentId) => {
  const headers = await getAuthHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/students/${studentId}`, { headers });
  
  if (!response.ok) {
    throw new Error('Failed to fetch student');
  }
  
  return response.json();
};

// Create a new student
export const createStudent = async (getToken, studentData) => {
  const headers = await getAuthHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers,
    body: JSON.stringify(studentData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create student');
  }
  
  return response.json();
};

// Update an existing student
export const updateStudent = async (getToken, studentId, studentData) => {
  const headers = await getAuthHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(studentData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update student');
  }
  
  return response.json();
};

// Delete a student
export const deleteStudent = async (getToken, studentId) => {
  const headers = await getAuthHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
    method: 'DELETE',
    headers
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete student');
  }
  
  return response.json();
};

// Add a milestone to a student
export const addMilestone = async (getToken, studentId, milestoneData) => {
  const headers = await getAuthHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/students/${studentId}/milestones`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(milestoneData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add milestone');
  }
  
  return response.json();
};

// Search students
export const searchStudents = async (getToken, query) => {
  const headers = await getAuthHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/students/search/${encodeURIComponent(query)}`, { headers });
  
  if (!response.ok) {
    throw new Error('Failed to search students');
  }
  
  return response.json();
};

// Default empty student template for new students
export const getEmptyStudentTemplate = () => ({
  name: '',
  grade: 9,
  email: '',
  photo: null,
  academic: {
    gpa: 0,
    gpaHistory: [],
    courses: [],
    testScores: {
      sat: null,
      act: null,
      apExams: []
    }
  },
  extracurricular: [],
  character: {
    teacherObservations: [],
    peerFeedback: [],
    traits: []
  },
  milestones: [],
  notes: ''
});
