import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/10 mt-auto glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">SkillLink</h3>
            <p className="text-gray-400">
              Your premium platform for learning, skill-sharing, and interview preparation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200">Dashboard</Link>
              </li>
              <li>
                <Link to="/skillswap" className="text-gray-400 hover:text-white transition-colors duration-200">SkillSwap</Link>
              </li>
              <li>
                <Link to="/interview-prep" className="text-gray-400 hover:text-white transition-colors duration-200">Interview Prep</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors duration-200">Profile</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📧 support@skilllink.com</li>
              <li>📱 +1 (555) 123-4567</li>
              <li>📍 123 Learning St, Education City</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} SkillLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 