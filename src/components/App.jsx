import React, { useState, useEffect } from 'react';
import { Book, BarChart2, Users, User, Brain } from 'lucide-react';
import Homepage from './Homepage';
import Onboarding from './Onboarding';
import SubjectScreen from './SubjectScreen';
import ProfileScreen from './ProfileScreen';
import GroupsScreen from './GroupsScreen';
import LearningProgress from './learning/LearningProgress';

const App = () => {
  // Core state management
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [screenHistory, setScreenHistory] = useState(['onboarding']);
  
  // User data and preferences
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    grade: '',
    subjects: [],
    lastLogin: null,
    studyStreak: 0
  });

  // Learning style and preferences
  const [learningStyle, setLearningStyle] = useState({
    type: '',
    icon: '',
    description: '',
    preferences: {
      timeOfDay: '',
      sessionLength: '',
      approachStyle: ''
    }
  });

  // Load saved data on initial mount
  useEffect(() => {
    const savedData = localStorage.getItem('study_buddy_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setUserData(parsedData.userData || {});
        setLearningStyle(parsedData.learningStyle || {});
        if (parsedData.userData?.name) {
          setCurrentScreen('dashboard');
          setScreenHistory(['dashboard']);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (userData.name || learningStyle.type) {
      try {
        localStorage.setItem('study_buddy_data', JSON.stringify({
          userData: {
            ...userData,
            lastLogin: new Date().toISOString()
          },
          learningStyle
        }));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  }, [userData, learningStyle]);

  // Study streak calculation
  useEffect(() => {
    if (userData.lastLogin) {
      const lastLogin = new Date(userData.lastLogin);
      const today = new Date();
      const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        setUserData(prev => ({
          ...prev,
          studyStreak: prev.studyStreak + 1
        }));
      } else if (diffDays > 1) {
        setUserData(prev => ({
          ...prev,
          studyStreak: 0
        }));
      }
    }
  }, [userData.lastLogin]);

  // Navigation handlers
  const handleNavigation = (screen) => {
    console.log('Navigating to:', screen);
    setScreenHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = screenHistory.slice(0, -1);
      setScreenHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    }
  };

  const handleQuizComplete = (style) => {
    console.log('Quiz completed, setting learning style');
    setLearningStyle(style);
    handleNavigation('dashboard');
  };

  const handleUserDataSubmit = (data) => {
    console.log('Setting user data:', data);
    setUserData(prev => ({
      ...prev,
      ...data,
      lastLogin: new Date().toISOString(),
      studyStreak: 1
    }));
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    handleNavigation('subject');
  };

  const handleLogout = () => {
    localStorage.removeItem('study_buddy_data');
    setCurrentScreen('onboarding');
    setScreenHistory(['onboarding']);
    setUserData({
      name: '',
      age: '',
      grade: '',
      subjects: [],
      lastLogin: null,
      studyStreak: 0
    });
    setLearningStyle({
      type: '',
      icon: '',
      description: '',
      preferences: {}
    });
  };

  // Screen renderer
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return (
          <Onboarding 
            onQuizComplete={handleQuizComplete}
            onUserDataSubmit={handleUserDataSubmit}
          />
        );
      
      case 'dashboard':
        return (
          <Homepage 
            learningStyle={learningStyle}
            userData={userData}
            onSubjectSelect={handleSubjectSelect}
            onNavigate={handleNavigation}
          />
        );
      
      case 'subject':
        return (
          <SubjectScreen 
            subject={selectedSubject}
            onBack={handleBack}
            userData={userData}
          />
        );
      
      case 'groups':
        return (
          <GroupsScreen 
            userData={userData}
            onNavigate={handleNavigation}
          />
        );
      
      case 'stats':
        return (
          <LearningProgress 
            userData={userData}
            onNavigate={handleNavigation}
          />
        );
      
      case 'profile':
        return (
          <ProfileScreen 
            userData={userData}
            learningStyle={learningStyle}
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />
        );
      
      default:
        return <Homepage />;
    }
  };

  // Determine if navigation should be shown
  const showNavigation = currentScreen !== 'onboarding';
  const showBackButton = currentScreen !== 'dashboard' && currentScreen !== 'onboarding';

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Main Content */}
      <div className={`${showNavigation ? 'pb-20' : ''}`}>
        {renderCurrentScreen()}
      </div>
      
      {/* Bottom Navigation */}
      {showNavigation && (
        <nav className="fixed bottom-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t dark:border-gray-700 z-40">
          <div className="flex justify-around p-4 max-w-lg mx-auto">
            <button 
              onClick={() => handleNavigation('dashboard')}
              className={`${currentScreen === 'dashboard' ? 'text-purple-600' : 'text-gray-400'} hover:text-purple-600 transition-colors`}
            >
              <Book size={24} />
            </button>
            <button 
              onClick={() => handleNavigation('stats')}
              className={`${currentScreen === 'stats' ? 'text-purple-600' : 'text-gray-400'} hover:text-purple-600 transition-colors`}
            >
              <BarChart2 size={24} />
            </button>
            <button 
              onClick={() => handleNavigation('groups')}
              className={`${currentScreen === 'groups' ? 'text-purple-600' : 'text-gray-400'} hover:text-purple-600 transition-colors`}
            >
              <Users size={24} />
            </button>
            <button 
              onClick={() => handleNavigation('profile')}
              className={`${currentScreen === 'profile' ? 'text-purple-600' : 'text-gray-400'} hover:text-purple-600 transition-colors`}
            >
              <User size={24} />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;