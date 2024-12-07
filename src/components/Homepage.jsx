import React, { useState } from 'react';
import { 
  Book, 
  Brain, 
  Target, 
  Clock, 
  Trophy, 
  Calendar,
  Lightbulb,
  ChevronRight,
  MessageSquare,
  LineChart,
  Star,
  ArrowUp
} from 'lucide-react';

const Homepage = ({ learningStyle, userData, onSubjectSelect, onNavigate }) => {
  const [showAiHelp, setShowAiHelp] = useState(false);
  
  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
      progress: 68,
      nextTopic: 'Calculus: Derivatives',
      icon: '📐',
      streak: 5,
      suggestedTime: '45 mins'
    },
    {
      id: 'physics',
      name: 'Physics',
      progress: 45,
      nextTopic: 'Newton\'s Laws of Motion',
      icon: '⚡',
      streak: 3,
      suggestedTime: '30 mins'
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      progress: 72,
      nextTopic: 'Chemical Bonding',
      icon: '🧪',
      streak: 4,
      suggestedTime: '40 mins'
    }
  ];

  // AI-generated study recommendations
  const aiRecommendations = {
    bestTimeToStudy: learningStyle?.preferences?.timeOfDay || 'Morning',
    focusSubject: 'Mathematics',
    reason: 'Your performance data shows room for improvement in calculus concepts',
    suggestedActivities: [
      {
        type: 'Practice',
        description: 'Solve 5 derivative problems',
        time: '20 mins',
        priority: 'High'
      },
      {
        type: 'Review',
        description: 'Watch visual explanation of chain rule',
        time: '15 mins',
        priority: 'Medium'
      }
    ]
  };

  const studyStreak = {
    current: 5,
    best: 12,
    todayCompleted: 2,
    todayGoal: 3
  };

  const renderAIAssistant = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold">AI Study Assistant</h2>
          </div>
          <button 
            onClick={() => setShowAiHelp(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-purple-700">
            Based on your learning style ({learningStyle.type}), I recommend focusing on {aiRecommendations.focusSubject} today.
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Ask me anything about your studies..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <div className="text-sm text-gray-600">
            Quick actions:
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button className="p-3 border rounded-lg hover:bg-purple-50 flex items-center space-x-2">
                <Brain size={18} />
                <span>Explain Topic</span>
              </button>
              <button className="p-3 border rounded-lg hover:bg-purple-50 flex items-center space-x-2">
                <Target size={18} />
                <span>Practice Questions</span>
              </button>
              <button className="p-3 border rounded-lg hover:bg-purple-50 flex items-center space-x-2">
                <LineChart size={18} />
                <span>Track Progress</span>
              </button>
              <button className="p-3 border rounded-lg hover:bg-purple-50 flex items-center space-x-2">
                <Calendar size={18} />
                <span>Study Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="p-6 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Hi, {userData?.name || 'Student'}!
            </h1>
            <p className="text-sm text-gray-600">Ready for another productive day?</p>
          </div>
          <button 
            onClick={() => setShowAiHelp(true)}
            className="p-2 bg-purple-100 rounded-full text-purple-600 hover:bg-purple-200 transition-colors"
          >
            <Brain size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Today's Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Target className="text-purple-600" size={24} />
              <h2 className="text-lg font-semibold">Today's Progress</h2>
            </div>
            <div className="flex items-center space-x-1 text-yellow-500">
              <Star size={20} />
              <span className="font-medium">{studyStreak.current} days</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Completed {studyStreak.todayCompleted} of {studyStreak.todayGoal} goals</span>
              <span>{Math.round((studyStreak.todayCompleted / studyStreak.todayGoal) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
                style={{ width: `${(studyStreak.todayCompleted / studyStreak.todayGoal) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="text-yellow-500" size={24} />
            <h2 className="text-lg font-semibold">Study Recommendations</h2>
          </div>
          
          <div className="space-y-4">
            {aiRecommendations.suggestedActivities.map((activity, index) => (
              <div 
                key={index}
                className="border rounded-lg p-4 hover:bg-purple-50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800">{activity.type}</h3>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <span className="text-sm text-purple-600">{activity.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    activity.priority === 'High' ? 'bg-red-100 text-red-600' :
                    activity.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {activity.priority} Priority
                  </span>
                  <button className="text-purple-600 hover:text-purple-700">
                    Start Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <Book className="text-purple-600" size={24} />
            <span>Your Subjects</span>
          </h2>
          
          {subjects.map((subject) => (
            <div 
              key={subject.id}
              onClick={() => onSubjectSelect(subject)}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:bg-white/90 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{subject.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.nextTopic}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-yellow-500">
                    <ArrowUp size={16} />
                    <span>{subject.streak}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAiHelp && renderAIAssistant()}
    </div>
  );
};

export default Homepage;