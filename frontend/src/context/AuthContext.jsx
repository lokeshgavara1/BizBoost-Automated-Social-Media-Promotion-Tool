import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

// Create context
const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize dark mode from localStorage or user preferences
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  // Validate token and get user info on app startup
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Verify token is valid by making a request to the verify endpoint
          const response = await axios.get('/auth/verify');
          if (response.data.user) {
            setUser(response.data.user);
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('bizboost-user');
          }
        } catch (error) {
          // Token is invalid or expired, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('bizboost-user');
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("bizboost-user", JSON.stringify(user));
      // Load dark mode from user preferences if available
      if (user.preferences?.darkMode !== undefined) {
        setDarkMode(user.preferences.darkMode);
      }
    } else {
      localStorage.removeItem("bizboost-user");
    }
  }, [user]);

  // Persist dark mode to localStorage and apply theme
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    
    // Also update body class for additional styling if needed
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('/auth/register', {
        name,
        email,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user || { email, name });
        return response.data;
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user || { email });
        return response.data;
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  // Google OAuth login
  const loginWithGoogle = (token, userData) => {
    console.log('AuthContext - loginWithGoogle called with:', { token: token ? 'present' : 'missing', userData });
    localStorage.setItem('token', token);
    localStorage.setItem('bizboost-user', JSON.stringify(userData));
    setUser(userData);
    console.log('AuthContext - User state updated:', userData);
    return { token, user: userData };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('bizboost-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      register, 
      login, 
      loginWithGoogle,
      logout, 
      loading,
      darkMode,
      setDarkMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};
