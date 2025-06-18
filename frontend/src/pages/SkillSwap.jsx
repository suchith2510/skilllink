import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SkillSwap() {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    offeredSkill: '',
    desiredSkill: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [premiumStatus, setPremiumStatus] = useState({
    isPremium: true,
    skillSwapEnabled: true,
    subscriptionPlan: 'premium',
    subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn, isAdmin } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/skill-swap' } });
      return;
    }
  }, [isLoggedIn, navigate]);

  // Don't render anything if not logged in
  if (!isLoggedIn) {
    return null;
  }

  const userEmail = user?.email || localStorage.getItem('email') || '';

  const categories = [
    { id: 'all', label: 'All Skills', icon: '🌟' },
    { id: 'tech', label: 'Technology', icon: '💻' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'language', label: 'Languages', icon: '🌍' },
    { id: 'creative', label: 'Creative', icon: '🎭' }
  ];

  // Add dummy data
  const dummySkills = [
    {
      _id: '1',
      userEmail: 'sarah.designer@email.com',
      offeredSkill: 'UI/UX Design',
      desiredSkill: 'Frontend Development',
      description: 'Experienced UI/UX designer looking to exchange design skills for frontend development expertise. I specialize in Figma and Adobe XD.',
      availability: 'Available',
      skillLevel: 'Expert',
      preferredSchedule: 'Weekends',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      _id: '2',
      userEmail: 'mike.dev@email.com',
      offeredSkill: 'React Development',
      desiredSkill: 'Backend Development',
      description: 'Senior React developer offering to teach React and modern frontend practices in exchange for Node.js and Express expertise.',
      availability: 'Available',
      skillLevel: 'Advanced',
      preferredSchedule: 'Evenings',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
    },
    {
      _id: '3',
      userEmail: 'emma.language@email.com',
      offeredSkill: 'Spanish Language',
      desiredSkill: 'French Language',
      description: 'Native Spanish speaker offering conversational Spanish lessons. Looking to learn French from a native speaker.',
      availability: 'Not Available',
      skillLevel: 'Native',
      preferredSchedule: 'Weekdays',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    {
      _id: '4',
      userEmail: 'alex.business@email.com',
      offeredSkill: 'Business Strategy',
      desiredSkill: 'Digital Marketing',
      description: 'Business consultant with 5 years of experience in strategy. Looking to learn digital marketing and social media management.',
      availability: 'Available',
      skillLevel: 'Professional',
      preferredSchedule: 'Flexible',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
    },
    {
      _id: '5',
      userEmail: 'lisa.creative@email.com',
      offeredSkill: 'Photography',
      desiredSkill: 'Video Editing',
      description: 'Professional photographer offering lessons in composition and editing. Want to learn video editing and post-production.',
      availability: 'Available',
      skillLevel: 'Professional',
      preferredSchedule: 'Weekends',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8 hours ago
    },
    {
      _id: '6',
      userEmail: 'john.music@email.com',
      offeredSkill: 'Guitar Lessons',
      desiredSkill: 'Piano Lessons',
      description: 'Classical guitarist with 10 years of teaching experience. Looking to learn piano from a skilled pianist.',
      availability: 'Not Available',
      skillLevel: 'Expert',
      preferredSchedule: 'Evenings',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36) // 36 hours ago
    }
  ];

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setSkills(dummySkills);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { offeredSkill, desiredSkill, description } = formData;
    if (!offeredSkill || !desiredSkill || !description) {
      setError('All fields are required');
      return;
    }

    // Simulate successful submission with dummy data
    const newSkill = {
      _id: Date.now().toString(),
      userEmail: userEmail,
      offeredSkill,
      desiredSkill,
      description,
      availability: 'Available',
      skillLevel: 'Intermediate',
      preferredSchedule: 'Flexible',
      createdAt: new Date()
    };

    setSuccess('Skill listing added successfully');
    setFormData({ offeredSkill: '', desiredSkill: '', description: '' });
    setSkills([newSkill, ...skills]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill listing?')) return;

    // Simulate successful deletion
    setSuccess('Skill listing deleted successfully');
    setSkills(skills.filter(skill => skill._id !== id));
  };

  const handleConnect = async (skillId, email) => {
    // Simulate successful connection
    alert(`Connection request sent to ${email}! They will contact you soon.`);
  };

  const handleUpgrade = () => {
    navigate('/upgrade'); // Navigate to the upgrade page
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      minHeight: '100vh',
    }}>
      {/* Hero Section - Simplified */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem',
        background: 'rgba(168, 85, 247, 0.05)',
        borderRadius: '20px',
        border: '1px solid rgba(168, 85, 247, 0.1)',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#FFFFFF',
          marginBottom: '1rem',
          fontWeight: '700',
        }}>
          SkillSwap Marketplace
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#E2E8F0',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6',
        }}>
          Find the perfect skill exchange partner. Share your expertise and learn something new.
        </p>
      </div>

      {/* Category Filter - Simplified */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            style={{
              padding: '0.75rem 1.25rem',
              background: selectedCategory === category.id
                ? 'linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)'
                : 'rgba(255, 255, 255, 0.05)',
              color: selectedCategory === category.id ? '#FFFFFF' : '#E2E8F0',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseOver={(e) => {
              if (selectedCategory !== category.id) {
                e.target.style.background = 'rgba(168, 85, 247, 0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (selectedCategory !== category.id) {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Add Skill Form - Simplified */}
      {userEmail && (
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#FFFFFF',
            marginBottom: '1.5rem',
            fontWeight: '600',
          }}>
            Add Your Skill Exchange
          </h2>
          {error && (
            <p style={{
              color: '#F87171',
              textAlign: 'center',
              padding: '0.75rem',
              background: 'rgba(248, 113, 113, 0.1)',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}>
              {error}
            </p>
          )}
          {success && (
            <p style={{
              color: '#34D399',
              textAlign: 'center',
              padding: '0.75rem',
              background: 'rgba(52, 211, 153, 0.1)',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}>
              {success}
            </p>
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            <div>
              <label style={{
                display: 'block',
                color: '#A0AEC0',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
              }}>
                I can teach
              </label>
              <input
                type="text"
                name="offeredSkill"
                placeholder="e.g., Python Development"
                value={formData.offeredSkill}
                onChange={handleFormChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#E2E8F0',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                color: '#A0AEC0',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
              }}>
                I want to learn
              </label>
              <input
                type="text"
                name="desiredSkill"
                placeholder="e.g., UI/UX Design"
                value={formData.desiredSkill}
                onChange={handleFormChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#E2E8F0',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                color: '#A0AEC0',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
              }}>
                About the exchange
              </label>
              <input
                type="text"
                name="description"
                placeholder="Tell us about your experience and expectations"
                value={formData.description}
                onChange={handleFormChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#E2E8F0',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>
            <button
              onClick={handleFormSubmit}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                alignSelf: 'end',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <span>✨</span>
              Post Exchange
            </button>
          </div>
        </div>
      )}

      {/* Skill Listings - Simplified */}
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '3rem',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(168, 85, 247, 0.3)',
            borderTop: '3px solid #A855F7',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
        </div>
      ) : skills.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {skills.map((skill) => (
            <div
              key={skill._id}
              style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s ease',
                position: 'relative',
                opacity: skill.availability === 'Not Available' ? 0.7 : 1,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.5rem 1rem',
                background: skill.availability === 'Available' 
                  ? 'rgba(52, 211, 153, 0.1)'
                  : 'rgba(156, 163, 175, 0.1)',
                color: skill.availability === 'Available' 
                  ? '#34D399'
                  : '#9CA3AF',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}>
                {skill.availability}
              </div>

              {/* Skill Exchange */}
              <div style={{
                marginBottom: '1rem',
                paddingRight: '100px',
              }}>
                <div style={{
                  color: '#A855F7',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                }}>
                  Skill Exchange
                </div>
                <h2 style={{
                  fontSize: '1.25rem',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  lineHeight: '1.4',
                }}>
                  {skill.offeredSkill} ↔ {skill.desiredSkill}
                </h2>
              </div>

              {/* User Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                color: '#A0AEC0',
                fontSize: '0.9rem',
              }}>
                <span>👤</span>
                {skill.userEmail}
              </div>

              {/* Description */}
              <p style={{
                color: '#E2E8F0',
                fontSize: '0.95rem',
                marginBottom: '1.5rem',
                lineHeight: '1.5',
              }}>
                {skill.description}
              </p>

              {/* Details */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}>
                <div style={{
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(168, 85, 247, 0.1)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#A855F7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <span>🎯</span>
                  {skill.skillLevel}
                </div>
                <div style={{
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(168, 85, 247, 0.1)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#A855F7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <span>🕒</span>
                  {skill.preferredSchedule}
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
              }}>
                <button
                  onClick={() => handleConnect(skill._id, skill.userEmail)}
                  disabled={skill.availability === 'Not Available'}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: skill.availability === 'Available'
                      ? 'linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)'
                      : 'rgba(156, 163, 175, 0.1)',
                    color: skill.availability === 'Available' ? '#FFFFFF' : '#9CA3AF',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: skill.availability === 'Available' ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span>🤝</span>
                  {skill.availability === 'Available' ? 'Connect' : 'Unavailable'}
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(skill._id)}
                    style={{
                      padding: '0.75rem',
                      background: 'rgba(248, 113, 113, 0.1)',
                      color: '#F87171',
                      border: '1px solid rgba(248, 113, 113, 0.2)',
                      borderRadius: '12px',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>🗑️</span>
                    Delete
                  </button>
                )}
              </div>

              {/* Posted Date */}
              <div style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: '#6B7280',
                textAlign: 'right',
              }}>
                Posted {new Date(skill.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <p style={{
            fontSize: '1.1rem',
            color: '#A0AEC0',
            marginBottom: '0.5rem',
          }}>
            No skill exchanges available yet
          </p>
          <p style={{
            color: '#E2E8F0',
            fontSize: '0.95rem',
          }}>
            Be the first to post your skill exchange!
          </p>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default SkillSwap;