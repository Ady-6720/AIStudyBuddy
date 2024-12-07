import React, { useState } from 'react';
import { Plus, Search, Users, X } from 'lucide-react';

const CreateGroup = ({ onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [subject, setSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dummyUsers = [
    { id: 1, name: 'Alice Chen', level: 'Advanced', subject: 'Mathematics' },
    { id: 2, name: 'Mike Brown', level: 'Intermediate', subject: 'Physics' },
    { id: 3, name: 'Sarah Wilson', level: 'Advanced', subject: 'Chemistry' },
    { id: 4, name: 'John Davis', level: 'Beginner', subject: 'Mathematics' },
    { id: 5, name: 'Emma Taylor', level: 'Intermediate', subject: 'Biology' }
  ];

  const handleAddMember = (user) => {
    if (!selectedMembers.find(member => member.id === user.id)) {
      setSelectedMembers([...selectedMembers, user]);
    }
  };

  const handleRemoveMember = (userId) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== userId));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create New Study Group</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Group Details */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter group name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select subject</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
            </select>
          </div>
        </div>

        {/* Member Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add Members
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search users..."
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Selected Members */}
        {selectedMembers.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Members</h3>
            <div className="flex flex-wrap gap-2">
              {selectedMembers.map(member => (
                <div 
                  key={member.id}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center space-x-1"
                >
                  <span>{member.name}</span>
                  <button 
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Suggestions */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Suggested Members</h3>
          {dummyUsers
            .filter(user => 
              !selectedMembers.find(member => member.id === user.id) &&
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(user => (
              <div 
                key={user.id}
                onClick={() => handleAddMember(user)}
                className="p-3 border rounded-lg hover:bg-purple-50 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <h4 className="font-medium">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.level} • {user.subject}</p>
                </div>
                <Plus size={20} className="text-purple-600" />
              </div>
            ))}
        </div>

        {/* Create Button */}
        <button 
          className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Users size={20} />
          <span>Create Group</span>
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;