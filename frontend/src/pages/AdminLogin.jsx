import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_ENDPOINTS from '../config.js';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user.role === 'admin') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('email', data.user.email);
        navigate('/admin-dashboard');
      } else {
        setError('Invalid credentials or insufficient privileges');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      padding: '2rem',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: '#A855F7',
          marginBottom: '1.5rem',
          fontWeight: 'bold',
        }}>
          Admin Login
        </h2>
        {error && (
          <p style={{
            color: '#F87171',
            marginBottom: '1rem',
            fontSize: '1rem',
          }}>
            {error}
          </p>
        )}
        <form onSubmit={handleLogin} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#E2E8F0',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '1rem',
              outline: 'none',
              opacity: loading ? 0.7 : 1,
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#E2E8F0',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '1rem',
              outline: 'none',
              opacity: loading ? 0.7 : 1,
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem',
              background: loading 
                ? 'rgba(168, 85, 247, 0.5)' 
                : 'linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.3s ease',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <p style={{
            color: '#9CA3AF',
            fontSize: '0.875rem',
            marginBottom: '0.5rem',
          }}>
            Admin Credentials:
          </p>
          <p style={{
            color: '#D1D5DB',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '0.5rem',
            borderRadius: '4px',
            margin: '0.25rem 0',
          }}>
            Email: admin@skilllink.com
          </p>
          <p style={{
            color: '#D1D5DB',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '0.5rem',
            borderRadius: '4px',
            margin: '0.25rem 0',
          }}>
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;