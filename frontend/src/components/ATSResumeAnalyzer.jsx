import { useState } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../config.js';

const ATSResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError(null);
    if (!selectedFile) return;

    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }

    if (selectedFile.size > maxSize) {
      setError('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const token = localStorage.getItem('token');
      const response = await axios.post(API_ENDPOINTS.INTERVIEW.ANALYZE_RESUME, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.questions && response.data.questions.length > 0) {
        setAnalysis(response.data);
      } else {
        setAnalysis({ message: 'No matching skills found in resume' });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ATS Resume Analyzer</h2>
      
      {/* Upload Section */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${error ? 'border-red-500' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="resume-upload"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        <label
          htmlFor="resume-upload"
          className="cursor-pointer block"
        >
          <div className="space-y-4">
            <div className="text-4xl text-gray-400">
              <i className="fas fa-file-upload"></i>
            </div>
            <div className="text-gray-600">
              {file ? (
                <div className="flex items-center justify-center space-x-2">
                  <i className="fas fa-file-alt text-blue-500"></i>
                  <span>{file.name}</span>
                </div>
              ) : (
                <>
                  <p className="font-medium">Drag and drop your resume here</p>
                  <p className="text-sm">or click to browse</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: PDF, DOC, DOCX (max 5MB)
                  </p>
                </>
              )}
            </div>
          </div>
        </label>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!file || isAnalyzing}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white
          ${!file || isAnalyzing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {isAnalyzing ? (
          <span className="flex items-center justify-center">
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Analyzing...
          </span>
        ) : (
          'Analyze Resume'
        )}
      </button>

      {/* Analysis Results */}
      {analysis && (
        <div className="mt-8 space-y-6">
          {/* Overall Score */}
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-gray-50">
              <div className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Overall ATS Score</div>
            </div>
          </div>

          {/* Detailed Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(analysis.scores).map(([category, score]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{category}</span>
                  <span className={`font-semibold ${getScoreColor(score)}`}>
                    {score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      score >= 80 ? 'bg-green-500' :
                      score >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Recommendations
            </h3>
            <ul className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start text-blue-700">
                  <i className="fas fa-lightbulb mt-1 mr-2 text-blue-500"></i>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSResumeAnalyzer; 