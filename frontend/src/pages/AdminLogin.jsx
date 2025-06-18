import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log('Attempting admin login with:', { email, password });
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);
      
      if (response.ok) {
        // Check if user is admin
        console.log('User role:', data.user.role);
        if (data.user.role === 'admin') {
          console.log('Admin login successful, setting localStorage...');
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', 'admin');
          localStorage.setItem('email', email);
          console.log('localStorage set, navigating to admin dashboard...');
          navigate('/admin-dashboard');
        } else {
          console.log('Access denied - user is not admin');
          setError('Access denied. Admin privileges required.');
        }
      } else {
        console.log('Login failed:', data.error);
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Error connecting to the server: ' + err.message);
    } finally {
      setIsLoading(false);
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
        <form onSubmit={handleSubmit} style={{
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
            disabled={isLoading}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#E2E8F0',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '1rem',
              outline: 'none',
              opacity: isLoading ? 0.7 : 1,
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#E2E8F0',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '1rem',
              outline: 'none',
              opacity: isLoading ? 0.7 : 1,
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '0.75rem',
              background: isLoading 
                ? 'rgba(168, 85, 247, 0.5)' 
                : 'linear-gradient(90deg, #A855F7 0%, #7C3AED 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.3s ease',
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseOver={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => !isLoading && (e.target.style.transform = 'translateY(0)')}
          >
            {isLoading ? 'Logging in...' : 'Login'}
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