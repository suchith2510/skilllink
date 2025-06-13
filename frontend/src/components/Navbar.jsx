import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-dark-lighter via-dark-lighter/95 to-dark-lighter backdrop-blur-md border-b border-white/5 shadow-[0_4px_20px_-4px_rgba(139,92,246,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="group relative flex items-center space-x-2"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-light to-accent-pink bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
              SkillLink
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent-pink transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {[
              { path: '/', label: 'Home' },
              { path: '/tutorials', label: 'Tutorials' },
              { path: '/quizzes', label: 'Quizzes' },
              { path: '/skillswap', label: 'Skill Swap' },
              { path: '/interview-prep', label: 'Interview Prep' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300
                  ${isActive(path) 
                    ? 'text-primary' 
                    : 'text-foreground-muted hover:text-foreground'
                  }
                  hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent-pink/5
                  rounded-lg
                  hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]
                  hover:-translate-y-0.5
                  active:scale-95
                  ${isActive(path) ? 'bg-gradient-to-r from-primary/10 to-accent-pink/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]' : ''}
                `}
              >
                {label}
                {isActive(path) && (
                  <span className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2 animate-pulse"></span>
                )}
              </Link>
            ))}

            {/* Auth Button */}
            {user ? (
              <button 
                onClick={logout}
                className="relative px-4 py-2 text-sm font-medium text-primary 
                  bg-gradient-to-r from-primary/10 to-accent-pink/10 
                  rounded-lg border border-primary/20
                  hover:from-primary/20 hover:to-accent-pink/20 
                  hover:border-primary/30
                  transition-all duration-300
                  hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]
                  hover:-translate-y-0.5
                  active:scale-95
                  hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent-pink/20"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login"
                className="relative px-4 py-2 text-sm font-medium text-primary 
                  bg-gradient-to-r from-primary/10 to-accent-pink/10 
                  rounded-lg border border-primary/20
                  hover:from-primary/20 hover:to-accent-pink/20 
                  hover:border-primary/30
                  transition-all duration-300
                  hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]
                  hover:-translate-y-0.5
                  active:scale-95
                  hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent-pink/20"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;