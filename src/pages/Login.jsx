import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../utils/localStorage';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const result = loginUser(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    login(result.user);
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <p className="auth-subtitle">Sign in to book movie tickets</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
