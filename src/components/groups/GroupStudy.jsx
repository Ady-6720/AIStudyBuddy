import React, { useState } from 'react';
import { 
  Users, 
  Brain, 
  UserPlus,
  MessageSquare,
  Calendar,
  Clock,
  Target,
  Settings,
  BookOpen,
  ChevronRight,
  Star,
  ArrowUp,
  PieChart
} from 'lucide-react';

const GroupStudy = () => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, session, analytics

  // Simulated group data
  const groupData = {
    id: 1,
    name: "Advanced Calculus Study Group",
    members: [
      { id: 1, name: "John", role: "Leader", learningStyle: "Visual" },
      { id: 2, name: "Sarah", role: "Coordinator", learningStyle: "Theoretical" },
      { id: 3, name: "Mike", role: "Member", learningStyle: "Practical" }
    ],
    subject: "Mathematics",
    schedule: {
      nextSession: "Today, 4:00 PM",
      frequency: "3 times/week",
      duration: "90 minutes"
    },
    topics: [
      { name: "Derivatives", status: "completed" },
      { name: "Integration", status: "in-progress" },
      { name: "Series", status: "planned" }
    ]
  };

  const renderGroupOverview = () => (
    <div className="space-y-6">
      {/* Group Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {groupData.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {groupData.subject}
            </p>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Settings size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{groupData.members.length} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={16} />
            <span>{groupData.schedule.frequency}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{groupData.schedule.duration}</span>
          </div>
        </div>
      </div>

      {/* Next Session Card */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-purple-900 dark:text-purple-100">
            Next Session
          </h3>
          <span className="text-purple-600 dark:text-purple-300">
            {groupData.schedule.nextSession}
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-purple-700 dark:text-purple-200">
            Topic: Integration Techniques
          </p>
          <div className="flex space-x-2">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Join Session
            </button>
            <button className="text-purple-600 dark:text-purple-300 px-4 py-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800">
              View Materials
            </button>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Group Members
        </h3>
        <div className="space-y-4">
          {groupData.members.map(member => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-medium">
                  {member.name[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.role} • {member.learningStyle}
                  </p>
                </div>
              </div>
              <Star className="text-yellow-500" size={20} />
            </div>
          ))}
          <button className="w-full mt-4 flex items-center justify-center space-x-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 p-2 rounded-lg">
            <UserPlus size={20} />
            <span>Invite Member</span>
          </button>
        </div>
      </div>

      {/* AI Study Recommendations */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="text-purple-600 dark:text-purple-400" size={24} />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            AI Study Recommendations
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Target className="text-purple-600 dark:text-purple-400" size={20} />
              <span className="text-purple-700 dark:text-purple-200">
                Focus on Integration by Parts
              </span>
            </div>
            <ArrowUp className="text-green-500" size={20} />
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <PieChart className="text-purple-600 dark:text-purple-400" size={20} />
              <span className="text-purple-700 dark:text-purple-200">
                Review Fundamental Theorem
              </span>
            </div>
            <ArrowUp className="text-green-500" size={20} />
          </div>
        </div>
        <button 
          onClick={() => setShowAiSuggestions(true)}
          className="w-full mt-4 text-purple-600 dark:text-purple-400 hover:underline text-sm"
        >
          View All Recommendations
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Study Groups
          </h1>
          <button className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
            <Brain size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mt-4">
          {['overview', 'session', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {renderGroupOverview()}
      </div>

      {/* Action Button */}
      <button className="fixed bottom-24 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default GroupStudy;