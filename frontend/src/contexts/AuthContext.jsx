import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    console.log('Initial token check:', token ? 'Token exists' : 'No token'); // Debug log
    if (token) {
      setIsLoggedIn(true);
      // Fetch user data
      fetchUserData(token);
    }
    setLoading(false);
  }, []);

  const fetchUserData = async (token) => {
    try {
      console.log('Fetching user data...'); // Debug log
      const response = await fetch('http://localhost:3000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        console.log('User data fetched:', userData); // Debug log
        localStorage.setItem('role', userData.role);
        localStorage.setItem('email', userData.email);
        setUser(userData);
      } else {
        console.log('Invalid token, clearing auth state'); // Debug log
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration with:', userData); // Debug log
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      console.log('Registration response status:', response.status); // Debug log
      const data = await response.json();
      console.log('Registration response data:', data); // Debug log
      if (!response.ok) { throw new Error(data.error || 'Registration failed'); }
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('email', data.user.email);
      setIsLoggedIn(true);
      setUser(data.user);
      return true;
    } catch (error) { console.error('Registration error:', error); throw error; }
  };

  const login = async (credentials) => {
    try {
      console.log('Attempting login with:', credentials); // Debug log
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      console.log('Login response status:', response.status); // Debug log
      const data = await response.json();
      console.log('Login response data:', data); // Debug log
      if (!response.ok) { throw new Error(data.error || 'Login failed'); }
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('email', data.user.email);
      setIsLoggedIn(true);
      setUser(data.user);
      console.log('Login successful, user state updated'); // Debug log
      return true;
    } catch (error) { console.error('Login error in AuthContext:', error); throw error; }
  };

  const logout = async () => {
    console.log('Logging out...'); // Debug log
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Call backend logout endpoint
        await fetch('http://localhost:3000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      setIsLoggedIn(false);
      setUser(null);
      console.log('Logout complete'); // Debug log
    }
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 