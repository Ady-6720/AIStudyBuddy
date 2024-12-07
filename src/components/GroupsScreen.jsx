import React, { useState } from 'react';
import { 
  Book, 
  BarChart2, 
  Users, 
  User, 
  Search, 
  Plus,
  Brain,
  MessageSquare,
  Calendar,
  ChevronRight,
  Clock,
  Target,
  Settings,
  X
} from 'lucide-react';

const GroupsScreen = ({ userData, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('myGroups');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  // Sample group data
  const myGroups = [
    {
      id: 1,
      name: "Advanced Calculus Study",
      subject: "Mathematics",
      members: 8,
      nextSession: "Today, 3:00 PM",
      icon: "📐",
      lastMessage: "Let's review integration by parts",
      lastMessageTime: "10 min ago",
      aiMatchScore: 95,
      topics: ["Derivatives", "Integration", "Series"]
    },
    {
      id: 2,
      name: "Physics Problem Solving",
      subject: "Physics",
      members: 6,
      nextSession: "Tomorrow, 4:00 PM",
      icon: "⚡",
      lastMessage: "Anyone up for quantum mechanics?",
      lastMessageTime: "1 hour ago",
      aiMatchScore: 88,
      topics: ["Mechanics", "Electromagnetics", "Quantum Physics"]
    }
  ];

  const recommendedGroups = [
    {
      id: 3,
      name: "Chemistry Lab Prep",
      subject: "Chemistry",
      members: 12,
      icon: "🧪",
      aiMatchScore: 92,
      description: "Focus on organic chemistry and lab techniques",
      activeDiscussions: 3
    },
    {
      id: 4,
      name: "Biology Study Circle",
      subject: "Biology",
      members: 15,
      icon: "🧬",
      aiMatchScore: 85,
      description: "Advanced cellular biology and genetics",
      activeDiscussions: 5
    }
  ];

  const renderAiSuggestions = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Brain className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold">AI Study Match</h2>
          </div>
          <button onClick={() => setShowAiSuggestions(false)} className="text-gray-400">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Why these groups match you:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Similar learning style preferences</li>
              <li>• Complementary knowledge levels</li>
              <li>• Compatible study schedules</li>
              <li>• Shared topic interests</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Top Matches:</h3>
            {recommendedGroups.map(group => (
              <div key={group.id} className="border rounded-lg p-4 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{group.icon}</span>
                    <span className="font-medium">{group.name}</span>
                  </div>
                  <span className="text-purple-600 font-medium">
                    {group.aiMatchScore}% match
                  </span>
                </div>
                <p className="text-sm text-gray-600">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGroupChat = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 z-40">
      <div className="h-full flex flex-col">
        {/* Chat Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setActiveGroup(null)}
                className="text-gray-600"
              >
                <ChevronRight className="transform rotate-180" size={24} />
              </button>
              <div>
                <h2 className="font-semibold">{activeGroup.name}</h2>
                <p className="text-sm text-gray-500">{activeGroup.members} members</p>
              </div>
            </div>
            <button onClick={() => setShowAiSuggestions(true)}>
              <Brain className="text-purple-600" size={24} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Message bubbles would go here */}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-600 text-white px-4 rounded-lg hover:bg-purple-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (activeGroup) {
    return renderGroupChat();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="p-6 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Study Groups
          </h1>
          <button 
            onClick={() => setShowAiSuggestions(true)}
            className="p-2 bg-purple-100 rounded-full text-purple-600"
          >
            <Brain size={24} />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        {/* Tabs */}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setActiveTab('myGroups')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'myGroups'
                ? 'bg-purple-600 text-white'
                : 'bg-white/50 text-gray-600 hover:bg-white/80'
            }`}
          >
            My Groups
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'discover'
                ? 'bg-purple-600 text-white'
                : 'bg-white/50 text-gray-600 hover:bg-white/80'
            }`}
          >
            Discover
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {activeTab === 'myGroups' ? (
          <>
            <button 
              onClick={() => setShowCreateGroup(true)}
              className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm flex items-center justify-center space-x-2 text-purple-600 hover:bg-purple-50 transition-colors"
            >
              <Plus size={20} />
              <span>Create New Study Group</span>
            </button>

            <div className="space-y-4">
              {myGroups.map((group) => (
                <div 
                  key={group.id} 
                  onClick={() => setActiveGroup(group)}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm cursor-pointer hover:bg-white/90 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{group.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{group.name}</h3>
                        <p className="text-sm text-gray-500">{group.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-purple-600 font-medium">
                        {group.aiMatchScore}% match
                      </span>
                      <span className="text-sm text-gray-500">{group.members} members</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} />
                      <span>{group.nextSession}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare size={16} className="text-purple-600" />
                      <span className="text-gray-500">{group.lastMessageTime}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-600 border-t pt-3">
                    {group.lastMessage}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {recommendedGroups.map((group) => (
              <div 
                key={group.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{group.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{group.name}</h3>
                      <p className="text-sm text-gray-500">{group.subject}</p>
                    </div>
                  </div>
                  <span className="text-purple-600 font-medium">
                    {group.aiMatchScore}% match
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{group.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span>{group.members} members</span>
                    <span>•</span>
                    <span>{group.activeDiscussions} active discussions</span>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAiSuggestions && renderAiSuggestions()}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-sm border-t">
        <div className="flex justify-around p-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Book size={24} />
          </button>
          <button 
            onClick={() => onNavigate('stats')}
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <BarChart2 size={24} />
          </button>
          <button className="text-purple-600">
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
    </div>
  );
};

export default GroupsScreen;