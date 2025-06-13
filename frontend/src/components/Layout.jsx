import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/admin-login') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setUserRole('');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        background: 'linear-gradient(90deg, #1E293B 0%, #0F172A 100%)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <h1 style={{
            fontSize: '1.5rem',
            color: '#A855F7',
            fontWeight: 'bold',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            margin: 0,
          }}>
            SkillLink
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/" style={{
              color: '#E2E8F0',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
              onMouseOver={(e) => (e.target.style.color = '#A855F7')}
              onMouseOut={(e) => (e.target.style.color = '#E2E8F0')}>
              Home
            </a>
            <a href="/tutorials" style={{
              color: '#E2E8F0',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
              onMouseOver={(e) => (e.target.style.color = '#A855F7')}
              onMouseOut={(e) => (e.target.style.color = '#E2E8F0')}>
              Tutorials
            </a>
            <a href="/quizzes" style={{
              color: '#E2E8F0',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
              onMouseOver={(e) => (e.target.style.color = '#A855F7')}
              onMouseOut={(e) => (e.target.style.color = '#E2E8F0')}>
              Quizzes
            </a>
            <a href="/code-editor" style={{
              color: '#E2E8F0',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
              onMouseOver={(e) => (e.target.style.color = '#A855F7')}
              onMouseOut={(e) => (e.target.style.color = '#E2E8F0')}>
              Code Editor
            </a>
            <a href="/interview-prep" style={{
              color: '#E2E8F0',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
              onMouseOver={(e) => (e.target.style.color = '#A855F7')}
              onMouseOut={(e) => (e.target.style.color = '#E2E8F0')}>
              Interview Prep
            </a>
            <a href="/skill-swap" style={{
              color: '#E2E8F0',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
              onMouseOver={(e) => (e.target.style.color = '#A855F7')}
              onMouseOut={(e) => (e.target.style.color = '#E2E8F0')}>
              SkillSwap
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {userRole ? (
            <>
              <span style={{ color: '#D1D5DB', fontSize: '0.9rem' }}>
                Logged in as: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(90deg, #F87171 0%, #EF4444 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/login" style={{
              color: '#E2E8F0',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
              onMouseOver={(e) => (e.target.style.color = '#A855F7')}
              onMouseOut={(e) => (e.target.style.color = '#E2E8F0')}>
              Login
            </a>
          )}
        </div>
      </nav>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{
        background: '#1E293B',
        padding: '1rem',
        textAlign: 'center',
        color: '#D1D5DB',
        fontSize: '0.9rem',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)',
      }}>
        © 2025 SkillLink. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;