import React, { useState } from 'react';
import { 
  BarChart2, 
  Clock, 
  Trophy, 
  Target, 
  Brain,
  TrendingUp,
  Book,
  Users,
  User,
  Star,
  ArrowUp,
  ArrowDown,
  Calendar,
  CheckCircle,
  AlertTriangle,
  MessageCircle
} from 'lucide-react';

const StatsScreen = ({ userData, onNavigate }) => {
  const [timeframe, setTimeframe] = useState('week');
  const [showAiInsights, setShowAiInsights] = useState(false);

  const stats = {
    weeklyStudyHours: [
      { day: 'Mon', hours: 2.5 },
      { day: 'Tue', hours: 3.0 },
      { day: 'Wed', hours: 1.5 },
      { day: 'Thu', hours: 4.0 },
      { day: 'Fri', hours: 2.0 },
      { day: 'Sat', hours: 3.5 },
      { day: 'Sun', hours: 2.0 }
    ],
    subjectPerformance: [
      { subject: 'Mathematics', progress: 75, trend: 'up', icon: '📐' },
      { subject: 'Physics', progress: 60, trend: 'up', icon: '⚡' },
      { subject: 'Chemistry', progress: 45, trend: 'down', icon: '🧪' },
      { subject: 'Biology', progress: 80, trend: 'up', icon: '🧬' }
    ],
    insights: {
      strengths: [
        "Strong performance in Mathematics",
        "Consistent daily study routine",
        "Active participation in groups"
      ],
      improvements: [
        "More practice needed in Chemistry",
        "Consider increasing study duration",
        "Review challenging concepts regularly"
      ],
      recommendations: [
        {
          type: "Focus Area",
          subject: "Chemistry",
          action: "Schedule review session",
          priority: "high"
        },
        {
          type: "Study Habit",
          subject: "General",
          action: "Increase morning study sessions",
          priority: "medium"
        }
      ]
    }
  };

  const renderAiInsights = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Brain className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold">AI Learning Insights</h2>
          </div>
          <button onClick={() => setShowAiInsights(false)} className="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Strengths */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">Your Strengths</h3>
            <ul className="space-y-2">
              {stats.insights.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2 text-green-700">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">Areas for Improvement</h3>
            <ul className="space-y-2">
              {stats.insights.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start space-x-2 text-yellow-700">
                  <AlertTriangle size={16} className="mt-1 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-medium mb-3">Personalized Recommendations</h3>
            <div className="space-y-3">
              {stats.insights.recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{rec.subject}: {rec.action}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      rec.priority === 'high' 
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {rec.priority} priority
                    </span>
                  </div>
                </div>
              ))}
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
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Learning Progress
          </h1>
          <button 
            onClick={() => setShowAiInsights(true)}
            className="p-2 bg-purple-100 rounded-full text-purple-600 hover:bg-purple-200"
          >
            <Brain size={24} />
          </button>
        </div>

        {/* Time Range Selection */}
        <div className="flex space-x-2 mt-4">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeframe === period
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/50 text-gray-600 hover:bg-white/80'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Weekly Study Hours */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Clock className="text-purple-600" size={20} />
            <span>Study Hours</span>
          </h2>
          <div className="flex justify-between items-end h-40 mt-4">
            {stats.weeklyStudyHours.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="relative w-12">
                  <div 
                    className="w-8 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg mx-auto"
                    style={{ height: `${(day.hours / 4) * 100}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                      {day.hours}h
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Target className="text-purple-600" size={20} />
            <span>Subject Progress</span>
          </h2>
          <div className="space-y-4">
            {stats.subjectPerformance.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="font-medium">{subject.subject}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{subject.progress}%</span>
                    {subject.trend === 'up' ? (
                      <ArrowUp size={16} className="text-green-500" />
                    ) : (
                      <ArrowDown size={16} className="text-red-500" />
                    )}
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-sm border-t">
        <div className="flex justify-around p-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Book size={24} />
          </button>
          <button className="text-purple-600">
            <BarChart2 size={24} />
          </button>
          <button 
            onClick={() => onNavigate('groups')}
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Users size={24} />
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <User size={24} />
          </button>
        </div>
      </nav>

      {/* AI Insights Button */}
      <button
        onClick={() => setShowAiInsights(true)}
        className="fixed bottom-24 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      >
        <MessageCircle size={24} />
      </button>

      {showAiInsights && renderAiInsights()}
    </div>
  );
};

export default StatsScreen;