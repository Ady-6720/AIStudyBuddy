import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  ChevronLeft, 
  Target, 
  HelpCircle, 
  CheckCircle, 
  XCircle,
  BookOpen,
  RefreshCw,
  MessageSquare
} from 'lucide-react';

const PracticeScreen = ({ subject, topic, onBack }) => {
  const [difficulty, setDifficulty] = useState(0.5); // 0-1 scale
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [performance, setPerformance] = useState({
    correct: 0,
    total: 0,
    streak: 0
  });

  // Simulated AI-generated problems based on difficulty
  const generateProblem = (diff) => {
    // Example for math problems
    const problems = {
      easy: {
        question: "Solve: 2x + 3 = 7",
        answer: "2",
        hints: ["Subtract 3 from both sides", "Divide by 2"],
        explanation: "First subtract 3 from both sides: 2x = 4, then divide by 2: x = 2"
      },
      medium: {
        question: "Solve: 3x² + 6x = 0",
        answer: "0,-2",
        hints: ["Factor out common terms", "Use the zero product property"],
        explanation: "Factor out 3x: 3x(x + 2) = 0, therefore x = 0 or x = -2"
      },
      hard: {
        question: "Solve: x² - 4x + 4 = 0",
        answer: "2",
        hints: ["This is a perfect square trinomial", "Think about (x-2)²"],
        explanation: "This is (x-2)² = 0, therefore x = 2"
      }
    };

    if (diff < 0.4) return problems.easy;
    if (diff < 0.7) return problems.medium;
    return problems.hard;
  };

  // AI difficulty adjustment based on performance
  useEffect(() => {
    if (performance.total > 0) {
      const successRate = performance.correct / performance.total;
      const newDifficulty = Math.max(0.2, Math.min(0.9, 
        difficulty + (successRate > 0.7 ? 0.1 : -0.1)
      ));
      setDifficulty(newDifficulty);
    }
  }, [performance]);

  // Generate new problem when difficulty changes
  useEffect(() => {
    setCurrentProblem(generateProblem(difficulty));
  }, [difficulty]);

  const handleSubmit = () => {
    const isCorrect = userAnswer === currentProblem.answer;
    setFeedback({
      correct: isCorrect,
      message: isCorrect ? 
        "Great job! Let's try another one." : 
        "Not quite right. Would you like a hint?"
    });

    setPerformance(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
      streak: isCorrect ? prev.streak + 1 : 0
    }));

    if (isCorrect) {
      setTimeout(() => {
        setUserAnswer('');
        setFeedback(null);
        setShowHint(false);
        setCurrentProblem(generateProblem(difficulty));
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-40">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronLeft size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{subject}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{topic}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-purple-600 dark:text-purple-400">
              Level {Math.round(difficulty * 10)}
            </span>
            <Brain className="text-purple-600 dark:text-purple-400" size={24} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
              style={{ width: `${(performance.correct / Math.max(1, performance.total)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 px-6 pb-20">
        {/* Problem Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm space-y-6">
          {/* Performance Stats */}
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Correct: {performance.correct}/{performance.total}</span>
            <span>Streak: {performance.streak} 🔥</span>
          </div>

          {/* Question */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentProblem?.question}
            </h2>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your answer"
            />
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-4 rounded-lg ${
              feedback.correct ? 
                'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 
                'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}>
              <div className="flex items-center space-x-2">
                {feedback.correct ? <CheckCircle size={20} /> : <XCircle size={20} />}
                <span>{feedback.message}</span>
              </div>
            </div>
          )}

          {/* Hint */}
          {!feedback?.correct && currentProblem?.hints && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowHint(true)}
                className="text-purple-600 dark:text-purple-400 flex items-center space-x-2"
              >
                <HelpCircle size={20} />
                <span>Need a hint?</span>
              </button>
            </div>
          )}

          {showHint && (
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <p className="text-purple-700 dark:text-purple-300">
                💡 {currentProblem.hints[0]}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Target size={20} />
              <span>Check Answer</span>
            </button>
            <button
              onClick={() => {
                setCurrentProblem(generateProblem(difficulty));
                setUserAnswer('');
                setFeedback(null);
                setShowHint(false);
              }}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* AI Assistant Button */}
        <button
          className="fixed bottom-24 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        >
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
};

export default PracticeScreen;