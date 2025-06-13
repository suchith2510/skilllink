import { useState, useEffect } from 'react';
import ATSResumeAnalyzer from '../components/ATSResumeAnalyzer';

function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('interview'); // 'interview' or 'resume'
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/interview/questions');
      const data = await response.json();
      if (response.ok) {
        setQuestions(data.questions || []);
        setCurrentQuestion(data.questions[0] || null);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch questions');
      }
    } catch (err) {
      setError('Error connecting to the server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    setFeedback('');

    if (!answer) {
      setError('Please provide an answer');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/interview/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer }),
      });

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
        setFeedback(data.feedback);
      } else {
        setError(data.error || 'Failed to predict answer');
      }
    } catch (err) {
      setError('Error connecting to the server: ' + err.message);
    }
  };

  const handleNextQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
    const nextIndex = (currentIndex + 1) % questions.length;
    setCurrentQuestion(questions[nextIndex]);
    setAnswer('');
    setPrediction(null);
    setFeedback('');
    setError(null);
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      minHeight: '100vh',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#A855F7',
        textAlign: 'center',
        marginBottom: '2rem',
        fontWeight: 'bold',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      }}>
        Interview Preparation
      </h1>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        justifyContent: 'center',
      }}>
        <button
          onClick={() => setActiveTab('interview')}
          style={{
            padding: '0.75rem 1.5rem',
            background: activeTab === 'interview'
              ? 'linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)'
              : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'interview' ? '#FFFFFF' : '#E2E8F0',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>🎯</span>
          Practice Questions
        </button>
        <button
          onClick={() => setActiveTab('resume')}
          style={{
            padding: '0.75rem 1.5rem',
            background: activeTab === 'resume'
              ? 'linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)'
              : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === 'resume' ? '#FFFFFF' : '#E2E8F0',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>📄</span>
          Resume Analyzer
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'interview' ? (
        loading ? (
          <p style={{
            color: '#E2E8F0',
            textAlign: 'center',
            fontSize: '1.1rem',
          }}>
            Loading questions...
          </p>
        ) : questions.length > 0 && currentQuestion ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              color: '#E2E8F0',
              marginBottom: '1rem',
            }}>
              {currentQuestion.question}
            </h2>
            <p style={{
              color: '#A0AEC0',
              fontSize: '0.9rem',
              marginBottom: '1rem',
            }}>
              Category: {currentQuestion.category}
            </p>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              style={{
                width: '100%',
                height: '150px',
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#E2E8F0',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '1rem',
                outline: 'none',
                resize: 'none',
              }}
            />
            {error && (
              <p style={{
                color: '#F87171',
                textAlign: 'center',
                fontSize: '1rem',
                marginTop: '1rem',
              }}>
                {error}
              </p>
            )}
            {prediction && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: prediction === 'Good' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                borderRadius: '8px',
              }}>
                <p style={{
                  color: prediction === 'Good' ? '#34D399' : '#F87171',
                  fontSize: '1rem',
                  fontWeight: '500',
                }}>
                  Prediction: {prediction}
                </p>
                <p style={{
                  color: '#D1D5DB',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem',
                }}>
                  {feedback}
                </p>
              </div>
            )}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
              justifyContent: 'center',
            }}>
              <button
                onClick={handleAnswerSubmit}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
              >
                Submit Answer
              </button>
              <button
                onClick={handleNextQuestion}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(90deg, #6B7280 0%, #4B5563 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
              >
                Next Question
              </button>
            </div>
          </div>
        ) : (
          <p style={{
            color: '#E2E8F0',
            textAlign: 'center',
            fontSize: '1.1rem',
          }}>
            No questions available.
          </p>
        )
      ) : (
        <ATSResumeAnalyzer />
      )}
    </div>
  );
}

export default InterviewPrep;