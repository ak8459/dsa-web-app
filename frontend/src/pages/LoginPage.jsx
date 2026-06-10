import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, AlertCircle, BookCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-[radial-gradient(circle_at_top,_var(--color-bg-card)_0%,_var(--color-bg-main)_100%)]">
      <div className="w-full max-w-[420px] bg-bg-card border border-border-color rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)] animate-fadeIn">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BookCheck className="text-brand-primary w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">Welcome Back</h2>
          <p className="text-sm text-text-secondary">Sign in to track your coding progress</p>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 p-3 rounded-lg text-sm font-medium mb-5 bg-danger/10 border border-danger/20 text-danger">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-xs font-semibold mb-2 text-text-secondary uppercase tracking-wider" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-bg-input border border-border-color text-text-primary text-sm outline-none transition focus:border-brand-primary focus:shadow-[0_0_0_2px_rgba(99,102,241,0.15)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold mb-2 text-text-secondary uppercase tracking-wider" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-bg-input border border-border-color text-text-primary text-sm outline-none transition focus:border-brand-primary focus:shadow-[0_0_0_2px_rgba(99,102,241,0.15)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="w-full py-3 rounded-lg bg-brand-primary hover:bg-brand-hover text-white font-semibold text-sm cursor-pointer flex items-center justify-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed" disabled={loading}>
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-5 text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-primary hover:underline font-semibold cursor-pointer">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
