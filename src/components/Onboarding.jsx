import React, { useState } from 'react';
import { Brain, Sparkles, Target, ChevronRight, Book, Lightbulb } from 'lucide-react';

const Onboarding = ({ onQuizComplete, onUserDataSubmit }) => {
  const [step, setStep] = useState('welcome');
  const [quizStep, setQuizStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    grade: '',
    subjects: []
  });

  const questions = [
    {
      question: "When you're learning something new, what helps you understand it best?",
      subtext: "This helps us personalize your content delivery",
      options: [
        { text: "Listening to someone explain it", icon: "👂", type: "Auditory" },
        { text: "Seeing diagrams, charts, or written instructions", icon: "👁️", type: "Visual" },
        { text: "Doing hands-on activities or trying it out yourself", icon: "🤚", type: "Kinesthetic" }
      ]
    },
    {
      question: "If you're following directions to assemble something, which method do you prefer?",
      subtext: "We'll adapt instructions to your style",
      options: [
        { text: "Listening to a person explain the steps", icon: "🗣️", type: "Auditory" },
        { text: "Reading a detailed manual or looking at pictures", icon: "📖", type: "Visual" },
        { text: "Assembling it step-by-step while figuring it out", icon: "🔧", type: "Kinesthetic" }
      ]
    },
    {
      question: "During a lecture or presentation, what do you do to stay focused?",
      options: [
        { text: "Listen carefully to the speaker's voice", icon: "🎧", type: "Auditory" },
        { text: "Look at slides, notes, or visuals provided", icon: "📊", type: "Visual" },
        { text: "Take notes or doodle while listening", icon: "✏️", type: "Kinesthetic" }
      ]
    },
    {
      question: "When you're trying to remember something, what do you usually do?",
      options: [
        { text: "Repeat it out loud or silently to yourself", icon: "🔁", type: "Auditory" },
        { text: "Picture it in your mind or visualize it on paper", icon: "🖼️", type: "Visual" },
        { text: "Write it down or physically practice it", icon: "📝", type: "Kinesthetic" }
      ]
    },
    {
      question: "How do you best recall a story you've read or heard?",
      options: [
        { text: "By remembering the conversations or dialogues", icon: "💭", type: "Auditory" },
        { text: "By visualizing the scenes or characters", icon: "🎬", type: "Visual" },
        { text: "By recalling the actions or events in the story", icon: "🎭", type: "Kinesthetic" }
      ]
    },
    {
      question: "What's your preferred way to study for a test?",
      options: [
        { text: "Reading notes out loud or explaining to someone", icon: "📢", type: "Auditory" },
        { text: "Using flashcards or drawing diagrams", icon: "📋", type: "Visual" },
        { text: "Creating practice problems and solving them", icon: "✍️", type: "Kinesthetic" }
      ]
    },
    {
      question: "If you're watching a tutorial, how do you engage with the material?",
      options: [
        { text: "Focus on listening to the explanation and tone", icon: "🎵", type: "Auditory" },
        { text: "Watch the screen closely for visuals", icon: "🔍", type: "Visual" },
        { text: "Follow along and practice each step", icon: "👆", type: "Kinesthetic" }
      ]
    },
    {
      question: "In a group project, what role do you usually prefer?",
      options: [
        { text: "Discussion leader or presenter", icon: "🎤", type: "Auditory" },
        { text: "Visual designer or organizer", icon: "🎨", type: "Visual" },
        { text: "Hands-on implementer or builder", icon: "🛠️", type: "Kinesthetic" }
      ]
    }
];

  const grades = [
    '9th Grade', '10th Grade', '11th Grade', '12th Grade', 'College', 'Other'
  ];

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: '📐' },
    { id: 'physics', name: 'Physics', icon: '⚡' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
    { id: 'biology', name: 'Biology', icon: '🧬' },
    { id: 'history', name: 'History', icon: '📚' },
    { id: 'literature', name: 'Literature', icon: '📖' }
  ];

  const handleQuizAnswer = (option) => {
    const newResponses = [...responses, option];
    setResponses(newResponses);

    if (quizStep < questions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const learningStyle = {
        type: newResponses[0].type,
        icon: newResponses[0].icon,
        description: `You learn best through ${newResponses[0].text.toLowerCase()}. We'll customize your learning experience accordingly.`,
        preferences: {
          timeOfDay: newResponses[1].type,
          progressStyle: newResponses[2].type
        }
      };

      console.log('Quiz completed:', { userData, learningStyle });
      
      // Submit both user data and quiz results
      onUserDataSubmit(userData);
      onQuizComplete(learningStyle);
    }
  };

  const renderWelcome = () => (
    <div className="space-y-6 max-w-md mx-auto pt-12">
      <div className="flex justify-center">
        <Brain size={48} className="text-purple-600 animate-pulse" />
      </div>
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">
        Smart Study Buddy
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300">
        Your AI-powered learning companion
      </p>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-yellow-500" size={24} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Welcome to Smart Learning
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Brain className="text-purple-600" size={20} />
            <p className="text-gray-600 dark:text-gray-300">AI-powered personalized learning</p>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="text-purple-600" size={20} />
            <p className="text-gray-600 dark:text-gray-300">Smart progress tracking</p>
          </div>
          <div className="flex items-center space-x-2">
            <Book className="text-purple-600" size={20} />
            <p className="text-gray-600 dark:text-gray-300">Interactive study sessions</p>
          </div>
        </div>
        <button 
          onClick={() => setStep('registration')}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
        >
          <span>Get Started</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderRegistration = () => (
    <div className="max-w-md mx-auto pt-12">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg space-y-6">
        <div className="flex items-center space-x-2">
          <Book className="text-purple-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Create Your Profile
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Age
            </label>
            <input
              type="number"
              value={userData.age}
              onChange={(e) => setUserData({...userData, age: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Grade Level
            </label>
            <select
              value={userData.grade}
              onChange={(e) => setUserData({...userData, grade: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select your grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Subjects
            </label>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => {
                    setUserData(prev => ({
                      ...prev,
                      subjects: prev.subjects.includes(subject.id)
                        ? prev.subjects.filter(id => id !== subject.id)
                        : [...prev.subjects, subject.id]
                    }));
                  }}
                  className={`p-3 border rounded-lg flex items-center space-x-2 transition-colors ${
                    userData.subjects.includes(subject.id)
                      ? 'bg-purple-50 border-purple-300 text-purple-700 dark:bg-purple-900/30 dark:border-purple-600 dark:text-purple-300'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{subject.icon}</span>
                  <span>{subject.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (userData.name && userData.age && userData.grade && userData.subjects.length > 0) {
              setStep('quiz');
            }
          }}
          disabled={!userData.name || !userData.age || !userData.grade || userData.subjects.length === 0}
          className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 
            ${userData.name && userData.age && userData.grade && userData.subjects.length > 0
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}
        >
          <span>Continue to Learning Style Quiz</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="max-w-md mx-auto pt-12">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg space-y-4">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Question {quizStep + 1} of {questions.length}
          </span>
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div 
                key={index}
                className={`h-2 w-8 rounded-full ${
                  index === quizStep 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {questions[quizStep].question}
          </h3>
          {questions[quizStep].subtext && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {questions[quizStep].subtext}
            </p>
          )}
        </div>
        
        <div className="space-y-3">
          {questions[quizStep].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleQuizAnswer(option)}
              className="w-full p-4 text-left border rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors dark:border-gray-600 dark:hover:bg-purple-900/30 flex items-center space-x-3"
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="text-gray-800 dark:text-white">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {step === 'welcome' && renderWelcome()}
      {step === 'registration' && renderRegistration()}
      {step === 'quiz' && renderQuiz()}
    </div>
  );
};

export default Onboarding;