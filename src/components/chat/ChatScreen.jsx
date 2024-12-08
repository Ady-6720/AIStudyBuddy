import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, X } from 'lucide-react';

const ChatScreen = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'system',
      content: "Hi! I'm your AI study assistant. I can help you with your studies, explain concepts, and answer your academic questions."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, {
      type: 'user',
      content: input.trim()
    }]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "This is a simulated response. In production, this would be connected to an AI API."
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
      visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-lg transition-transform duration-300 ${
        visible ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-4 border-b bg-white/80 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold">Study Assistant</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 h-[calc(100vh-200px)]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form 
          onSubmit={handleSubmit}
          className="p-4 border-t bg-white/80 backdrop-blur-sm"
        >
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a study-related question..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 rounded-lg hover:bg-purple-700"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;