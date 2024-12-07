import React, { useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';

const GroupChat = ({ groupData }) => {
  const [message, setMessage] = useState('');

  const dummyMessages = [
    {
      id: 1,
      sender: 'Alice Chen',
      message: 'Hey everyone! Ready to tackle calculus?',
      time: '10:30 AM',
      avatar: 'AC'
    },
    {
      id: 2,
      sender: 'Mike Brown',
      message: 'Yes! I need help with derivatives 😅',
      time: '10:32 AM',
      avatar: 'MB'
    },
    {
      id: 3,
      sender: 'Sarah Wilson',
      message: 'I can help explain that! Let's start with the basic rules.',
      time: '10:33 AM',
      avatar: 'SW'
    },
    {
      id: 4,
      sender: 'Mike Brown',
      message: 'That would be great! Can we use the practice problems from chapter 3?',
      time: '10:35 AM',
      avatar: 'MB'
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {dummyMessages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-medium">
              {msg.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline space-x-2">
                <span className="font-medium text-gray-900">{msg.sender}</span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <div className="mt-1 bg-white rounded-lg px-4 py-2 shadow-sm">
                {msg.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-gray-600">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="text-gray-400 hover:text-gray-600">
            <Smile size={20} />
          </button>
          <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;