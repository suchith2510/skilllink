import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an auth context

// Tutorial categories with their respective tutorials
const tutorialCategories = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Master modern web development technologies',
    icon: '🌐',
    tutorials: [
      {
        id: 'react-basics',
        title: 'React Fundamentals',
        description: 'Learn the core concepts of React and build your first application',
        level: 'Beginner',
        duration: '4 hours',
        topics: ['Components', 'Props', 'State', 'Hooks'],
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        courseUrl: 'https://www.coursera.org/learn/react-basics',
      },
      {
        id: 'node-express',
        title: 'Node.js & Express',
        description: 'Build scalable backend applications with Node.js and Express',
        level: 'Intermediate',
        duration: '6 hours',
        topics: ['REST APIs', 'Middleware', 'Authentication', 'Database Integration'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        courseUrl: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/',
      },
      {
        id: 'next-js',
        title: 'Next.js Mastery',
        description: 'Build production-ready React applications with Next.js',
        level: 'Advanced',
        duration: '8 hours',
        topics: ['Server-Side Rendering', 'Static Generation', 'API Routes', 'Deployment'],
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        courseUrl: 'https://www.udemy.com/course/nextjs-react-the-complete-guide/',
      },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Explore data analysis and machine learning',
    icon: '📊',
    tutorials: [
      {
        id: 'python-ml',
        title: 'Python for Machine Learning',
        description: 'Learn machine learning fundamentals with Python',
        level: 'Intermediate',
        duration: '10 hours',
        topics: ['NumPy', 'Pandas', 'Scikit-learn', 'Model Training'],
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        courseUrl: 'https://www.coursera.org/learn/machine-learning-with-python',
      },
      {
        id: 'data-visualization',
        title: 'Data Visualization',
        description: 'Create compelling data visualizations',
        level: 'Beginner',
        duration: '5 hours',
        topics: ['Matplotlib', 'Seaborn', 'Plotly', 'Interactive Charts'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        courseUrl: 'https://www.coursera.org/learn/data-visualization',
      },
    ],
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Development',
    description: 'Build cross-platform mobile applications',
    icon: '📱',
    tutorials: [
      {
        id: 'react-native',
        title: 'React Native Basics',
        description: 'Create mobile apps with React Native',
        level: 'Intermediate',
        duration: '7 hours',
        topics: ['Components', 'Navigation', 'State Management', 'Native Modules'],
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        courseUrl: 'https://www.udemy.com/course/react-native-the-practical-guide/',
      },
      {
        id: 'flutter',
        title: 'Flutter Development',
        description: 'Build beautiful apps with Flutter',
        level: 'Beginner',
        duration: '8 hours',
        topics: ['Widgets', 'State Management', 'Navigation', 'Platform Integration'],
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
        courseUrl: 'https://www.udemy.com/course/flutter-bootcamp-with-dart/',
      },
    ],
  },
];

function Tutorials() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('web-dev');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    const category = tutorialCategories.find(cat => cat.id === selectedCategory);
    if (category) {
      let filtered = category.tutorials;
      
      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(tutorial =>
          tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply level filter
      if (selectedLevel !== 'all') {
        filtered = filtered.filter(tutorial => tutorial.level === selectedLevel);
      }

      setFilteredTutorials(filtered);
    }
  }, [selectedCategory, searchQuery, selectedLevel]);

  const handleTutorialClick = (tutorial) => {
    // Check authentication using localStorage token
    const token = localStorage.getItem('token');
    const isUserLoggedIn = token && token.length > 0;

    if (isUserLoggedIn) {
      // User is logged in - proceed with direct access
      if (tutorial.courseUrl) {
        // For external courses, open in new tab
        window.open(tutorial.courseUrl, '_blank', 'noopener,noreferrer');
      } else {
        // For internal tutorials, navigate to the page
        navigate(`/tutorials/${tutorial.id}`);
      }
    } else {
      // User is not logged in - redirect to login
      // Store the current tutorial info for after login
      const redirectInfo = {
        tutorialId: tutorial.id,
        courseUrl: tutorial.courseUrl,
        timestamp: new Date().getTime()
      };
      localStorage.setItem('tutorialRedirect', JSON.stringify(redirectInfo));
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Tutorials</h1>
        <p className="text-gray-400 text-lg">
          Explore our comprehensive collection of tutorials designed to help you master new skills
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Categories and Tutorials */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Categories</h2>
              <div className="space-y-2">
                {tutorialCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3 ${
                      selectedCategory === category.id
                        ? 'bg-primary/20 text-primary'
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span>{category.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tutorials Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-primary/50 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleTutorialClick(tutorial)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        // Fallback image if the main image fails to load
                        e.target.src = 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
                        {tutorial.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{tutorial.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tutorial.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm bg-gray-700/50 text-gray-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        Duration: {tutorial.duration}
                      </span>
                      <div className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors duration-200">
                        {tutorial.courseUrl ? 'View Course' : 'Start Learning'}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTutorials.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No tutorials found</h3>
                <p className="text-gray-400">
                  Try adjusting your search or filters to find what you're looking for
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorials;