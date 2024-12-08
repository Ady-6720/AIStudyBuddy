import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Brain, 
  Play, 
  Book, 
  CheckCircle, 
  Lock, 
  MessageSquare,
  BarChart2,
  Target,
  Clock
} from 'lucide-react';

const SubjectScreen = ({ subject, onBack }) => {
  const [showAiTutor, setShowAiTutor] = useState(false);
  const [currentSection, setCurrentSection] = useState('content');

  const subjectContent = {
    title: subject?.name || "Mathematics",
    icon: subject?.icon || "📐",
    progress: subject?.progress || 65,
    currentTopic: "Calculus",
    units: [
      {
        title: "Derivatives and Differentiation",
        completed: true,
        topics: [
          { name: "Introduction to Derivatives", duration: "20 min", completed: true },
          { name: "Power Rule", duration: "25 min", completed: true },
          { name: "Chain Rule", duration: "30 min", completed: true }
        ]
      },
      {
        title: "Applications of Derivatives",
        completed: false,
        topics: [
          { name: "Rate of Change", duration: "25 min", completed: false },
          { name: "Max and Min Problems", duration: "35 min", completed: false },
          { name: "Related Rates", duration: "30 min", completed: false }
        ]
      },
      {
        title: "Integration",
        completed: false,
        locked: true,
        topics: [
          { name: "Introduction to Integration", duration: "30 min", locked: true },
          { name: "Basic Integration Rules", duration: "35 min", locked: true },
          { name: "Integration by Parts", duration: "40 min", locked: true }
        ]
      }
    ]
  };

  const renderAiTutor = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold">AI Tutor</h2>
          </div>
          <button 
            onClick={() => setShowAiTutor(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-700">
              I can help you understand {subjectContent.currentTopic}. What would you like to know?
            </p>
          </div>

          <input
            type="text"
            placeholder="Ask your question..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 border rounded-lg hover:bg-purple-50 text-sm">
              Explain the concept
            </button>
            <button className="p-3 border rounded-lg hover:bg-purple-50 text-sm">
              Show example
            </button>
            <button className="p-3 border rounded-lg hover:bg-purple-50 text-sm">
              Practice questions
            </button>
            <button className="p-3 border rounded-lg hover:bg-purple-50 text-sm">
              Visual explanation
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{subjectContent.icon}</span>
              <div>
                <h1 className="font-semibold text-gray-800">{subjectContent.title}</h1>
                <p className="text-sm text-gray-500">{subjectContent.currentTopic}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowAiTutor(true)}
            className="p-2 bg-purple-100 rounded-full text-purple-600 hover:bg-purple-200"
          >
            <Brain size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Course Progress</span>
            <span>{subjectContent.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
              style={{ width: `${subjectContent.progress}%` }}
            />
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex px-4 border-t">
          <button
            onClick={() => setCurrentSection('content')}
            className={`px-4 py-2 border-b-2 ${
              currentSection === 'content'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setCurrentSection('progress')}
            className={`px-4 py-2 border-b-2 ${
              currentSection === 'progress'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            Progress
          </button>
        </div>
      </div>
      <button
  onClick={() => onNavigate('practice')}
  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
>
  Start Practice
</button>
      {/* Main Content */}
      <div className="pt-40 px-6 space-y-6">
        {currentSection === 'content' ? (
          // Units and Topics
          <div className="space-y-6">
            {subjectContent.units.map((unit, unitIndex) => (
              <div 
                key={unitIndex}
                className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm ${
                  unit.locked ? 'opacity-75' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    {unit.completed ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : unit.locked ? (
                      <Lock className="text-gray-400" size={24} />
                    ) : (
                      <Play className="text-purple-600" size={24} />
                    )}
                    <h3 className="font-semibold text-gray-800">{unit.title}</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {unit.topics.map((topic, topicIndex) => (
                    <div 
                      key={topicIndex}
                      className={`p-4 border rounded-lg ${
                        topic.locked ? 'opacity-75' :
                        topic.completed ? 'bg-purple-50 border-purple-200' :
                        'hover:bg-purple-50 cursor-pointer'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          {topic.completed ? (
                            <CheckCircle className="text-green-500" size={20} />
                          ) : topic.locked ? (
                            <Lock className="text-gray-400" size={20} />
                          ) : (
                            <Play className="text-purple-600" size={20} />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-800">{topic.name}</h4>
                            <p className="text-sm text-gray-500">{topic.duration}</p>
                          </div>
                        </div>
                        {!topic.locked && !topic.completed && (
                          <button className="text-purple-600 hover:text-purple-700">
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Progress Section
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="text-purple-600" size={20} />
                  <h3 className="font-semibold text-gray-700">Study Time</h3>
                </div>
                <p className="mt-2 text-2xl font-bold text-purple-600">4.5 hrs</p>
                <p className="text-sm text-gray-500">This week</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-2">
                  <Target className="text-purple-600" size={20} />
                  <h3 className="font-semibold text-gray-700">Topics Completed</h3>
                </div>
                <p className="mt-2 text-2xl font-bold text-purple-600">7/12</p>
                <p className="text-sm text-gray-500">58% complete</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Performance Overview</h3>
              {/* Add charts or detailed statistics here */}
            </div>
          </div>
        )}
      </div>

      {showAiTutor && renderAiTutor()}
    </div>
  );
};

export default SubjectScreen;