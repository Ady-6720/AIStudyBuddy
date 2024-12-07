import React, { useState } from 'react';
import { Brain, Sparkles, Target, ChevronRight, Book, Lightbulb, Clock } from 'lucide-react';

const Onboarding = ({ onQuizComplete, onUserDataSubmit }) => {
  const [step, setStep] = useState('welcome');
  const [quizStep, setQuizStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    grade: '',
    subjects: []
  });

  const questions = [
    {
      question: "How do you prefer to learn new concepts?",
      subtext: "This helps us customize your learning experience",
      options: [
        { text: "Through visual diagrams and illustrations", icon: "👁️", type: "Visual" },
        { text: "By reading detailed explanations", icon: "📚", type: "Theoretical" },
        { text: "Through hands-on practice", icon: "🤚", type: "Practical" }
      ]
    },
    {
      question: "When do you usually feel most focused?",
      subtext: "We'll schedule your important topics during these times",
      options: [
        { text: "Early morning - Fresh mind", icon: "🌅", type: "Morning" },
        { text: "Afternoon - Peak energy", icon: "☀️", type: "Afternoon" },
        { text: "Evening - Calm environment", icon: "🌙", type: "Evening" }
      ]
    },
    {
      question: "How do you prefer to track your progress?",
      subtext: "This helps us show your progress in the most meaningful way",
      options: [
        { text: "Visual charts and graphs", icon: "📊", type: "Visual" },
        { text: "Detailed statistics", icon: "📋", type: "Detailed" },
        { text: "Achievement badges", icon: "🏆", type: "Gamified" }
      ]
    },
    {
      question: "How do you handle challenging topics?",
      subtext: "We'll adjust our teaching approach accordingly",
      options: [
        { text: "Break into smaller parts", icon: "🧩", type: "Structured" },
        { text: "Look for real-life examples", icon: "🌍", type: "Practical" },
        { text: "Study with peers", icon: "👥", type: "Collaborative" }
      ]
    },
    {
      question: "What's your preferred study session length?",
      subtext: "We'll customize study sessions to match your concentration span",
      options: [
        { text: "Short focused sessions (25-30 mins)", icon: "⚡", type: "Pomodoro" },
        { text: "Medium sessions (45-60 mins)", icon: "⏱️", type: "Standard" },
        { text: "Long deep-dive sessions (90+ mins)", icon: "🎯", type: "Extended" }
      ]
    }
  ];

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: '📐' },
    { id: 'physics', name: 'Physics', icon: '⚡' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
    { id: 'biology', name: 'Biology', icon: '🧬' },
    { id: 'history', name: 'History', icon: '📚' },
    { id: 'literature', name: 'Literature', icon: '📖' }
  ];

  const grades = [
    '9th Grade', '10th Grade', '11th Grade', '12th Grade', 'College', 'Other'
  ];

  const handleQuizComplete = (responses) => {
    // Analyze responses to determine learning style
    const learningStyle = {
      type: responses[0].type,
      icon: responses[0].icon,
      description: `You learn best through ${responses[0].type.toLowerCase()} content. We'll prioritize ${
        responses[0].type === 'Visual' ? 'diagrams and visual aids' :
        responses[0].type === 'Theoretical' ? 'detailed explanations' :
        'interactive exercises'
      } in your study materials.`,
      preferences: {
        timeOfDay: responses[1].type,
        trackingStyle: responses[2].type,
        approachStyle: responses[3].type,
        sessionLength: responses[4].type
      }
    };

    onQuizComplete(learningStyle);
  };

  const renderWelcome = () => (
    <div className="space-y-6 max-w-md mx-auto pt-12">
      <div className="flex justify-center">
        <Brain size={48} className="text-purple-600 animate-pulse" />
      </div>
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">
        Smart Study Buddy
      </h1>
      <p className="text-center text-gray-600">
        Your AI-powered learning companion
      </p>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-yellow-500" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome to Smart Learning
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Brain className="text-purple-600" size={20} />
            <p className="text-gray-600">AI-powered personalized learning</p>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="text-purple-600" size={20} />
            <p className="text-gray-600">Smart progress tracking</p>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="text-purple-600" size={20} />
            <p className="text-gray-600">Adaptive study schedules</p>
          </div>
        </div>
        <button 
          onClick={() => setStep('registration')}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
        >
          <span>Get Started</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderRegistration = () => (
    <div className="max-w-md mx-auto pt-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg space-y-6">
        <div className="flex items-center space-x-2">
          <Book className="text-purple-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">
            Create Your Profile
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              value={userData.age}
              onChange={(e) => setUserData({...userData, age: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade Level
            </label>
            <select
              value={userData.grade}
              onChange={(e) => setUserData({...userData, grade: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select your grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Subjects
            </label>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => {
                    setUserData(prev => ({
                      ...prev,
                      subjects: prev.subjects.includes(subject.id)
                        ? prev.subjects.filter(id => id !== subject.id)
                        : [...prev.subjects, subject.id]
                    }));
                  }}
                  className={`p-3 border rounded-lg flex items-center space-x-2 transition-colors ${
                    userData.subjects.includes(subject.id)
                      ? 'bg-purple-50 border-purple-300 text-purple-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{subject.icon}</span>
                  <span>{subject.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (userData.name && userData.age && userData.grade && userData.subjects.length > 0) {
              onUserDataSubmit(userData);
              setStep('quiz');
            }
          }}
          disabled={!userData.name || !userData.age || !userData.grade || userData.subjects.length === 0}
          className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 
            ${userData.name && userData.age && userData.grade && userData.subjects.length > 0
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          <span>Continue to Learning Style Quiz</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="max-w-md mx-auto pt-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg space-y-4">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-500">Question {quizStep + 1} of {questions.length}</span>
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div 
                key={index}
                className={`h-2 w-8 rounded-full ${
                  index === quizStep 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {questions[quizStep].question}
          </h3>
          <p className="text-sm text-gray-600">{questions[quizStep].subtext}</p>
        </div>
        
        <div className="space-y-3">
          {questions[quizStep].options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                const responses = [...Array(quizStep), option];
                if (quizStep < questions.length - 1) {
                  setQuizStep(quizStep + 1);
                } else {
                  handleQuizComplete(responses);
                }
              }}
              className="w-full p-4 text-left border rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors flex items-center space-x-3"
            >
              <span className="text-2xl">{option.icon}</span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      {step === 'welcome' && renderWelcome()}
      {step === 'registration' && renderRegistration()}
      {step === 'quiz' && renderQuiz()}
    </div>
  );
};

export default Onboarding;