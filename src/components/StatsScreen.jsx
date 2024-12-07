import React, { useState } from 'react';
import { 
  BarChart2, 
  Clock, 
  Trophy, 
  Target, 
  Calendar,
  Brain,
  TrendingUp,
  Book,
  Users,
  User,
  Star,
  ArrowUp,
  ArrowDown,
  Lightbulb
} from 'lucide-react';

const StatsScreen = ({ userData, onNavigate }) => {
  const [showAiInsights, setShowAiInsights] = useState(false);

  // Simulated AI analysis of study patterns
  const aiInsights = {
    bestStudyTime: "Morning (8 AM - 10 AM)",
    weakestSubject: "Chemistry",
    strongestSubject: "Mathematics",
    recommendations: [
      "Increase practice in Chemical Equations",
      "Consider group study for Chemistry",
      "Maintain current Mathematics momentum",
      "Take more breaks during evening sessions"
    ],
    weeklyProgress: "15% improvement",
    studyStreak: userData?.studyStreak || 0,
    predictedPerformance: "On track to reach monthly goals"
  };

  // Weekly study data
  const weeklyData = [
    { day: 'Mon', hours: 2.5, efficiency: 85 },
    { day: 'Tue', hours: 3.0, efficiency: 90 },
    { day: 'Wed', hours: 1.5, efficiency: 75 },
    { day: 'Thu', hours: 4.0, efficiency: 95 },
    { day: 'Fri', hours: 2.0, efficiency: 80 },
    { day: 'Sat', hours: 3.5, efficiency: 88 },
    { day: 'Sun', hours: 2.0, efficiency: 82 }
  ];

  // Subject performance data
  const subjectPerformance = [
    { 
      subject: 'Mathematics', 
      progress: 75, 
      trend: 'up',
      aiNote: 'Strong understanding of recent topics',
      icon: '📐' 
    },
    { 
      subject: 'Physics', 
      progress: 60, 
      trend: 'up',
      aiNote: 'Improving in problem-solving speed',
      icon: '⚡' 
    },
    { 
      subject: 'Chemistry', 
      progress: 45, 
      trend: 'down',
      aiNote: 'Extra attention needed in balancing equations',
      icon: '🧪' 
    },
    { 
      subject: 'Biology', 
      progress: 80, 
      trend: 'up',
      aiNote: 'Excellent grasp of concepts',
      icon: '🧬' 
    }
  ];

  const renderAiInsights = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-md w-full space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Analysis</h2>
          </div>
          <button 
            onClick={() => setShowAiInsights(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-purple-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="text-yellow-500" size={20} />
              <h3 className="font-medium text-gray-900 dark:text-white">Study Pattern Analysis</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Your most productive study times are in the {aiInsights.bestStudyTime}. 
              You've shown {aiInsights.weeklyProgress} in overall performance this week.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Strengths & Areas for Improvement</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <ArrowUp className="text-green-500" size={16} />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Strong performance in {aiInsights.strongestSubject}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowDown className="text-red-500" size={16} />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Additional focus needed in {aiInsights.weakestSubject}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">AI Recommendations</h3>
            <ul className="space-y-2">
              {aiInsights.recommendations.map((rec, index) => (
                <li 
                  key={index}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-start space-x-2"
                >
                  <span>•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Target className="text-green-500" size={20} />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {aiInsights.predictedPerformance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Your Progress
          </h1>
          <button 
            onClick={() => setShowAiInsights(true)}
            className="p-2 bg-purple-100 dark:bg-gray-700 rounded-full text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-gray-600"
          >
            <Brain size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-2">
              <Trophy className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Study Streak</h3>
            </div>
            <p className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
              {aiInsights.studyStreak} days
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-green-500" size={20} />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Weekly Progress</h3>
            </div>
            <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
              {aiInsights.weeklyProgress}
            </p>
          </div>
        </div>

        {/* Weekly Study Hours */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-gray-900 dark:text-white">
            <Calendar className="text-purple-600 dark:text-purple-400" size={20} />
            <span>Weekly Study Hours</span>
          </h2>
          <div className="flex justify-between items-end h-40">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="relative w-12">
                  <div 
                    className="w-8 bg-gradient-to-t from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-t-lg mx-auto"
                    style={{ height: `${(day.hours / 4) * 100}%` }}
                  >
                    <div 
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400"
                    >
                      {day.hours}h
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-gray-900 dark:text-white">
            <Target className="text-purple-600 dark:text-purple-400" size={20} />
            <span>Subject Progress</span>
          </h2>
          <div className="space-y-4">
            {subjectPerformance.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{subject.subject}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{subject.progress}%</span>
                    {subject.trend === 'up' ? (
                      <ArrowUp size={16} className="text-green-500" />
                    ) : (
                      <ArrowDown size={16} className="text-red-500" />
                    )}
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-full"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  {subject.aiNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t dark:border-gray-700">
        <div className="flex justify-around p-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <Book size={24} />
          </button>
          <button className="text-purple-600 dark:text-purple-400">
            <BarChart2 size={24} />
          </button>
          <button 
            onClick={() => onNavigate('groups')}
            className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <Users size={24} />
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <User size={24} />
          </button>
        </div>
      </nav>

      {showAiInsights && renderAiInsights()}
    </div>
  );
};

export default StatsScreen;