import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import Landing from './pages/Landing';
import GetStarted from './pages/GetStarted';
import Dashboard from './pages/Dashboard';
import StudentProfile from './components/StudentProfile/StudentProfile';
import CollegeScholarshipFinder from './components/Common/CollegeScholarshipFinder';
import { generatePDF } from './utils/pdfExport';
import { 
  fetchStudents, 
  createStudent, 
  updateStudent, 
  deleteStudent,
  getEmptyStudentTemplate 
} from './services/studentApi';

// Map hash values to view names
const hashToView = {
  '#dashboard': 'dashboard',
  '#getstarted': 'getstarted',
  '#profile': 'profile',
};

function App() {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  
  // Initialize view based on current hash
  const getInitialView = () => {
    const hash = window.location.hash;
    return hashToView[hash] || 'landing';
  };

  const [view, setView] = useState(getInitialView); // 'landing', 'getstarted', 'dashboard', 'profile', or 'college'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const newView = hashToView[hash];
      if (newView) {
        setView(newView);
      } else if (!hash || hash === '' || hash === '#') {
        setView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch students when user is signed in and on dashboard
  useEffect(() => {
    if (isLoaded && isSignedIn && view === 'dashboard') {
      loadStudents();
    }
  }, [isLoaded, isSignedIn, view]);

  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStudents(getToken);
      setStudents(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setView('profile');
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setView('profile');
  };

  const handleBack = () => {
    setView('dashboard');
    setSelectedStudent(null);
  };

  const handleGoToDashboard = () => {
    window.location.hash = '#dashboard';
  };

  const handleGoToGetStarted = () => {
    window.location.hash = '#getstarted';
  };

  const handleGoToCollege = () => {
    window.location.hash = '#dashboard';
  };

  const handleGoHome = () => {
    window.location.hash = '';
    setView('landing');
    setSelectedStudent(null);
  };

  const handleSave = async (studentData) => {
    try {
      if (selectedStudent && selectedStudent._id) {
        // Update existing student
        const updated = await updateStudent(getToken, selectedStudent._id, studentData);
        setStudents(prev => prev.map(s => s._id === updated._id ? updated : s));
        alert('Student profile updated successfully!');
      } else {
        // Create new student
        const created = await createStudent(getToken, studentData);
        setStudents(prev => [...prev, created]);
        alert('Student profile created successfully!');
      }
      setView('dashboard');
    } catch (err) {
      console.error('Error saving student:', err);
      alert(`Error saving student: ${err.message}`);
    }
  };

  const handleDelete = async (studentId) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    try {
      await deleteStudent(getToken, studentId);
      setStudents(prev => prev.filter(s => s._id !== studentId));
      alert('Student deleted successfully!');
      setView('dashboard');
    } catch (err) {
      console.error('Error deleting student:', err);
      alert(`Error deleting student: ${err.message}`);
    }
  };

  const handleExport = async (student) => {
    try {
      await generatePDF(student);
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="App">
      {view === 'landing' ? (
        <Landing onGetStarted={handleGoToGetStarted} onLogoClick={handleGoHome} />
      ) : view === 'getstarted' ? (
        <GetStarted onLogoClick={handleGoHome} onNavigateLanding={handleGoHome} onGoToDashboard={handleGoToDashboard} />
      ) : view === 'dashboard' ? (
        <SignedIn>
          <Dashboard
            students={students}
            loading={loading}
            error={error}
            onRefresh={loadStudents}
            onSelectStudent={handleSelectStudent}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDelete}
            onLogoClick={handleGoHome}
            onNavigateLanding={handleGoHome}
          />
        </SignedIn>
      ) : view === 'college' ? (
        <CollegeScholarshipFinder student={selectedStudent} onLogoClick={handleGoHome} />
      ) : (
        <SignedIn>
          <StudentProfile
            student={selectedStudent || getEmptyStudentTemplate()}
            isNew={!selectedStudent}
            onBack={handleBack}
            onSave={handleSave}
            onDelete={selectedStudent ? () => handleDelete(selectedStudent._id) : null}
            onExport={handleExport}
            onLogoClick={handleGoHome}
            onNavigateLanding={handleGoHome}
          />
        </SignedIn>
      )}
      
      {/* Redirect to sign in for protected views */}
      {(view === 'dashboard' || view === 'profile') && (
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      )}
    </div>
  );
}

export default App;
