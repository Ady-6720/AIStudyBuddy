import React, { useState } from 'react';
import { 
  Calendar,
  TrendingUp,
  Clock,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Book,
  Star,
  MessageCircle,
  PieChart,
} from 'lucide-react';

const LearningProgress = ({ userData }) => {
  const [timeframe, setTimeframe] = useState('week');
  const [showAiInsights, setShowAiInsights] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Mock progress data
  const progressData = {
    subjects: [
      {
        name: 'Mathematics',
        progress: 75,
        trend: 'up',
        lastActivity: '2 hours ago',
        topics: [
          { name: 'Calculus', progress: 85, status: 'strong' },
          { name: 'Algebra', progress: 70, status: 'improving' },
          { name: 'Statistics', progress: 60, status: 'needs-attention' }
        ],
        studyStreak: 5,
        weeklyHours: 8.5
      },
      {
        name: 'Physics',
        progress: 68,
        trend: 'stable',
        lastActivity: '1 day ago',
        topics: [
          { name: 'Mechanics', progress: 75, status: 'strong' },
          { name: 'Electricity', progress: 65, status: 'improving' },
          { name: 'Quantum', progress: 45, status: 'needs-attention' }
        ],
        studyStreak: 3,
        weeklyHours: 6.0
      }
    ],
    weeklyActivity: [
      { day: 'Mon', hours: 2.5, efficiency: 85 },
      { day: 'Tue', hours: 3.0, efficiency: 90 },
      { day: 'Wed', hours: 1.5, efficiency: 75 },
      { day: 'Thu', hours: 4.0, efficiency: 95 },
      { day: 'Fri', hours: 2.0, efficiency: 80 },
      { day: 'Sat', hours: 3.5, efficiency: 88 },
      { day: 'Sun', hours: 2.0, efficiency: 82 }
    ],
    aiInsights: {
      strengths: [
        "Strong grasp of calculus fundamentals",
        "Consistent daily study routine",
        "High engagement in problem-solving"
      ],
      improvements: [
        "More practice needed in quantum physics",
        "Increase study session length",
        "Review basic algebra concepts"
      ],
      recommendations: [
        {
          type: "Focus Area",
          subject: "Physics",
          topic: "Quantum Mechanics",
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

  const renderTimeframeSelector = () => (
    <div className="flex space-x-2 mb-6">
      {['week', 'month', 'year'].map((period) => (
        <button
          key={period}
          onClick={() => setTimeframe(period)}
          className={`px-4 py-2 rounded-lg ${
            timeframe === period
              ? 'bg-purple-600 text-white'
              : 'bg-white/50 text-gray-600 hover:bg-white/80 dark:bg-gray-800/50 dark:text-gray-300'
          }`}
        >
          {period.charAt(0).toUpperCase() + period.slice(1)}
        </button>
      ))}
    </div>
  );

  const renderAIInsights = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Brain className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI Learning Insights
            </h2>
          </div>
          <button 
            onClick={() => setShowAiInsights(false)}
            className="text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Strengths */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
            <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">
              Your Strengths
            </h3>
            <ul className="space-y-2">
              {progressData.aiInsights.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2 text-green-700 dark:text-green-300">
                  <CheckCircle size={16} className="mt-1 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {progressData.aiInsights.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start space-x-2 text-yellow-700 dark:text-yellow-300">
                  <AlertTriangle size={16} className="mt-1 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">
              Personalized Recommendations
            </h3>
            <div className="space-y-3">
              {progressData.aiInsights.recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className="border dark:border-gray-700 rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {rec.subject}: {rec.topic || rec.action}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      rec.priority === 'high' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
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

  const renderWeeklyActivity = () => (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center space-x-2">
        <Clock className="text-purple-600" size={20} />
        <span>Study Activity</span>
      </h2>
      <div className="flex justify-between items-end h-40">
        {progressData.weeklyActivity.map((day, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="relative w-12">
              <div 
                className="w-8 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg mx-auto"
                style={{ height: `${(day.hours / 4) * 100}%` }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400">
                  {day.hours}h
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubjectProgress = () => (
    <div className="space-y-4">
      {progressData.subjects.map((subject, index) => (
        <div 
          key={index}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <Book className="text-purple-600" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {subject.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Last active: {subject.lastActivity}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {subject.progress}%
              </span>
              {subject.trend === 'up' ? (
                <ArrowUp className="text-green-500" size={20} />
              ) : subject.trend === 'down' ? (
                <ArrowDown className="text-red-500" size={20} />
              ) : (
                <TrendingUp className="text-yellow-500" size={20} />
              )}
            </div>
          </div>

          {/* Topic Progress */}
          <div className="space-y-3">
            {subject.topics.map((topic, topicIndex) => (
              <div key={topicIndex} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    {topic.name}
                  </span>
                  <span className="text-gray-500">
                    {topic.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div 
                    className={`h-full rounded-full ${
                      topic.status === 'strong' 
                        ? 'bg-green-500'
                        : topic.status === 'improving'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-500" />
              <span>{subject.studyStreak} day streak</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} className="text-purple-600" />
              <span>{subject.weeklyHours}h this week</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Learning Progress
          </h1>
          <button 
            onClick={() => setShowAiInsights(true)}
            className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400"
          >
            <Brain size={24} />
          </button>
        </div>

        {renderTimeframeSelector()}
      </div>

      <div className="p-6 space-y-6">
        {renderWeeklyActivity()}
        {renderSubjectProgress()}
      </div>

      {/* AI Assistant Button */}
      <button
        onClick={() => setShowAiInsights(true)}
        className="fixed bottom-24 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      >
        <MessageCircle size={24} />
      </button>

      {showAiInsights && renderAIInsights()}
    </div>
  );
};

export default LearningProgress;