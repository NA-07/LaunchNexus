import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Brain } from 'lucide-react';
import { generateAIInsights, answerStudentQuestion } from '../../utils/aiInsights';

const AIAssistant = ({ student, isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [insights, setInsights] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (student) {
      setInsights(generateAIInsights(student));
      
      // Welcome message
      setMessages([{
        type: 'ai',
        content: `Hi! I'm your AI College Advisor. I've analyzed ${student.name}'s profile and I'm ready to help! You can ask me about:\n\n• College recommendations\n• Strengths & weaknesses\n• Admission chances\n• How to improve the profile\n• Timeline & next steps\n\nWhat would you like to know?`,
        timestamp: new Date()
      }]);
    }
  }, [student]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !student) return;

    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = answerStudentQuestion(student, input);
      
      const aiMessage = {
        type: 'ai',
        content: response.answer,
        confidence: response.confidence,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI College Advisor</h2>
              <p className="text-purple-100 text-sm">Powered by Advanced Analytics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Insights Summary */}
        {insights && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 border-b">
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{insights.overallScore}</div>
                <div className="text-xs text-gray-600 mt-1">Overall Score</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-green-600">{insights.strengths.length}</div>
                <div className="text-xs text-gray-600 mt-1">Key Strengths</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-orange-600">{insights.growthOpportunities.length}</div>
                <div className="text-xs text-gray-600 mt-1">Growth Areas</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{Math.round(insights.admissionPredictions.topPublic)}%</div>
                <div className="text-xs text-gray-600 mt-1">Top Public Odds</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Questions */}
        <div className="bg-gray-50 p-4 border-b">
          <p className="text-sm font-semibold text-gray-700 mb-2">Quick Questions:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleQuickQuestion("What are my top strengths?")}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              💪 Top Strengths
            </button>
            <button
              onClick={() => handleQuickQuestion("Which colleges should I apply to?")}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              🎓 College Match
            </button>
            <button
              onClick={() => handleQuickQuestion("What should I improve?")}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              📈 How to Improve
            </button>
            <button
              onClick={() => handleQuickQuestion("What are my admission chances?")}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              🎯 Admission Odds
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.type === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-600">AI Advisor</span>
                  </div>
                )}
                <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                {message.confidence && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Confidence:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5 max-w-[100px]">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full"
                          style={{ width: `${message.confidence * 100}%` }}
                        />
                      </div>
                      <span>{Math.round(message.confidence * 100)}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about this student's profile..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
