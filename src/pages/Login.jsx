import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await api.login(formData.email, formData.password);
      login(data.payload.token, data.payload.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] -z-10"></div>

      <div className="glass max-w-md w-full p-8 rounded-3xl border-t border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-[40px]"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-500/20 rounded-full blur-[40px]"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-blue-500 via-slate-400 to-pink-500 flex items-center justify-center text-white font-black text-3xl shadow-[0_0_20px_rgba(59,130,246,0.5)] transform rotate-12">
            <span className="-rotate-12 block">N</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-100">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-2">Log in to Naputriz Gacha Shop</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm text-center relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200 placeholder-slate-500"
              placeholder="trailblazer@astral.express"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200 placeholder-slate-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-slate-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-400">
          Don't have an account? <Link to="/register" className="text-pink-400 font-bold hover:text-pink-300 transition-colors">Register here</Link>
        </p>
      </div>
    </div>
  );
}
