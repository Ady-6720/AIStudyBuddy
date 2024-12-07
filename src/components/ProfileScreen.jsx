import React, { useState } from 'react';
import { 
  Book, 
  BarChart2, 
  Users, 
  User, 
  Settings as SettingsIcon, 
  LogOut, 
  Edit2, 
  Save,
  Brain,
  Medal,
  Bell,
  Sun,
  Moon,
  Clock,
  Calendar,
  Target
} from 'lucide-react';

const ProfileScreen = ({ userData, learningStyle, onNavigate, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [showSettings, setShowSettings] = useState(false);

  const stats = [
    { label: 'Study Hours', value: '45.5', icon: Clock },
    { label: 'Study Streak', value: userData?.studyStreak || '0', icon: Target },
    { label: 'Completed', value: '28', icon: Calendar },
    { label: 'Active Days', value: '15', icon: Book }
  ];

  const achievements = [
    {
      title: 'Study Streak',
      description: '7 days continuous learning',
      icon: '🔥',
      date: 'Today'
    },
    {
      title: 'Quiz Master',
      description: 'Completed 50 practice questions',
      icon: '🎯',
      date: '2 days ago'
    },
    {
      title: 'Early Bird',
      description: 'Completed morning study goals',
      icon: '🌅',
      date: 'Yesterday'
    }
  ];

  const Settings = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
        {/* Settings content remains the same */}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-40">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Profile
            </h1>
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <SettingsIcon size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="pt-16 pb-20 max-w-lg mx-auto px-4">
        <div className="space-y-4 py-4">
          {/* Profile Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {userData?.name?.charAt(0) || 'S'}
              </div>
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                      className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      value={editedData.grade}
                      onChange={(e) => setEditedData({...editedData, grade: e.target.value})}
                      className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold truncate">{userData?.name}</h2>
                    <p className="text-gray-500">{userData?.grade}</p>
                  </>
                )}
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-2xl">{learningStyle?.icon}</span>
                  <span className="text-sm text-gray-600">{learningStyle?.type} Learner</span>
                </div>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 hover:bg-gray-100 rounded-full shrink-0"
              >
                {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-2">
                  <stat.icon className="text-purple-600" size={20} />
                  <h3 className="font-semibold text-gray-700">{stat.label}</h3>
                </div>
                <p className="mt-2 text-2xl font-bold text-purple-600">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Medal className="text-yellow-500" size={20} />
              <span>Recent Achievements</span>
            </h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <span className="text-2xl shrink-0">{achievement.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{achievement.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{achievement.description}</p>
                  </div>
                  <span className="text-sm text-gray-400 shrink-0">{achievement.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Style */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="text-purple-600" size={20} />
              <h2 className="text-lg font-semibold">Learning Style</h2>
            </div>
            <p className="text-gray-600">{learningStyle?.description}</p>
          </div>

          {/* Logout Button */}
          <button 
            onClick={onLogout}
            className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm flex items-center justify-center space-x-2 text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t z-40">
        <div className="max-w-lg mx-auto">
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
            <button 
              onClick={() => onNavigate('groups')}
              className="text-gray-400 hover:text-purple-600 transition-colors"
            >
              <Users size={24} />
            </button>
            <button className="text-purple-600">
              <User size={24} />
            </button>
          </div>
        </div>
      </div>

      {showSettings && <Settings />}
    </div>
  );
};

export default ProfileScreen;