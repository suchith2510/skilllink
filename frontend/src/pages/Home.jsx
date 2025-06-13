import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative text-center p-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-12 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent animate-pulse-slow" />
        <h1 className="relative text-5xl font-extrabold text-primary mb-6 tracking-tight drop-shadow-lg">
          Welcome to SkillLink
        </h1>
        <p className="relative text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
          Your premium platform for learning, skill-sharing, and interview preparation. Unlock your potential with curated resources and community support.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          { path: '/tutorials', label: '📚 Tutorials', desc: 'Explore curated learning resources.' },
          { path: '/skill-swap', label: '🤝 SkillSwap', desc: 'Exchange skills with the community.' },
          { path: '/interview-prep', label: '🧠 Interview Prep', desc: 'Prepare for your dream job.' }
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="group glass-card p-6 hover:-translate-y-1 hover:shadow-primary/30 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-primary mb-2">
              {link.label}
            </h3>
            <p className="text-gray-400 font-normal">
              {link.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* Login/Register Prompt */}
      {!isLoggedIn && (
        <div className="text-center p-8">
          <p className="text-xl text-gray-300 mb-6 font-light">
            Join the community to unlock exclusive features.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/login"
              className="glass-card text-primary px-8 py-3 rounded-xl text-lg font-medium hover:-translate-y-1 hover:shadow-primary/30 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn-primary px-8 py-3 rounded-xl text-lg font-semibold hover:-translate-y-1 hover:shadow-primary/30 transition-all duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
