import React, { useState, useEffect } from 'react';
import { Book, BarChart2, Users, User, Brain } from 'lucide-react';
import Homepage from './Homepage';
import Onboarding from './Onboarding';
import SubjectScreen from './SubjectScreen';
import ProfileScreen from './ProfileScreen';
import GroupsScreen from './GroupsScreen';
import LearningProgress from './learning/LearningProgress';
import TransitionWrapper from './common/TransitionWrapper';

const App = () => {
  // Core state
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [previousScreen, setPreviousScreen] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // User data and preferences
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    grade: '',
    subjects: [],
    lastLogin: null,
    studyStreak: 0
  });

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

  // Load saved data
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = localStorage.getItem('study_buddy_data');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (parsedData.userData?.name && parsedData.learningStyle?.type) {
            setUserData(parsedData.userData);
            setLearningStyle(parsedData.learningStyle);
            setCurrentScreen('dashboard');
          }
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    loadSavedData();
  }, []);

  // Save data on changes
  useEffect(() => {
    if (userData.name && learningStyle.type) {
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

  // Navigation handlers
  const handleNavigation = (screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const getTransitionType = (newScreen) => {
    const screenOrder = ['onboarding', 'dashboard', 'subject', 'stats', 'groups', 'profile'];
    const currentIndex = screenOrder.indexOf(currentScreen);
    const newIndex = screenOrder.indexOf(newScreen);

    if (newIndex > currentIndex) return 'slideLeft';
    if (newIndex < currentIndex) return 'slideRight';
    return 'fadeUp';
  };

  // Event handlers
  const handleQuizComplete = (style) => {
    const newData = {
      userData: {
        ...userData,
        lastLogin: new Date().toISOString()
      },
      learningStyle: style
    };

    try {
      localStorage.setItem('study_buddy_data', JSON.stringify(newData));
      setLearningStyle(style);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Error saving quiz completion data:', error);
    }
  };

  const handleUserDataSubmit = (data) => {
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

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <TransitionWrapper type="scale">
          <div className="flex flex-col items-center space-y-4">
            <Brain size={48} className="text-purple-600 animate-pulse" />
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </TransitionWrapper>
      </div>
    );
  }

  // Screen renderer
  const renderCurrentScreen = () => {
    const transitionType = getTransitionType(currentScreen);
    
    switch (currentScreen) {
      case 'onboarding':
        return (
          <TransitionWrapper type="fadeUp">
            <Onboarding 
              onQuizComplete={handleQuizComplete}
              onUserDataSubmit={handleUserDataSubmit}
            />
          </TransitionWrapper>
        );
      
      case 'dashboard':
        return (
          <TransitionWrapper type={transitionType}>
            <Homepage 
              learningStyle={learningStyle}
              userData={userData}
              onSubjectSelect={handleSubjectSelect}
              onNavigate={handleNavigation}
            />
          </TransitionWrapper>
        );
      
      case 'subject':
        return (
          <TransitionWrapper type="slideLeft">
            <SubjectScreen 
              subject={selectedSubject}
              onBack={() => handleNavigation('dashboard')}
              userData={userData}
            />
          </TransitionWrapper>
        );
      
      case 'groups':
        return (
          <TransitionWrapper type={transitionType}>
            <GroupsScreen 
              userData={userData}
              onNavigate={handleNavigation}
            />
          </TransitionWrapper>
        );
      
      case 'stats':
        return (
          <TransitionWrapper type={transitionType}>
            <LearningProgress 
              userData={userData}
              onNavigate={handleNavigation}
            />
          </TransitionWrapper>
        );
      
      case 'profile':
        return (
          <TransitionWrapper type={transitionType}>
            <ProfileScreen 
              userData={userData}
              learningStyle={learningStyle}
              onNavigate={handleNavigation}
              onLogout={handleLogout}
            />
          </TransitionWrapper>
        );
      
      default:
        return null;
    }
  };

  const showNavigation = currentScreen !== 'onboarding';

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className={`${showNavigation ? 'pb-20' : ''}`}>
        {renderCurrentScreen()}
      </div>
      
      {showNavigation && (
        <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-sm border-t z-40">
          <div className="flex justify-around p-4 max-w-lg mx-auto">
            <button 
              onClick={() => handleNavigation('dashboard')}
              className={`transform transition-all duration-200 hover:scale-110 active:scale-95 ${
                currentScreen === 'dashboard' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <Book size={24} />
            </button>
            <button 
              onClick={() => handleNavigation('stats')}
              className={`transform transition-all duration-200 hover:scale-110 active:scale-95 ${
                currentScreen === 'stats' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <BarChart2 size={24} />
            </button>
            <button 
              onClick={() => handleNavigation('groups')}
              className={`transform transition-all duration-200 hover:scale-110 active:scale-95 ${
                currentScreen === 'groups' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <Users size={24} />
            </button>
            <button 
              onClick={() => handleNavigation('profile')}
              className={`transform transition-all duration-200 hover:scale-110 active:scale-95 ${
                currentScreen === 'profile' ? 'text-purple-600' : 'text-gray-400'
              }`}
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