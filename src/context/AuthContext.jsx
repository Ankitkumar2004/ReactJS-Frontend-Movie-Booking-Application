import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_USER_KEY = 'movie_booking_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_USER_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (_) {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
